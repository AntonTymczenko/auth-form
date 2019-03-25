// customization:
const animationHalfPeriod = 500 // make sure to match with CSS variable '--animation-half-period'
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
    return this.index === 0 ? 1 : 0
  },
  getAlternativeText() {
    return options[this.getNextIndex()].text
  },
  toggle() {
    authForm.classList.remove('goAway', 'comeBack')
    authForm.classList.add('goAway')
    setTimeout(() => {
      this.index = this.getNextIndex()
      this.setAction()
      authForm.classList.remove('goAway')
      authForm.classList.add('comeBack')
    }, animationHalfPeriod)
  },
  setAction() {
    const current = this.getAction()
    authForm.action = current.path
    submitButton.value = current.text
    authModeSwitch.innerText = this.getAlternativeText()
    authModeSwitch.labels[0].innerText = this.getAction().alternativeHint + ' ' + alternativeActionHintTail
    clearUpTemplate()
    setSocialLinksPaths()
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

function setSocialLinksPaths() {
  socialLinks.forEach(l => {
    l.href = state.getAction().path + '?social=' + l.dataset.socialType
  })
}

function showValidationFeedback(err) {
  err.forEach(e => console.error(e))
}



// initialize:

const authForm = document.getElementById('auth')
const socialLinks = document.querySelectorAll('.social')
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
