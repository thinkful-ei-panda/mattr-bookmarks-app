import store from './store.js';
import api from './api.js';

const generateHomeScreen = function (filteredBookmarks, selectedIndex) {
  let listItemsString = (filteredBookmarks) ? generateBookmarksString(filteredBookmarks)  : generateBookmarksString(store.bookmarks);
  console.log(listItemsString);
  $('main').html(`
  <form  class="animate__animated animate__backInDown" id="add-filter">
    <ul class="two-buttons">
    <button class="btn" id="add-btn">Add</button>
    
  <select name="star-filter" id="stars" class="home-stars">
    <option class="home-stars" value="1">&#9734; </option>
    <option class="home-stars" value="2">&#9734; &#9734; </option>
    <option class="home-stars" value="3">&#9734; &#9734; &#9734; </option>
    <option class="home-stars" value="4">&#9734; &#9734; &#9734; &#9734; </option>
    <option class="home-stars" value="5">&#9734; &#9734; &#9734; &#9734; &#9734; </option>
  </select>
</form>

    </ul>
    </form>
    <section>
    <ul class="bookmarks-container animate__animated animate__backInUp"">
    ${listItemsString}
    </ul>
    </section>`);
  handleStarFilterButton();
};

function renderHomeScreen(){
  console.log(`render home screen is running`);
  generateHomeScreen();
}

const generateBookmarkElement = function(item){
  if(item.expanded === false){
    return `
    <li class="bookmark-container">
    <h2>${item.title}</h2>
    <h2 class="bookmark-stars"> ${item.rating} </h2>
    
    <div class="two-buttons">
  
    <button id="expand-btn" class="btn" type="click" value="${item.id}">Expand</button>
    </div>
    </li>`;
  }else{
    return `
    <li class="bookmark-container">
    <h2>${item.title}</h2>
    <h2 class="bookmark-stars"> ${item.rating} </h2>
    <p class="hidden">${item.desc}</p>
    <div class="two-buttons">
    <a href="${item.url}" id="url-btn" class="hidden" target="blank">${item.title}</a>
    <button id="delete-btn" class="hidden" type="click" value="${item.id}">Delete</button>
    <button id="expand-btn" class="btn" type="click" value="${item.id}">Expand</button>
    </div>
    </li>`; }
};

const generateBookmarksString = function (arr) {
  const items = arr.map((item) => generateBookmarkElement(item));
  return items.join('');
};


const generateAddScreen = function () {
  $('main').html(`
  <form class="add-bookmark-form">
  <fieldset>
  <legend>Add Bookmark</legend>
    <div class="star-rating-in-form">
        <input type="radio" id="star" name="rating" value="5"/><label for="star5" required>5 stars</label>
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
// **************************HANDLER FUNCTIONS***************************

function handleExpandButton(){
  $('main').on('click', '#expand-btn',  event => {
    event.preventDefault();
    console.log(`handleExpandButton is running`)
    let selectedBookmark = store.findById(event.currentTarget.value);
    store.toggleExpanded(selectedBookmark);
    return renderHomeScreen();
  });
}

function handleAddButton() {
  $('main').on('click', '#add-btn', event =>{
    event.preventDefault();
    return renderAddScreen();
  });
}

function handleCancelButton(){
  $('main').on('click', '#cancel',  event => {
    event.preventDefault();
    return renderHomeScreen();
  });
}

function handleStarFilterButton(){
  $('#stars').on('change',  event => {
    let starArr = store.bookmarks.filter(item => {
      return item.rating >= event.currentTarget.value;
    });
    generateHomeScreen(starArr);
    $("#stars").val(event.currentTarget.value)
  });
}


// const getItemIdFromElement = function (item) {
//   return $(item)
//     .parent('#delete-btn')
//     .data('item-id');
// };

function handleDeleteButton(){
  $('main').on('click', '#delete-btn',  event => {
    event.preventDefault();
    console.log('handlerDeleteButton is running');
    const id = event.target.value;
    console.log();
 
    api.deleteBookmarks(id)
      .then(() => {
        store.findAndDelete(id);
        renderHomeScreen();
      })
      .catch((error) => {
        console.log(error);
        store.setError(error.message);
        // renderError();
      });
    renderHomeScreen();
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
    newBookmark.expanded = false;
    console.log(newBookmark);

    api.createBookmarks(newBookmark)
      .then((newBookmark) => {
        store.addBookmark(newBookmark); 
      }).then(() => renderHomeScreen())


  });
};



function handleEverything(){
  renderHomeScreen();
  handleAddButton();
  handleSubmitButton();
  handleCancelButton();
  handleDeleteButton();
  handleExpandButton();
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