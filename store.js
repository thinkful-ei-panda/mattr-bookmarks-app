const items = [];
let error = null;
let hideStarreditems = false;

const findById = function (id) {
  return this.items.find(currentItem => currentItem.id === id);
};

const addItem = function (item) {
  this.items.push(item);
};

const findAndDelete = function (id) {
  this.items = this.items.filter(currentItem => currentItem.id !== id);
};

const toggleStarredFilter = function () {
  this.hideStarredItems = !this.hideStarredItems;
};

const findAndUpdate = function (id, newData) {
  const currentItem = this.findById(id);
  Object.assign(currentItem, newData);
};

const setError = function (error) {
  this.error = error;
};

export default {
  items,
  error,
  hideStarreditems,
  findById,
  addItem,
  findAndDelete,
  toggleStarredFilter,
  findAndUpdate,
  setError
};