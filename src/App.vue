<script setup>
import MyLogo from './components/MyLogo.vue';
import { Menubar, Button } from 'primevue';
import { ref } from "vue";
import { useRouter } from 'vue-router';

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
          route: '/nba',
          v_icon_name: 'co-basketball'
        },
        {
          label: 'NFL',
          route: '/nfl',
          v_icon_name: 'co-american-football'
        },
        {
          label: 'MLB',
          route: '/mlb',
          v_icon_name: 'co-baseball'
        },
        {
          label: 'NHL',
          route: '/nhl',
          v_icon_name: 'gi-hockey'
        }
      ]
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
    <Menubar :model="items" style="position: fixed; width: 100%; z-index: 1;">
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
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
      </template>
    </Menubar>
  </header>
  <main style="padding-top: 64px; padding-bottom: 64px;">
    <div class="h-[1rem]"></div>
    <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
    <Button label="Clear localStorage" @click="clearLocalStorage" />
    <div class="h-[1rem]"></div>
    <RouterView />
  </main>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
  }
}
</script>
