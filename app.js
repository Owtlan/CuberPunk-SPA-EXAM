import page from '../node_modules/page/page.mjs';
import { html, render } from '/node_modules/lit-html/lit-html.js'


import { registerView } from './src/register.js';
import { loginView } from './src/login.js';
import { logout } from './src/logout.js';
import { catalogView } from './src/dashboard.js';
import { createView } from './src/create.js';
import { detailsView } from './src/details.js';
import { editView } from './src/edit.js';
// import { createSearch } from './src/search.js';

// page('/search', createSearch)
page('/register', registerView)
page('/login', loginView)
page('/dashboard', catalogView)
page('/create', createView)
page('/details/:detailsId', detailsView)
page('/edit/:albumId', editView)
page.start()



//logout
document.querySelector('a[href="/logout"]').addEventListener('click', logout)

export const updateInfo = () => {
    let userDiv = document.querySelector('.user')
    let guestDiv = document.querySelector('.guest')

    if (localStorage.length == 0) {
        userDiv.style.display = 'none'
        guestDiv.style.display = 'inline'
    } else {
        userDiv.style.display = 'inline'
        guestDiv.style.display = 'none'
    }
}
updateInfo()


export function showHomePage() {
    const template = html`
  <section id="hero">
    <img src="./images/home.png" alt="home" />
    <p>We know who you are, we will contact you</p>
  </section>
    `
    render(template, document.querySelector('#main-element'))
}
showHomePage()