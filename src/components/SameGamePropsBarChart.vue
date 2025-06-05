<script setup>
import { CONSTANTS } from '@/assets/constants';
import parse_custom_date from '@/scripts/custom_dates';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js'
import { Line, Bar } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
    class="card"
    style="min-width: 100%; min-height: 100%; max-height: 80rem;"
  >
    <Bar :data="data" :options="options" />
  </div>
</template>

<script>
const documentStyle = getComputedStyle(document.documentElement);
ChartJS.defaults.color = documentStyle.getPropertyValue('--color-heading');
export default {
  data() {
    return {
      data: {
        labels: this.my_data.same_game_props.map(x => parse_custom_date(x['date_collected']).toLocaleString()),
        datasets: [
          {
            label: 'Over Odds',
            data: this.my_data.same_game_props.map(x => x['over_odds']),
            backgroundColor: '#669bbc'
          },
          {
            label: 'Under Odds',
            data: this.my_data.same_game_props.map(x => x['under_odds']),
            backgroundColor: '#c1121f'
          },
          {
            label: 'Line',
            data: this.my_data.same_game_props.map(x => x['line_value']),
            backgroundColor: 'rgb(0, 189, 126)'
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
    // this.my_data.last_10_stats.map(x => {
    //   this.data.labels.push([x['MATCHUP'], new Date(x['GAME_DATE']).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })]);
    //   keys.map(key => datasets[key].push(x[key]))
    // });
    // Object.entries(datasets).map(x => {
    //   this.data.datasets.push({
    //     label: x[0],
    //     data: x[1],
    //     fill: false,
    //     borderColor: !x[0].includes('TOTAL') ? CONSTANTS.GAMELOG_STAT_LABEL_COLORS[x[0]] : 'lightpink'
    //   })
    // });
  }
}
</script>
