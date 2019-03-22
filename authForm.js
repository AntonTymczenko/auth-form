// customization:
const options = [
  {
    text: 'Sign in',
    alternativeHint: 'Don\'t have an account?',
    path: '/login',
  },
  {
    text: 'Sign up',
    alternativeHint: 'Already have an account?',
    path: '/register',
  },
]
const alternativeActionHintTail = 'Try to'


// core object
let state = {
  index: 0,
  getAction() {
    return options[this.index]
  },
  getNextIndex() {
    return (this.index + 1) % options.length
  },
  getAlternativeText() {
    return options[this.getNextIndex()].text
  },
  toggle() {
    this.index = this.getNextIndex()
    this.setAction()
  },
  setAction() {
    const current = this.getAction()
    authForm.action = current.path
    submitButton.value = current.text
    authModeSwitch.innerText = this.getAlternativeText()
    authModeSwitch.labels[0].innerText = this.getAction().alternativeHint + ' ' + alternativeActionHintTail
    clearUpTemplate()
  },
}


// DOM manipulations:

function clearUpTemplate() {
  function toggleInputs(show, hide) {
    show.forEach(e => {
      e.classList.remove('hidden')
    })
    hide.forEach(e => {
      e.classList.add('hidden')
    })
  }

  if (state.index === 0) {
    toggleInputs(loginElements, registrationElements)
  } else {
    toggleInputs(registrationElements, loginElements)
  }
}

function showValidationFeedback(err) {
  err.forEach(e => console.error(e))
}



// initialize:

const authForm = document.getElementById('auth')
const submitButton = document.getElementById('auth-submit')
const authModeSwitch = document.getElementById('auth-switch')

const loginElements = document.querySelectorAll('.signin-only')
const registrationElements = document.querySelectorAll('.signup-only')

authForm.addEventListener('submit', e => {
  e.preventDefault()

  function validateForm(cb) {
    const errors = []

    // TODO: make some real validation here
    errors.push(new Error('foobar error'))

    cb(errors.length ? errors : null)
  }

  validateForm(err => {
    if (err) showValidationFeedback(err)
    else authForm.submit()
  })
})

authModeSwitch.addEventListener('click', e => {
  state.toggle()
})

state.setAction() // initial set up
