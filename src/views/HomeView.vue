<script setup>
import dummy_all_player_props_nba from '@/assets/dummy_data/all_player_props_nba.json';
import MyLogo from '@/components/MyLogo.vue';
import PropCards from '@/components/PropCards.vue';
import { Avatar, Card, Button, SelectButton } from 'primevue';
</script>

<template>
  <div class="container">
    <div class="leagues-container">
      <SelectButton
        v-model="selected_league"
        :options="league_options"
        size="large"
      />
    </div>
    <div class="bets-container">
      <SelectButton
        v-model="selected_bet"
        :options="bet_options"
        size="large"
        class="bet-select"
      />
    </div>
    <PropCards :my_data="my_data"/>
  </div class="container">
</template>

<script>
export default {
  data() {
    return {
      selected_league: 'NBA',
      league_options: ['NBA', 'NFL', 'MLB', 'NHL'],
      raw_data: dummy_all_player_props_nba,
      my_data: [],
      selected_bet: 'All',
      bet_options: ['All']
    }
  },
  mounted() {
    // Reactively update my_data using array assignment
    this.my_data = this.raw_data.map((vals, i) => {
      const processed = { ...vals };
      processed.date = new Date(vals.bovada_date);
      let stat = vals.stat
        .replace("total", "")
        .substring(1)
        .split("_")
        .map(this.capitalize_first_letter)
        .join(" ");
      processed.bet = this.replace_quarter(stat);
      if (!this.bet_options.includes(processed.bet)) {
        this.bet_options.push(processed.bet);
      };
      processed.key = `${vals.date_collected_string}-${vals.player_name.toLowerCase()}-${vals.stat}`;
      return processed;
    });
  },
  methods: {
    capitalize_first_letter(string) {
      if (string !== 'and') {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      return string;
    },
    replace_quarter(string) {
      if (string.includes("quarter")) {
        var arr = string.split("-");
        var s = arr[arr.length-1];
        var q = s.split("quarter")[0];
        return `${arr[0]} - ${q} Quarter`;
      };
      return string;
    },
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.bet-select {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
