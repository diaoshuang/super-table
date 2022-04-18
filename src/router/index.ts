import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/example',
    name: 'Example',
    component: () => import('../views/Example.vue')
  },
  {
    path: '/tt',
    name: 'Total',
    component: () => import('../views/Total.vue')
  },
  {
    path: '/totalwdt',
    name: 'TotalWdt',
    component: () => import('../views/TotalWdt.vue')
  },
  {
    path: '/test',
    name: 'Template2',
    component: () => import('../views/Template2.vue')
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFound.vue') },
]

const router = createRouter({
  history: createWebHashHistory('/#tpl'),
  routes
})

export default router
