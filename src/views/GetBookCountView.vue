<template>
  <div id="app">
    <h1>Book Counter</h1>
    <button @click="getBookCount" class="btn btn-primary me-2">Get Book Count</button>
    <p v-if="count !== null">Total number of books: {{ count }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      count: null,
      error: null
    }
  },
  methods: {
    async getBookCount() {
      try {
        const response = await axios.get('https://countbooks-pfjs5ac4tq-uc.a.run.app/')
        this.count = response.data.count
        this.error = null
      } catch (err) {
        console.error('Error fetching book count: ', err)
        this.error = err
        this.count = null
      }
    }
  }
}
</script>
