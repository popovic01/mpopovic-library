<template>
  <div class="col-md-8 offset-md-2">
    <div class="text-center">
      <h1>W5. Library Registration Form</h1>
      <p>Let's build some more advanced features into our form.</p>
    </div>
    <form @submit.prevent="submitForm">
      <div class="row mb-3">
        <div class="col-md-6">
          <label for="username" class="form-label">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            @blur="() => validateName(true)"
            @input="() => validateName(false)"
            v-model="formData.username"
          />
          <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
        </div>

        <div class="col-md-6">
          <label for="gender" class="form-label">Gender</label>
          <select
            class="form-select"
            id="gender"
            v-model="formData.gender"
            @blur="() => validateGender(true)"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
        </div>
        <div class="col-md-6">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            @blur="() => validatePassword(true)"
            @input="() => validatePassword(false)"
            v-model="formData.password"
          />
          <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
        </div>
        <div class="col-md-6">
          <label for="confirm-password" class="form-label">Confirm password</label>
          <input
            type="password"
            class="form-control"
            id="confirm-password"
            v-model="formData.confirmPassword"
            @blur="() => validateConfirmPassword(true)"
          />
          <div v-if="errors.confirmPassword" class="text-danger">
            {{ errors.confirmPassword }}
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="isAustralian"
              v-model="formData.isAustralian"
            />
            <label class="form-check-label" for="isAustralian">Australian Resident?</label>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <label for="reason" class="form-label"> Reason for joining </label>
        <textarea
          class="form-control"
          id="reason"
          rows="3"
          @blur="() => validateReason(true)"
          @input="() => validateReason(false)"
          v-model="formData.reason"
        ></textarea>
        <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
        <div v-if="showFriendMessage" class="text-success">Great to have a friend</div>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary me-2">Submit</button>
        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
      </div>
    </form>
  </div>

  <DataTable :value="submittedUsers">
    <template #header>
      <div class="flex mt-2">
        <h2>Submitted Users</h2>
      </div>
    </template>
    <Column field="username" header="Username"></Column>
    <Column field="password" header="Password"></Column>
    <Column field="isAustralian" header="Australian Resident"></Column>
    <Column field="gender" header="Gender"></Column>
    <Column field="reason" header="Reason"></Column>
  </DataTable>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const submittedUsers = ref([])

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validateGender(true)
  validateReason(true)
  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.confirmPassword &&
    !errors.value.gender &&
    !errors.value.reason
  ) {
    if (formData.value.isAustralian) formData.value.isAustralian = 'yes'
    else formData.value.isAustralian = 'no'
    submittedUsers.value.push({
      ...formData.value
    })
    clearForm()
  }
}

const getInitialData = () => ({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: ''
})

const getInitialErrors = () => ({
  username: null,
  password: null,
  confirmPassword: null,
  gender: null,
  reason: null
})

const formData = ref(getInitialData())
const errors = ref(getInitialErrors())
const showFriendMessage = ref(false)

function clearForm() {
  formData.value = getInitialData()
  errors.value = getInitialErrors()
  showFriendMessage.value = false
}

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters.'
  } else if (submittedUsers.value.some((user) => user.username == formData.value.username)) {
    if (blur) errors.value.username = 'A user with that name already exists.'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?:{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) errors.value.gender = 'Gender is required.'
  } else {
    errors.value.gender = null
  }
}

const validateReason = (blur) => {
  if (formData.value.reason.toUpperCase().includes('FRIEND')) {
    showFriendMessage.value = true
  } else {
    showFriendMessage.value = false
  }
  if (formData.value.reason.length <= 10) {
    if (blur) errors.value.reason = 'Reason must be at least 10 characters.'
  } else {
    errors.value.reason = null
  }
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
