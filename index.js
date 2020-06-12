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
        <li>
            <h2>Name of Bookmark</h2>
            <h2> </h2>
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
  <legend>Add Bookmark Info:</legend>
    <div class="star-rating-in-form" id="star-rating-input">
        <input type="radio" id="star5" name="rating" value="5"/><label for="star5" title="Rocks!">5 stars</label>
        <input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="Pretty good">4 stars</label>
        <input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="Meh">3 stars</label>
        <input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="Kinda bad">2 stars</label>
        <input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="Sucks big time">1 star</label>

    </div>
    <input class="bookmark-input" id="bookmark-name"  type="text" placeholder="title of bookmark" required />
    <textarea class="bookmark-input" id="bookmark-desc" type="text" placeholder="description"/>
    <input class="bookmark-input" id="bookmark-url" type="text" placeholder="https://www.google.com/" required />
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
    console.log(`handler reset working`);
    return renderHomeScreen();
  });
}

function handleBookmarkSubmitButton(){
    console.log(`handleBookmarkSumitButton is running`);
  $('main').on('click', '#add-bookmark',  event => {
    event.preventDefault();
    console.log(`handleBookmarkSumitButton is running after click`);
    const newBookmark = {};
    newBookmark.title = $('#bookmark-name').val();
    newBookmark.url = $('#bookmark-url').val();
    newBookmark.desc = $('#bookmark-desc').val();
    newBookmark.rating = $("input[name='rating']:checked").val();
    console.log(newBookmark);
    console.log(newBookmark.title);
    console.log(newBookmark.url);
    console.log(newBookmark.desc);
    console.log(newBookmark.rating);
    api.createBookmark(newBookmark)
      .then((newBookmark) => console.log(newBookmark));
  });
}


function handleEverything(){
  $(renderHomeScreen);
  $(handleAddButton);
  $(handleCancelButton);
  $(handleBookmarkSubmitButton);
}

$(handleEverything);

export default {
  handleBookmarkSubmitButton,
  renderHomeScreen
};