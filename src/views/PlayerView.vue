<script setup>
import dummy_player_data from "../assets/dummy_data/dummy_player_data.json";
import { CONSTANTS } from "@/assets/constants";

import { toRaw, reactive, ref } from "vue";
import { useRouter } from "vue-router";

import { Divider, Button, Checkbox, Slider  } from "primevue";

import MyPlayerDataTable from "@/components/MyPlayerDataTable.vue";

import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const router = useRouter();
const handle_return_home = () => {
  router.push({ path: '/' });
};

const PLAYER_TABLES = [
  { key: 'current_season_reg', title: 'Regular Season Games' },
  { key: 'current_season_po', title: 'Playoff Games' },
  { key: 'last_season_reg', title: 'Last Season Games' },
  { key: 'last_season_po', title: 'Last Season Playoff Games' }
];

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
                <Checkbox v-model="selectedCategories" :inputId="column" name="category" :value="column" size="small" />
                <label :for="column">{{ column }}</label>
              </div>
            </div>
            <div class="card flex justify-center date-range-slider">
                <Slider v-model="value" inputId="date-range-slider" />
                <label for="date-range-slider">Date</label>
            </div>
            <div class="graphics-option-buttons">
              <Button label="Update" />
              <Button label="Clear" severity="secondary" />
            </div>
          </div>
          <div class="chart-container">
            <Bar
              :options="{
                responsive: true,
                maintainAspectRatio: true
              }"
              :data="{
                labels: data[table.key].map(x => x['GAME_DATE'].toLocaleDateString()),
                datasets: [
                  {
                    label: table.title,
                    backgroundColor: '#669bbc',
                    data: data[table.key].map(x => x['PTS'])
                  },
                  {
                    label: table.title,
                    backgroundColor: 'red',
                    data: data[table.key].map(x => x['AST'])
                  },
                ],
              }"
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
const value = ref(null);
export default {
  name: 'MyPlayer',
  data() {
    return {
      raw_data: dummy_player_data,
      data: {},
      loading: true
    }
  },
  mounted() {
    this.init_data();
  },
  methods: {
    init_data() {
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
      if (this.data) {
        this.loading = false;
      };
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
  gap: 1rem;
}
.checkbox {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.9rem;
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
  gap: 0.5rem;
}
.date-range-slider {
  width: 50%;
  /* border: 1px solid lightblue; */
}
</style>
