<script setup>
import { Avatar, Card } from 'primevue';
</script>

<template>
  <div class="main">
    <Card class="card header-card shadow-lg justify-center items-center max-w-100 rounded-2xl p-8 gap-4">
        <template #title>
          <span class="text-2xl font-bold">Welcome to WinSight</span>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Integer non ligula id mauris accumsan dictum quis in massa. S
              ed sit amet lacus id sem posuere fermentum in in eros.
              Fusce maximus tellus eget magna finibus, ut accumsan erat varius.
              Nunc vel ipsum vitae tortor feugiat ultricies ut vel nunc.
            </span>
          </div>
          <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-75 animate-duration-1000' }" class="flex flex-col bg-teal-500 text-white border-teal-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
            <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
              <i class="pi pi-table !text-2xl"></i>
            </div>
            <span class="text-2xl font-bold">Tables</span>
            <span class="text-center">
              Aenean aliquet rhoncus lorem vel faucibus.
              Maecenas suscipit suscipit nibh, quis congue nunc bibendum non. Integer efficitur,
              libero at ultrices tincidunt, orci nisl scelerisque risus,
              eu lobortis lacus neque in enim. Aenean blandit ligula nec enim vehicula,
              ac rutrum purus semper. Cras odio nibh, finibus a aliquam et, bibendum et massa.
              Sed lobortis fringilla ligula, sed suscipit arcu porta id.
            </span>
          </div>
          <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-50 animate-duration-1000' }" class="flex flex-col bg-indigo-500 text-white border-indigo-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
            <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
              <i class="pi pi-ticket !text-2xl"></i>
            </div>
            <span class="text-2xl font-bold">Analysis</span>
            <span class="text-center">
              Fusce sagittis mi vel tincidunt facilisis.
              Proin massa nibh, tincidunt a libero ac, maximus finibus magna.
              Aliquam interdum ipsum a purus condimentum, at cursus dolor pulvinar.
              Etiam molestie posuere ultricies. Nulla accumsan placerat consectetur.
              Vestibulum scelerisque consequat turpis eget placerat.
              Nulla varius massa sit amet nisi vulputate auctor.
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
</style>
