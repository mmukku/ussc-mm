import React from 'react';
import { Link } from 'react-router-dom';

export default props => (
  <Link to={'/add_bookmark' + props.path}>
	Bookmark This
  </Link>
);