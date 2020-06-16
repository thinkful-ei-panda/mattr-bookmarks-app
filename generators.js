import store from './store.js';

function generateHomeScreen(filteredBookmarks) {
  let listItemsString = (filteredBookmarks) ? generateBookmarksString(filteredBookmarks) : generateBookmarksString(store.bookmarks);
  $('main').html(`
    <form id="add-filter">
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
      <ul class="bookmarks-container">
      ${listItemsString}
      </ul>
      </section>`);
  handleStarFilterButton();
};

function generateBookmarkElement(item){
  let starIconArr = [];
  for(let i = 0; i < item.rating; i++){
    starIconArr.push('&#9734;');
  }
  
  if(item.expanded === false){
    return `
      <li class="bookmark-container">
      <h2>${item.title}</h2>
      <h2 class="bookmark-stars"> ${starIconArr.join(' ')} </h2>
      <div class="two-buttons">
      <button id="expand-btn" class="btn" type="click" value="${item.id}">Expand</button>
      </div>
      </li>`;
  }else{
    return `
      <li class="bookmark-container animate__animated animate__pulse">
      <h2>${item.title}</h2>
      <h2 class="bookmark-stars"> ${starIconArr.join(' ')} </h2>
      <p>${item.desc}</p>
      <div class="two-buttons">
      <a href="${item.url}" id="url-btn" target="blank">Go</a>
      <button id="delete-btn" type="click" value="${item.id}">Delete</button>
      <button id="expand-btn" class="btn" type="click" value="${item.id}">Collapse</button>
      </div>
      </li>`; }
};

function generateBookmarksString(arr) {
  const items = arr.map((item) => generateBookmarkElement(item));
  return items.join('');
};

function generateAddScreen() {
  $('main').html(`
    <form class="add-bookmark-form animate__animated animate__zoomInDown">
    <fieldset>
    <legend>Add Bookmark</legend>
      <div class="star-rating-in-form">
          <input type="radio" id="star" name="rating" value="5" checked/><label for="star5">5 &#9734; </label>
          <input type="radio" id="star" name="rating" value="4" /><label for="star4">4 &#9734; </label>
          <input type="radio" id="star" name="rating" value="3" /><label for="star3">3 &#9734; </label>
          <input type="radio" id="star" name="rating" value="2" /><label for="star2">2 &#9734; </label>
          <input type="radio" id="star" name="rating" value="1" /><label for="star1">1 &#9734; </label>
      </div>
      <label for="bookmark-name">Name</label>
      <input id="bookmark-name" class="bookmark-input" type="text" placeholder="Name of bookmark" required />
      <textarea id="desc" class="bookmark-input" type="text" placeholder="description"/>
      <input id="url" class="bookmark-input" type="url" placeholder="url" pattern="https://.*" required />
      <div class="two-buttons">
      <input class="btn" type="submit" id="add-bookmark" required></input>
      <button class="btn" type="click" id="cancel">Cancel</button>
  </div>
    </fieldset>
    </form>`);
};

function handleStarFilterButton(){
  $('#stars').on('change',  event => {
    let starArr = store.bookmarks.filter(item => {
      return item.rating >= event.currentTarget.value;
    });
    generateHomeScreen(starArr);
    $('#stars').val(event.currentTarget.value)
  });
}

export default {
  generateHomeScreen,
  generateAddScreen,
  generateBookmarkElement,
};