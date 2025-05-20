<script setup>
defineProps({
  my_data: Object
})
</script>

<template>
  <main>
    <Card
      v-for="item in my_data.slice(0, 20)"
      class="card"
      v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-50 animate-duration-1000', leaveClass: 'animate-leave fade-out-0' }"
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
          <Button severity="primary" class="w-full" @click="$emit('receive_card', { option: 'over', submitted_bet: item })">
            <div style="display: flex; flex-direction: column;">
              <span style="font-weight: 600">Over</span>
              <span v-if="item.over_odds < 0" style="font-weight: 600; color: var(--my-primary-color)">{{ item.over_odds }}</span>
              <span v-else-if="item.over_odds > 0" style="font-weight: 600; color: var(--my-primary-color)">+{{ item.over_odds }}</span>
              <span v-else style="font-weight: 600; color: var(--my-primary-color)">EVEN</span>
            </div>
          </Button>
          <Button severity="primary" class="w-full" @click="$emit('receive_card', { option: 'under', submitted_bet: item })">
            <div style="display: flex; flex-direction: column;">
              <span style="font-weight: 600">Under</span>
              <span v-if="item.under_odds < 0" style="font-weight: 600; color: var(--my-primary-color)">{{ item.under_odds }}</span>
              <span v-else-if="item.under_odds > 0" style="font-weight: 600; color: var(--my-primary-color)">+{{ item.under_odds }}</span>
              <span v-else style="font-weight: 600; color: var(--my-primary-color)">EVEN</span>
            </div>
          </Button>
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
  width: 21rem;
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
