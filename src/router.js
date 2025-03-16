import { createMemoryHistory, createRouter } from 'vue-router'

import MyLanding from './components/MyLanding.vue'
import MyPlayer from './components/MyPlayer.vue'

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
