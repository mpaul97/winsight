import "primeicons/primeicons.css";
import './assets/main.css';
import router from './router';

import { createApp } from 'vue';
import PrimeVue from "primevue/config";
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice';
import { AnimateOnScroll } from "primevue";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { CoBasketball, CoAmericanFootball, CoBaseball, GiHockey } from "oh-vue-icons/icons";

import Noir from "./presets/Noir";
import AppState from "./plugins/appState";
import App from './App.vue';

addIcons(
  CoBasketball,
  CoAmericanFootball,
  CoBaseball,
  GiHockey
);

const app = createApp(App);

app.component("v-icon", OhVueIcon);

app.use(PrimeVue, {
  theme: {
    preset: Noir,
    options: {
      prefix: 'p',
      cssLayer: false,
    }
  }
});

app.use(AppState);
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);
app.use(router);

app.directive('animateonscroll', AnimateOnScroll);

app.mount("#app");
