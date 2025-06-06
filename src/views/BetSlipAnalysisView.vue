<script setup>
import dummy_bets_info from '@/assets/dummy_data/nba_bets_info.json';
import parse_custom_date from '@/scripts/custom_dates';
import { Message, Panel, Divider, ProgressSpinner } from 'primevue';
import { CONSTANTS } from '@/assets/constants';
import PropDisplayPanel from '@/components/PropDisplayPanel.vue';
import HttpService from '@/services/HttpService';
</script>

<template>
  <PropDisplayPanel :item="{ id: 0, data: my_data[0], user_option: 'under' }" />
  <PropDisplayPanel :item="{ id: 1, data: my_data[1], user_option: 'under' }" />
</template>

<script>
export default {
  data() {
    return {
      raw_data: [],
      my_data: []
    }
  },
  async created() {
    // this.raw_data = await HttpService.get_upcoming_props(state.league);
    this.raw_data = dummy_bets_info;
    if (this.raw_data) {
      // Reactively update my_data using array assignment
      this.my_data = this.raw_data.map((vals, i) => {
        const processed = { ...vals };
        processed.date = parse_custom_date(vals.prop.bovada_date);
        let stat = vals.prop.stat
          .replace("total", "")
          .substring(1)
          .split("_")
          .map(this.capitalize_first_letter)
          .join(" ");
        processed.bet_name = stat;
        return processed;
      });
      this.set_filtered_data();
    }
  },
  methods: {
    capitalize_first_letter(string) {
      if (string !== 'and') {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      return string;
    },
    set_filtered_data() {
      // set filtered data
      if (this.selected_bet === 'All') {
        this.filtered_data = this.my_data;
      } else {
        this.filtered_data = this.my_data.filter(x => x['bet']===this.selected_bet);
      }
    }
  }
}
</script>
