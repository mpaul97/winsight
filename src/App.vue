<script setup>
import MyLanding from './components/MyLanding.vue'
import MyPlayer from './components/MyPlayer.vue'
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
