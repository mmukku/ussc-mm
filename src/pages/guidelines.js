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
  var section;

  if (sectionId !== undefined) {
    filtered = _.filter(filtered, gl => gl.section === sectionId);
    section = _.find(
      Sections,
      s => s.chapter === chapterId && s.part === partId && s.id === sectionId
    );
    if (section !== undefined) {
      sectionTitle = sectionId + '. ' + section.title;
      sectionContent = section.content;
    }
  }

  let guidelineList = _.map(filtered, gl => (
    <GuidelineLink id={gl.id}>
      <div className="container-03-A-a">
        <div className="container-03-A1">
          <span className="container-font-light-C">{gl.title}</span>
        </div>
        <div className="container-03-A2">
          <div className="icon-chevron-right" />
        </div>
      </div>
    </GuidelineLink>
  ));

  let bc;
  var text = <span>{`PART ${partId}`}</span>;
  let navList;
  if (props.match.params.sectionId !== undefined) {
    bc = (
      <li>
        <SectionsLink chapterId={chapterId} partId={partId}>
          PART {partId}
        </SectionsLink>
      </li>
    );
    text = <span>{`SECTION ${sectionId}`}</span>;
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
            SECTION {s.id}
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
            PART {p.id}
          </option>
        );
      }
      return null;
    });
  }

  const chapter = _.find(Chapters, c => c.id === chapterId);

  const thisPart = _.find(
    Parts,
    p => p.chapter === chapterId && p.id === partId
  );
  var generalContent;
  if (sectionContent === null) {
    generalContent = thisPart.content;
  } else {
    generalContent = sectionContent;
  }
  var generalTitle, generalShortTitle;
  if (sectionTitle === null) {
    generalTitle = `CHAPTER ${chapterId} PART ${partId} - ${thisPart.title}`;
    generalShortTitle = thisPart.title;
  } else {
    generalTitle = `CHAPTER ${chapterId} PART ${partId} SECTION ${sectionId} - ${section.title}`;
    generalShortTitle = section.title;
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
              CHAPTER {chapter.name}
              <br />
            </span>
          </div>
        </div>
      </section>
      <section className="usa-section usa-section-white">
        <div className="usa-grid">
          <div className="container-title-c">
            <span className="container-font-light-Db">
              {chapter.title}
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
                <PartsLink chapterId={chapterId}>CHAPTER {chapterId}</PartsLink>
              </li>
              {bc}
              <li className="active">{text}</li>
            </ol>
          </div>
        </div>
      </section>
      <BookmarkLink path={props.location.pathname} title={generalTitle} />
      <ContentWrapper path={props.location.pathname} title={generalTitle}>
        <section className="usa-section container-04c">
          <div className="usa-grid">
            <div className="container-05-title">
              <div className="container-05-title-A">
                <div className="container-05-title-A1">
                  <span className="container-font-light-C">
                    {generalShortTitle}
                  </span>
                </div>
              </div>
            </div>
            <div className="container-05-title-2">
              <div className="container-05-title-B">
                <div className="container-05-title-B1">
                  <div
                    className="container-font-light-Ea"
                    dangerouslySetInnerHTML={{ __html: generalContent }}
                  />
                </div>
              </div>
            </div>
            <div className="container-05">
              <div className="container-05-A">{guidelineList}</div>
            </div>
          </div>
        </section>
      </ContentWrapper>
      <section
        className="usa-section footer"
        style={{
          borderStyle: 'dotted',
          borderWidth: '0px',
          borderColor: 'grey',
          textAlign: 'center'
        }}
      >
        <div className="usa-grid footer-B">
          <div className="usa-width-one-whole">
            <select onChange={e => (window.location = e.target.value)}>
              <option>Go to</option>
              {navList}
            </select>
          </div>
        </div>
      </section>
    </div>
  );
};
