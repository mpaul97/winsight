<script setup>
import dummy_player_data from "../assets/dummy_data/dummy_player_data.json";
import { CONSTANTS } from "@/assets/constants";

import { toRaw, reactive, ref } from "vue";
import { useRouter } from "vue-router";

import {
  Divider, Button, Checkbox, Slider,
  DatePicker
} from "primevue";

import MyPlayerSearch from "@/components/MyPlayerSearch.vue";
import MyPlayerDataTable from "@/components/MyPlayerDataTable.vue";
import MyBarChart from "@/components/MyBarChart.vue";

const router = useRouter();
const handle_return_home = () => {
  router.push({ path: '/' });
};
</script>

<template>
  <main>
    <button @click="handle_return_home()">Return Home</button>
    <MyPlayerSearch />
    <div
      class="container"
      v-if="!loading"
      v-for="table in PLAYER_TABLES"
    >
      <div
        class="table-container"
        v-if="data[table.key].length!==0"
      >
        <MyPlayerDataTable
          :title="table.title"
          :my-data="data[table.key]"
        />
        <div class="graphics-container">
          <div class="options-container">
            <div class="option-checkboxes-container">
              <div v-for="column in CONSTANTS.GAMELOG_STATS" :key="column" class="flex items-center gap-2 checkbox">
                <Checkbox
                  v-model="chart_options[table.key]['stats']"
                  :inputId="column"
                  name="chart_stat"
                  :value="column"
                  size="small"
                />
                <label v-if="column.includes('PCT')" :for="column">{{ column.replace('_PCT', '%') }}</label>
                <label v-else-if="column==='PLUS_MINUS'" :for="column">+/-</label>
                <label v-else :for="column">{{ column }}</label>
              </div>
            </div>
            <div class="card flex justify-center slider-container">
              <label :for="`${table.key}-slider`">Showing past {{ chart_options[table.key]['num_games'] }} games</label>
              <Slider
                :inputId="`${table.key}-slider`"
                v-model="chart_options[table.key]['num_games']"
                class="games-slider"
                :min="3"
                :max="data[table.key].length"
              />
            </div>
            <div class="graphics-option-buttons">
              <Button label="Reset" severity="secondary" @click="reset_chart_options(table.key)" />
              <p :style="'padding: 0 0.2rem'">{{ chart_options[table.key]['stats'].length }} stat selected</p>
            </div>
          </div>
          <div class="chart-container">
            <MyBarChart
              :data="data[table.key]"
              :chart_stats="chart_options[table.key]['stats']"
              :num_games="chart_options[table.key]['num_games']"
            />
          </div>
        </div>
      </div>
      <h3 v-else>
        No {{ table.title }} available
      </h3>
      <Divider />
    </div>
  </main>
</template>

<script>
const BASE_URL = import.meta.env.VITE_BASE_URL;
const PLAYER_TABLES = [
  { key: 'current_season_reg', title: 'Regular Season Games' },
  { key: 'current_season_po', title: 'Playoff Games' },
  { key: 'last_season_reg', title: 'Last Season Games' },
  { key: 'last_season_po', title: 'Last Season Playoff Games' }
];
export default {
  name: 'PlayerAnalysis',
  data() {
    return {
      raw_data: dummy_player_data,
      data: {},
      loading: true,
      chart_options: {}
    }
  },
  mounted() {
    this.init_data();
  },
  methods: {
    init_data() {
      // map data to object
      for (var key in this.raw_data) {
        this.data[key] = []
        const vals = toRaw(this.raw_data[key]['resultSets'][0]['rowSet']);
        for (var i = 0; i < vals.length; i++) {
          var row = {};
          for (var j = 0; j < vals[i].length; j++) {
            var header = CONSTANTS.GAMELOG_HEADERS[j];
            if (header === 'GAME_DATE') {
              row[header] = new Date(vals[i][j]);
            } else if (header.includes('PCT')) {
              row[header] = this.round(vals[i][j]*100, 10);
            } else {
              row[header] = vals[i][j];
            }
          };
          this.data[key].push(row);
        }
      };
      // show table after data done loading
      if (this.data) {
        this.loading = false;
        // chart_options
        PLAYER_TABLES.map(x => {
          this.chart_options[x.key] = {
            stats: ['PTS'],
            num_games: ref(3)
          };
        });
      };
    },
    reset_chart_options(table_key) {
      this.chart_options[table_key]['stats'] = ['PTS'];
      this.chart_options[table_key]['num_games'] = ref(3);
    },
    round(num, places) {
      var multiplier = Math.pow(10, places);
      return Math.round(num*multiplier)/multiplier;
  }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  gap: 2rem;
  padding: 3rem;
  padding-bottom: 0;
  overflow-x: hidden;
}
.table-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 2rem;
}
.graphics-container {
  width: 75%;
  height: 30rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 1rem;
}
.options-container {
  width: 30%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 2rem;
}
.option-checkboxes-container {
  display: flex;
  height: 50%;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.2rem;
}
.checkbox {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.3rem;
}
.chart-container {
  width: 70%;
  display: flex;
  align-items: flex-start;
}
.graphics-option-buttons {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
}
.slider-container {
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  padding-top: 0;
}
.games-slider {
  width: 100%;
}
@media (max-width: 1280px) {
  .graphics-container {
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .options-container {
    height: 22rem;
  }
  .option-checkboxes-container {
    height: 10rem;
  }
  .chart-container {
    height: 25rem;
  }
  .graphics-option-buttons {
    justify-content: center;
  }
  .slider-container {
    width: 100%;
    justify-content: center;
  }
}
@media (max-width: 700px) {
  main {
    overflow-x: auto !important;
  }
}
</style>
