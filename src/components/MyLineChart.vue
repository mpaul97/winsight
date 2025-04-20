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
  <div class="card" style="min-width: 100%">
    <Line :data="data" :options="options" class="h-[30rem]" style="background-color: var(--color-background-mute)" />
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
            borderColor: 'red',
            tension: 0.1
          },
          {
            label: 'MINS',
            data: this.myData.mins,
            fill: false,
            borderColor: documentStyle.getPropertyValue('--my-primary-color'),
            tension: 0.1
          },
          // {
          //   label: 'PTS_PER_MIN',
          //   data: this.myData.stat_per_min,
          //   fill: false,
          //   borderColor: 'lightblue',
          //   tension: 0.1
          // }
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
