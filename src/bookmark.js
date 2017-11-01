function blank_bookmarks() {
  return {
	nextId: 0,
	data: []
  };
}

function validate_bookmarks(bookmarks) {
  if (typeof bookmarks !== 'object') {
	return blank_bookmarks();
  }
  if (bookmarks === null) {
	return blank_bookmarks();
  }
  if (Array.isArray(bookmarks)) {
	return blank_bookmarks();
  }
  if (!('nextId' in bookmarks)) {
	return blank_bookmarks();
  }
  if (typeof bookmarks.nextId !== 'number') {
	return blank_bookmarks();
  }
  if (!('data' in bookmarks)) {
	return blank_bookmarks();
  }
  if (typeof bookmarks.data !== 'object') {
	return blank_bookmarks();
  }
  if (bookmarks.data === null) {
	return blank_bookmarks();
  }
  if (!Array.isArray(bookmarks.data)) {
	return blank_bookmarks();
  }
  return bookmarks;
}

export function get_bookmarks() {
  let queryString = JSON.stringify({type: 'ussc-bookmarks'});
  var bookmarks;
  try {
	bookmarks = JSON.parse(localStorage.getItem(queryString));
  } catch (e) {
	bookmarks = null;
  }
  bookmarks = validate_bookmarks(bookmarks);
  return bookmarks;
}

export function set_bookmarks(bookmarks) {
  let queryString = JSON.stringify({type: 'ussc-bookmarks'});
  localStorage.setItem(queryString, JSON.stringify(validate_bookmarks(bookmarks)))
}

export function remove_bookmark(bookmark_id) {
  let bookmarks = get_bookmarks();
  for (var i = 0; i < bookmarks.data.length; i++) {
    if (bookmarks.data[i].id === bookmark_id) {
	  bookmarks.data.splice(i, 1);
	  break;
	}
  }
  set_bookmarks(bookmarks);
}

export function add_bookmark(path, title) {
	let bookmarks = get_bookmarks();
	bookmarks.data.push({path: path, title: title, id: bookmarks.nextId});
	bookmarks.nextId++;
	set_bookmarks(bookmarks);
}