import React from 'react';
import { Link } from 'react-router-dom';
import parts from '../data/parts.json';
import sections from '../data/sections.json';

export default props => {
  let chapterId = props.match.params.chapterId;
  let partsList = parts.filter(p => p.chapter === chapterId).map(p => {
    let hasSections =
      sections.find(s => s.chapter === chapterId && s.part === p.id) !==
      undefined;
    let linkText = `/chapters/${chapterId}/parts/${p.id}/guidelines`;
    if (hasSections) {
      linkText = `/chapters/${chapterId}/parts/${p.id}/sections`;
    }
    return (
      <li key={p.id}>
        <Link to={linkText} className="usa-nav-link">
          <span>
            Part {p.id} - {p.title}
          </span>
        </Link>
      </li>
    );
  });

  return (
    <div>
      <h6>
        {' '}
        <Link to="/" className="usa-nav-link">
          <span>Home&nbsp;</span>
        </Link>&nbsp; > &nbsp;Chapter {chapterId}
      </h6>
      <h3>Chapter {chapterId}</h3>
      <ul>{partsList}</ul>
    </div>
  );
};
