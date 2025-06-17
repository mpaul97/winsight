<script setup>
// import dummy_bets_info from '@/assets/dummy_data/nba_bets_info.json';
// import parse_custom_date from '@/scripts/custom_dates';
import PropDisplayPanel from '@/components/PropDisplayPanel.vue';
// import HttpService from '@/services/HttpService';
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="w-[90%] flex p-2">
    <RouterLink to="/">
      <Button
        icon="pi pi-arrow-left"
        severity="secondary"
        variant="text"
      />
    </RouterLink>
  </div>
  <div v-for="item in my_data" v-bind:key="item.data.prop.primary_key">
    <PropDisplayPanel :item=item />
  </div>
</template>

<script>
export default {
  data() {
    return {
      my_data: []
    }
  },
  async created() {
    this.my_data = JSON.parse(localStorage.getItem('betSlipData'));
  }
}
</script>
