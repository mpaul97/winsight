<script setup>
import { Panel } from 'primevue';
import { CONSTANTS } from '@/assets/constants';
import Last10GamesLineChart from './Last10GamesLineChart.vue';
import SameGamePropsLineChart from './SameGamePropsLineChart.vue';
defineProps({
  item: Object
})
const avg_and_rank_table_data_keys = [
  { key: 'season_avg', display_name: 'Season Average' },
  { key: 'career_avg', display_name: 'Career Average' },
  { key: 'season_avg_post', display_name: 'Playoffs Season Average' },
  { key: 'career_avg_post', display_name: 'Playoffs Career Average' },
  { key: 'season_rank', display_name: 'Season Rank' },
  { key: 'season_rank_post', display_name: 'Playoffs Season Rank' }
];
</script>

<template>
  <main>
    <p>{{ JSON.stringify(item) }}</p>
    <Panel
      :toggleable="true"
      class="w-[70%] flex-column"
      style="min-width: 80vw;"
    >
      <template #header>
        <div class="flex justify-between gap-1" style="font-weight: 600; font-size: 1.3rem;">
          {{ item.data.prop.player_name }} -
          <span style="text-transform: capitalize; font-style: italic;">{{ item.user_option }}</span>
          <span style="font-weight: 700; color: var(--my-primary-color)">{{ item.data.prop.line_value }}</span>
          {{ item.data.bet_name }}
        </div>
      </template>
      <div style="display: flex; flex-direction: column; gap: 1rem; padding-bottom: 1rem;">
        <div class="flex-column">
          <h4>{{ item.data.date.toLocaleString() }}</h4>
          <h4>
            <span style="font-weight: 600;">Odds: </span>
            {{ `${get_sign(prop_odds)}${prop_odds}` }}
          </h4>
        </div>
        <div class="flex-row">
          <!-- SINGLE STAT -->
          <div v-if="stats.length === 1" style="display: flex; justify-content: center;">
            <div style="width: 50%; text-align: center;">
              <h3 class="table-header">{{ item.data.bet_name }}</h3>
              <div v-for="val in avg_and_rank_table_data_keys">
                <div class="table-row">
                  <p>{{ val.display_name }}</p>
                  <p>{{ avg_and_rank_table_data[val.key][stats[0]] }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- MULTIPLE STATS -->
          <div v-else style="width: 100%; display: flex; justify-content: center; flex-wrap: wrap; gap: 2rem;">
            <div style="width: 25%; min-width: 12rem; text-align: center;">
              <h3 class="table-header">{{ item.data.bet_name }}</h3>
              <div v-for="val in avg_and_rank_table_data_keys">
                <div class="table-row">
                  <p>{{ val.display_name }}</p>
                  <p>{{ avg_and_rank_table_data[val.key]['total'] }}</p>
                </div>
              </div>
            </div>
            <div style="width: 25%; min-width: 12rem; text-align: center;" v-for="s in stats">
              <h3 class="table-header">{{ s }}</h3>
              <div v-for="val in avg_and_rank_table_data_keys">
                <div class="table-row">
                  <p>{{ val.display_name }}</p>
                  <p>{{ avg_and_rank_table_data[val.key][s] }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full h-[20rem] pt-4">
            <Last10GamesLineChart :my_data="item.data" />
          </div>
          <div class="w-full h-[20rem] pt-4">
            <SameGamePropsLineChart :my_data="item.data" />
          </div>
        </div>
      </div>
    </Panel>
  </main>
</template>

<script>
export default {
  data() {
    return {
      prop_odds: this.item.user_option === 'over' ? this.item.data.prop.over_odds : this.item.data.prop.under_odds,
      stats: CONSTANTS.BOVADA_PROP_STAT_MAPPINGS[this.item.data.prop.stat],
      avg_and_rank_table_data: this.item.data.avg_and_rank_table_data
    }
  },
  methods: {
    get_sign(val) {
      return val < 0 ? '' : '+'
    }
  }
}
</script>

<style scoped>
.table-header {
  padding: 0.3rem;
  font-weight: 700;
  border: 2px solid rgba(0, 189, 126, 0.3);
}
.table-row {
  display: flex;
  justify-content: space-between;
  padding: 0.15rem 0.3rem;
  border: 1px solid var(--color-border);
  border-top: none;
}
</style>
