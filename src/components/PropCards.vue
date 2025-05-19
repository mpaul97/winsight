<script setup>
defineProps({
  my_data: Object
})
</script>

<template>
  <main>
    <Card
      v-for="item in my_data.slice(0, 10)"
      class="card"
    >
      <template #title>
        <div class="title-container">
          <h2 style="font-size: 1.5rem; font-weight: bold;">{{ item.player_name }}</h2>
          <span
            style="font-size: 0.9rem; color: var(--color-text)"
          >
            {{ item.team_abbr }}
          </span>
        </div>
      </template>
      <template #subtitle>
        <span
          style="font-size: 0.9rem; color: var(--color-text)"
        >
          {{ (new Date(item.bovada_date)).toLocaleString() }}
        </span>
      </template>
      <template #content>
        <div class="content">
          <span style="font-size: 1.8rem; font-weight: bold;">{{ item.line_value }}</span>
          <span>{{ item.bet }}</span>
        </div>
      </template>
      <template #footer>
        <div class="flex gap-2">
          <Button label="Over" severity="primary" class="w-full" />
          <Button label="Under" severity="primary" class="w-full" />
        </div>
      </template>
    </Card>
  </main>
</template>

<style scoped>
main {
  width: 80vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.card {
  width: 20rem;
  overflow: hidden;
  background-color: var(--color-background-soft);
  border: 2px solid var(--color-border);
}
.title-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  padding: 0.6rem;
  padding-top: 0;
}
</style>
