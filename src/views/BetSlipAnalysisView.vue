<script setup>
import dummy_bet_slip_submit_response from '@/assets/dummy_data/dummy_bet_slip_submit_response.json';
import { Fieldset } from 'primevue';
</script>

<template>
  <main>
    <Fieldset
      v-for="item in data"
      :legend="item.bet.bet"
      :toggleable="true"
      style="width: 80%"
    >
      <p>{{ JSON.stringify(item.bet) }}</p>
    </Fieldset>
  </main>
</template>

<script>
export default {
  data() {
    return {
      data: []
    }
  },
  mounted() {
    this.data = dummy_bet_slip_submit_response.filter(x => x['bet'])
  }
}
</script>
