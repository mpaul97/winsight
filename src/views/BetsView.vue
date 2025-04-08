<script setup>
import { reactive, ref } from 'vue';
import {
  InputText, FloatLabel, Select
} from 'primevue';

// inputtext variables
const player_name_search = ref('');

const bet_types = ref([
    { name: 'over', code: 'ov' },
    { name: 'under', code: 'un' },
    { name: 'at least', code: 'al' }
]);
const selected_bet_type = ref({ name: 'over', code: 'ov' });
</script>

<template>
  <main>
    <div class="container">
      <h2 style="color: var(--color-heading)">Enter bet information below</h2>
      <p>EX: LeBron James over 10.5 points</p>
      <FloatLabel variant="over">
        <InputText type="text" fluid v-model="player_name_search" v-on:update:modelValue="handle_player_name_search" />
        <label for="over_label" style="color: var(--color-heading)">Enter player</label>
      </FloatLabel>
      <Select v-model="selected_bet_type" :options="bet_types" optionLabel="name" class="w-full md:w-56" />
      <p>{{ JSON.stringify(selected_bet_type) }}</p>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Bets',
  data() {
    return {

    }
  },
  async created() {

  },
  methods: {
    handle_player_name_search() {

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
</style>
