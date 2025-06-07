<script setup>
import { Panel } from 'primevue';
import { CONSTANTS } from '@/assets/constants';
import LastNGamesChart from './LastNGamesChart.vue';
import SameGamePropsChart from './SameGamePropsChart.vue';
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
    <!-- <p>{{ JSON.stringify(item.user_option) }}</p> -->
    <Panel
      :toggleable="true"
      class="flex-column min-w-[50%]"
      style="width: 60vw;"
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
          <div style="display: flex; flex-direction: column; gap: 2rem; padding-top: 2rem; padding-bottom: 2rem;">
            <div class="w-full h-[20rem]">
              <LastNGamesChart :item="item.data" :size="10" />
            </div>
            <div class="w-full h-[20rem]">
              <SameGamePropsChart :item="item.data" />
            </div>
          </div>
          <!-- SINGLE STAT -->
          <div class="table" v-if="stats.length === 1" style="display: flex; justify-content: center;">
            <div style="width: 100%; text-align: center;">
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
          <div class="table" v-else style="width: 100%; display: flex; justify-content: center; flex-wrap: wrap; gap: 2rem;">
            <div style="width: 100%; min-width: 12rem; text-align: center;">
              <h3 class="table-header">{{ item.data.bet_name }}</h3>
              <div v-for="val in avg_and_rank_table_data_keys">
                <div class="table-row">
                  <p>{{ val.display_name }}</p>
                  <p>{{ avg_and_rank_table_data[val.key]['total'] }}</p>
                </div>
              </div>
            </div>
            <!-- <div style="width: 25%; min-width: 12rem; text-align: center;" v-for="s in stats">
              <h3 class="table-header">{{ s }}</h3>
              <div v-for="val in avg_and_rank_table_data_keys">
                <div class="table-row">
                  <p>{{ val.display_name }}</p>
                  <p>{{ avg_and_rank_table_data[val.key][s] }}</p>
                </div>
              </div>
            </div> -->
          </div>
          <div class="h-[2rem]"></div>
          <div style="width: 100%; display: inline-flex; justify-content: space-between">
            <div class="history-table" style="width: 50%;">
              <h2 class="history-header">Player Prop Outcome History</h2>
              <p style="color: var(--my-primary-color)">{{ player_prop_outcome_history.outcome }}</p>
              <p>Times hit when bet tracked:<span>{{ player_prop_outcome_history.count }}</span></p>
              <p>Total times bet type logged:<span>{{ player_prop_outcome_history.group_total }}</span></p>
              <p>Hit percent:<span>{{ player_prop_outcome_history.proportion }}%</span></p>
              <p>Weighted proportion:<span>{{ player_prop_outcome_history.weighted_proportion }}%</span></p>
              <p>Min weighted proportion:<span>{{ player_prop_outcome_history.min_weighted_proportion }}%</span></p>
              <p>Max weighted proportion:<span>{{ player_prop_outcome_history.max_weighted_proportion }}%</span></p>
              <p>Rank:<span>{{ player_prop_outcome_history.rank }}</span></p>
              <p>Max rank:<span>{{ player_prop_outcome_history.max_rank }}</span></p>
            </div>
            <div class="history-table" style="width: 50%;">
              <h2 class="history-header">Player Prop Outcome History</h2>
              <p style="color: var(--my-primary-color)">{{ stat_prop_outcome_history.outcome }}</p>
              <p>Times hit when bet tracked:<span>{{ stat_prop_outcome_history.count }}</span></p>
              <p>Total times bet type logged:<span>{{ stat_prop_outcome_history.group_total }}</span></p>
              <p>Hit percent:<span>{{ stat_prop_outcome_history.proportion }}%</span></p>
              <p>Weighted proportion:<span>{{ stat_prop_outcome_history.weighted_proportion }}%</span></p>
              <p>Min weighted proportion:<span>{{ stat_prop_outcome_history.min_weighted_proportion }}%</span></p>
              <p>Max weighted proportion:<span>{{ stat_prop_outcome_history.max_weighted_proportion }}%</span></p>
              <p>Rank:<span>{{ stat_prop_outcome_history.rank }}</span></p>
              <p>Max rank:<span>{{ stat_prop_outcome_history.max_rank }}</span></p>
            </div>
          </div>
        </div>
        <div>
          <p v-for="key in Object.keys(item.data.predictions)">
            {{ key }}{{ item.data.predictions[key] }}
          </p>
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
      avg_and_rank_table_data: this.item.data.avg_and_rank_table_data,
      player_prop_outcome_history: this.item.data.player_prop_outcome_history.filter(x => x.outcome = this.item.user_option.toUpperCase())[0],
      stat_prop_outcome_history: this.item.data.stat_prop_outcome_history.filter(x => x.outcome = this.item.user_option.toUpperCase())[0]
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
  border: 1px solid rgba(0, 189, 126, 0.3);
}
.table-row {
  display: flex;
  justify-content: space-between;
  padding: 0.15rem 0.3rem;
  border: 1px solid var(--color-border);
  border-top: none;
}
.table {
  border: 1px solid rgba(0, 189, 126, 0.6);
}
.history-header {
  font-weight: 700;
  border: 1px solid rgba(0, 189, 126, 0.3);
  padding: 0.2rem 0.3rem;
}
.history-table {
  border: 1px solid rgba(0, 189, 126, 0.6);
}
.history-table > p {
  display: flex;
  justify-content: space-between;
  padding: 0.15rem 0.3rem;
  border: 1px solid var(--color-border);
  border-top: none;
}
.history-table.stats > p {
  border-left: none;
  border-right: none;
}
</style>
