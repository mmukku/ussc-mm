import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Link } from 'react-router-dom';

export default props => {
	let bookmark_count = localStorage.getItem('ussc-bookmark-count');
	if (bookmark_count === null)
		bookmark_count = '0';
	bookmark_count = parseInt(bookmark_count);
	let bookmarks_list = '';
	for (var i = 0; i < bookmark_count; i++) {
		let item = localStorage.getItem('ussc-bookmarks.' + i);
		bookmarks_list += ReactDOMServer.renderToStaticMarkup
		(
			<p><a href={item}>{item}</a> (<a href={`/remove_bookmark/${i}`}>Remove Bookmark</a>)</p>
		);
	}
	return (
	  <div
	    dangerouslySetInnerHTML={{
	  	  __html: bookmarks_list
		}}
	  />
	);
}