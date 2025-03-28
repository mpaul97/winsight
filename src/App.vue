<script setup>
import MyLanding from './views/LandingView.vue';
import MyPlayer from './views/PlayerView.vue';

import { Menubar } from 'primevue';

import { ref } from "vue";

import { useRouter } from 'vue-router';

const items = ref([
    {
        label: 'Home',
        route: '/',
        icon: 'pi pi-home'
    },
    {
        label: 'Analysis',
        icon: 'pi pi-search',
        items: [
            {
                label: 'Player',
                route: '/player/:id',
                icon: 'pi pi-user'
            },
            {
                label: 'Bet',
                icon: 'pi pi-ticket'
            }
        ]
    },
]);
</script>

<template>
  <header>
    <Menubar :model="items">
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
    <!-- <RouterView /> -->
     <MyPlayer />
  </main>
</template>

<style>
</style>
