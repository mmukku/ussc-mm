import React from 'react';
import { Link } from 'react-router-dom';
import guideLines from '../data/guidelines.json';
import HomeLink from '../components/homeLink';
import PartsLink from '../components/partsLink';
import SectionsLink from '../components/sectionsLink';
import GuidelineLink from '../components/guidelineLink';
import BookmarkLink from '../components/bookmarkLink';
import { ContentWrapper } from '../components/contentwrapper';
import SearchGuidelines from '../components/searchGuidelines';
import Sections from '../data/sections.json';
import Parts from '../data/parts.json';
import Chapters from '../data/chapters.json';
import _ from 'lodash';

export default props => {
  let chapterId = props.match.params.chapterId;
  let partId = props.match.params.part;
  let sectionId = props.match.params.sectionId;
  let filtered = _.filter(
    guideLines,
    gl => gl.chapter === chapterId && gl.part === partId
  );

  let sectionTitle = null;
  let sectionContent = null;

  if (sectionId !== undefined) {
    filtered = _.filter(filtered, gl => gl.section === sectionId);
    let section = _.find(
      Sections,
      s => s.chapter === chapterId && s.part === partId && s.id === sectionId
    );
    if (section !== undefined) {
      sectionTitle = sectionId + '. ' + section.title;
      sectionContent = section.content;
    }
  }

  let guidelineList = _.map(filtered, gl => (
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
    text = <span>{`Section ${sectionId}`}</span>;
    navList = _.filter(
      Sections,
      s => s.chapter === chapterId && s.part === partId
    ).map(s => {
      if (s.id !== sectionId) {
        return (
          <option
            key={s.id}
            value={`/chapters/${chapterId}/parts/${partId}/sections/${s.id}/guidelines`}
          >
            Section {s.id}
          </option>
        );
      }
      return null;
    });
  } else {
    navList = _.filter(Parts, p => p.chapter === chapterId).map(p => {
      if (p.id !== partId) {
        return (
          <option
            key={p.id}
            value={`/chapters/${chapterId}/parts/${p.id}/guidelines`}
          >
            Part {p.id}
          </option>
        );
      }
      return null;
    });
  }

  const chapterTitle = _.find(Chapters, c => c.id === chapterId).title;

  const thisPart = _.find(
    Parts,
    p => p.chapter === chapterId && p.id === partId
  );
  let partContent = null;
  if (sectionContent == null) {
    partContent = thisPart.content;
  }
  var generalTitle;
  if (sectionTitle === null) {
    generalTitle = `Chapter ${chapterId} Part ${partId} - ${thisPart.title}`;
  } else {
    generalTitle = `Chapter ${chapterId} Part ${partId} Section ${sectionId} - ${sectionTitle}`;
  }

  return (
    <div>
      <section className="usa-section usa-section-black">
        <div className="usa-grid">
          <div className="container-title">
            <span className="container-font-dark-B-2">
              Version 3.14-17
              <br />
            </span>
            <span className="container-font-dark-A-2">
              Guidelines Manual
              <br />
            </span>
            <span className="container-font-dark-B-2">2017</span>
          </div>
        </div>
      </section>
      <section className="usa-section search-global-A">
        <div className="usa-grid">
          <div className="usa-width-one-whole">
            <SearchGuidelines />
          </div>
        </div>
      </section>
      <section className="usa-section usa-section-blue">
        <div className="usa-grid">
          <div className="container-title-c">
            <span className="container-font-dark-B-5">
              CHAPTER {chapterId}
              <br />
            </span>
          </div>
        </div>
      </section>
      <section className="usa-section usa-section-white">
        <div className="usa-grid">
          <div className="container-title-c">
            <span className="container-font-light-Db">
              {chapterTitle}
              <br />
            </span>
          </div>
        </div>
      </section>
      <section className="usa-section breadcrumb-global-A">
        <div className="usa-grid breadcrumb-global-A-1">
          <div className="usa-width-one-whole">
            <ol className="breadcrumb-b">
              <li>
                <Link to="/home">Guidelines Manual</Link>
              </li>
              <li>
                <PartsLink chapterId={chapterId}>Chapter {chapterId}</PartsLink>
              </li>
              <li>{bc}</li>
              <li className="active">{text}</li>
            </ol>
          </div>
        </div>
      </section>
      <h6>
        <BookmarkLink path={props.location.pathname} title={generalTitle} />
        <section className="usa-width-one-half search-global-B">
          <select onChange={e => (window.location = e.target.value)}>
            <option>Go to</option>
            {navList}
          </select>
        </section>
      </h6>
      <ContentWrapper path={props.location.pathname} title={generalTitle}>
        <h3>
          Chapter {chapterId} - {chapterTitle}
        </h3>
        <h4>
          Part {partId} - {thisPart.title}
        </h4>
        <p dangerouslySetInnerHTML={{ __html: partContent }} />
        <h5>{sectionTitle} </h5>
        <p dangerouslySetInnerHTML={{ __html: sectionContent }} />
        <div>{guidelineList}</div>
      </ContentWrapper>
    </div>
  );
};
