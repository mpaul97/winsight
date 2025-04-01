<script setup>
import dummy_all_players from '../assets/dummy_data/dummy_all_players.json'
</script>

<template>
  <main>
    <div class="container">
      <h2>All players and search goes here</h2>
    </div>
  </main>
</template>

<script>
export default {
  name: 'AllPlayers',
  data() {
    return {
      raw_data: dummy_all_players
    }
  },
  mounted() {
    this.init_data()
  },
  methods: {
    init_data() {
      console.log(this.raw_data)
    }
  }
}
</script>
