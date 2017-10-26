import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import App from '../App';
import { count_bookmarks, read_bookmark, remove_bookmark } from '../bookmark';

/* return a function so that if the original variable changes the function is not affected; remove a bookmark,
	let the user know, and refresh the page */
export function remove_bookmark_wrapper(id) {
	return function() {
		remove_bookmark(id);
		alert('Bookmark removed');
		ReactDOM.render(<App />, document.getElementById('root'));
	}
}

export default props => {
	let bookmark_count = count_bookmarks();
	let bookmarks_list = [];
	for (var i = 0; i < bookmark_count; i++) {
		let item = read_bookmark(i);
		if (item !== null) {
			bookmarks_list.push
			(
				<p><Link to={item.path}>{item.title}</Link> (<a href='#' onClick={remove_bookmark_wrapper(i)}>Remove Bookmark</a>)</p>
			);
		}
	}
	return (
	  <div>
	    {bookmarks_list}
	  </div>
	);
}