<script setup>
import dummy_players from "../assets/dummy_data/dummy_players.json";
import { useRouter } from "vue-router";
const router = useRouter();
const handle_player_click = (player_id) => {
  router.push({
    name: 'player',
    params: { id: player_id }
  });
};
</script>

<template>
  <main>
    <div class="container">
      <h2 class="title">My NBA App</h2>
      <input
        class="player-search"
        type="text"
        placeholder="Search player..."
        v-model="player_search_query"
        @input="setTimeout(find_players(player_search_query), 2000)"
      />
    </div>
    <div class="players-container">
      <h3 :style="'padding: 1rem'" v-if="loading">Loading...</h3>
      <h3 :style="'padding: 1rem'" v-else-if="error">{{ error }}</h3>
      <ul class="players-dropdown" v-else-if="players && player_search_query != ''">
        <li class="players-item" v-for="player in players.slice(0, 15)" :key="player.id" @click="handle_player_click(player.id)">
          <span>{{ player.full_name }}</span>
          <span>{{ player.is_active ? "Active" : "" }}</span>
        </li>
        <li class="players-item more" v-if="players.length > 15">
          <span>Show more</span>
        </li>
      </ul>
      <button :style="'margin-top: 5rem'" @click="handle_player_click(1629029)">Test Luka (1629029)</button>
    </div>
  </main>
</template>

<script>
const BASE_URL = import.meta.env.VITE_BASE_URL
export default {
  name: 'MyLanding',
  data() {
    return {
      player_search_query: '',
      loading: false,
      error: null,
      players: []
    }
  },
  mounted() {
    this.find_players(this.player_search_query);
  },
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async find_players(query) {
      if (this.player_search_query !== '') {
        this.loading = true;
        try {
          const response = await fetch(`${BASE_URL}find_players/${query}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
            },
          })
          if (!response.ok) {
            // bad response
            throw new Error(`HTTP error when searching for players!\nStatus: ${response.status}`)
          }
          const data = await response.json();
          this.players = data;
        } catch (error) {
          this.error = error.message
        } finally {
          this.loading = false
        }
      }
    },
  },
}
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  gap: 2rem;
  padding: 3rem;
  padding-bottom: 0;
}
.title {
  font-size: 3rem;
  font-weight: bold;
  text-decoration: underline;
  color: var(--color-heading);
}
.player-search {
  width: 20rem;
  padding: 10px;
}
.players-container {
  width: 100%;
  display: flex;
  justify-content: center;
  color: var(--color-heading);
}
.players-dropdown {
  padding: 0;
}
.players-item {
  width: 20rem;
  list-style-type: none;
  background-color: var(--my-primary-color);
  border: 0.1rem solid var(--color-border);
  border-top: none;
  padding: 0.5rem;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.players-item:hover {
  border: 0.1rem solid var(--color-border-hover);
  border-top: none;
  cursor: pointer;
  background-color: var(--my-primary-color-hover);
}
.players-item:active {
  transform: scale(0.98);
}

.players-item.more {
  justify-content: center;
}
</style>
