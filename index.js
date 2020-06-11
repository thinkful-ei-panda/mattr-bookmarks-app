import $ from 'jquery';

import 'normalize.css';
import './index.css';

import api from './api';
import store from './store';
import bookmarksList from './bookmarks-list';

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