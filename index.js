// import 'normalize.css';
import './index.css';

import api from './api.js';
import store from './store.js';
import bookmarksList from './bookmarks-list.js';

const main = function () {
  api.getItems()
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      bookmarksList.render();
    });

  bookmarksList.bindEventListeners();
  bookmarksList.render();
};

$(main);


