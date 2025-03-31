import { createMemoryHistory, createRouter } from 'vue-router'

import MyHome from './views/HomeView.vue'
import MyPlayer from './views/PlayerView.vue'

const routes = [
  { path: '/', component: MyHome },
  { path: '/player', component: MyPlayer },
  // {
  //   path: '/player/:id',
  //   name: 'player',
  //   component: MyPlayer
  // },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;
