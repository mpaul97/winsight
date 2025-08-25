import { createMemoryHistory, createRouter } from 'vue-router';

import HomeView from './views/HomeView.vue';
import BetSlipAnalysisView from './views/BetSlipAnalysisView.vue';
import AllPlayersView from './views/AllPlayersView.vue';
import ProjectionsView from './views/ProjectionsView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/bet-slip-analysis', component: BetSlipAnalysisView },
  { path: '/players', component: AllPlayersView },
  { path: '/projections', component: ProjectionsView }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
