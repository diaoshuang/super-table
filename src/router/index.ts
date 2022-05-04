import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/all',
    name: 'All',
    component: () => import('@/views/DataHome.vue'),
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/components/Login.vue'),
  },
  {
    path: '/example',
    name: 'Example',
    component: () => import('@/views/Example.vue'),
  },
  {
    path: '/tt',
    name: 'Total',
    component: () => import('../views/Total.vue'),
  },
  {
    path: '/totalwdt',
    name: 'TotalWdt',
    component: () => import('../views/TotalWdt.vue'),
  },
  {
    path: '/test',
    name: 'Template2',
    component: () => import('../views/Template2.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory('/#tpl'),
  routes,
});

export default router;
