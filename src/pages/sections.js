import React from 'react';
import { Link } from 'react-router-dom';
import sections from '../data/sections.json';
import Parts from '../data/parts.json';
import guideLines from '../data/guidelines.json';
import HomeLink from '../components/homeLink';
import PartsLink from '../components/partsLink';
import GuideLinesLink from '../components/guidelinesLink';
import GuidelineLink from '../components/guidelineLink';
import BookmarkLink from '../components/bookmarkLink';
import { ContentWrapper } from '../components/contentwrapper';
import SearchGuidelines from '../components/searchGuidelines';
import Chapters from '../data/chapters.json';
import _ from 'lodash';

export default props => {
  let chapterId = props.match.params.chapterId;
  let partId = props.match.params.part;
  let hasSections =
    _.find(sections, s => s.chapter === chapterId && s.part === partId) !==
    undefined;
  var generalList;
  if (hasSections) {
    generalList = _.filter(
      sections,
      s => s.chapter === chapterId && s.part === partId
    ).map(s => (
      <GuideLinesLink chapterId={chapterId} partId={partId} sectionId={s.id}>
        <div className="container-03-A-a">
          <div className="container-03-A1">
            <span className="container-font-light-C">{s.title}</span>
          </div>
          <div className="container-03-A2">
            <div className="chevron-right-icon" />
          </div>
        </div>
      </GuideLinesLink>
    ));
  } else {
    generalList = _.filter(
      guideLines,
      gl => gl.chapter === chapterId && gl.part === partId
    ).map(gl => (
      <GuidelineLink id={gl.id}>
        <div key={gl.id} className="container-03-A-b">
          <div className="container-03-A1">
            <span className="container-font-light-C">{gl.id}. </span>
            <br />
            <span className="container-font-light-Db">{gl.title}</span>
          </div>
          <div className="container-03-A2">
            <div className="chevron-right-icon" />
          </div>
        </div>
      </GuidelineLink>
    ));
  }

  const partList = _.filter(Parts, p => p.chapter === chapterId).map(p => {
    if (p.id !== partId) {
      return (
        <option
          key={p.id}
          value={`/chapters/${chapterId}/parts/${p.id}/sections`}
        >
          PART {p.id}
        </option>
      );
    } else {
      return null;
    }
  });
  const chapter = _.find(Chapters, c => c.id === chapterId);
  const thisPart = _.find(
    Parts,
    p => p.chapter === chapterId && p.id === partId
  );

  var generalContent;
  if (thisPart.content === undefined) {
    generalContent = '';
  } else {
    generalContent = (
      <div className="container-05-title-2">
        <div className="container-05-title-B">
          <div className="container-05-title-B1">
            <div
              className="container-05-title-B1"
              dangerouslySetInnerHTML={{ __html: thisPart.content }}
            />
          </div>
        </div>
      </div>
    );
  }
  if (generalList !== undefined && generalList.length !== 0) {
    generalList = (
      <div className="container-05">
        <div className="container-05-A">{generalList}</div>
      </div>
    );
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
              <li className="active">CHAPTER {chapterId}</li>
            </ol>
          </div>
        </div>
      </section>
      <BookmarkLink
        path={props.location.pathname}
        title={`CHAPTER ${chapterId} PART ${partId} - ${thisPart.title}`}
      />
      <ContentWrapper
        path={props.location.pathname}
        title={`CHAPTER ${chapter.name} PART ${partId} - ${thisPart.title}`}
      >
        <section className="usa-section container-04c">
          <div className="usa-grid">
            <div className="container-05-title">
              <div className="container-05-title-A">
                <div className="container-05-title-A1">
                  <span className="container-font-light-C">
                    PART {partId} - {thisPart.title}
                  </span>
                </div>
              </div>
            </div>
            {generalContent}
            {generalList}
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
              {partList}
            </select>
          </div>
        </div>
      </section>
    </div>
  );
};
