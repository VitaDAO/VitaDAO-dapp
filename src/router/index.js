import HomePage from '@/pages/HomePage.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/proposals',
    name: 'SnapshotPage',
    component: () => import(/* webpackChunkName: "ProposalsPage" */ '../pages/SnapshotPage.vue'),
  },
  {
    path: '/treasury',
    name: 'TreasuryPage',
    component: () => import(/* webpackChunkName: "TreasuryPage" */ '../pages/TreasuryPage.vue'),
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
  {
    path: '/proposals/:category/:id',
    redirect: (to) => {
      return { path: `/proposal/${to.params.id}` }
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
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
