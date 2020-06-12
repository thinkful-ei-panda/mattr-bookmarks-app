import api from './api.js';

const generateHomeScreen = function () {
  $('main').html(`
  <form id="add-filter">
    <ul class="two-buttons">
    <button class="btn" class="add-btn">Add</button>
    <button class="btn">Filter</button>
    </ul>
    </form>
    <section>
    <ul class="bookmarks-list"> 
        <li class="bookmark-container">
            <h2>GitHub</h2>
            <h2 class="home-stars"> &#9734; &#9734; &#9734; &#9734; &#9734; </h2>
            <p>This is my favorite search engine</p>
            <a href="https://github.com/" class="btn" target="blank">Go to GitHub</a>
            <button id="delete-btn" class="delete-btn" type="click">Delete</button>
        </li>
        <li class="bookmark-container">
            <h2>YouTube</h2>
            <h2 class="home-stars"> &#9734; &#9734; &#9734; &#9734;</h2>
            <p>This is my favorite video site</p>
            <a href="https://youtube.com/" class="btn" target="blank">Go to YouTube</a>
            <button id="delete-btn" class="delete-btn" type="click">Delete</button>
        </li>
    </ul>
    </section>`);
};

function renderHomeScreen(){
  generateHomeScreen();
}


const generateAddScreen = function () {
  $('main').html(`
  <form class="add-bookmark-form">
  <fieldset>
  <legend>Add Bookmark</legend>
    <div class="star-rating-in-form">
        <input type="radio" id="star5" name="rating" value="5"/><label for="star5">5 stars</label>
        <input type="radio" id="star4" name="rating" value="4" /><label for="star4">4 stars</label>
        <input type="radio" id="star3" name="rating" value="3" /><label for="star3">3 stars</label>
        <input type="radio" id="star2" name="rating" value="2" /><label for="star2">2 stars</label>
        <input type="radio" id="star1" name="rating" value="1" /><label for="star1">1 star</label>
    </div>
    <label for="bookmark-name">Name</label>
    <input id="bookmark-name" class="bookmark-input" type="text" placeholder="Google" required />
    <textarea class="bookmark-input" type="text" placeholder="description"/>
    <input class="bookmark-input" type="url" placeholder="https://www.google.com/" required />
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
  $('main').on("click", "#add-filter", event =>{
    event.preventDefault();
    console.log(`handle Add Button is running`)
    return renderAddScreen();
  })
}



function handleCancelButton(){
  $('main').on('click', '#cancel',  event => {
    event.preventDefault();
    console.log(`handler reset running`);
    return renderHomeScreen();
  });
}

function handleDeleteButton(){
  $('main').on('click', '#delete-btn',  event => {
    event.preventDefault();
    console.log(`handlerDeleteButton is running`);
    // return renderHomeScreen();
  });
}



function handleEverything(){
  renderHomeScreen();
  handleAddButton();
  handleCancelButton();
  handleDeleteButton();
}

$(handleEverything)