<script setup>
import { CONSTANTS } from '../assets/constants';
import {
  Select, InputNumber, AutoComplete,
  Button, useToast, Message,
  Toast, ProgressSpinner, Card,
  Chip
} from 'primevue';
import { Form } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import BetsInfo from '@/components/MyBetsInfo.vue';
import BetDataTable from '@/components/MyBetDataTable.vue';
import HttpService from '@/services/HttpService';
</script>

<template>
  <main>
    <div v-if="!submitted" class="container">
      <MyBetDataTable
        :title="'Upcoming Props'"
        :target_date="new Date()"
        @row-select="receive_bet_table_row"
      />
      <Card class="form-card">
        <template #title>
          <h2 style="color: var(--color-heading)">Enter bet information below</h2>
        </template>
        <template #subtitle>
          <p class="m-0">EX: LeBron James over 10.5 points</p>
        </template>
        <template #content>
          <div class="card-content">
            <div class="card flex">
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
                <Message v-else severity="secondary">
                  {{ $form.player?.value?.full_name }}
                  {{ $form.bet_type?.value?.name }}
                  {{ $form.number_value?.value }}
                  {{ $form.stat?.value?.code }}
                </Message>
                <Button type="submit" severity="success" label="Submit" />
              </Form>
              <Toast />
            </div>
            <!-- <div class="card flex flex-wrap w-[40rem]">
              <Message
                v-for="s in stats"
                :class="'rounded-border border-color-white w-20 mx-auto animate-fadein animate-once animate-duration-1000'"
              >
                {{ s.code }}
              </Message>
            </div> -->
          </div>
        </template>
      </Card>
    </div>
    <div v-else-if="loading" class="container">
      <ProgressSpinner />
      <h3>Analyzing</h3>
      <Message severity="warn">This may take a minute...</Message>
    </div>
    <div v-else-if="form_data && bet_data" class="container">
      <BetsInfo
        :player="form_data.player"
        :bet_type="form_data.bet_type"
        :number_value="form_data.number_value"
        :stat="form_data.stat"
        :bet_data="bet_data"
      />
      <Button severity="secondary" icon="pi pi-arrow-left" @click="submitted = false; set_initial_values()"></Button>
    </div>
    <div v-else class="container">
      <Message severity="error">An error occurred</Message>
      <Button severity="secondary" icon="pi pi-arrow-left" @click="submitted = false; set_initial_values()"></Button>
    </div>
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
      initial_values: {},
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
      toast: useToast(),
      submitted: false,
      form_data: {},
      loading: false,
      bet_data: {}
    }
  },
  async created() {
    const allPlayers = localStorage.getItem('allPlayers');
    if (allPlayers) {
      this.players = JSON.parse(allPlayers).filter(x => x['is_active']);
    };
    this.set_initial_values();
  },
  methods: {
    receive_bet_table_row(event) {
      console.log(event.player_name)
      console.log(this.players.filter(x => x['full_name'].includes(event.player_name)))
      this.initial_values.player = this.players.filter(x => x['full_name'].includes(event.player_name))
    },
    set_initial_values() {
      const past_form_values = localStorage.getItem('betInitialValues');
      if (past_form_values && Object.keys(past_form_values).length > 0) {
        this.initial_values = JSON.parse(past_form_values);
      } else {
        this.initial_values = {
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
        }
      }
    },
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
    async on_form_submit(event) {
      if (event.valid) {
        this.toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
        this.submitted = true;
        this.loading = true;
        this.bet_data = await HttpService.post_bet_info(event.values);
        if (this.bet_data === undefined) {
          this.loading = false;
        }
        if (this.bet_data) {
          this.form_data = event.values;
          this.loading = false;
        }
        localStorage.setItem('betInitialValues', JSON.stringify(this.form_data));
      }
    }
  },
}
</script>

<style scoped>
main {
  width: 80vw;
  margin-bottom: 2rem;
}
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  border: 1px solid var(--color-border);
  padding: 1rem;
}
.form-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;
}
.card-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
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
