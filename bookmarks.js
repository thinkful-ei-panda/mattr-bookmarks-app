import store from './store.js';
import api from './api.js';
import generators from './generators.js';

function renderHomeScreen(){
  generators.generateHomeScreen();
}

function renderAddScreen(){
  generators.generateAddScreen();
}
// **************************HANDLER FUNCTIONS***************************

function handleExpandButton(){
  $('main').on('click', '#expand-btn',  event => {
    event.preventDefault();
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

// function handleStarFilterButton(){
//   $('#stars').on('change',  event => {
//     let starArr = store.bookmarks.filter(item => {
//       return item.rating >= event.currentTarget.value;
//     });
//     generators.generateHomeScreen(starArr);
//     $("#stars").val(event.currentTarget.value)
//   });
// }

function handleDeleteButton(){
  $('main').on('click', '#delete-btn',  event => {
    event.preventDefault();
    const id = event.target.value;
 
    api.deleteBookmarks(id)
      .then(() => {
        store.findAndDelete(id);
        renderHomeScreen();
      })
      .catch((error) => {
        console.log(error);
        store.setError(error.message);
      });
    renderHomeScreen();
  });
}
 

const handleSubmitButton = function (){
  $('main').on('submit', '.add-bookmark-form',  event => {
    event.preventDefault();
    const newBookmark = {};
    newBookmark.title = $('#bookmark-name').val();
    newBookmark.url = $('#url').val();
    newBookmark.desc = $('#desc').val();
    newBookmark.rating = $('input[name=rating]:checked').val()
    newBookmark.expanded = false;

    api.createBookmarks(newBookmark)
      .then((newBookmark) => {
        store.addBookmark(newBookmark); 
      }).then(() => renderHomeScreen());
  });
};

function bindEventListeners(){
  renderHomeScreen();
  handleAddButton();
  handleSubmitButton();
  handleCancelButton();
  handleDeleteButton();
  handleExpandButton();
}

$(bindEventListeners);

export default {
  bindEventListeners,
  renderHomeScreen,
}