import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import FirebaseSignInView from '@/views/FirebaseSignInView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import AddBookView from '@/views/AddBookView.vue'
import BookList from '@/components/BookList.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/Firelogin',
    name: 'Firelogin',
    component: FirebaseSignInView
  },
  {
    path: '/Fireregister',
    name: 'Fireregister',
    component: FirebaseRegisterView
  },
  {
    path: '/addbook',
    name: 'Addbook',
    component: AddBookView
  },
  {
    path: '/books',
    name: 'Books',
    component: BookList
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem('isAuthenticated') == 'true') {
      // user is authenticated, proceed to the route
      next()
    } else {
      // uer is not authenticated, redirect to login
      next('/login')
    }
  } else {
    // non-protected route, allow access
    next()
  }
})

export default router
