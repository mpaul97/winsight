<script setup>
// import { CONSTANTS } from '@/assets/constants';
import Chart from 'primevue/chart';
import { ref, onMounted } from 'vue';

const props = defineProps({
  item: Object,
  size: Number
})

onMounted(() => {
  chartOptions.value = setChartOptions();
  chartData.value = setChartData();
})

const setChartData = () => {
  // const documentStyle = getComputedStyle(document.documentElement);
  const all_stats = props.item.last_10_stats;
  const stats = all_stats.slice(all_stats.length-props.size, all_stats.length);
  const chartData =  {
    labels: stats.map(x => [x['MATCHUP'], new Date(x['GAME_DATE']).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })]),
    datasets: [
      {
        type: 'bar',
        label: props.item.bet_name,
        data: stats.map(x => x[props.item.prop.stat.toUpperCase()]),
        borderWidth: 2
      }
    ]
  };
  return chartData;
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const headingColor = documentStyle.getPropertyValue('--color-heading');
  // const textColor = documentStyle.getPropertyValue('--p-text-color');
  // const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
  return {
    respnsize: true,
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: headingColor
        }
      },
      title: {
        display: true,
        text: 'Past Games',
        color: headingColor,
        font: {
          weight: 'bold',
          size: 20
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: headingColor
        },
        grid: {
          color: surfaceBorder
        }
      },
      y: {
        ticks: {
          color: headingColor,
          stepSize: 1
        },
        grid: {
          color: surfaceBorder
        }
      }
    }
  };
}
const chartOptions = ref();
const chartData = ref();
</script>

<template>
  <Chart type="bar" :data="chartData" :options="chartOptions" class="w-full h-[20rem]" />
</template>
