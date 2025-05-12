<script setup>
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
  labels: Array,
  myData: Object
})
</script>

<template>
  <div class="card" style="min-width: 100%; min-height: 100%">
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
        labels: this.labels,
        datasets: [
        {
            label: 'PTS',
            data: this.myData.stat,
            fill: false,
            borderColor: 'lightblue',
            tension: 0.1
          },
          // {
          //   label: 'MINS',
          //   data: this.myData.mins,
          //   fill: false,
          //   borderColor: documentStyle.getPropertyValue('--my-primary-color'),
          //   tension: 0.1
          // },
          {
            label: 'BET LINE',
            data: this.myData.number_val,
            borderColor: 'red',
            tension: 0.1,
            pointStyle: false
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

  }
}
</script>
