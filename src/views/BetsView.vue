<script setup>
import { CONSTANTS } from '../assets/constants';
import { reactive, ref } from 'vue';
import {
  InputText, FloatLabel, Select,
  InputNumber, AutoComplete
} from 'primevue';

// BET FORM VARIABLES
// - player name
const player_name_search = ref('');
const value = ref(null);
const items = ref([]);

// - bet type
const bet_types = ref([
    { name: 'over', code: 'ov' },
    { name: 'under', code: 'un' },
    { name: 'at least', code: 'al' }
]);
const selected_bet_type = ref({ name: 'over', code: 'ov' });

// - number value
const number_value = ref(10.5);

// - target stat
const selected_stat = ref({ name: 'PTS', code: 'PTS' });
const stats = ref(
  CONSTANTS.GAMELOG_STAT_LABELS.map(x => ({name: x, code: x}))
);
</script>

<template>
  <main>
    <div class="container">
      <h2 style="color: var(--color-heading)">Enter bet information below</h2>
      <p>EX: LeBron James over 10.5 points</p>
      <div class="bet-form-container">
        <AutoComplete class="player-search"/>
        <!-- <InputText class="player-search" type="text" fluid v-model="player_name_search" v-on:update:modelValue="handle_player_name_search" /> -->
        <Select class="select bet-type" v-model="selected_bet_type" :options="bet_types" optionLabel="name" />
        <InputNumber class="input-number" v-model="number_value" inputId="minmaxfraction" :minFractionDigits="1" :maxFractionDigits="1" fluid />
        <Select class="select stat" v-model="selected_stat" :options="stats" optionLabel="name" />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Bets',
  data() {
    return {
      player_names: []
    }
  },
  async created() {
    this.set_player_names();
  },
  methods: {
    set_player_names() {
      const allPlayers = localStorage.getItem('allPlayers');
      if (allPlayers) {
        this.player_names = JSON.parse(allPlayers);
        console.log(this.player_names)
      }
    },
    handle_player_name_search(event) {

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
.bet-form-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 3rem;
  gap: 0.5rem;
}
.select {
  display: flex;
  align-items: center;
}
</style>
