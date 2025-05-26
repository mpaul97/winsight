<script setup>
import { CONSTANTS } from '@/assets/constants';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

defineProps({
  my_data: Object
})
</script>

<template>
  <div
    v-if="data.labels && data.datasets.length > 1"
    class="card"
    style="min-width: 100%; min-height: 100%; max-height: 80rem;"
  >
    <Line :data="data" :options="options" />
  </div>
</template>

<script>
const documentStyle = getComputedStyle(document.documentElement);
ChartJS.defaults.color = documentStyle.getPropertyValue('--color-heading');
export default {
  data() {
    return {
      data: {
        labels: [],
        datasets: [
          {
            label: 'BET LINE',
            data: Array.from({ length: this.my_data.bet_info.last_10_stats.length }, (_, index) => this.my_data.bet.line_value),
            borderColor: 'white',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: 'white'
      }
    }
  },
  mounted() {
    const keys = Object.entries(this.my_data.bet_info.last_10_stats[0]).map(x => x[0]).filter(x => x !== 'GAME_DATE' && x !== 'MATCHUP');
    const datasets = Object.fromEntries(keys.map(key => [key, []]));
    this.my_data.bet_info.last_10_stats.map(x => {
      this.data.labels.push([x['MATCHUP'], new Date(x['GAME_DATE']).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })]);
      keys.map(key => datasets[key].push(x[key]))
    });
    Object.entries(datasets).map(x => {
      this.data.datasets.push({
        label: x[0],
        data: x[1],
        fill: false,
        borderColor: !x[0].includes('TOTAL') ? CONSTANTS.GAMELOG_STAT_LABEL_COLORS[x[0]] : 'lightpink'
      })
    });
  }
}
</script>
