<script setup>
import dummy_player_data from "../assets/dummy_data/dummy_player_data.json";
import { CONSTANTS } from "@/assets/constants";

import { toRaw, reactive, ref } from "vue";
import { useRouter } from "vue-router";

import { Divider, Button, Checkbox, Slider  } from "primevue";

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
                  v-model="chart_stats[table.key]"
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
            <div class="card flex justify-center date-range-slider">
              <Slider v-model="slider_value" inputId="date-range-slider" />
              <label for="date-range-slider">Date</label>
            </div>
            <div class="graphics-option-buttons">
              <Button label="Update" />
              <Button label="Reset" severity="secondary" @click="reset_chart_stats(table.key)" />
              <p :style="'padding: 0 0.2rem'">{{ chart_stats[table.key].length }} selected</p>
            </div>
          </div>
          <div class="chart-container">
            <MyBarChart
              :data="data[table.key]"
              :chart_stats="chart_stats[table.key]"
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
const slider_value = ref(null);
console.log(slider_value)
export default {
  name: 'MyPlayer',
  data() {
    return {
      raw_data: dummy_player_data,
      data: {},
      loading: true,
      chart_stats: {}
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
              vals[i][j] = new Date(vals[i][j]);
            }
            row[header] = vals[i][j];
          };
          this.data[key].push(row);
        }
      };
      // show table after data done loading
      if (this.data) {
        this.loading = false;
      };
      // chart_stats
      PLAYER_TABLES.map(x => {
        this.chart_stats[x.key] = ['PTS'];
      });
    },
    reset_chart_stats(table_key) {
      this.chart_stats[table_key] = ['PTS'];
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
}
.table-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 2rem;
}
.graphics-container {
  width: 100%;
  height: 35rem;
  display: flex;
  flex-direction: row;
  padding: 0 1rem;
}
.options-container {
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
}
.option-checkboxes-container {
  display: flex;
  height: 50%;
  flex-direction: column;
  flex-wrap: wrap;
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
  align-items: center;
}
.graphics-option-buttons {
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
}
.date-range-slider {
  width: 50%;
  /* border: 1px solid lightblue; */
}
</style>
