'use strict';

let getElement = selector => document.querySelector(selector);

let allUsers = [];

let firstName = getElement('#first-name');
let lastName = getElement('#last-name');
let email = getElement('#email');
let password = getElement('#password');
let signUpButton = getElement('#sign-up');
let signUpFirstName = getElement('#signUpFirstName');
let signUpLaststName = getElement('#signUpLastName');
let signUpEmail = getElement('#signUpEmail');
let signUpEmailExist = getElement('#signUpEmailExist');
let signUpPassword = getElement('#signUpPassword');
let signInSwitcher = getElement('#signInSwitcher');
let signUpSwitcher = getElement('#signUpSwitcher');
let signInEmail = getElement('#signInEmail');
let signInPassword = getElement('#signInPassword');
let signUpUserButton = getElement('#signUpUserButton');

let textRegExp = /^[a-zA-Zа-яА-Я]{4,16}$/;
let passwordRegExp = /^[a-zA-Zа-яА-Я0-9_\-.]{4,14}$/;
let emailRegExp = /^.+@.+$/;

function clear () {
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    password.value = '';
};

signInSwitcher.addEventListener('click', () => {
    getElement('.sign-up-window').classList.add('hidden');
    getElement('.sign-in-window').classList.remove('hidden');
});

signUpSwitcher.addEventListener('click', () => {
    getElement('.sign-up-window').classList.remove('hidden');
    getElement('.sign-in-window').classList.add('hidden');
});

firstName.addEventListener('blur', ()=> {
   let checkText =  textRegExp.test(event.target.value);
   if (!checkText) {
        firstName.classList.add('error-signal');
        signUpFirstName.classList.remove('hidden');
   }
   else {
        firstName.classList.remove('error-signal');
        signUpFirstName.classList.add('hidden');
   }
});

lastName.addEventListener('blur', ()=> {
    let checkText =  textRegExp.test(event.target.value);
    if (!checkText) {
        lastName.classList.add('error-signal');
        signUpLastName.classList.remove('hidden');
    }
    else {
        lastName.classList.remove('error-signal');
        signUpLastName.classList.add('hidden');
    }
 });

email.addEventListener('blur', ()=> {
   let checkEmail =  emailRegExp.test(event.target.value);
   if (!checkEmail) {
        email.classList.add('error-signal');
        signUpEmail.classList.remove('hidden');
   }
   else {
        email.classList.remove('error-signal');
        signUpEmail.classList.add('hidden');
   }
});

password.addEventListener('blur', ()=> {
    let checkPassword =  passwordRegExp.test(event.target.value);
    if (!checkPassword) {
        password.classList.add('error-signal');
        signUpPassword.classList.remove('hidden');
    }
    else {
        password.classList.remove('error-signal');
        signUpPassword.classList.add('hidden');
    }
});

getElement('#signUpButton').addEventListener('click', () => {
    let testFirstName = textRegExp.test(firstName.value);
    let testLastName = textRegExp.test(lastName.value);
    let testPassword = passwordRegExp.test(password.value);
    let testEmail = emailRegExp.test(email.value);
    if (testFirstName && testLastName && testPassword && testEmail) {
        let newUser = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value
        };
        if(!localStorage.getItem('allUsers')) {
            allUsers.push(newUser);
            localStorage.setItem('allUsers', JSON.stringify(allUsers));
            clear();
        }
        else if (localStorage.getItem('allUsers')) {
            allUsers = JSON.parse(localStorage.getItem('allUsers'));

            let checkElement = false;

            allUsers.forEach(element => {
                if(element.email === email.value) {
                    return checkElement = true;
                };
            });

            if(checkElement) {
                email.value = '';
                signUpEmailExist.classList.remove('hidden');
            }
            else {
                allUsers.push(newUser);
                localStorage.setItem('allUsers', JSON.stringify(allUsers));
                signUpEmailExist.classList.add('hidden');
                clear();
            };
        };
    }   
    else {
        alert('Перевірте правильність заповнення форми');
    }
});

getElement('#signInButton').addEventListener('click', () => {
    if (localStorage.length == 0 && localStorage.getItem('allUsers')) {
        getElement('.emptyStorage-error').classList.remove('hidden');
    }
    else {
        allUsers = JSON.parse(localStorage.getItem('allUsers'));
        allUsers.forEach(element => {
            if(element.email === signInEmail.value && element.password === signInPassword.value) {
                getElement('.incorrect-error').classList.add('hidden');
                getElement('.emptyStorage-error').classList.add('hidden');
                getElement('.sign-in-window').classList.add('hidden');
                getElement('.user-window').classList.remove('hidden');
                getElement('.user-name').textContent = `${element.firstName} ${element.lastName}`;
                getElement('.user-email').textContent = element.email;
                signInEmail.value = '';
                signInPassword.value = '';
            }
            else {
                getElement('.incorrect-error').classList.remove('hidden');
            }
        });
    }
});

getElement('#signUpUserButton').addEventListener('click', () => {
    getElement('.user-window').classList.add('hidden');
    getElement('.sign-in-window').classList.remove('hidden');
});