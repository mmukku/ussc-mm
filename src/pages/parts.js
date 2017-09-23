import React from 'react';
import { Link } from 'react-router-dom';
import parts from '../data/parts.json';
import sections from '../data/sections.json';
import HomeLink from '../components/homeLink';
import SectionsLink from '../components/sectionsLink';
import GuideLinesLink from '../components/guidelinesLink';
import Chapters from '../data/chapters.json';

export default props => {
  let chapterId = props.match.params.chapterId;
  let partsList = parts.filter(p => p.chapter === chapterId).map(p => {
    let hasSections =
      sections.find(s => s.chapter === chapterId && s.part === p.id) !==
      undefined;

    if (hasSections) {
      return (
        <p key={p.id}>
          <SectionsLink chapterId={chapterId} partId={p.id}>
            Part {p.id} - {p.title}
          </SectionsLink>
        </p>
      );
    } else {
      return (
        <p key={p.id}>
          <GuideLinesLink chapterId={chapterId} partId={p.id}>
            Part {p.id} - {p.title}
          </GuideLinesLink>
        </p>
      );
    }
  });

  const chapterList = Chapters.map(c => {
    if (c.id !== chapterId)
      return (
        <option key={c.id} value={`/chapters/${c.id}/parts`}>
          Chapter {c.id}
        </option>
      );
  });

  return (
    <div>
      <h6>
        <span className="usa-width-one-half">
          <HomeLink />&nbsp; > &nbsp;Chapter {chapterId}
        </span>
        <select onChange={e => (window.location = e.target.value)}>
          <option>Go to</option>
          {chapterList}
        </select>
      </h6>
      <div className="usa-section">
        <h3>Chapter {chapterId}</h3>
        <div>{partsList}</div>
      </div>
    </div>
  );
};