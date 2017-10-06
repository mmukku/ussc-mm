import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
  return (
    <Link to={`/guidelines/${props.id}`}>
      <span>{props.children}</span>
    </Link>
  );
};
