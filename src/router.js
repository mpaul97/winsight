import { createMemoryHistory, createRouter } from 'vue-router'

import MyLanding from './views/LandingView.vue'
import MyPlayer from './views/PlayerView.vue'

const routes = [
  { path: '/', component: MyLanding },
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
