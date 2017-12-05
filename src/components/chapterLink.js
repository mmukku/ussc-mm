import React from 'react';
import { Link } from 'react-router-dom';

export default props => (
  <Link
    to={`/chapters/${props.chapterId}/parts`}
    className="usa-background-dark"
  >
    <span>CHAPTER {props.chapterId}</span>
  </Link>
);
