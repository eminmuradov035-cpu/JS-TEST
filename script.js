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

    console.log('Email:', e.target.value);
})

passwordInput.addEventListener('input', (e) => {
    userData = {
        ...userData, 
        password: e.target.value
    }

    console.log('Password:', e.target.value);
})

const singInRequest = () => {
    console.log('Login send');
    console.log(userData);
}

buttonInput.addEventListener('click', () => {
    console.log('Button Clicked!');
    singInRequest()
})