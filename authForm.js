// customization:
const submitTextOptions = ['Sign in', 'Sign up']
const alternativeActionHints = ['Don\'t have an account?', 'Already have an account?']
const alternativeActionHintTail = 'Try to'
const paths = ['/login', '/register']

// action options
const actions = [
  {
    path: paths[0],
    text: submitTextOptions[0],
    alternativeHint: alternativeActionHints[0],
  },
  {
    path: paths[1],
    text: submitTextOptions[1],
    alternativeHint: alternativeActionHints[1],
  },
]


// core object
let state = {
  index: 0,
  getAction() {
    return actions[this.index]
  },
  getNextIndex() {
    return (this.index + 1) % actions.length
  },
  getAlternativeText() {
    return actions[this.getNextIndex()].text
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
