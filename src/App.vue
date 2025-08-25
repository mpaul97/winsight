<script setup>
import MyLogo from './components/MyLogo.vue';
import { Menubar, Button } from 'primevue';
import { ref } from "vue";
import { useRouter } from 'vue-router';
import state, { update_league } from './store';

// import BetSlipAnalysisView from './views/BetSlipAnalysisView.vue';

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
      label: 'League',
      icon: 'pi pi-th-large',
      items: [
        {
          label: 'NBA',
          v_icon_name: 'co-basketball',
          league: 'nba'
        },
        {
          label: 'NFL',
          v_icon_name: 'co-american-football',
          league: 'nfl'
        },
        {
          label: 'MLB',
          v_icon_name: 'co-baseball',
          league: 'mlb'
        },
        {
          label: 'NHL',
          v_icon_name: 'gi-hockey',
          league: 'nhl'
        }
      ]
    },
    {
        label: 'Projections',
        route: '/projections',
        icon: 'pi pi-chart-line'
    },
    {
        label: 'Players',
        route: '/players',
        icon: 'pi pi-user'
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
    <Menubar
      :model="items"
      style="position: fixed;
      width: 100%;
      z-index: 1;"
    >
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
            <span v-if="item.icon" :class="item.icon" />
            <span v-else><v-icon :name="item.v_icon_name" /></span>
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else-if="!item.route && !item.league" :href="item.url" :target="item.target" v-bind="props.action">
          <span v-if="item.icon" :class="item.icon" />
          <span v-else><v-icon :name="item.v_icon_name" /></span>
          <span>{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
        <a v-else-if="item.league" :href="item.url" :target="item.target" v-bind="props.action" @click="update_league(item.league)">
          <span v-if="item.icon" :class="item.icon" />
          <span v-else><v-icon :name="item.v_icon_name" /></span>
          <span>{{ item.label }}</span>
        </a>
      </template>
      <template #end>
        <div style="padding-right: 0.8rem;">
          <span style="font-weight: 600; color: var(--my-primary-color);">{{ state.league.toUpperCase() }}</span>
        </div>
      </template>
    </Menubar>
  </header>
  <main style="padding-top: 64px; padding-bottom: 64px;">
    <div class="h-[1rem]"></div>
    <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
    <Button label="Clear localStorage" @click="clearLocalStorage" />
    <div class="h-[1rem]"></div>
    <RouterView />
     <!-- <BetSlipAnalysisView /> -->
  </main>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    if (state.league === undefined || state.league === '') {
      update_league('nba') // default league to nba
    }
  }
}
</script>
