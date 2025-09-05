<script setup>
import dummy_batting_projections_mlb from '@/assets/dummy_data/mlb_batting_predictions.json';
import dummy_projections_nfl from '@/assets/dummy_data/nfl_predictions.json';
</script>

<template>
  <div class="p-4">
    <DataTable
      :value="table_data"
      responsiveLayout="scroll"
      :sortMode="'single'"
      showGridlines
    >
      <Column
        v-for="col in columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        sortable
      />
    </DataTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      table_data: [],
      columns: []
    }
  },
  async created() {
    // Example: load JSON file (replace path if needed)
    // const response = await fetch("../assets/dummy_data/nfl_predictions.json");
    const json_data = dummy_projections_nfl;
    this.table_data = json_data;
    // Dynamically get column names from first record
    if (json_data.length > 0) {
      this.columns = Object.keys(json_data[0]).filter(x => x !== 'player_id').map(key => ({
        field: key,
        header: this.capitalize_each_word(key.replace(/_/g, " ")) // make it more readable
      }));
    };
  },
  methods: {
    capitalize_each_word(str) {
      return str
        .split(' ') // Split the string into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter and lowercase rest
        .join(' '); // Join the words back into a string
    }
  }
}
</script>
