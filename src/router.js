import { createMemoryHistory, createRouter } from 'vue-router'

import MyHome from './views/HomeView.vue'
import MyPlayers from './views/AllPlayersView.vue'
import MyPlayerAnalysis from './views/PlayerAnalysisView.vue'

const routes = [
  { path: '/', component: MyHome },
  { path: '/players', component: MyPlayers },
  {
    path: '/player/:id',
    name: 'player',
    component: MyPlayerAnalysis,
    props: true
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;
