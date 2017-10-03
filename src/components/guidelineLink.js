import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
  let link = `/guidelines/${props.id}`;
  return (
    <Link to={link}>
      <span>{props.children}</span>
    </Link>
  );
};
