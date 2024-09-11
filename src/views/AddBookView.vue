<template>
  <h1>Add book</h1>
  <form @submit.prevent="submitForm">
    <div class="row mb-3 d-flex justify-content-center">
      <div class="col-md-7 mb-2">
        <label for="isbn" class="form-label">ISBN:</label>
        <input type="text" class="form-control" id="isbn" v-model="formData.isbn" required />
      </div>
      <p v-if="!formValidation.isIsbnValid && isFormSubmitted" class="text-danger">
        ISBN is required.
      </p>
      <div class="col-md-7 mb-2">
        <label for="name" class="form-label">Name:</label>
        <input type="text" class="form-control" id="name" v-model="formData.name" required />
        <p v-if="!formValidation.isNameValid && isFormSubmitted" class="text-danger">
          Name is required.
        </p>
      </div>
    </div>
    <div class="text-center">
      <button type="submit" class="btn btn-primary me-2">Add Book</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import db from '../firebase/init'
import { useRouter } from 'vue-router'
import { collection, addDoc } from 'firebase/firestore'

const router = useRouter()

const isFormSubmitted = ref(false)

const getInitialData = () => ({
  isbn: 0,
  name: ''
})

const getInitialValidation = () => ({
  isIsbnValid: false,
  isNameValid: false
})

const formData = ref(getInitialData())
const formValidation = ref(getInitialValidation())

const submitForm = async () => {
  try {
    checkValidation()
    isFormSubmitted.value = true

    //the validation is correct
    if (formValidation.value.isIsbnValid && formValidation.value.isNameValid) {
      console.log('valid')
      await addDoc(collection(db, 'books'), {
        isbn: Number(formData.value.isbn),
        name: formData.value.name
      })
      alert('Book added successfully')
      router.push('/')
      clearForm()
    }
  } catch (err) {
    alert('Error adding book: ', err)
  }
}

function checkValidation() {
  const isbnNumber = Number(formData.value.isbn)
  console.log(isbnNumber)

  if (isNaN(isbnNumber)) {
    alert('ISBN must be a valid number')
    return
  }
  if (formData.value.name) {
    formValidation.value.isNameValid = true
  } else {
    formValidation.value.isNameValid = false
  }

  if (formData.value.isbn) {
    formValidation.value.isIsbnValid = true
  } else {
    formValidation.value.isIsbnValid = false
  }
}

function clearForm() {
  formData.value = getInitialData()
  formValidation.value = getInitialValidation()
  isFormSubmitted.value = false
}
</script>
