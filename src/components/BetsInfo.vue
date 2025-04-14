<script setup>
import dummy_player_data from "../assets/dummy_data/dummy_player_data.json";
defineProps({
  player: Object,
  bet_type: Object,
  number_value: Number,
  stat: Object
})
</script>

<template>
  <main>
    <p>
      {{ player.full_name }}
      {{ bet_type.name }}
      {{ number_value }}
      {{ stat.code }}
    </p>
  </main>
</template>

<script>
export default {
  name: 'BetsInfo',
  data() {
    return {
      raw_data: dummy_player_data,
      curr_data: []
    }
  },
  mounted() {
    var headers = this.raw_data['current_season_reg']['resultSets'][0]['headers'];
    var reg_data = this.raw_data['current_season_reg']['resultSets'][0]['rowSet'];
    var po_data = this.raw_data['current_season_po']['resultSets'][0]['rowSet'];
    this.curr_data = reg_data.concat(po_data);
  }
}
</script>

<style scoped>
</style>
