const body = document.getElementById('body')
const emailInput = document.getElementById('emailInput')
const passwordInput = document.getElementById('passwordInput')
const buttonInput = document.getElementById('buttonInput')

let userData = {}

emailInput.addEventListener('input', (e) => {
    userData = {
        ...userData,
        email: e.target.value
    }
})

passwordInput.addEventListener('input', (e) => {
    userData = {
        ...userData, 
        password: e.target.value
    }
})

const signInRequest = async () => {
    try {
        console.log('Login send:', userData);

        const res = await fetch('https://ilkinibadov.com/api/b/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })

        console.log('Response status:', res.status)

        if (!res.ok) {
            throw new Error('Login failed')
        }

        const data = await res.json()
        
        console.log(data)

        const token = data.token || data.accessToken || data.access_token
        const refreshToken = data.refreshToken || data.refresh_token

        if (token) {
            localStorage.setItem('accessToken', token)
            sessionStorage.setItem('accessToken', token)

            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken)
                sessionStorage.setItem('refreshToken', refreshToken)
            }

        } else {
            alert('Token not received')
        }

    } catch (error) {
        console.error('Login error:', error.message)
        alert('Email or password is incorrect!')
    }
}

buttonInput.addEventListener('click', () => {
    console.log('Button Clicked!');
    signInRequest()
})


const darkmodeBtn = document.getElementById("darkmodeBtn")

darkmodeBtn.addEventListener("click", () => {

  const darkmode = localStorage.getItem("darkmode")
  localStorage.setItem("darkmode", darkmode === "light" ? "dark" : "light")

  const currentMode = localStorage.getItem("darkmode")
  console.log(currentMode);

  const body = document.getElementById("body")

  if (currentMode === "light") {
    body.classList.remove("bg-slate-900", "text-white")
    body.classList.add("bg-white", "text-black")
  } else {
    body.classList.remove("bg-white", "text-black")
    body.classList.add("bg-slate-900", "text-white")
  }

})

window.addEventListener("DOMContentLoaded", () => {
    const savedMode = localStorage.getItem("darkmode") || "light"
  
    const body = document.getElementById("body")
  
    if (savedMode === "light") {
      body.classList.remove("bg-slate-900", "text-white")
      body.classList.add("bg-white", "text-black")
    } else {
      body.classList.remove("bg-white", "text-black")
      body.classList.add("bg-slate-900", "text-white")
    }
  })