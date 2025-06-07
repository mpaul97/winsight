<script setup>
import PastStatHitsChart from './PastStatHitsChart.vue';
import { Card, Dialog } from 'primevue';
defineProps({
  my_data: Object
})
</script>

<template>
  <main>
    <Card
      v-for="item in my_data"
      class="card"
      v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-50 animate-duration-1000', leaveClass: 'animate-leave fade-out-0' }"
    >
      <template #title>
        <div class="title-container">
          <div style="width: 100%; display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
            <h2 style="font-size: 1.5rem; font-weight: bold;">{{ item.prop.player_name }}</h2>
            <Button
              icon="pi pi-chart-bar"
              variant="text"
              size="normal"
              @click="modal_visible = true; modal_item = item;"
            />
          </div>
          <span
            style="font-size: 1rem; color: var(--my-primary-color); font-weight: 600;"
          >
            Hit Rate: {{ item.player_prop_outcome_history.proportion }}%
          </span>
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
          <span>{{ item.bet_name }}</span>
        </div>
      </template>
      <template #footer>
        <div class="flex gap-2">
          <Button
            v-for="bet_option in [{ name: 'over', value: item.prop.over_odds }, { name: 'under', value: item.prop.under_odds }]"
            severity="primary"
            class="w-full"
            @click="$emit('receive_card', { option: bet_option.name, submitted_bet: item })"
            raised
          >
            <div style="display: flex; flex-direction: column;">
              <span style="font-weight: 600; text-transform: capitalize;">{{ bet_option.name }}</span>
              <span v-if="bet_option.value < 0" style="font-weight: 600; color: var(--my-primary-color)">{{ bet_option.value }}</span>
              <span v-else-if="bet_option.value > 0" style="font-weight: 600; color: var(--my-primary-color)">+{{ bet_option.value }}</span>
              <span v-else style="font-weight: 600; color: var(--my-primary-color)">EVEN</span>
            </div>
          </Button>
        </div>
      </template>
    </Card>
  </main>
  <!-- MODAL -->
  <Dialog
    v-model:visible="modal_visible"
    modal
    style="width: 40vw"
  >
    <template #header>
      <div class="flex-row items-center justify-center gap-2">
        <h3 class="font-bold whitespace-nowrap" style="font-size: 1.4rem;">{{ modal_item.prop.player_name }}</h3>
        <span
          style="font-size: 0.9rem; color: var(--color-text)"
        >
          {{ modal_item.prop.team_abbr }}
        </span>
      </div>
    </template>
    <div>
      <div>
        <h3 style="font-size: 1.3rem; font-weight: 600;">
          {{ modal_item.prop.line_value }}
        </h3>
        <span style="font-size: 1rem; font-weight: 300;">{{ modal_item.bet_name }}</span>
      </div>
      <div class="h-[2rem]"></div>
    </div>
    <div style="width: 100%; display: flex;">
      <PastStatHitsChart :item="modal_item" :size="5" />
    </div>
    <template #footer>
      <div class="flex gap-5 p-5 w-full align-between">
        <Button
          v-for="bet_option in [{ name: 'over', value: modal_item.prop.over_odds }, { name: 'under', value: modal_item.prop.under_odds }]"
          severity="primary"
          class="w-[50%]"
          @click="$emit('receive_card', { option: bet_option.name, submitted_bet: item }); modal_visible = false;"
          raised
        >
          <div style="display: flex; flex-direction: column;">
            <span style="font-weight: 600; text-transform: capitalize;">{{ bet_option.name }}</span>
            <span v-if="bet_option.value < 0" style="font-weight: 600; color: var(--my-primary-color)">{{ bet_option.value }}</span>
            <span v-else-if="bet_option.value > 0" style="font-weight: 600; color: var(--my-primary-color)">+{{ bet_option.value }}</span>
            <span v-else style="font-weight: 600; color: var(--my-primary-color)">EVEN</span>
          </div>
        </Button>
        </div>
    </template>
  </Dialog>
  <!-- END MODAL -->
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
