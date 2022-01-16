import { logout } from './api/api.js';
import { showCatalog } from './catalog.js';
import { showSection } from './dom.js';
import { showHomePage, showAboutPage } from './home.js';
import { showLoginPage } from './login.js';
import { showRegisterPage } from './register.js';

document.querySelector('nav').addEventListener('click', onNavigate);
document.getElementById('logoutBtn').addEventListener('click', onLogOut);

const views = {
    'home': showHomePage,
    'catalog': showCatalog,
    'about': showAboutPage,
    'login': showLoginPage,
    'register': showRegisterPage
}

const links = {
    'homeBtn': 'home',
    'catalogBtn': 'catalog',
    'aboutBtn': 'about',
    'loginBtn': 'login',
    'registerBtn': 'register'
    // 'logoutBtn': showLoginPage
};

updateUserNav();

const ctx = {
    updateUserNav,
    goTo,
    showSection
}

goTo('home');

function onNavigate(event) {
    if (event.target.tagName == 'A') {
        const name = links[event.target.id];
        if (name) {
            event.preventDefault();
            goTo(name);
        }
    }
}

function goTo(name, ...params) {
    const view = views[name];
    if (typeof view == 'function') {
        view(ctx, ...params);
    }
}

export function updateUserNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData != null) {
        document.getElementById('userNav').style.display = 'inline-block';
        document.getElementById('guestNav').style.display = 'none';
    } else {
        document.getElementById('userNav').style.display = 'none';
        document.getElementById('guestNav').style.display = 'inline-block';
    }
}


async function onLogOut(event){
    event.stopImmediatePropagation();   
    await logout();
    // const {token} = JSON.parse(sessionStorage.getItem('userData'));

    // const res = await fetch('http://localhost:3030/users/logout', {
    //     headers: {
    //         'X-Authorization': token
    //     }
    // });

    sessionStorage.removeItem('userData');
    updateUserNav();
    goTo('home');
}