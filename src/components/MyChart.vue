<script setup>
import dummy_player_data from "../assets/dummy_data/dummy_player_data.json";
import { CONSTANTS } from "@/assets/constants";

import { toRaw, reactive } from "vue";

import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

defineProps({
  title: String,
  myData: Object
})
</script>

<template>
  <div v-if="!loading" class="container">
    <Bar
      :options="{
        responsive: true,
        maintainAspectRatio: true
      }"
      :data="{
        labels: data['current_season_reg'].map(x => x['GAME_DATE'].toLocaleDateString()),
        datasets: chart_stats.map(x => {
            return ({
              label: x,
              data: data['current_season_reg'].map(y => y[x]),
              backgroundColor: getRandomColor()
            })
          })
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'MyChart',
  data() {
    return {
      raw_data: dummy_player_data,
      data: {},
      loading: true,
      chart_stats: ['PTS', 'AST', 'MIN', 'REB']
    }
  },
  mounted() {
    this.init_data();
  },
  methods: {
    init_data() {
      for (var key in this.raw_data) {
        this.data[key] = []
        const vals = toRaw(this.raw_data[key]['resultSets'][0]['rowSet']);
        for (var i = 0; i < vals.length; i++) {
          var row = {};
          for (var j = 0; j < vals[i].length; j++) {
            var header = CONSTANTS.GAMELOG_HEADERS[j];
            if (header === 'GAME_DATE') {
              vals[i][j] = new Date(vals[i][j]);
            }
            row[header] = vals[i][j];
          };
          this.data[key].push(row);
        }
      };
      if (this.data) {
        this.loading = false;
      };
    },
    getRandomColor() {
      return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    }
  }
}
</script>

<style>
.container {
  height: 30rem;
}
</style>
