import React from 'react';
import { add_bookmark } from '../bookmark';

/* return a function so that if the original variable changes the function is not affected; add a bookmark
	and let the user know */
function add_bookmark_wrapper(path) {
	return function() {
		add_bookmark(path);
		alert('Bookmark added');
	}
}

export default props => (
  <a href='#' onClick={add_bookmark_wrapper(props.path)}>
	Bookmark This
  </a>
);