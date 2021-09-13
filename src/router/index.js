import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/proposals',
    name: 'ProposalsPage',
    component: () => import(/* webpackChunkName: "ProposalsPage" */ '../pages/ProposalsPage.vue'),
  },
  {
    path: '/wallet',
    name: 'WalletPage',
    component: () => import(/* webpackChunkName: "WalletPage" */ '../pages/WalletPage.vue'),
  },
  {
    path: '/proposal/:id',
    component: () => import(/* webpackChunkName: "ProposalPage" */ '../pages/ProposalPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
