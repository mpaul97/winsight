<script setup>
import dummy_player_data from "../assets/dummy_data/dummy_player_data.json";
defineProps({
  player: Object,
  bet_type: String,
  number_value: Number,
  stat: String
})
</script>

<template>
  <main>
    <p>{{ player }} {{ bet_type }} {{ number_value }} {{ stat }}</p>
  </main>
</template>

<style scoped>
</style>
