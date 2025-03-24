<script setup>
import dummy_player_data from "../assets/dummy_data/dummy_player_data.json";
import { CONSTANTS } from "@/assets/constants";

import { toRaw, reactive } from "vue";
import { useRouter } from "vue-router";

import { Divider, Button, Checkbox  } from "primevue";

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
        <div class="chart-container">
          <div class="chart-options">
            <div class="ch-checkboxes">
              <div v-for="column in CONSTANTS.GAMELOG_STATS" :key="column" class="chart-checkboxs">
                <Checkbox v-model="selectedCategories" :inputId="column" name="category" :value="column" />
                <label :for="column">{{ column }}</label>
              </div>
            </div>
            <div class="chart-option-buttons">
              <Button label="Update" class="my-button" />
            </div>
          </div>
          <div class="bar-chart-container">
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
export default {
  name: 'MyPlayer',
  data() {
    return {
      raw_data: dummy_player_data,
      data: {},
      loading: true,
      chart_data: {}
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
.chart-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}
.chart-options {
  width: 30%;
  height: 20rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
  align-items: start;
}
.ch-checkboxes {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
  align-items: start;
}
.chart-checkbox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
}
.bar-chart-container {
  width: 70%;
  display: flex;
  align-items: center;
  padding: 2rem;
}
.chart-option-buttons {
  height: 100%;
}
.my-button {
  background-color: var(--my-primary-color);
  border-color: var(--my-primary-color);
  color: var(--color-heading);
}
</style>
