<script setup>
import dummy_bets_info_response from "./assets/dummy_data/dummy_bets_info_response.json"
import MyLogo from './components/MyLogo.vue';
import { Menubar, Button } from 'primevue';
import { ref } from "vue";
import { useRouter } from 'vue-router';
import MyLineChart from './components/MyLineChart.vue';

const router = useRouter();

router.afterEach((to) => {
  localStorage.setItem('lastRoute', to.path);
});

const lastRoute = localStorage.getItem('lastRoute');
if (lastRoute) {
  router.push(lastRoute);
};

const items = ref([
    {
        label: 'Home',
        route: '/',
        icon: 'pi pi-home'
    },
    {
        label: 'Players',
        route: '/players',
        icon: 'pi pi-user'
    },
    {
      label: 'Bets',
      route: '/bets',
      icon: 'pi pi-ticket'
    }
]);

const clearLocalStorage = () => {
  localStorage.clear();
  console.info('localStorage cleared!');
  console.info(localStorage.getItem('allPlayers'));
};
</script>

<template>
  <header>
    <Menubar :model="items">
      <template #start>
        <router-link v-slot="{ href, navigate }" to="/" custom>
          <a :href="href"  @click="navigate">
            <MyLogo my-size='2.5rem' />
          </a>
        </router-link>
      </template>
      <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
      </template>
    </Menubar>
  </header>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  <Button label="Clear localStorage" @click="clearLocalStorage" />
  <main>
    <!-- <RouterView /> -->
     <p>{{ JSON.stringify(dummy_bets_info_response) }}</p>
    <MyLineChart
      v-if="data.labels"
      :labels="data.labels"
      :my-data="data"
    />
  </main>
</template>

<script>
export default {
  data() {
    return {
      stat: 'PTS',
      raw_data: dummy_bets_info_response.last_10_stats,
      data: {}
    }
  },
  mounted() {
    this.data = {
      labels: this.raw_data.map(x => [x['MATCHUP'], new Date(x['GAME_DATE']).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })]),
      stat: this.raw_data.map(x => x[this.stat]),
      mins: this.raw_data.map(x => x['MIN']),
      stat_per_min: this.raw_data.map(x => (x[this.stat+'_PER_MIN']*100)),
    };
  }
}
</script>
