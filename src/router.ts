import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/v-model',
    name: 'VModel',
    component: () => import('./views/v-model')
  },
  {
    path: '/table-transfer',
    name: 'TableTransfer',
    component: () => import('./views/table-transfer')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes // `routes: routes` 的缩写
})

export default router
