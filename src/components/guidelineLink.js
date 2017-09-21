import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
  let link = `/chapters/${props.chapterId}/parts/${props.partId}/guidelines/${props.id}`;
  if (props.sectionId != undefined) {
    link = `/chapters/${props.chapterId}/parts/${props.partId}/sections/${props.sectionId}/guidelines/${props.id}`;
  }
  return (
    <Link to={link} className="usa-nav-link">
      <span>{props.children}</span>
    </Link>
  );
};
