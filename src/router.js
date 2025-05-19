import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import AllPlayersView from './views/AllPlayersView.vue'
import PlayerAnalysisView from './views/PlayerAnalysisView.vue'
import BetPropAssistantView from './views/BetPropAssistantView.vue'
import BetAnalysisView from './views/BetHistAnalysisView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/players', component: AllPlayersView },
  {
    path: '/player/:id',
    name: 'player',
    component: PlayerAnalysisView,
    props: true
  },
  { path: '/bets', component: BetPropAssistantView },
  { path: '/bets-analysis', component: BetAnalysisView }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
