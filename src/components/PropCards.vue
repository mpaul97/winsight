<script setup>
import MyLineChart from './MyLineChart.vue';
import { Card, Dialog } from 'primevue';
const props = defineProps({
  my_data: Object
})
</script>

<template>
  <main>
    <Card
      v-for="item in my_data"
      class="card"
      v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-50 animate-duration-1000', leaveClass: 'animate-leave fade-out-0' }"
      @click="modal_visible = true; modal_item = item;"
    >
      <template #title>
        <div class="title-container">
          <h2 style="font-size: 1.5rem; font-weight: bold;">{{ item.prop.player_name }}</h2>
          <span
            style="font-size: 0.9rem; color: var(--color-text)"
          >
            {{ item.prop.team_abbr }}
          </span>
        </div>
      </template>
      <template #subtitle>
        <span
          style="font-size: 0.9rem; color: var(--color-text)"
        >
          {{ item.date.toLocaleString() }}
        </span>
      </template>
      <template #content>
        <div class="content">
          <span style="font-size: 1.8rem; font-weight: bold;">{{ item.prop.line_value }}</span>
          <span>{{ item.bet }}</span>
        </div>
      </template>
      <template #footer>
        <div class="flex gap-2">
          <Button severity="primary" class="w-full" @click="$emit('receive_card', { option: 'over', submitted_bet: item })">
            <div style="display: flex; flex-direction: column;">
              <span style="font-weight: 600">Over</span>
              <span v-if="item.prop.over_odds < 0" style="font-weight: 600; color: var(--my-primary-color)">{{ item.prop.over_odds }}</span>
              <span v-else-if="item.prop.over_odds > 0" style="font-weight: 600; color: var(--my-primary-color)">+{{ item.prop.over_odds }}</span>
              <span v-else style="font-weight: 600; color: var(--my-primary-color)">EVEN</span>
            </div>
          </Button>
          <Button severity="primary" class="w-full" @click="$emit('receive_card', { option: 'under', submitted_bet: item })">
            <div style="display: flex; flex-direction: column;">
              <span style="font-weight: 600">Under</span>
              <span v-if="item.prop.under_odds < 0" style="font-weight: 600; color: var(--my-primary-color)">{{ item.prop.under_odds }}</span>
              <span v-else-if="item.prop.under_odds > 0" style="font-weight: 600; color: var(--my-primary-color)">+{{ item.prop.under_odds }}</span>
              <span v-else style="font-weight: 600; color: var(--my-primary-color)">EVEN</span>
            </div>
          </Button>
        </div>
      </template>
    </Card>
  </main>
  <Dialog
    v-model:visible="modal_visible"
    modal
    :style="{ width: '35rem' }"
  >
    <template #header>
      <div class="inline-flex items-center justify-center gap-2">
        <span class="font-bold whitespace-nowrap" style="font-size: 1.4rem;">{{ modal_item.prop.player_name }}</span>
      </div>
    </template>
    <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap;">
      <!-- <p style="width: 100%;">{{ JSON.stringify(modal_item.last_10_stats) }}</p> -->
       <div style="height: 30rem; width: 100%;">
        
      </div>
    </div>
  </Dialog>
</template>

<script>
export default {
  emits: ['receive_card'],
  data() {
    return {
      modal_visible: false,
      modal_item: {}
    }
  }
}
</script>

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
.card:hover {
  cursor: pointer;
  border: 2px solid var(--my-primary-color);
  transform: scale(1.02);
  transition: 0.2s ease;
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
.p-dialog-close-button {
  border: none;
}
</style>
