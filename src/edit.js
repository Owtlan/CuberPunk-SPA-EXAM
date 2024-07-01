import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';
import { showError } from './errorms.js';

const editTemplate = (album, onSubmit) => html`
   <section id="edit">
    <div class="form form-item">
      <h2>Edit Your Item</h2>
      <form class="edit-form" @submit=${onSubmit}>
        <input type="text" name="item" id="item" placeholder="Item" .value=${album.item}
        />
        <input
          type="text"
          name="imageUrl"
          id="item-image"
          placeholder="Your item Image URL"
           .value=${album.imageUrl}
           />
        <input
          type="text"
          name="price"
          id="price"
          placeholder="Price in Euro"
           .value=${album.price}
           />
        <input
          type="text"
          name="availability"
          id="availability"
          placeholder="Availability Information"
           .value=${album.availability}
           />
        <input
          type="text"
          name="type"
          id="type"
          placeholder="Item Type"
           .value=${album.type}
           />
        <textarea
          id="description"
          name="description"
          placeholder="More About The Item"
          rows="10"
          cols="50">${album.description}</textarea>
        <button type="submit">Edit</button>
      </form>
    </div>
  </section>
`

const getAlbumDetails = (id) => {

    return fetch(`http://localhost:3030/data/cyberpunk/${id}`)
        .then(res => res.json())
};

const editAlbum = (id, album) => {
    console.log(id);
    return fetch(`http://localhost:3030/data/cyberpunk/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(album)
    })
        .then(res => res.json())
};


export const editView = (ctx) => {
    const albumId = ctx.params.albumId
    console.log(ctx.params);
    getAlbumDetails(albumId)
        .then(album => {
            const onSubmit = (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);

                let item = document.getElementById('item').value
                let imageUrl = document.getElementById('item-image').value
                let price = document.getElementById('price').value
                let availability = document.getElementById('availability').value
                let type = document.getElementById('type').value
                let description = document.getElementById('description').value
               
                if (item === '' || imageUrl === '' || price === '' || availability === '' || type === '' || description === '') {
                    showError('you need to fill all fields')
                    return
                }


                const editedAlbum = {
                    item,
                    imageUrl,
                    price,
                    availability,
                    type,
                    description
                };
                if (Object.values(editedAlbum).some(field => field.trim() === '')) {
                    return alert('All fields are required!');
                }

                editAlbum(albumId, editedAlbum)
                    .then(() => {
                        page.redirect(`/details/${albumId}`);
                    });
            }
            render(editTemplate(album, onSubmit), document.querySelector('#main-element'))
        })
}