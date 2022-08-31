import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router';

import routes from './routes';

const createHistory = (process.env.VUE_ROUTER_MODE === 'history')
  ? createWebHistory
  : createWebHashHistory;

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
  history: createHistory(process.env.VUE_ROUTER_BASE),
});

export default router;
