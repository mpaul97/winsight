<script setup>
import dummy_all_player_props_nba from "../assets/dummy_data/props/all_player_props_nba.json"
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from '@primevue/core/api';
defineProps({
  title: String,
  player_id: Number | undefined,
  target_date: Date | undefined
})
</script>

<template>
  <main>
    <!-- <p>{{ JSON.stringify(my_data[0]) }}</p> -->
    <DataTable
      dataKey="key"
      :value="my_data"
      tableStyle="font-size: 0.8rem; width: 100%"
      showGridlines
      stripedRows
      rowHover
      sortField="bovada_date"
      :sort-order="-1"
      paginator
      :rows="10"
      v-model:filters="filters"
      filterDisplay="row"
      :loading="loading"
      :globalFilterFields="['bet']"
      v-model:selection="selected_item"
      selectionMode="single"
      @row-select="$emit('rowSelect', selected_item)"
      :metaKeySelection="meta_key"
      :style="'width: 100%'"
    >
      <template #header>
        <h3 :style="'display: flex; font-weight: 500; font-size: 1rem'">
          {{ title }}
        </h3>
      </template>
      <template #empty> No {{ title }} found. </template>
      <template #loading> Loading bets data. Please wait. </template>
      <Column field="bovada_date" header="Date" :showFilterMenu="false" style="width: 6%" sortable>
          <template #body="{ data }">
            <span>{{ data.date.toLocaleDateString() }}</span>
          </template>
      </Column>
      <Column v-if="player_id" field="player_name" header="Player" :showFilterMenu="false" style="width: 15%" />
      <Column v-else field="player_name" header="Player" :showFilterMenu="false" style="width: 15%">
          <template #body="{ data }">
            <span>{{ data.player_name }}</span>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Select
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="filter_options.player_names"
              placeholder="Select Player"
              :showClear="true"
              size="small"
            >
              <template #option="slotProps">
                <span>{{ slotProps.option }}</span>
              </template>
            </Select>
          </template>
      </Column>
      <Column field="team_abbr" header="Team" :showFilterMenu="false" style="width: 15%">
          <template #body="{ data }">
            <span>{{ data.team_abbr }}</span>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Select
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="filter_options.team_abbrs"
              placeholder="Select Team"
              :showClear="true"
              size="small"
            >
              <template #option="slotProps">
                <span>{{ slotProps.option }}</span>
              </template>
            </Select>
          </template>
      </Column>
      <Column field="bet" header="Bet" :showFilterMenu="false" style="width: 15%">
          <template #body="{ data }">
            <span>{{ data.bet }}</span>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Select
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="filter_options.bets"
              placeholder="Select Bet"
              :showClear="true"
              size="small"
            >
              <template #option="slotProps">
                <span>{{ slotProps.option }}</span>
              </template>
            </Select>
          </template>
      </Column>
      <Column field="line_value" header="Line" style="width: 10%" sortable/>
      <Column field="over_odds" header="Over Odds" style="width: 10%" sortable/>
      <Column field="under_odds" header="Under Odds" style="width: 10%" sortable/>
      <!-- <template #footer>
        <div class="card flex gap-3">
          <Button type="submit" severity="primary" label="Analyze" />
          <p
            v-if="selected_item.player_name"
            :style="'height: 2.5rem; display: flex; justify-content: center; align-items: center;'"
          >
            {{ selected_item.player_name }} - {{ selected_item.bet }}
          </p>
        </div>
      </template> -->
    </DataTable>
  </main>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      raw_data: dummy_all_player_props_nba,
      my_data: [],
      filters: {
        player_name: { value: null, matchMode: FilterMatchMode.EQUALS },
        team_abbr: { value: null, matchMode: FilterMatchMode.EQUALS },
        bet: { value: null, matchMode: FilterMatchMode.EQUALS }
      },
      selected_item: {},
      meta_key: true
    }
  },
  computed: {
    // Proper computed property for filter options
    filter_options() {
      return {
        player_names: [...new Set(this.my_data.map(d => d.player_name))],
        team_abbrs: [...new Set(this.my_data.map(d => d.team_abbr))],
        bets: [...new Set(this.my_data.map(d => d.bet))],
      };
    }
  },
  mounted() {
    // Reactively update my_data using array assignment
    this.my_data = this.raw_data.map((vals, i) => {
      const processed = { ...vals };
      processed.date = new Date(vals.bovada_date);
      let stat = vals.stat
        .replace("total", "")
        .substring(1)
        .split("_")
        .map(this.capitalize_first_letter)
        .join(" ");
      processed.bet = this.replace_quarter(stat);
      processed.key = `${vals.date_collected_string}-${vals.player_name.toLowerCase()}-${vals.stat}`;
      return processed;
    });
    if (this.player_id) {
      this.my_data = this.my_data.filter(x => x['player_id']==this.player_id);
    };
    if (this.target_date) {
      this.my_data = this.my_data.filter(x => x['date']>this.target_date);
    };
    this.loading = false;
  },
  methods: {
    capitalize_first_letter(string) {
      if (string !== 'and') {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      return string;
    },
    replace_quarter(string) {
      if (string.includes("quarter")) {
        var arr = string.split("-");
        var s = arr[arr.length-1];
        var q = s.split("quarter")[0];
        return `${arr[0]} - ${q} Quarter`;
      };
      return string;
    },
    get_filter_options(data_key) {
      return Array.from(new Set(this.my_data.map(x => x[data_key])));
    }
  }
}
</script>
