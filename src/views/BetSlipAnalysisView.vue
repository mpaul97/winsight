<script setup>
import dummy_bet_slip_submit_data from '@/assets/dummy_data/dummy_bet_slip_submit_data.json';
import dummy_bets_info_response from '@/assets/dummy_data/dummy_bets_info_response.json';
import parse_custom_date from '@/scripts/custom_dates';
import { Fieldset, Message, Panel, Divider } from 'primevue';
import { CONSTANTS } from '@/assets/constants';
import MyLineChart from '@/components/MyLineChart.vue';
</script>

<template>
  <main class="w-full flex gap-4">
    <Panel
      v-for="item in data"
      :toggleable="true"
      class="w-[70%] flex-column"
    >
      <template #header>
        <div class="flex justify-between gap-1" style="font-weight: 600;">
          {{ item.bet.player_name }} -
            <span style="text-transform: capitalize; font-style: italic;">{{ item.user_option }}</span>
            <span style="font-weight: 700; color: var(--my-primary-color)">{{ item.bet.line_value }}</span>
            {{ item.bet.bet }}
        </div>
      </template>
      <div style="display: flex; flex-direction: column; gap: 1rem; padding-bottom: 1rem;">
        <div class="flex-column">
          <h4>{{ item.bet_info.last_10_stats[0]['MATCHUP'] }}</h4>
          <h4>{{ parse_custom_date(item.bet.bovada_date).toLocaleString() }}</h4>
          <h4>Odds: {{ item.user_option === 'over' ? item.bet.over_odds : item.bet.under_odds }}</h4>
        </div>
        <!-- <p>{{ JSON.stringify(item.bet) }}</p> -->
        <!-- <p>{{ JSON.stringify(item.bet_info) }}</p> -->
        <Message severity="">
          {{ item.bet.player_name }} was
          <span style="font-style: italic">{{ item.user_option }}</span>
          {{ item.bet.line_value }}
          {{ item.bet.bet }} in
          {{ item.bet_info.hit_last_5_games }}/5 past games
        </Message>
        <Message severity="">
          {{ item.bet.player_name }} was
          <span style="font-style: italic">{{ item.user_option }}</span>
          {{ item.bet.line_value }}
          {{ item.bet.bet }} in
          {{ item.bet_info.hit_last_10_games }}/10 past games
        </Message>
        <Message severity="">
          {{ item.bet.player_name }} was
          <span style="font-style: italic">{{ item.user_option }}</span>
          {{ item.bet.line_value }}
          {{ item.bet.bet }} in
          {{ item.bet_info.hit_last_20_games }}/20 past games
        </Message>
        <div>
          <Divider />
          <div
            style="
              display: flex;
              min-height: 10rem;
              justify-content: center;
              align-items: center;
              flex-wrap: wrap;
              gap: 1rem;
              width: 100%;
            "
            >
            <Message
              severity=""
              v-for="
                values in [
                  { key: 'Regular Season Average', data: item.bet_info.season_avg },
                  { key: 'Playoff Average', data: item.bet_info.season_avg_post },
                  { key: 'Career Average', data: item.bet_info.career_avg },
                  { key: 'Playoff Career Average', data: item.bet_info.career_avg_post },
                ]
              "
              style="width: calc(25% - 1rem); min-width: 14rem; min-height: 8rem; display: flex; justify-content: center;"
            >
              <div class="w-[100%] flex-column" style="display: flex; flex-direction: column; align-items: center;">
                <p style="font-weight: 600; padding-bottom: 0.5rem; color: var(--my-primary-color); text-decoration: underline;">{{ values.key }}</p>
                <p><span style="font-weight: 600;">{{ item.shorthand_stats.join(" + ") }}:</span> {{ values.data['total_average_per_game'] }}</p>
                <p v-for="stat in Object.entries(values.data).slice(1)">
                  <span style="font-weight: 600;">{{ stat[0].split("_")[0] }}:</span> {{ stat[1] }}
                </p>
              </div>
            </Message>
          </div>
        </div>
        <Divider />
        <div style="height: 20rem; min-height: 100%;">
          <MyLineChart :my_data="item"/>
        </div>
      </div>
    </Panel>
  </main>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      bets_info_data: [],
      loading: true
    }
  },
  mounted() {
    this.data = dummy_bet_slip_submit_data.filter(x => x['id']);
    if (this.data) {
      this.bets_info_data = dummy_bets_info_response;
      this.data = this.data.map((vals, i) => {
        const processed = { ...vals };
        processed.bet_info = this.bets_info_data.filter(x => x['primary_key']===processed.bet.primary_key)[0];
        processed.shorthand_stats = Object.entries(processed.bet_info.last_10_stats[0]).filter(x => CONSTANTS.GAMELOG_STATS.includes(x[0]) && x[0] !== 'MIN').map(x => x[0]);
        return processed;
      });
    }
  }
}
</script>
