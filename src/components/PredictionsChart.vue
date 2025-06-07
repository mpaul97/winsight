<script setup>
import Chart from 'primevue/chart';
import { ref, onMounted } from 'vue';

const props = defineProps({
  item: Object
})

onMounted(() => {
  chartOptions.value = setChartOptions();
  chartData.value = setChartData();
})

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');
  const entries = Object.entries(props.item.predictions).filter(x => x[0] !== 'player_name' && x[0] !== 'player_id')
  const stats = entries.map(x => x[0].toUpperCase());
  const chartData =  {
    labels: stats,
    datasets: [
      {
        data: entries.map(x => x[1]),
      }
    ]
  };
  return chartData;
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const headingColor = documentStyle.getPropertyValue('--color-heading');
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
  return {
    respnsize: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: headingColor
        }
      },
      title: {
        display: true,
        text: 'Projections',
        color: headingColor,
        font: {
          weight: 'bold',
          size: 20
        }
      }
    },
    scales: {
      r: {
        grid: {
          color: textColorSecondary
        }
      }
    }
  };
}
const chartOptions = ref();
const chartData = ref();
</script>

<template>
  <Chart type="polarArea" :data="chartData" :options="chartOptions" class="w-full md:w-[25rem]" />
</template>
