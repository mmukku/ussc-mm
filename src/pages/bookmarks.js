import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Link } from 'react-router-dom';

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
			<p><Link to={item}>{item}</Link> (<Link to={`/remove_bookmark/${i}`}>Remove Bookmark</Link>)</p>
		);
	}
	return (
	  <div>
	    {bookmarks_list}
	  </div>
	);
}