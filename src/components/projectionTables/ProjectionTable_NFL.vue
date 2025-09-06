<script setup>
import { ref } from 'vue';
defineProps({
  my_data: Array,
  columns: Array
});
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <SelectButton
      v-model="selected_position"
      :options="position_options"
      fluid
      @change="set_filtered_data"
    />
    <DataTable
      :value="filtered_data"
      responsiveLayout="scroll"
      :sortMode="'single'"
      showGridlines
      stripedRows
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
      filtered_data: this.my_data,
      position_options: ['ALL', 'QB', 'RB', 'WR', 'TE'],
      selected_position: 'ALL'
    }
  },
  async created() {
    this.set_filtered_data()
  },
  methods: {
    set_filtered_data() {
      // set filtered data
      if (this.selected_position === 'ALL') {
        this.filtered_data = this.my_data;
      } else {
        this.filtered_data = this.my_data.filter(x => x.position===this.selected_position);
      }
    }
  }
}
</script>
