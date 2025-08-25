<script setup>
import dummy_batting_projections_mlb from '@/assets/dummy_data/mlb_batting_predictions.json';
</script>

<template>
  <div class="card">
    <div v-for="item in raw_data" style="display: flex; flex-direction: row; gap: 0.2rem">
      <div v-for="key in data_keys">
        {{ typeof item[key] === 'number' ? Math.round(item[key] * 100) / 100 : item[key] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      raw_data: [],
      data_keys: []
    }
  },
  async created() {
    this.raw_data = dummy_batting_projections_mlb;
    this.data_keys = Object.keys(this.raw_data[0]);
  }
}
</script>
