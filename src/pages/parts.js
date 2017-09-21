import React from 'react';
import { Link } from 'react-router-dom';
import parts from '../data/parts.json';
import sections from '../data/sections.json';
import HomeLink from '../components/homeLink';
import SectionsLink from '../components/sectionsLink';
import GuideLinesLink from '../components/guidelinesLink';

export default props => {
  let chapterId = props.match.params.chapterId;
  let partsList = parts.filter(p => p.chapter === chapterId).map(p => {
    let hasSections =
      sections.find(s => s.chapter === chapterId && s.part === p.id) !==
      undefined;

    if (hasSections) {
      return (
        <li key={p.id}>
          <SectionsLink chapterId={chapterId} partId={p.id}>
            Part {p.id} - {p.title}
          </SectionsLink>
        </li>
      );
    } else {
      return (
        <li key={p.id}>
          <GuideLinesLink chapterId={chapterId} partId={p.id}>
            Part {p.id} - {p.title}
          </GuideLinesLink>
        </li>
      );
    }
  });

  return (
    <div>
      <h6>
        <span className="usa-width-one-half">
          <HomeLink />&nbsp; > &nbsp;Chapter {chapterId}
        </span>
        <span className="usa-width-one-half">&lt; Prev | Next &gt;</span>
      </h6>

      <h3>Chapter {chapterId}</h3>
      <ul>{partsList}</ul>
    </div>
  );
};
