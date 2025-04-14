<script setup>
import { CONSTANTS } from '../assets/constants';
import {
  Select, InputNumber, AutoComplete,
  Button, useToast, Message,
  Toast
} from 'primevue';
import { Form } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import BetsInfo from '@/components/BetsInfo.vue';
</script>

<template>
  <main>
    <!-- <div class="container">
      <h2 style="color: var(--color-heading)">Enter bet information below</h2>
      <p>EX: LeBron James over 10.5 points</p>
      <div class="card flex justify-center">
        <Form v-slot="$form" :resolver="resolver" :initialValues="initial_values" @submit="on_form_submit" class="form-container">
          <div class="bet-inputs-container flex flex-col gap-1">
            <AutoComplete
              name="player"
              optionLabel="full_name"
              :suggestions="filtered_players"
              @complete="player_search"
            />
            <Select
              required
              class="select bet-type"
              name="bet_type"
              :options="bet_types"
              optionLabel="name"
            />
            <InputNumber
              class="input-number"
              name="number_value"
              inputId="minmaxfraction"
              :minFractionDigits="1"
              :maxFractionDigits="1"
              fluid
            />
            <Select
              class="select stat"
              name="stat"
              :options="stats"
              optionLabel="code"
            />
          </div>
          <Message v-if="$form.player?.invalid" severity="error" size="small" variant="simple">{{ $form.player.error?.message }}</Message>
          <Message v-if="$form.number_value?.invalid" severity="error" size="small" variant="simple">{{ $form.number_value.error?.message }}</Message>
          <Message v-else severity="info">
            {{ $form.player?.value?.full_name }}
            {{ $form.bet_type?.value?.name }}
            {{ $form.number_value?.value }}
            {{ $form.stat?.value?.code }}
          </Message>
          <Button type="submit" severity="secondary" label="Submit" />
        </Form>
        <Toast />
      </div>
    </div> -->
    <BetsInfo
      :player="initial_values.player"
      :bet_type="initial_values.bet_type"
      :number_value="initial_values.number_value"
      :stat="initial_values.stat"
    />
  </main>
</template>

<script>
export default {
  name: 'Bets',
  data() {
    return {
      players: [],
      filtered_players: [],
      bet_types: [
        { name: 'over', code: 'ov' },
        { name: 'under', code: 'un' },
        { name: 'at least', code: 'al' }
      ],
      number_value: 10.5,
      selected_stat: { name: 'PTS', code: 'pts' },
      stats: CONSTANTS.GAMELOG_STAT_LABELS.map(x => ({name: x, code: CONSTANTS.GAMELOG_STAT_LABELS_LF[x].toLowerCase() })),
      initial_values: {
          player: {
          first_name: 'LeBron',
          full_name: 'LeBron James',
          id: 2544,
          is_active: true,
          last_name: 'James'
        },
        bet_type: {
          name: 'over',
          code: 'ov'
        },
        number_value: 0.5,
        stat: {
          name: 'PTS',
          code: 'points'
        },
      },
      resolver: zodResolver(
        z.object({
          player: z.union([
            z.object({
              first_name: z.string(),
              full_name: z.string(),
              id: z.number(),
              is_active: z.boolean(),
              last_name: z.string()
            }),
            z.any().refine((val) => false, { message: 'Player is required.' })
          ]),
          bet_type: z.union([
            z.object({
              name: z.string(),
              code: z.string()
            }),
            z.any().refine((val) => false, { message: 'Bet type is required.' })
          ]),
          number_value: z.number().min(0.5, { message: 'Number must be greater than or equal to 0.5' }),
          stat: z.union([
            z.object({
              name: z.string(),
              code: z.string()
            }),
            z.any().refine((val) => false, { message: 'Stat is required.' })
          ]),
        })
      ),
      toast: useToast()
    }
  },
  mounted() {
    const allPlayers = localStorage.getItem('allPlayers');
    if (allPlayers) {
      this.players = JSON.parse(allPlayers).filter(x => x['is_active']);
    };
  },
  methods: {
    player_search(event) {
      setTimeout(() => {
        if (!event.query.trim().length) {
          this.filtered_players = [...this.players];
        } else {
          this.filtered_players = this.players.filter((player) => {
              return player['full_name'].toLowerCase().startsWith(event.query.toLowerCase());
          });
        }
      }, 100);
    },
    on_form_submit(event) {
      if (event.valid) {
        console.log(event.values);
        this.toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
      }
    }
  },
}
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  min-width: 800px;
  padding: 2rem 0;
  font-size: 1rem;
}
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
}
.bet-inputs-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 3rem;
  gap: 0.5rem;
}
.input-number {
  width: 8rem;
}
.select {
  display: flex;
  align-items: center;
}
</style>
