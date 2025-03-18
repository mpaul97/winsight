<script setup>
import dummy_player_data from "../assets/dummy_data/dummy_player_data.json";
import { CONSTANTS } from "@/assets/constants";

import { toRaw, reactive } from "vue";
import { useRouter } from "vue-router";

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const router = useRouter();
const handle_return_home = () => {
  router.push({ path: '/' });
};
</script>

<template>
  <main>
    <button @click="handle_return_home()">Return Home</button>
    <div class="container">
      <DataTable
        :value="data['current_season_reg']"
        tableStyle="min-width: 50rem"
        :size="'small'"
        showGridlines
        stripedRows
      >
        <Column field="GAME_DATE" header="Date" sortable></Column>
        <Column field="MATCHUP" header="Matchup"></Column>
        <Column field="WL" header="WL"></Column>
        <Column field="MIN" header="Min" sortable></Column>
        <Column field="FGM" header="FGM" sortable></Column>
        <Column field="FGA" header="FGA" sortable></Column>
        <Column field="FG_PCT" header="FG%" sortable></Column>
        <Column field="FG3M" header="FG3M" sortable></Column>
        <Column field="FG3A" header="FG3A" sortable></Column>
        <Column field="FG3_PCT" header="FG3%" sortable></Column>
        <Column field="FTM" header="FTM" sortable></Column>
        <Column field="FTA" header="FTA" sortable></Column>
        <Column field="FT_PCT" header="FT%" sortable></Column>
        <Column field="OREB" header="OREB" sortable></Column>
        <Column field="DREB" header="DREB" sortable></Column>
        <Column field="REB" header="REB" sortable></Column>
        <Column field="AST" header="AST" sortable></Column>
      </DataTable>
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
            row[CONSTANTS.GAMELOG_HEADERS[j]] = vals[i][j];
          };
          this.data[key].push(row);
        }
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
</style>
