<script setup>
import BetDataTable from '@/components/MyBetDataTable.vue';
import OutcomesDataTable from '@/components/MyOutcomesDataTable.vue';
</script>

<template>
  <main>
    <BetDataTable
      :title="'All Player Props'"
    />
    <OutcomesDataTable
      :title="'Past Player Prop Outcomes'"
    />
  </main>
</template>

<style scoped>
main {
  width: 80vw;
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}
</style>
