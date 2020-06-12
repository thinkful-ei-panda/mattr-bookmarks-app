const generateHomeScreen = function () {
  $('main').html(`
  <form id="add-filter">
    <ul class="two-buttons">
    <button class="btn" class="add-btn">New</button>
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
$(renderHomeScreen);

const generateAddScreen = function () {
  $('main').html(`
  <form class="add-bookmark" id="add-bookmark-api">
  <input class="bookmark-input" type="text" value="name" placeholder="hi" required />
  
  <textarea class="bookmark-input" type="text" value="desc" placeholder="description" required />
  <input class="bookmark-input" type="text" value="url" placeholder="hi" required />
  <div class="two-buttons">
  <button class="btn" type="submit" id="add-bookmark">Save</button>
  <button class="btn" type="click" id="cancel">Cancel</button>
  </div>
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

$(handleAddButton)

// function handlerReset(){
//     $('main').on('click', '#add-btn',  event => {
//       event.preventDefault();
//       console.log(`handler reset working`);
//       return $(renderAddScreen);
//     });
//   }