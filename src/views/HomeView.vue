<script setup>
import dummy_bets_info from '@/assets/dummy_data/nba_bets_info.json';
import MyLogo from '@/components/MyLogo.vue';
import PropCards from '@/components/PropCards.vue';
import { SelectButton } from 'primevue';
import { useToast } from 'primevue';
import { ref } from 'vue';
import state, { update_league } from '@/store';
import parse_custom_date from '@/scripts/custom_dates';
import { RouterLink } from 'vue-router';
import HttpService from '@/services/HttpService';

const menu = ref(true);
const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <Toast />
  <div v-if="!loading && my_data" class="container">
    <p>{{ state.league }}</p>
    <div class="bets-container">
      <SelectButton
        v-model="selected_bet"
        :options="bet_options"
        class="bet-select"
        @change="set_filtered_data"
      />
    </div>
    <PropCards
      v-if="filtered_data.length > 1"
      :my_data="filtered_data"
      @receive_card="add_bet_item"
    />
    <div class="footer">
      <Button
        class="w-full"
        type="button"
        label="Bets"
        icon="pi pi-angle-up"
        @click="toggle"
        :badge="bet_items.length === 0 ? undefined : String(bet_items.length)"
      />
      <Menu
        ref="menu"
        id="overlay_menu"
        :model="bet_items"
        style="width: 22rem; padding-top: 0.5rem; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;"
        :popup="true"
      >
        <template #start>
          <span class="flex items-center p-2 pl-4">
            <span class="text-xl font-semibold">BET SLIP</span>
          </span>
          <span v-if="bet_items.length === 0" class="flex items-center p-2 pl-4">No Bets Added</span>
        </template>
        <template v-if="bet_items.length > 0" #item="{ item, props }">
          <div class="flex justify-between pt-2 pb-2">
            <Button
              severity="secondary"
              icon="pi pi-times"
              style="background: none; border: none; width: 8%"
              @click="remove_bet_item(item); toggle(); /* close popup on item delete */"
            />
            <div class="menu-item w-full px-2">
              <div class="flex justify-between">
                <span>{{ item.data.prop.player_name }} <span style="font-size: 0.7rem; color: var(--color-text)">{{ item.data.prop.team_abbr }}</span></span>
                <span>{{ item.user_option === 'over' ? item.data.prop.over_odds : item.data.prop.under_odds }}</span>
              </div>
              <span style="font-size: 0.8rem; color: var(--color-text)">
                <span style="text-transform: capitalize;">{{ item.user_option }}</span>
                {{ item.data.prop.line_value }}
                {{ item.data.bet_name }}
              </span>
            </div>
          </div>
        </template>
        <template #end>
          <RouterLink
            class="flex justify-center w-full p-1"
            to="/bet-slip-analysis"
          >
            <Button
              type="button"
              label="Analyze"
              severity="success"
              class="w-full"
              style="border-radius: 2px;"
              :disabled="bet_items.length === 0"
            />
          </RouterLink>
        </template>
      </Menu>
    </div>
  </div>
  <div v-else-if="loading" style="height: 70vh; display: flex; justify-content: center; align-items: center;">
      <ProgressSpinner
        style="width: 10rem; height: 10rem"
        strokeWidth="2"
        fill="transparent"
        animationDuration="0.8s"
      />
  </div>
  <div v-else-if="!loading && !my_data">
    <Message severity="error">No bets found</Message>
  </div>
</template>

<script>
export default {
  data() {
    return {
      raw_data: [],
      my_data: [],
      filtered_data: [],
      selected_bet: 'All',
      bet_options: ['All'],
      bet_items: [],
      loading: true,
      toast: useToast()
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
        if (!this.bet_options.includes(processed.bet_name)) {
          if (!processed.bet_name.includes('quarter')) { // remove 1st quarter bets
            this.bet_options.push(processed.bet_name);
          }
        };
        return processed;
      });
      this.my_data = this.my_data.filter(x => x.player_prop_outcome_history);
      this.my_data = this.my_data.sort((a, b) => b.player_prop_outcome_history.weighted_proportion - a.player_prop_outcome_history.weighted_proportion);
      this.set_filtered_data();
      this.loading = false;
    }
  },
  methods: {
    add_bet_item(event) {
      if (this.bet_items.filter(x => event.submitted_bet === x.data && event.option === x.user_option).length === 0) {
        this.bet_items.push({ id: this.bet_items.length, data: event.submitted_bet, user_option: event.option });
      // localStorage.setItem('betSlipData', JSON.stringify(this.bet_items));
      } else {
        this.toast.add({ severity: 'warn', summary: 'Bet Slip', detail: 'Cannot add same bet', life: 2000 })
      }
    },
    remove_bet_item(item) {
      this.bet_items = this.bet_items.filter(x => x.id !== item.id);
    },
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

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
.bet-select {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
:deep(.p-selectbutton .p-togglebutton:first-child) {
  border-radius: 10px;
}
:deep(.p-selectbutton .p-togglebutton:last-child) {
  border-radius: 10px;
}
:deep(.p-selectbutton .p-togglebutton) {
  background: var(--color-background-mute);
  border-radius: 10px;
  margin: 0.2rem;
  color: var(--color-heading);
  border: none;
}
:deep(.p-selectbutton .p-togglebutton-checked > span) {
  background: var(--my-primary-color);
  color: var(--color-background);
}
:deep(.p-selectbutton .p-togglebutton-checked) {
  background: var(--my-primary-color);
}
:deep(.p-togglebutton-label) {
  font-weight: 600;
}
.footer {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}
.footer > button {
  display: flex;
  justify-content: flex-start;
}
:deep(.p-menu-item .p-menu-item-content .menu-item) {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-right: 0.4rem;
  width: 90%;
}
:deep(.p-button .p-badge) {
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.2rem;
}
</style>
