<script setup>
import parse_custom_date from '@/scripts/custom_dates';
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
  const documentStyle = getComputedStyle(document.documentElement);
  return {
    labels: props.item.same_game_props.map(x => parse_custom_date(x['date_collected']).toLocaleString().split(",")),
    datasets: [
      {
        type: 'line',
        label: 'Over Odds',
        data: props.item.same_game_props.map(x => x['over_odds']),
        backgroundColor: `${documentStyle.getPropertyValue('--p-blue-600')}c0`,
        borderColor: `${documentStyle.getPropertyValue('--p-blue-300')}c0`,
        borderWidth: 2
      },
      {
        type: 'line',
        label: 'Under Odds',
        data: props.item.same_game_props.map(x => x['under_odds']),
        backgroundColor: `${documentStyle.getPropertyValue('--p-red-600')}c0`,
        borderColor: `${documentStyle.getPropertyValue('--p-red-300')}c0`,
        borderWidth: 2
      },
      {
        type: 'line',
        label: 'Line',
        data: props.item.same_game_props.map(x => x['line_value']),
        backgroundColor: `${documentStyle.getPropertyValue('--p-green-600')}c0`,
        borderColor: `${documentStyle.getPropertyValue('--p-green-300')}c0`,
        borderWidth: 2
      }
    ]
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const headingColor = documentStyle.getPropertyValue('--color-heading');
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
        text: 'Line Changes',
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
          maxTicksLimit: 8
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
