import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginVew from '@/views/Auth/LoginView.vue'
import { useUserStore } from '@/stores/auth'
import LoginView from '@/views/Auth/LoginView.vue'
import { getToken } from '@/stores/local'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{
        requiresAuth:true
      }
    },
    { 
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    { 
      path: '/register',
      name: 'register',
      component: () => import('@/views/Auth/RegisterView.vue'),
    },
    { 
      path: '/forgot-password',
      name: 'forget',
      component: () => import('@/views/Auth/ForgetPasswordView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})
// 全局前置守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !getToken()) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})
export default router
