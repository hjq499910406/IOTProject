import { createRouter, createWebHistory } from 'vue-router';
//import HomeView from '../views/HomeView.vue'

import { loadDynamicPages, loadDevPages } from '../pages/loadPages.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
});

if (import.meta.env.NODE_ENV === 'production') {
  loadDynamicPages(router, import.meta.env.VITE_APP_CODE);
}
else {
  loadDevPages(router, import.meta.env.VITE_APP_CODE);
}
// console.log('router', router.getRoutes())

export default router;
