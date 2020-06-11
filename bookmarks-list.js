import $ from 'jquery';

import store from './store';
import api from './api';

const generateItemElement = function (item) {
  let itemTitle = `<span class="bookmarks-item bookmarks-item__starred">${item.name}</span>`;
  if (!item.starred) {
    itemTitle = `
      <form class="js-edit-item">
        <input class="bookmarks-item" type="text" value="${item.name}" required />
      </form>
    `;
  }

  return `
    <li class="js-item-element" data-item-id="${item.id}">
      ${itemTitle}
      <div class="bookmarks-item-controls">
        <button class="bookmarks-item-toggle js-item-toggle">
          <span class="button-label">&#9733;</span>
        </button>


        <button class="bookmarks-item-delete js-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
};

const generatebookmarksItemsString = function (bookmarksList) {
  const items = bookmarksList.map((item) => generateItemElement(item));
  return items.join('');
};

const generateError = function (message) {
  return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
};

const renderError = function () {
  if (store.error) {
    const el = generateError(store.error);
    $('.error-container').html(el);
  } else {
    $('.error-container').empty();
  }
};

const handleCloseError = function () {
  $('.error-container').on('click', '#cancel-error', () => {
    store.setError(null);
    renderError();
  });
};

const render = function () {
  renderError();

  // Filter item list if store prop is true by item.starred === false
  let items = [...store.items];
  if (store.hidestarredItems) {
    items = items.filter(item => !item.starred);
  }

  // render the bookmarks list in the DOM
  const bookmarksListItemsString = generatebookmarksItemsString(items);

  // insert that HTML into the DOM
  $('.js-bookmarks-list').html(bookmarksListItemsString);
};

const handleNewItemSubmit = function () {
  $('#js-bookmarks-list-form').submit(function (event) {
    event.preventDefault();
    const newItemName = $('.js-bookmarks-list-entry').val();
    $('.js-bookmarks-list-entry').val('');
    api.createItem(newItemName)
      .then((newItem) => {
        store.addItem(newItem);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
};

const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.js-item-element')
    .data('item-id');
};

const handleDeleteItemClicked = function () {
  $('.js-bookmarks-list').on('click', '.js-item-delete', event => {
    const id = getItemIdFromElement(event.currentTarget);

    api.deleteItem(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch((error) => {
        console.log(error);
        store.setError(error.message);
        renderError();
      });
  });
};

const handleEditbookmarksItemSubmit = function () {
  $('.js-bookmarks-list').on('submit', '.js-edit-item', event => {
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    const itemName = $(event.currentTarget).find('.bookmarks-item').val();

    api.updateItem(id, { name: itemName })
      .then(() => {
        store.findAndUpdate(id, { name: itemName });
        render();
      })
      .catch((error) => {
        console.log(error);
        store.setError(error.message);
        renderError();
      });
  });
};

const handleItemCheckClicked = function () {
  $('.js-bookmarks-list').on('click', '.js-item-toggle', event => {
    const id = getItemIdFromElement(event.currentTarget);
    const item = store.findById(id);
    api.updateItem(id, { starred: !item.starred })
      .then(() => {
        store.findAndUpdate(id, { starred: !item.starred });
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
};

const handleToggleFilterClick = function () {
  $('.js-filter-starred').click(() => {
    store.togglestarredFilter();
    render();
  });
};

const bindEventListeners = function () {
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleEditbookmarksItemSubmit();
  handleToggleFilterClick();
  handleCloseError();
};

// This object contains the only exposed methods from this module:
export default {
  render,
  bindEventListeners
};