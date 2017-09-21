import React from 'react';
import { Link } from 'react-router-dom';

export default props => (
  <Link to={`/chapters/${props.chapterId}/parts`}>
    <span>{props.children}</span>
  </Link>
);
