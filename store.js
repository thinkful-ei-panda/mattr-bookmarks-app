const bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

const findById = function (id) {
  return this.bookmarks.find(currentItem => currentItem.id === id);
};

// const addBookmark = function (item) {
//   this.adding = !this.adding;
//   this.bookmarks.push(item);
// };

const addBookmark = function (item) {
  this.adding = !this.adding;
  const source = {expanded: false};
  const returnedTarget = Object.assign(item, source);
  this.bookmarks.push(returnedTarget);
};

const findAndDelete = function (id) {
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
};

const toggleExpanded = function (item) {
  console.log(item);
  (item.expanded === false ? item.expanded = true : item.expanded = false )
};

const setError = function () {

};

export default{
  bookmarks,
  adding,
  error,
  filter,
  findById,
  addBookmark,
  findAndDelete,
  toggleExpanded,
  setError
};