import { e, showSection } from './dom.js';
import { showHomePage } from './home.js';
import { updateUserNav } from './app.js';
import * as api from './api/data.js';

const section = document.getElementById('loginSection');
section.remove();

const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

let ctx = null;

export function showLoginPage(ctxTarget) {
    ctx = ctxTarget;
    ctx.showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');

    await api.login(email, password);

    ctx.updateUserNav();
    ctx.goTo('home');


    // try {
    //     const res = await fetch('http://localhost:3030/users/login', {
    //         method: 'post',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({email, password})
    //     });

    //     if(res.ok != true) {
    //         const error = await res.json();
    //         throw new Error(error.message)
    //     }

    //     const data = res.json();
    //     const userData = {
    //         username: data.username,
    //         id: data._id,
    //         token: data.accessToken
    //     }

    //     sessionStorage.setItem('userData', JSON.stringify(userData));
    // updateUserNav();
    // showHomePage();

    // } catch(err) {
    //     alert(err.message)
    // }
}
