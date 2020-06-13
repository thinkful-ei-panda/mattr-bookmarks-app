

import store from './store.js';
import api from './api.js';

const generateHomeScreen = function () {
  console.log(store.bookmarks)
  $('main').html(`
  <form id="add-filter">
    <ul class="two-buttons">
    <button class="btn" id="add-btn">Add</button>
    <button class="btn">Filter</button>
    </ul>
    </form>
    <section>
    <ul class="bookmarks-list"> 
    ${generateBookmarksString(api.getBookmarks)}
    </ul>
    </section>`);
};

function renderHomeScreen(){
  console.log(`render home screen is running`)
 
//   console.log(store.bookmarks);
  generateHomeScreen();
}

const generateBookmarksString = function (bookmarksList) {
  console.log('mapped new list items');
//  bookmarksList.map(item => console.log(item));
console.log(bookmarksList.class + "          " + bookmarksList.length);
//   const bookmarks = bookmarksList.map((bookmark) => generateBookmarkElement(bookmark));
if(bookmarksList.length > 0)
  {return generateBookmarkElement(bookmarksList);}

//   return bookmarks.join('');
};

const generateBookmarkElement = function (bookmark) {
  console.log('generateBookmarkElement is running');
  return `
    <li class="js-bookmark-element">
    <h2>${bookmark.title}</h2>
    <h2 class="home-stars"> ${bookmark.rating} </h2>
    <p>${bookmark.desc}</p>
    <a href="${bookmark.url}" class="btn" target="blank">${bookmark.title}</a>
    <button id="delete-btn" class="delete-btn" type="click">Delete</button>
    </li>`;
};
  


const generateAddScreen = function () {
  $('main').html(`
  <form class="add-bookmark-form">
  <fieldset>
  <legend>Add Bookmark</legend>
    <div class="star-rating-in-form">
        <input type="radio" id="star" name="rating" value="5"/><label for="star5">5 stars</label>
        <input type="radio" id="star" name="rating" value="4" /><label for="star4">4 stars</label>
        <input type="radio" id="star" name="rating" value="3" /><label for="star3">3 stars</label>
        <input type="radio" id="star" name="rating" value="2" /><label for="star2">2 stars</label>
        <input type="radio" id="star" name="rating" value="1" /><label for="star1">1 star</label>
    </div>
    <label for="bookmark-name">Name</label>
    <input id="bookmark-name" class="bookmark-input" type="text" placeholder="Google" required />
    <textarea id="desc" class="bookmark-input" type="text" placeholder="description"/>
    <input id="url" class="bookmark-input" type="url" placeholder="https://www.google.com/" required />
    <div class="two-buttons">
    <input class="btn" type="submit" id="add-bookmark"></input>
    <button class="btn" type="click" id="cancel">Cancel</button>
</div>
  </fieldset>
  </form>`);
};
  
function renderAddScreen(){
  generateAddScreen();
}

// $(renderAddScreen);

function handleAddButton() {
  $('main').on('click', '#add-btn', event =>{
    event.preventDefault();
    console.log('handle Add Button is running');
    return renderAddScreen();
  });
}

function handleCancelButton(){
  $('main').on('click', '#cancel',  event => {
    event.preventDefault();
    console.log('handler reset running');
    return renderHomeScreen();
  });
}

function handleDeleteButton(){
  $('main').on('click', '#delete-btn',  event => {
    event.preventDefault();
    console.log('handlerDeleteButton is running');
    // return renderHomeScreen();
  });
}

const handleSubmitButton = function (){
  $('main').on('click', '#add-bookmark',  event => {
    event.preventDefault();
    const newBookmark = {};
    newBookmark.title = $('#bookmark-name').val();
    newBookmark.url = $('#url').val();
    newBookmark.desc = $('#desc').val();
    newBookmark.rating = $('input[name=rating]:checked').val()
    console.log(newBookmark);
    console.log(newBookmark.title);
    console.log(newBookmark.url);
    console.log(newBookmark.desc);
    console.log(newBookmark.rating);
    api.createBookmarks(newBookmark)
      .then((newBookmark) => {
        store.addBookmark(newBookmark);
        renderHomeScreen();
      })
      .catch((error) =>{
        store.setError(error.message);
      });
  });
};


function handleEverything(){
  renderHomeScreen();
  handleAddButton();
  handleSubmitButton();
  handleCancelButton();
  handleDeleteButton();
}

$(handleEverything);

export default {
  handleEverything,
  renderHomeScreen,
  handleSubmitButton,
  handleDeleteButton,
  handleCancelButton,
  handleAddButton

};