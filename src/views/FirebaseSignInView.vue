<template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="login">Sign in via Firebase</button></p>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()

const emit = defineEmits(['login'])

const login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      localStorage.setItem('isAuthenticated', true)
      if (email.value == 'admin@example.com') {
        localStorage.setItem('isAdmin', true)
      } else {
        localStorage.setItem('isAdmin', false)
      }
      emit('login')
      console.log('Firebase sign in')
      router.push('/')
      console.log(auth.currentUser)
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>
