<script setup>
import dummy_player_data from "../assets/dummy_data/dummy_player_data.json";
import { CONSTANTS } from "@/assets/constants";

import { toRaw, reactive } from "vue";

import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

defineProps({
  data: Object,
  chart_stats: Array,
  num_games: Number
})
</script>

<template>
  <div
    class="container"
  >
    <Bar
      :options="{
        responsive: true,
        maintainAspectRatio: true
      }"
      :data="{
        labels: data.slice(0, num_games).map(x => x['GAME_DATE'].toLocaleDateString()),
        datasets: chart_stats.map((x, i) => {
            return ({
              label: x,
              data: data.map(y => y[x]),
              backgroundColor: get_color(i)
            })
          })
      }"
    />
  </div>
</template>

<script>
const COLORS = [
  "90dbf4", "8eecf5", "98f5e1",
  "f1c0e8", "cfbaf0", "a3c4f3",
  "b9fbc0", "fbf8cc", "fde4cf",
  "ffcfd2",
];
export default {
  name: 'MyChart',
  data() {
    return {

    }
  },
  methods: {
    get_color(i) {
      return `#${COLORS[i]}`
    }
  }
}
</script>

<style>
.container {
  height: fit-content;
  overflow: hidden;
}
</style>
