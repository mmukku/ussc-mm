import React from 'react';
import { Link } from 'react-router-dom';

export default props => (
  <Link to={`/chapters/${props.chapterId}/parts/${props.partId}/sections`}>
    <span>{props.children}</span>
  </Link>
);