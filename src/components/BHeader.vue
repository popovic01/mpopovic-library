<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home (Week 5)</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="!isLoggedIn" to="/login" class="nav-link" active-class="active"
            >Login</router-link
          >
        </li>
        <li class="nav-item">
          <button v-if="isLoggedIn" type="button" class="nav-link btn btn-link" @click="logout()">
            Logout
          </button>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps(['isLoggedIn'])
const emit = defineEmits(['logout'])

// const isLoggedIn = ref(false)

function logout() {
  localStorage.setItem('isAuthenticated', false)
  emit('logout')
  router.push('/login')
}
</script>
