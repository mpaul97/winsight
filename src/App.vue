<script setup>
import MyLanding from './views/LandingView.vue'
import MyPlayer from './views/PlayerView.vue'
</script>

<template>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <main>
    <!-- <RouterView /> -->
     <MyPlayer />
  </main>
</template>

<style scoped></style>
