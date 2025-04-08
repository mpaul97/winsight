<script setup>
import dummy_all_players from '../assets/dummy_data/dummy_all_players.json';
import HttpService from '../services/HttpService';

import {
  Paginator, InputText, FloatLabel
} from 'primevue';

import { ref } from 'vue';

// paginator variables
const first = ref(0);
const num_rows = 56;
</script>

<template>
  <main>
    <div class="container">
      <FloatLabel variant="over">
        <InputText type="text" fluid v-model="search_value" style="width: 20rem" v-on:update:modelValue="handle_search" />
        <label for="over_label" style="color: var(--color-heading)">Search Player</label>
      </FloatLabel>
      <div v-if="data.length!==0" class="players-list">
        <ul v-for="player in data.slice(first, (first+num_rows))">
          <li>
            <router-link v-slot="{ href, navigate }" :to="`player/${player['id']}`" custom>
              <a v-if="player['is_active']" :href="href" @click="navigate">{{ player['full_name'] }}</a>
              <span v-else>{{ player['full_name'] }}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="container" v-else>
        <h3 :style="'color: var(--color-heading)'">No players found!</h3>
      </div>
      <Paginator
        v-model:first="first"
        :rows="num_rows"
        :totalRecords="data.length"
      />
    </div>
  </main>
</template>

<script>
// inputtext variables
const search_value = ref('');
export default {
  name: 'AllPlayers',
  data() {
    return {
      raw_data: {},
      data: []
    }
  },
  async created() {
    const allPlayerData = localStorage.getItem('allPlayers');
    if (allPlayerData) {
      this.raw_data = JSON.parse(allPlayerData);
      this.data = [...this.raw_data];
      console.info('Getting allPlayers from localStorage!');
    } else {
      HttpService.set_all_players();
    }
  },
  methods: {
    handle_search() {
      this.data = this.raw_data.filter(x => (x['first_name'].toLowerCase().startsWith(search_value.value) || x['last_name'].toLowerCase().startsWith(search_value.value)))
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  min-width: 800px;
  padding: 2rem 0;
  font-size: 1rem;
}
.players-list {
  width: 80%;
  height: 30rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0 10%;
}
.players-list li {
  width: 100%;
  text-align: left;
  list-style: none;
  display: flex;
  align-items: flex-start;
}
@media (max-width: 1280px) {
  .players-list {
    padding: 0;
  }
}
</style>
