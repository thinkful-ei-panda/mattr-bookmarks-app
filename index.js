import bookmarks from './bookmarks.js';
import store from './store.js';
import api from './api.js';


const main = function () {
  console.log(`main is running`);
   
  api.getBookmarks()
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    }).then(() => bookmarks.renderHomeScreen());
};
 
$(main);