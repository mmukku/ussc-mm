import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import App from '../App';
import { get_bookmarks, remove_bookmark } from '../bookmark';

/* return a function so that if the original variable changes the function is not affected; remove a bookmark,
	let the user know, and refresh the page */
export function remove_bookmark_wrapper(id) {
	return function() {
		remove_bookmark(id);
		alert('Bookmark removed');
		ReactDOM.render(<App />, document.getElementById('root'));
	};
}

export default props => {
	let bookmarks = get_bookmarks();
	let bookmark_elements = [];
	for (var i = 0; i < bookmarks.data.length; i++) {
		let item = bookmarks.data[i];
		if (item !== null) {
			bookmark_elements.push
			(
				<p key={item.id}><Link to={item.path}>{item.title}</Link> (<a href='#' onClick={remove_bookmark_wrapper(item.id)}>Remove Bookmark</a>)</p>
			);
		}
	}
	return (
	  <div>
	    {bookmark_elements}
	  </div>
	);
}