import React from 'react';
import sections from '../data/sections.json';
import Parts from '../data/parts.json';
import HomeLink from '../components/homeLink';
import PartsLink from '../components/partsLink';
import GuideLinesLink from '../components/guidelinesLink';
import BookmarkLink from '../components/bookmarkLink';
import Chapters from '../data/chapters.json';
import _ from 'lodash';

export default props => {
  let chapterId = props.match.params.chapterId;
  let partId = props.match.params.part;
  let sectionList = _.filter(
    sections,
    s => s.chapter === chapterId && s.part === partId
  ).map(s => (
    <p key={s.id}>
      <GuideLinesLink chapterId={chapterId} partId={partId} sectionId={s.id}>
        <span>
          {s.id} - {s.title}
        </span>
      </GuideLinesLink>
    </p>
  ));

  const partList = _.filter(Parts, p => p.chapter === chapterId).map(p => {
    if (p.id !== partId) {
      return (
        <option
          key={p.id}
          value={`/chapters/${chapterId}/parts/${p.id}/sections`}
        >
          Part {p.id}
        </option>
      );
    } else {
      return null;
    }
  });

  const chapterTitle = _.find(Chapters, c => c.id === chapterId).title;
  const thisPart = _.find(
    Parts,
    p => p.chapter === chapterId && p.id === partId
  );

  return (
    <div>
      <h6>
        <div className="usa-width-one-half">
          <HomeLink />&nbsp; > &nbsp;<PartsLink chapterId={chapterId}>
            Chapter {chapterId}
          </PartsLink>{' '}
          &nbsp; > &nbsp;Part {partId}
        </div>
		<BookmarkLink path={props.location.pathname} />
        <div className="usa-width-one-half">
          <select onChange={e => (window.location = e.target.value)}>
            <option>Go to</option>
            {partList}
          </select>
        </div>
      </h6>
      <div className="usa-section">
        <h3>
          Chapter {chapterId} - {chapterTitle}
        </h3>
        <h4>
          Part {partId} - {thisPart.title}
        </h4>
        <p dangerouslySetInnerHTML={{ __html: thisPart.content }} />

        <div>{sectionList}</div>
      </div>
    </div>
  );
};
