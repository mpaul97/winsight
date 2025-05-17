<script setup>
import MyLogo from './components/MyLogo.vue';
import { Menubar, Button } from 'primevue';
import { ref } from "vue";
import { useRouter } from 'vue-router';
import MyBetsInfo from './components/MyBetsInfo.vue';
import dummy_bets_info_response from "./assets/dummy_data/dummy_bets_info_response.json";

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
      icon: 'pi pi-ticket',
      items: [
        {
          label: 'Prop Assistant',
          route: '/bets',
          icon: 'pi pi-info-circle'
        },
        {
          label: 'Historical Analysis',
          route: '/bets-analysis',
          icon: 'pi pi-table'
        }
      ]
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
