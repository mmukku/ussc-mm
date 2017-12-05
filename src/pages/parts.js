import React from 'react';
import { Link } from 'react-router-dom';
import parts from '../data/parts.json';
import sections from '../data/sections.json';
import guideLines from '../data/guidelines.json';
import SectionsLink from '../components/sectionsLink';
import GuideLinesLink from '../components/guidelinesLink';
import GuidelineLink from '../components/guidelineLink';
import BookmarkLink from '../components/bookmarkLink';
import { ContentWrapper } from '../components/contentwrapper';
import SearchGuidelines from '../components/searchGuidelines';
import Chapters from '../data/chapters.json';
import _ from 'lodash';

export default props => {
  let chapterId = props.match.params.chapterId;
  let partsList = _.filter(parts, p => p.chapter === chapterId).map(p => {
    let hasSections =
      _.find(sections, s => s.chapter === chapterId && s.part === p.id) !==
      undefined;

    if (hasSections) {
      let sectionList = _.filter(
        sections,
        s => s.chapter === chapterId && s.part === p.id
      ).map(s => (
        <GuideLinesLink chapterId={chapterId} partId={p.id} sectionId={s.id}>
          <div className="container-03-A-b">
            <div className="container-03-A1">
              <span className="container-font-light-C">{s.title}</span>
            </div>
            <div className="container-03-A2">
              <div className="chevron-right-icon" />
            </div>
          </div>
        </GuideLinesLink>
      ));
      return (
        <section key={p.id} className="usa-section">
          <div className="usa-grid">
            <div className="container-05-title">
              <div className="container-05-title-A">
                <div className="container-05-title-A1">
                  <span className="container-font-light-C">
                    PART {p.id} - {p.title}
                  </span>
                </div>
              </div>
            </div>
            <div className="container-05">
              <div className="container-05-A">
                <p dangerouslySetInnerHTML={{ __html: p.content }} />
                {sectionList}
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      let guidelineList = _.filter(
        guideLines,
        gl => gl.chapter === chapterId && gl.part == p.id
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
      return (
        <section key={p.id} className="usa-section">
          <div className="usa-grid">
            <div className="container-05-title">
              <div className="container-05-title-A">
                <div className="container-05-title-A1">
                  <span className="container-font-light-C">
                    PART {p.id} - {p.title}
                  </span>
                </div>
              </div>
            </div>
            <div className="container-05">
              <div className="container-05-A">
                <p dangerouslySetInnerHTML={{ __html: p.content }} />
                {guidelineList}
              </div>
            </div>
          </div>
        </section>
      );
    }
  });

  const chapterList = Chapters.map(c => {
    if (c.id !== chapterId) {
      return (
        <option key={c.id} value={`/chapters/${c.id}/parts`}>
          CHAPTER {c.id}
        </option>
      );
    }
    return null;
  });

  const thisChapter = _.find(Chapters, c => c.id === chapterId);
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
              {thisChapter.title}
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
        title={`Chapter ${chapterId} - ${thisChapter.title}`}
      />
      <section className="search-global-B" />
      <ContentWrapper
        path={props.location.pathname}
        title={`Chapter ${chapterId} - ${thisChapter.title}`}
      >
        <p dangerouslySetInnerHTML={{ __html: thisChapter.content }} />
        <section className="container-04c">{partsList}</section>
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
              {chapterList}
            </select>
          </div>
        </div>
      </section>
    </div>
  );
};
