import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
  let link = `/chapters/${props.chapterId}/parts/${props.partId}/guidelines`;
  if (props.sectionId !== undefined) {
    link = `/chapters/${props.chapterId}/parts/${props.partId}/sections/${props.sectionId}/guidelines`;
  }
  return (
    <Link to={link}>
      <span>{props.children}</span>
    </Link>
  );
};
