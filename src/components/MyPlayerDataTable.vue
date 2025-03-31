<script setup>
defineProps({
  title: String,
  myData: Object
})
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
</script>

<template>
  <DataTable
    dataKey="GAME_ID"
    :value="myData"
    tableStyle="min-width: 100rem; font-size: 0.8rem;"
    :size="'small'"
    showGridlines
    stripedRows
    sortMode="multiple"
    rowHover
    paginator
    :rows="10"
    scrollable
    resizableColumns
  >
    <template #header>
      <h3 :style="'display: flex; font-weight: 500; font-size: 1rem'">
        {{ title }}
      </h3>
    </template>
    <Column field="GAME_DATE" header="Date" sortable>
      <template #body="slotProps">
        {{ slotProps.data.GAME_DATE.toLocaleDateString() }}
      </template>
    </Column>
    <Column field="MATCHUP" header="Matchup"></Column>
    <Column field="WL" header="WL"></Column>
    <Column field="PTS" header="PTS" sortable></Column>
    <Column field="REB" header="REB" sortable></Column>
    <Column field="AST" header="AST" sortable></Column>
    <Column field="STL" header="STL" sortable></Column>
    <Column field="BLK" header="BLK" sortable></Column>
    <Column field="MIN" header="Min" sortable></Column>
    <Column field="FGM" header="FGM" sortable></Column>
    <Column field="FGA" header="FGA" sortable></Column>
    <Column field="FG_PCT" header="FG%" sortable>
      <template #body="slotProps">
        {{ `${slotProps.data.FG_PCT}%` }}
      </template>
    </Column>
    <Column field="FG3M" header="FG3M" sortable></Column>
    <Column field="FG3A" header="FG3A" sortable></Column>
    <Column field="FG3_PCT" header="FG3%" sortable>
      <template #body="slotProps">
        {{ `${slotProps.data.FG3_PCT}%` }}
      </template>
    </Column>
    <Column field="FTM" header="FTM" sortable></Column>
    <Column field="FTA" header="FTA" sortable></Column>
    <Column field="FT_PCT" header="FT%" sortable>
      <template #body="slotProps">
        {{ `${slotProps.data.FT_PCT}%` }}
      </template>
    </Column>
    <Column field="OREB" header="OREB" sortable></Column>
    <Column field="DREB" header="DREB" sortable></Column>
    <Column field="TOV" header="TOV" sortable></Column>
    <Column field="PF" header="PF" sortable></Column>
    <Column field="PLUS_MINUS" header="+/-" sortable></Column>
  </DataTable>
</template>

<style>
.p-datatable {
  width: 75%;
}
@media (max-width: 1280px) {
  .p-datatable {
    width: 50% !important;
  }
}
</style>
