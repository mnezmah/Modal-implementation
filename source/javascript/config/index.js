/**
 * Configure all the singleton modules in this file.
 * That way the main.js stays clean :)
 *
 * Feel free to create folders inside this directory and import the configs here.
 */

import Environment from '@utilities/environment'
import { initServiceWorker, removeServiceWorker } from '@utilities/sw'

// Service workers
if (!Environment.isLocal) {
  initServiceWorker()
} else {
  removeServiceWorker()
}
// ----

import API from '@utilities/api'

console.log('Hi from config-JS  😃')

const modal = document.querySelector('#modal-subsc')
const openButton = document.querySelector('.hero__cta')
const videoDiv = document.querySelector('.video__player')
const closeButton = document.querySelector('.modal__button-close')
const emailInput = document.querySelector('#email')
const firstNameInput = document.querySelector('.input__first')
const lastNameInput = document.querySelector('.input__last')
const firstInput = document.querySelector('#first')
const lastInput = document.querySelector('#last')
const message = document.querySelector('.message')
const submitButton = document.querySelector('.modal__button-submit')
const backtButton = document.querySelector('.modal__button-back')

//open modal with button 'open modal'
openButton.addEventListener('click', openModal)
function openModal() {
  modal.classList.toggle('modal--is-showing')
  modal.classList.add('modal-subsc')

  //pause the video
  videoDiv.firstChild.pause()

  //show the close button
  closeButton.style.visibility = 'visible'

  //style the close button
  closeButton.classList.add('modal__button-round')

  //hide the subscribe button
  openButton.classList.add('hidden')
}

//close modal with x button
closeButton.addEventListener('click', closeModal)
closeButton.addEventListener('keypress', closeModal)
function closeModal() {
  modal.classList.toggle('modal--is-showing')

  //resume the video
  videoDiv.firstChild.play()

  //show the subscribe button
  openButton.classList.remove('hidden')
}

//expand the form on email input
emailInput.addEventListener('click', showHiddenForm)
function showHiddenForm() {
  firstNameInput.classList.remove('hidden')
  lastNameInput.classList.remove('hidden')
  document.querySelector('.modal__button-back').classList.remove('hidden')
  document.querySelector('.modal__button-submit').classList.remove('hidden')
}

//Form validation
submitButton.addEventListener('click', validate)
function validate() {
  if (emailInput.value == '') {
    alert('Please provide your Email!')
    emailInput.focus()
    return false
  }
  if (firstInput.value == '') {
    alert('Please provide your First name!')
    firstInput.focus()
    return false
  }
  if (lastInput.value == '') {
    alert('Please provide your Last name!')
    lastInput.focus()
    return false
  }
  validateEmail()
  return true
}

//API call
function callApi() {
  API.post('https://jsonplaceholder.typicode.com/users', {
    data: {
      name: `${firstInput.value} ${lastInput.value}`,
      email: `${emailInput.value}`,
    },
  })
    .then(response => (response.status == 201 ? wentWell() : wentWrong()))
    .catch(response => console.log('error:', response))
}

function wentWell() {
  console.log('went well triggered')
  //hide the modal
  modal.classList.add('hidden')
  // show success toast
  document.querySelector('.toast__bedankt').classList.remove('hidden')
  //resume the video
  videoDiv.firstChild.play()
}

function wentWrong() {
  console.log('went Wrong triggered')
  message.innerHTML = 'Ups, something went wrong'
  emailInput.classList.add('hidden')
  firstInput.classList.add('hidden')
  lastInput.classList.add('hidden')
  submitButton.classList.add('hidden')
  backtButton.addEventListener('click', showForm)
}

function showForm() {
  emailInput.classList.remove('hidden')
  firstInput.classList.remove('hidden')
  lastInput.classList.remove('hidden')
  submitButton.classList.remove('hidden')
  message.innerHTML = 'Niks willen missen van onze nieuwtjes en acties?'
}

function validateEmail() {
  const emailValue = emailInput.value
  const atPosition = emailValue.indexOf('@')
  const dotPosition = emailValue.lastIndexOf('.')
  if (atPosition < 1 || dotPosition - atPosition < 2 || dotPosition == emailValue.length - 1) {
    alert('Please enter a valid e-mail address')
    emailInput.focus()
    return false
  }
  callApi()
}
