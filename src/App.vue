<script setup>
import MyLogo from './components/MyLogo.vue';
import { Menubar } from 'primevue';
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
</script>

<template>
  <header>
    <Menubar :model="items">
      <template #start>
        <router-link v-slot="{ href, navigate }" to="/" custom>
          <a :href="href"  @click="navigate">
            <MyLogo my-size='3rem' />
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
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <main>
    <RouterView />
  </main>
</template>

<style>
</style>
