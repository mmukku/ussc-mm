import React from 'react';

function add_bookmark(path) {
	let bookmark_count = localStorage.getItem('ussc-bookmark-count');
	if (bookmark_count === null)
		bookmark_count = '0';
	bookmark_count = parseInt(bookmark_count);
	localStorage.setItem('ussc-bookmarks.' + bookmark_count, path);
	bookmark_count++;
	localStorage.setItem('ussc-bookmark-count', bookmark_count.toString());
	alert('Bookmark added');
}

function add_bookmark_closure(path) {
	return function() {
		add_bookmark(path);
	}
}

export default props => (
  <a href='#' onClick={add_bookmark_closure(props.path)}>
	Bookmark This
  </a>
);