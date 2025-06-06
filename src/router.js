import { createMemoryHistory, createRouter } from 'vue-router';

import HomeView from './views/HomeView.vue';
import BetSlipAnalysisView from './views/BetSlipAnalysisView.vue';
import AllPlayersView from './views/AllPlayersView.vue';
// import PlayerAnalysisView from './views/PlayerAnalysisView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/bet-slip-analysis', component: BetSlipAnalysisView },
  { path: '/players', component: AllPlayersView },
  // {
  //   path: '/player/:id',
  //   name: 'player',
  //   component: PlayerAnalysisView,
  //   props: true
  // }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
