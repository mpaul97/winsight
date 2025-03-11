<script setup>
// defineProps({
//   msg: {
//     type: String,
//     required: true,
//   },
// })
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
        @input="find_players(player_search_query)"
      />
    </div>
    <div class="players-container">
      <p v-if="loading">Loading...</p>
    </div>
  </main>
</template>

<script>
const BASE_URL = import.meta.env.VITE_BASE_URL
const DOMAIN = import.meta.env.VITE_DOMAIN
export default {
  name: 'MyLanding',
  data() {
    return {
      player_search_query: '',
      loading: false,
      error: null,
      players: [],
    }
  },
  mounted() {
    this.find_players(this.player_search_query)
  },
  methods: {
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
          this.error = error.message;
        } finally {
          this.loading = false;
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
}
.title {
  font-size: 3rem;
  font-weight: bold;
  text-decoration: underline;
}
.player-search {
  padding: 10px;
  width: 20rem;
}
</style>
