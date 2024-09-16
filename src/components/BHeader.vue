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
          <router-link v-if="!isLoggedIn" to="/Firelogin" class="nav-link" active-class="active"
            >Firebase Login</router-link
          >
        </li>
        <li class="nav-item">
          <router-link v-if="!isLoggedIn" to="/Fireregister" class="nav-link" active-class="active"
            >Firebase Register</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/GetBookCountView" class="nav-link" active-class="active"
            >Get Book Count</router-link
          >
        </li>
        <li class="nav-item">
          <button
            v-if="isLoggedIn && !isAdmin"
            type="button"
            class="nav-link btn btn-link"
            @click="logout()"
          >
            Logout
          </button>
          <button
            v-if="isLoggedIn && isAdmin"
            type="button"
            class="nav-link btn btn-link"
            @click="logout()"
          >
            Logout admin
          </button>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'

const router = useRouter()
const auth = getAuth()

defineProps(['isLoggedIn', 'isAdmin'])
const emit = defineEmits(['logout'])

function logout() {
  signOut(auth)
    .then(function () {
      localStorage.setItem('isAuthenticated', false)
      localStorage.setItem('isAdmin', false)
      console.log('currentUser: ' + auth.currentUser)
      emit('logout')
      router.push('/login')
    })
    .catch(function (error) {
      console.log(error)
    })
}
</script>
