<script setup>
import { ref } from 'vue'

import BHeader from './components/BHeader.vue'
const isLoggedIn = ref(localStorage.getItem('isAuthenticated') === 'false' ? false : true)
const isAdmin = ref(localStorage.getItem('isAdmin') === 'false' ? false : true)

function changeIsLoggedIn() {
  isLoggedIn.value = !isLoggedIn.value
  isAdmin.value = localStorage.getItem('isAdmin') === 'false' ? false : true
}
</script>

<template>
  <header>
    <BHeader :isLoggedIn="isLoggedIn" :isAdmin="isAdmin" @logout="changeIsLoggedIn"></BHeader>
  </header>

  <main>
    <div class="container mt-5">
      <div class="row">
        <router-view @login="changeIsLoggedIn"></router-view>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
