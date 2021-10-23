import { createWebHashHistory, createRouter } from 'vue-router'
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
    path: '/portfolio',
    name: 'PortfolioPage',
    component: () => import(/* webpackChunkName: "PortfolioPage" */ '../pages/PortfolioPage.vue'),
  },
  {
    path: '/portfolio/:id',
    name: 'IPNFTDetailPage',
    component: () =>
      import(/* webpackChunkName: "IPNFTDetailPage" */ '../pages/IPNFTDetailPage.vue'),
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
