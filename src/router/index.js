import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '../views/TodoView.vue'
import ComparisonView from '../views/ComparisonView.vue'

const routes = [
  {
    path: '/',
    name: 'Todo',
    component: TodoView
  },
  {
    path: '/comparison',
    name: 'Comparison',
    component: ComparisonView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
