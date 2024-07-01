import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';



let dashboardTemplate = (catalog) => html`
  <h3 class="heading">Market</h3>
  <section id="dashboard">
    <!-- Display a div with information about every post (if any)-->
      ${catalog.length > 0 ? catalog.map(c => html`
    <div class="item">
      <img src="${c.imageUrl}" alt="example1" />
      <h3 class="model">${c.item}</h3>
      <div class="item-info">
        <p class="price">Price: €${c.price}</p>
        <p class="availability">
         ${c.availability}
        </p>
        <p class="type">Type: ${c.type}</p>
      </div>
      <a class="details-btn" href="/details/${c._id}">Uncover More</a>
    </div>
      `) : html`
      <h3 class="empty">No Items Yet</h3>
      `}
  </section>
  <!-- Display an h2 if there are no posts -->
     `

const getCatalog = () => {
    return fetch('http://localhost:3030/data/cyberpunk?sortBy=_createdOn%20desc')
        .then(res => res.json())
        .then(data => Object.values(data))
}

export const catalogView = (ctx) =>
    getCatalog()
        .then(catalog => render(dashboardTemplate(catalog), document.querySelector('#main-element')))