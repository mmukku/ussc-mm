import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { Link } from 'react-router-dom';

function remove_bookmark(bookmark_id) {
	console.log('Hi ' + bookmark_id);
	let bookmark_count = localStorage.getItem('ussc-bookmark-count');
	if (bookmark_count === null)
		bookmark_count = '0';
	bookmark_count = parseInt(bookmark_count);
	localStorage.removeItem('ussc-bookmarks.' + bookmark_id);
	for (var i = bookmark_id + 1; i < bookmark_count; i++) {
		localStorage.setItem(
			'ussc-bookmarks.' + (i - 1),
			localStorage.getItem('ussc-bookmarks.' + i)
		);
	}
	localStorage.setItem('ussc-bookmark-count', bookmark_count - 1);
	alert('Bookmark removed');
	ReactDOM.render(<App />, document.getElementById('root'));
}

function remove_bookmark_closure(id) {
	return function() {
		remove_bookmark(id);
	}
}

export default props => {
	let bookmark_count = localStorage.getItem('ussc-bookmark-count');
	if (bookmark_count === null)
		bookmark_count = '0';
	bookmark_count = parseInt(bookmark_count);
	let bookmarks_list = [];
	for (var i = 0; i < bookmark_count; i++) {
		let item = localStorage.getItem('ussc-bookmarks.' + i);
		bookmarks_list.push
		(
			<p><Link to={item}>{item}</Link> (<a href='#' onClick={remove_bookmark_closure(i)}>Remove Bookmark</a>)</p>
		);
	}
	return (
	  <div>
	    {bookmarks_list}
	  </div>
	);
}