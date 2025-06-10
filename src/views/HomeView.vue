<script setup>
import { CONSTANTS } from '@/assets/constants';
import dummy_bets_info from '@/assets/dummy_data/nba_bets_info.json';
import MyLogo from '@/components/MyLogo.vue';
import PropCards from '@/components/PropCards.vue';
import { SelectButton, Select } from 'primevue';
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
    <div class="w-full">
      <SelectButton
        v-model="selected_bet"
        :options="bet_options"
        class="bet-select"
        @change="set_filtered_data"
        size="small"
      />
    </div>
    <div style="width: 85%; display: flex; gap: 1rem;">
      <Button
        icon="pi pi-sort-alt"
        :severity="sort_by_ascending ? 'secondary': 'primary'"
        @click="sort_by_ascending = !sort_by_ascending; sort_by(filtered_data)"
        style="font-size: 0.6rem;"
      />
      <FloatLabel>
        <label for="sort-by-dropdown">Sort by</label>
        <CascadeSelect
          id="sort-by-dropdown"
          :options="sort_by_options"
          optionLabel="cname"
          optionGroupLabel="name"
          :optionGroupChildren="['options']"
          v-model="selected_sort_by"
          style="color: var(--color-heading); width: 13rem;"
          @change="sort_by(filtered_data)"
        />
      </FloatLabel>
      <FloatLabel>
        <label for="teams-dropdown">Teams</label>
        <Select
          id="teams-dropdown"
          :options="teams"
          v-model="selected_team"
          placeholder="Team"
        />
      </FloatLabel>
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
      toast: useToast(),
      teams: ['All'],
      selected_team: 'All',
      sort_by_options: [
        {
          name: 'Over',
          code: 'O',
          options: [
            { cname: 'Odds', code: 'O-Odds' },
            { cname: 'Player Rate', code: 'O-Player-Rate' },
            { cname: 'Player Weighted Rate', code: 'O-Player-WR' },
            { cname: 'Player Rank', code: 'O-Player-Rank' },
            { cname: 'Stat Rate', code: 'O-Stat-Rate' },
            { cname: 'Stat Weighted Rate', code: 'O-Stat-WR' },
            { cname: 'Stat Rank', code: 'O-Stat-Rank' },
          ]
        },
        {
          name: 'Under',
          code: 'U',
          options: [
            { cname: 'Odds', code: 'U-Odds' },
            { cname: 'Player Rate', code: 'U-Player-Rate' },
            { cname: 'Player Weighted Rate', code: 'U-Player-WR' },
            { cname: 'Player Rank', code: 'U-Player-Rank' },
            { cname: 'Stat Rate', code: 'U-Stat-Rate' },
            { cname: 'Stat Weighted Rate', code: 'U-Stat-WR' },
            { cname: 'Stat Rank', code: 'U-Stat-Rank' },
          ]
        },
        {
          name: 'Predictions',
          code: 'P',
          options: [
            { cname: '+ Difference', code: 'P-Positive-Difference' },
            { cname: '- Difference', code: 'P-Negative-Difference' }
          ]
        }
      ],
      selected_sort_by: { cname: 'Odds', code: 'O-Odds' },
      sort_by_ascending: true
    }
  },
  async created() {
    // this.raw_data = await HttpService.get_upcoming_props(state.league);
    this.raw_data = dummy_bets_info;
    if (this.raw_data) {
      this.set_my_data();
      this.my_data = this.my_data.filter(x => x.player_prop_outcome_history);
      this.set_filtered_data();
      this.loading = false;
      this.bet_options = this.bet_options.sort((a, b) => {
        return CONSTANTS.BET_OPTIONS_SORT_ORDER_KEY.indexOf(a) - CONSTANTS.BET_OPTIONS_SORT_ORDER_KEY.indexOf(b);
      });
      this.my_data = this.sort_by(this.my_data);
    }
  },
  methods: {
    set_my_data() {
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
        // bet options
        if (!this.bet_options.includes(processed.bet_name)) {
          if (!processed.bet_name.includes('quarter')) { // remove 1st quarter bets
            this.bet_options.push(processed.bet_name);
          }
        };
        // predictions
        const pred_keys = CONSTANTS.BOVADA_PROP_STAT_MAPPINGS[processed.prop.stat].map(x => x.toLowerCase());
        if (pred_keys) {
          processed.pred_stat = pred_keys.map(x => processed.predictions[x]).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        };
        // teams
        if (!this.teams.includes(processed.prop.team_abbr)) {
          this.teams.push(processed.prop.team_abbr);
        };
        return processed;
      });
    },
    sort_by(data) {
      const ou_keys = { "Rate": "proportion", "WR": "weighted_proportion", "Rank": "rank" };
      const table_keys = { "Player": "player_prop_outcome_history", "Stat": "stat_prop_outcome_history" };
      const arr = this.selected_sort_by.code.split("-");
      const sort_key = arr[0];
      const over_under = sort_key === 'O' ? 'over' : 'under';
      if (this.selected_sort_by.code === "O-Odds") {
        data = data.sort((a, b) => this.sort_by_ascending ?  (b.prop.over_odds - a.prop.over_odds) : (a.prop.over_odds - b.prop.over_odds));
      } else if (this.selected_sort_by.code === "U-Odds") {
        data = data.sort((a, b) => this.sort_by_ascending ?  (b.prop.under_odds - a.prop.under_odds) : (a.prop.under_odds - b.prop.under_odds));
      } else if (sort_key !== 'P') {
        const table = table_keys[arr[1]];
        const history_key = arr[arr.length-1];
        data = data.sort((a, b) => {
          const a_val = a[table][over_under] ? a[table][over_under][ou_keys[history_key]] : 0;
          const b_val = b[table][over_under] ? b[table][over_under][ou_keys[history_key]] : 0;
          return this.sort_by_ascending ? (b_val - a_val) : (a_val - b_val);
        });
      };
      return data;
    },
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
        this.filtered_data = this.my_data.filter(x => x.bet_name===this.selected_bet);
      };
      this.filtered_data = this.sort_by(this.filtered_data);
    }
  }
}
</script>

<style scoped>
.container {
  width: 80vw;
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
