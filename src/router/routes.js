import { h } from 'vue';
import MainLayout from 'layouts/MainLayout.vue';
import MapLayout from 'layouts/MapLayout.vue';

import IndexPage from 'pages/IndexPage.vue';
import AboutPage from 'pages/AboutPage.vue';
import MapPage from 'pages/MapPage.vue';

import ErrorNotFound from 'pages/ErrorNotFound.vue';

import guardRoute, {
  gdprRequired,
  redirectToMap,
  redirectToPosition,
} from './routeGuards.js';

//------------------------------------------------------------------------------
const routes = [
  {
    // unnamed
    path: '/',
    component: MainLayout,
    children: [
      {
        name: 'about',
        path: '/about',
        component: AboutPage,
      },
      {
        name: 'index',
        path: '',
        component: IndexPage,
        beforeEnter: guardRoute(redirectToMap),
      },
    ],
  },

  {
    path: '/map',
    component: MapLayout,
    children: [
      {
        name: 'map',
        path: '/map/:lat([0-9.-]*)/:lng([0-9.-]*)/:zoom([0-9.-]*)',
        component: MapPage,
        beforeEnter: guardRoute(gdprRequired),
      },
      {
        // unnamed
        path: '/map',
        beforeEnter: guardRoute(gdprRequired, redirectToPosition),
        component: h('div'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    // unnamed
    path: '/:catchAll(.*)*',
    component: ErrorNotFound,
  },
];

export default routes;
