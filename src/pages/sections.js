import React from 'react';
import { Link } from 'react-router-dom';
import sections from '../data/sections.json';

export default props => {
  let chapterId = props.match.params.chapterId;
  let partId = props.match.params.part;
  let sectionList = sections
    .filter(s => s.chapter === chapterId && s.part === partId)
    .map(s => (
      <li key={s.id}>
        <Link
          to={`/chapters/${chapterId}/parts/${s.id}/sections/${s.section ===
          undefined
            ? 1
            : s.section}/guidelines`}
          className="usa-nav-link"
        >
          <span>
            {s.id} - {s.title}
          </span>
        </Link>
      </li>
    ));
  return (
    <div>
      <h6>
        <Link to="/" className="usa-nav-link">
          <span>Home&nbsp;</span>
        </Link>&nbsp; > &nbsp;<Link
          to={`/chapters/${chapterId}/parts`}
          className="usa-nav-link"
        >
          <span>Chapter {chapterId}</span>
        </Link>&nbsp; > &nbsp;Part {partId}
      </h6>
      <h3>
        Chapter {chapterId} - Part {partId}
      </h3>
      <ul>{sectionList}</ul>
    </div>
  );
};
