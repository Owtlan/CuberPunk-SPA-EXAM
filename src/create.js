import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';
import { showError } from './errorms.js';

const createTemplate = () => html`
 <section id="create">
    <div class="form form-item">
      <h2>Add Item</h2>
      <form class="create-form" @submit=${addItem}>
        <input type="text" name="item" id="item" placeholder="Item" />
        <input
          type="text"
          name="imageUrl"
          id="item-image"
          placeholder="Your item Image URL"
        />
        <input
          type="text"
          name="price"
          id="price"
          placeholder="Price in Euro"
        />
        <input
          type="text"
          name="availability"
          id="availability"
          placeholder="Availability Information"
        />
        <input
          type="text"
          name="type"
          id="type"
          placeholder="Item Type"
        />
        <textarea
          id="description"
          name="description"
          placeholder="More About The Item"
          rows="10"
          cols="50"
        ></textarea>
        <button type="submit">Add</button>
      </form>
    </div>
  </section>
`

function addItem(e) {
    e.preventDefault()

    let item = document.getElementById('item').value
    let imageUrl = document.getElementById('item-image').value
    let price = document.getElementById('price').value
    let availability = document.getElementById('availability').value
    let type = document.getElementById('type').value
    let description = document.getElementById('description').value

    if (item === '' || imageUrl === '' || price === '' || availability === ''|| type === ''|| description === '') {
        showError('you need to fill all fields')
        return
    }


    fetch('http://localhost:3030/data/cyberpunk', {
        method: 'POST',
        headers: {
            'X-Authorization': localStorage.token
        },
        body: JSON.stringify({
            item,
            imageUrl,
            price,
            availability,
            type,
            description

        })
    })
        .then(res => res.json())
        .then(data => {
            page.redirect('/dashboard')
        })
        .catch(error => alert(error.message))
}

export const createView = (ctx) =>
    render(createTemplate(), document.querySelector('#main-element'))