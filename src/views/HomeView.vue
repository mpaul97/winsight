<script setup>
import MyLogo from '@/components/MyLogo.vue';
import { Avatar, Card } from 'primevue';
</script>

<template>
  <div class="main">
    <Card class="card header-card shadow-lg justify-center items-center max-w-100 rounded-2xl p-8 gap-4">
        <template #title>
          <span class="text-2xl font-bold" style="font-size: 2.5rem">Welcome to WinSight</span>
          <div class="h-[1rem]"></div>
          <div class="logo-container">
            <MyLogo :my-size="'5rem'"/>
          </div>
          <div class="h-[1rem]"></div>
        </template>
        <template #content>
            <span class="m-0">
              Unlock winning strategies with WinSight, the ultimate sports analytics platform designed to transform raw data into game-changing insights.
              Powered by AI-driven performance breakdowns and real-time opponent analysis, we give coaches, athletes, and
              teams the edge to predict patterns, optimize plays, and dominate the competition.
              Turn data into dominance—because every second, stat, and strategy counts.
            </span>
        </template>
      </Card>
    <div class="container">
      <div class="card flex flex-col items-center overflow-hidden">
        <div class="flex flex-wrap justify-center gap-8">
          <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-50 animate-duration-1000' }" class="flex flex-col bg-purple-500 text-white border-purple-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
            <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
              <i class="pi pi-chart-line !text-2xl"></i>
            </div>
            <span class="text-2xl font-bold">Charts</span>
            <span class="text-center">
              Visualize trends, player performance, and betting odds with dynamic, interactive charts.
              Spot patterns at a glance using customizable graphs that adapt to your preferred metrics—from scoring streaks to injury probabilities.
            </span>
          </div>
          <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-75 animate-duration-1000' }" class="flex flex-col bg-teal-500 text-white border-teal-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
            <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
              <i class="pi pi-table !text-2xl"></i>
            </div>
            <span class="text-2xl font-bold">Tables</span>
            <span class="text-center">
              Crunch numbers like a pro with organized, filterable tables.
              Compare stats across teams, seasons, or betting markets in real time, ensuring you never miss a critical data point.
            </span>
          </div>
          <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-50 animate-duration-1000' }" class="flex flex-col bg-indigo-500 text-white border-indigo-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
            <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
              <i class="pi pi-ticket !text-2xl"></i>
            </div>
            <span class="text-2xl font-bold">Analysis</span>
            <span class="text-center">
              Build custom reports with drag-and-drop tools to dissect player potential or predict bet outcomes.
              Apply filters, algorithms, and benchmarks to turn raw stats into actionable strategies for the field—or the bookmakers.
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.container {
  margin: 0px;
  min-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  font-weight: normal;
  color: var(--color-heading);
  padding: 1rem;
}
.card {
  padding: 2rem;
  margin-bottom: 1rem;
}
.header-card {
  background-color: var(--color-background-mute);
  text-align: center;
  display: flex;
  width: 1024px;
}
.logo-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
