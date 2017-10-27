import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
  return (
    <Link to={`/gl/${props.id}`}>
      <span>{props.children}</span>
    </Link>
  );
};
