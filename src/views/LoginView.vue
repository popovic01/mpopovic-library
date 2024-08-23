<template>
  <div class="col-md-8 offset-md-2 text-center">
    <h1 class="mb-3">Sign in</h1>

    <form @submit.prevent="submitForm">
      <div class="row mb-3 d-flex justify-content-center">
        <div class="col-md-7 mb-2">
          <label for="email" class="form-label">Username</label>
          <input type="text" class="form-control" id="email" v-model="formData.email" />
        </div>
        <p v-if="!formValidation.isEmailValid && isFormSubmitted" class="text-danger">
          Username is not valid.
        </p>
        <p
          v-if="!formValidation.isUserRegistered && formValidation.isEmailValid && isFormSubmitted"
          class="text-danger"
        >
          A user with that username address doesn't exists.
        </p>
        <div class="col-md-7 mb-2">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" v-model="formData.password" />
          <p v-if="!formValidation.isPasswordValid && isFormSubmitted" class="text-danger">
            Password is required.
          </p>
          <p
            v-if="
              !formValidation.isPasswordCorrect &&
              formValidation.isPasswordValid &&
              formValidation.isUserRegistered &&
              isFormSubmitted
            "
            class="text-danger"
          >
            Password is not correct.
          </p>
        </div>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary me-2">Sign in</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isFormSubmitted = ref(false)

const user = { email: 'user@example.com', password: 'Test123!' }

const emit = defineEmits(['login'])

const getInitialData = () => ({
  email: '',
  password: ''
})

const getInitialValidation = () => ({
  isEmailValid: false,
  isPasswordValid: false,
  isPasswordCorrect: false,
  isUserRegistered: false
})

const formData = ref(getInitialData())
const formValidation = ref(getInitialValidation())

const submitForm = () => {
  checkValidation()
  isFormSubmitted.value = true

  //the validation is correct
  if (
    formValidation.value.isEmailValid &&
    formValidation.value.isPasswordValid &&
    formValidation.value.isUserRegistered &&
    formValidation.value.isPasswordCorrect
  ) {
    localStorage.setItem('isAuthenticated', true)
    emit('login')
    router.push('/')
    clearForm()
  }
}

function checkValidation() {
  if (user.email == formData.value.email) {
    formValidation.value.isUserRegistered = true
  } else {
    formValidation.value.isUserRegistered = false
  }

  if (user?.password === formData.value.password) {
    formValidation.value.isPasswordCorrect = true
  } else {
    formValidation.value.isPasswordCorrect = false
  }

  if (formData.value.email) {
    formValidation.value.isEmailValid = true
  } else {
    formValidation.value.isEmailValid = false
  }

  if (formData.value.name) {
    formValidation.value.isNameValid = true
  } else {
    formValidation.value.isNameValid = false
  }

  if (formData.value.password) {
    formValidation.value.isPasswordValid = true
  } else {
    formValidation.value.isPasswordValid = false
  }
  console.log(formValidation.value)
}

function clearForm() {
  formData.value = getInitialData()
  formValidation.value = getInitialValidation()
  isFormSubmitted.value = false
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>
