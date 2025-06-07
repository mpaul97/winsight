<script setup>
import { CONSTANTS } from '@/assets/constants';
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
  const all_stats = props.item.last_10_stats;
  const stats = all_stats.slice(all_stats.length-props.size, all_stats.length);
  const chartData =  {
    labels: stats.map(x => [x['MATCHUP'], new Date(x['GAME_DATE']).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })]),
    datasets: [
      {
        type: 'bar',
        label: props.item.bet_name,
        backgroundColor: `${documentStyle.getPropertyValue('--p-green-600')}c0`,
        data: stats.map(x => x[props.item.prop.stat.toUpperCase()]),
        borderColor: `${documentStyle.getPropertyValue('--p-green-300')}c0`,
        borderWidth: 2
      }
    ]
  };
  // const otherStats = CONSTANTS.BOVADA_PROP_STAT_MAPPINGS[props.item.prop.stat];
  // const barColors = CONSTANTS.BAR_CHART_COLORS;
  // if (otherStats.length > 1) {
  //   otherStats.map((s, index) => {
  //     const color = barColors[index];
  //     chartData.datasets.push({
  //       type: 'bar',
  //         label: s,
  //         backgroundColor: `${documentStyle.getPropertyValue(`${color}-600`)}c0`,
  //         data: stats.map(x => x[s]),
  //         borderColor: `${documentStyle.getPropertyValue(`${color}-300`)}c0`,
  //         borderWidth: 2
  //     })
  //   })
  // }
  return chartData;
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

  return {
    respnsize: true,
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
      y: {
        ticks: {
          color: textColorSecondary,
          stepSize: 0.5,
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
