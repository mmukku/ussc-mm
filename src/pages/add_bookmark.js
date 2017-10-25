import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
  let target_path = '/' + props.location.pathname.split('/').slice(2).join('/');
  let bookmark_count = localStorage.getItem('ussc-bookmark-count');
  if (bookmark_count === null)
	  bookmark_count = '0';
  bookmark_count = parseInt(bookmark_count);
  localStorage.setItem('ussc-bookmarks.' + bookmark_count, target_path);
  bookmark_count++;
  localStorage.setItem('ussc-bookmark-count', bookmark_count.toString());
  return (
    <div>
	  <p>You have added a bookmark.</p>
	  <Link to={target_path}>Go back</Link>
    </div>
  );
};