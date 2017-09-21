import React from 'react';
import sections from '../data/sections.json';
import HomeLink from '../components/homeLink';
import PartsLink from '../components/partsLink';
import GuideLinesLink from '../components/guidelinesLink';

export default props => {
  let chapterId = props.match.params.chapterId;
  let partId = props.match.params.part;
  let sectionList = sections
    .filter(s => s.chapter === chapterId && s.part === partId)
    .map(s => (
      <li key={s.id}>
        <GuideLinesLink chapterId={chapterId} partId={partId} sectionId={s.id}>
          <span>
            {s.id} - {s.title}
          </span>
        </GuideLinesLink>
      </li>
    ));
  return (
    <div>
      <h6>
        <div className="usa-width-one-half">
          <HomeLink />&nbsp; > &nbsp;<PartsLink chapterId={chapterId}>
            Chapter {chapterId}
          </PartsLink>{' '}
          &nbsp; > &nbsp;Part {partId}
        </div>
        <div className="usa-width-one-half">&lt; Prev | Next &gt;</div>
      </h6>
      <h3>
        Chapter {chapterId} - Part {partId}
      </h3>
      <ul>{sectionList}</ul>
    </div>
  );
};
