import { createMemoryHistory, createRouter } from 'vue-router'

import MyHome from './views/HomeView.vue'
import MyAllPlayers from './views/AllPlayersView.vue'
import MyPlayer from './views/PlayerAnalysisView.vue'

const routes = [
  { path: '/', component: MyHome },
  { path: '/players', component: MyAllPlayers },
  {
    path: '/player/:id',
    name: 'player',
    component: MyPlayer
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;
