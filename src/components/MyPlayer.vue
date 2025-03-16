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
const DISPLAYED_GAMELOG_HEADERS = CONSTANTS.GAMELOG_HEADERS.filter(x => !CONSTANTS.HIDDEN_GAMELOG_HEADERS.includes(x));
</script>

<template>
  <main>
    <button @click="handle_return_home()">Return Home</button>
    <div class="container">
      <DataTable :value="data['current_season_reg']" tableStyle="min-width: 50rem">
        <Column field="GAME_DATE" header="Date" sortable></Column>
        <Column field="MATCHUP" header="Matchup"></Column>
        <!-- <Column field="name" header="Name" sortable style="width: 25%"></Column>
        <Column field="category" header="Category" sortable style="width: 25%"></Column>
        <Column field="quantity" header="Quantity" sortable style="width: 25%"></Column> -->
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
table {
  border: 1px solid var(--color-border);
  text-align: left;
  border-collapse: collapse;
}
th {
  border: 1px solid var(--color-border);
  padding: 0.5rem;
  background-color: var(--color-background-mute);
}
th:hover {
  background-color: var(--color-border-hover);
  cursor: pointer;
}
td {
  border: 1px solid var(--color-border);
  padding: 0.3rem;
}
</style>
