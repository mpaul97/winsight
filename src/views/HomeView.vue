<script setup>
import dummy_all_player_props_nba from '@/assets/dummy_data/props/nba_props.json';
import MyLogo from '@/components/MyLogo.vue';
import PropCards from '@/components/PropCards.vue';
import { SelectButton, SpeedDial, Menubar } from 'primevue';
import { ref } from 'vue';
import state, { update_league } from '@/store';
import parse_custom_date from '@/scripts/custom_dates';
import { RouterLink } from 'vue-router';

const menu = ref(true);
const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <div class="container">
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
        :badge="is_bet_items_empty ? undefined : String(bet_items.length-1)"
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
        </template>
        <template v-if="!is_bet_items_empty" #item="{ item, props }">
          <div class="flex justify-between pt-2 pb-2">
            <Button
              severity="secondary"
              icon="pi pi-times"
              style="background: none; border: none; width: 8%"
              @click="remove_bet_item(item)"
            />
            <div class="menu-item w-full px-2">
              <div class="flex justify-between">
                <span>{{ item.bet.player_name }} <span style="font-size: 0.7rem; color: var(--color-text)">{{ item.bet.team_abbr }}</span></span>
                <span>{{ item.user_option === 'over' ? item.bet.over_odds : item.bet.under_odds }}</span>
              </div>
              <span style="font-size: 0.8rem; color: var(--color-text)">
                <span style="text-transform: capitalize;">{{ item.user_option }}</span>
                {{ item.bet.line_value }}
                {{ item.bet.bet }}
              </span>
            </div>
          </div>
        </template>
        <template v-else #item="{ item, props }"> <!--Fallback for no bets added-->
          <div class="menu-item">
            <span class="flex justify-center p-1 pt-2">{{ item.bet.player_name }}</span>
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
              :disabled="is_bet_items_empty"
            />
          </RouterLink>
        </template>
      </Menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      raw_data: dummy_all_player_props_nba,
      my_data: [],
      filtered_data: [],
      selected_bet: 'All',
      bet_options: ['All'],
      bet_items: [{ separator: true }, { bet: { player_name: "No Bets Added" } }],
      is_bet_items_empty: true
    }
  },
  mounted() {
    // Reactively update my_data using array assignment
    this.my_data = this.raw_data.map((vals, i) => {
      const processed = { ...vals };
      processed.date = parse_custom_date(vals.bovada_date);
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
      return processed;
    });
    this.my_data.sort((a, b) => {return new Date(b.date) - new Date(a.date)});
    this.my_data = this.my_data.filter(x => x.date.toLocaleDateString() === new Date().toLocaleDateString());
    this.set_filtered_data();
  },
  methods: {
    add_bet_item(event) {
      if (this.is_bet_items_empty) {
        this.bet_items.pop();
        this.is_bet_items_empty = false;
      }
      this.bet_items.push({ id: this.bet_items.length, bet: event.submitted_bet, user_option: event.option});
      localStorage.setItem('betSlipData', JSON.stringify(this.bet_items));
    },
    remove_bet_item(item) {
      this.bet_items = this.bet_items.filter(x => x.id !== item.id);
      if (this.bet_items.length === 1) {
        this.bet_items.push({ bet: { player_name: "No Bets Added" } });
        this.is_bet_items_empty = true;
      }
    },
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
