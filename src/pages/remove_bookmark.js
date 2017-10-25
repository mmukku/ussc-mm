import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
	let bookmark_id = parseInt(props.match.bookmarkId);
	let bookmark_count = localStorage.getItem('ussc-bookmark-count');
	if (bookmark_count === null)
		bookmark_count = '0';
	bookmark_count = parseInt(bookmark_count);
	localStorage.removeItem('ussc-bookmarks.' + bookmark_id);
	for (var i = bookmark_id + 1; i < bookmark_count; i++) {
		localStorage.setItem (
			'ussc-bookmarks.' + (i - 1),
			localStorage.getItem('ussc-bookmarks.' + i)
		);
	}
	localStorage.setItem('ussc-bookmark-count', bookmark_count - 1);
	return (
		<div>
			<p>The bookmark has been removed.</p>
			<Link to='/bookmarks'>Return to bookmarks</Link>
		</div>
	);
}