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
  title: String,
  labels: Array,
  myData: Array
})
</script>

<template>
  <div class="card">
      <Line :data="data" :options="options" class="h-[30rem]" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        labels: this.labels,
        datasets: [
          {
            label: this.title,
            backgroundColor: '#f87979',
            data: this.myData
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>
