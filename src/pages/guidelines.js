import React from 'react';
import guideLines from '../data/guidelines.json';
import ContentsGuidelineLink from '../components/contentsGuidelineLink';
import BookmarkLink from '../components/bookmarkLink';
import { ContentWrapper } from '../components/contentwrapper';
import ContentHeader from '../components/contentHeader';
import ChapterIndicator from '../components/chapterIndicator';
import GoToFooter from '../components/goToFooter';
import BreadcrumbsWrapper from '../components/breadcrumbsWrapper';
import ChapterBreadcrumb from '../components/chapterBreadcrumb';
import GLMBreadcrumb from '../components/glmBreadcrumb';
import Blockset from '../components/blockset';
import TitleBlock from '../components/titleBlock';
import TitleContentBlock from '../components/titleContentBlock';
import ContentBlock from '../components/contentBlock';
import Sections from '../data/sections.json';
import Parts from '../data/parts.json';
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

  let guidelineList = _.map(filtered, gl => <ContentsGuidelineLink gl={gl} />);

  let bc;
  let navList;
  if (sectionTitle === null) {
    bc = `PART ${partId}`;
  } else {
    bc = `PART ${partId} - ${section.title}`;
  }
  if (props.match.params.sectionId !== undefined) {
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

  const thisPart = _.find(
    Parts,
    p => p.chapter === chapterId && p.id === partId
  );
  var generalContent;
  if (sectionContent !== null && sectionContent !== undefined) {
    generalContent = (
      <div
        className="container-font-light-Ea"
        dangerouslySetInnerHTML={{ __html: sectionContent }}
      />
    );
  } else if (thisPart.content !== undefined) {
    generalContent = (
      <div
        className="container-font-light-Ea"
        dangerouslySetInnerHTML={{ __html: thisPart.content }}
      />
    );
  } else {
    generalContent = null;
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
      <ContentHeader />
      <ChapterIndicator id={chapterId} />
      <BreadcrumbsWrapper>
        <GLMBreadcrumb />
        <ChapterBreadcrumb id={chapterId} />
        <li className="active">{bc}</li>
      </BreadcrumbsWrapper>
      <BookmarkLink path={props.location.pathname} title={generalTitle} />
      <ContentWrapper path={props.location.pathname} title={generalTitle}>
        <section className="container-04c">
          <Blockset>
            <TitleBlock>{generalShortTitle}</TitleBlock>
            <TitleContentBlock>{generalContent}</TitleContentBlock>
            <ContentBlock>{guidelineList}</ContentBlock>
          </Blockset>
        </section>
      </ContentWrapper>
      <GoToFooter list={navList} />
    </div>
  );
};
