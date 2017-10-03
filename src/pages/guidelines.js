import React from 'react';
import guideLines from '../data/guidelines.json';
import HomeLink from '../components/homeLink';
import PartsLink from '../components/partsLink';
import SectionsLink from '../components/sectionsLink';
import GuidelineLink from '../components/guidelineLink';
import Sections from '../data/sections.json';
import Parts from '../data/parts.json';

export default props => {
  let chapterId = props.match.params.chapterId;
  let partId = props.match.params.part;
  let sectionId = props.match.params.sectionId;
  if (sectionId === undefined) {
    sectionId = '1';
  }

  const filtered = guideLines.filter(
    gl =>
      gl.chapter === chapterId && gl.part === partId && gl.section === sectionId
  );
  let guidelineList = filtered.map(gl => (
    <p key={gl.id}>
      <GuidelineLink id={gl.id}>
        {gl.id} -{gl.title}
      </GuidelineLink>
    </p>
  ));

  let bc;
  var text = <span>{`Part ${partId}`}</span>;
  let navList;
  if (props.match.params.sectionId !== undefined) {
    bc = (
      <SectionsLink chapterId={chapterId} partId={partId}>
        Part {partId}
      </SectionsLink>
    );
    text = <span>&nbsp; > &nbsp; {`Section ${sectionId}`}</span>;
    navList = Sections.filter(
      s => s.chapter === chapterId && s.part === partId
    ).map(s => {
      if (s.id === sectionId) return null;
      return (
        <option
          key={s.id}
          value={`/chapters/${chapterId}/parts/${partId}/sections/${s.id}/guidelines`}
        >
          Section {s.id}
        </option>
      );
    });
  } else {
    navList = Parts.filter(p => p.chapter === chapterId).map(p => {
      if (p.id === partId) return null;
      return (
        <option
          key={p.id}
          value={`/chapters/${chapterId}/parts/${p.id}/guidelines`}
        >
          Part {p.id}
        </option>
      );
    });
  }

  return (
    <div>
      <h6>
        <div className="usa-width-one-half">
          <HomeLink />&nbsp; > &nbsp;<PartsLink chapterId={chapterId}>
            Chapter {chapterId}
          </PartsLink>{' '}
          &nbsp; > &nbsp; {bc} {text}
        </div>
        <div className="usa-width-one-half">
          <select onChange={e => (window.location = e.target.value)}>
            <option>Go to</option>
            {navList}
          </select>
        </div>
      </h6>
      <div className="usa-section">
        <h3>
          Chapter {chapterId} - Part {partId}
        </h3>
        <div>{guidelineList}</div>
      </div>
    </div>
  );
};
