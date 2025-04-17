<script setup>
import dummy_player_data from "../assets/dummy_data/dummy_player_data.json";
import dummy_bets_info_response from "../assets/dummy_data/dummy_bets_info_response.json"
import { Message, Card } from "primevue";
import MyLineChart from "./MyLineChart.vue";
defineProps({
  player: Object,
  bet_type: Object,
  number_value: Number,
  stat: Object,
  bet_data: Object
})
</script>

<template>
  <main>
    <div class="container">
      <Card class="card">
        <template #title>
          <h2>
            {{ player.full_name }}
            <span style="font-weight: bold;">{{ bet_type.name.toUpperCase() }}</span>
            {{ number_value }}
            <span style="font-style: italic;">{{ stat.code }}</span>
          </h2>
          <div class="h-[1rem]"></div>
        </template>
        <template #content>
          <div class="content">
            <!-- <p>{{ bet_data }}</p> -->
            <Message severity="">
              {{ player.full_name }} was
              {{ bet_type.name.toUpperCase() }}
              {{ number_value }}
              {{ stat.code }} on
              <span class="heat-number" :style="`color: ${get_color(bet_data.hit_last_5_games/5)}`">{{ bet_data.hit_last_5_games }}/5</span> in recent games
            </Message>
            <Message severity="">
              {{ player.full_name }} was
              {{ bet_type.name.toUpperCase() }}
              {{ number_value }}
              {{ stat.code }} on
              <span class="heat-number" :style="`color: ${get_color(bet_data.hit_last_10_games/10)}`">{{ bet_data.hit_last_10_games }}/10</span> in recent games
            </Message>
            <Message severity="">
              {{ player.full_name }} was
              {{ bet_type.name.toUpperCase() }}
              {{ number_value }}
              {{ stat.code }} on
              <span class="heat-number" :style="`color: ${get_color(bet_data.hit_last_20_games/20)}`">{{ bet_data.hit_last_20_games }}/20</span> in recent games
            </Message>
            <Message severity="">
              {{ player.full_name }} SEASON AVERAGE {{ stat.code }} is
              <span class="heat-number" :style="`color: ${get_color(bet_data.season_avg/number_value)}`">{{ bet_data.season_avg }}</span>
            </Message>
            <Message severity="">
              {{ player.full_name }} CAREER AVERAGE {{ stat.code }} is
              <span class="heat-number" :style="`color: ${get_color(bet_data.career_avg/number_value)}`">{{ bet_data.career_avg }}</span>
            </Message>
          </div>
          <div class="h-[2rem]"></div>
          <MyLineChart
            :title="stat.name"
            :labels="bet_data.last_10_stats.labels"
            :my-data="bet_data.last_10_stats.data"
          />
        </template>
      </Card>
    </div>
  </main>
</template>

<script>
export default {
  name: 'BetsInfo',
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    get_color(ratio) {
      var g = Math.floor(255*ratio);
      var r = Math.floor(255-g);
      return `rgba(${r}, ${g}, 50, 1)`;
    }
  }
}
</script>

<style scoped>
.container {
  width: 80rem;
  display: flex;
  justify-content: center;
}
.card {
  width: 50%;
  background-color: var(--color-background-mute) !important;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid var(--color-border);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px !important;
  text-align: center;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
}
.heat-number {
  border-radius: 0.2rem;
  font-weight: 700;
  display: inline-flex;
  justify-content: center;
  text-align: center;
  align-items: center;
}
.p-message {
  background-color: var(--color-background);
  padding: 0.2rem 0.5rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
