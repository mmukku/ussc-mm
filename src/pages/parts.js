import React from 'react';
import parts from '../data/parts.json';
import BookmarkLink from '../components/bookmarkLink';
import { ContentWrapper } from '../components/contentwrapper';
import Chapters from '../data/chapters.json';
import ContentHeader from '../components/contentHeader';
import ChapterIndicator from '../components/chapterIndicator';
import GoToFooter from '../components/goToFooter';
import BreadcrumbsWrapper from '../components/breadcrumbsWrapper';
import GLMBreadcrumb from '../components/glmBreadcrumb';
import PartContents from '../components/partContents';
import Blockset from '../components/blockset';
import TitleBlock from '../components/titleBlock';
import ContentBlock from '../components/contentBlock';
import _ from 'lodash';

export default props => {
  let chapterId = props.match.params.chapterId;
  let partsList = _.filter(parts, p => p.chapter === chapterId).map(p => {
    return <PartContents part={p} />;
  });

  const chapterList = Chapters.map(c => {
    if (c.id !== chapterId) {
      return (
        <option key={c.id} value={`/chapters/${c.id}/parts`}>
          CHAPTER {c.name}
        </option>
      );
    }
    return null;
  });

  const thisChapter = _.find(Chapters, c => c.id === chapterId);
  var introBlockset;
  if (thisChapter.content) {
    introBlockset = (
      <Blockset>
        <TitleBlock>INTRODUCTION</TitleBlock>
        <ContentBlock>
          <div
            className="container-font-light-Ea"
            dangerouslySetInnerHTML={{ __html: thisChapter.content }}
          />
        </ContentBlock>
      </Blockset>
    );
  } else {
    introBlockset = null;
  }

  return (
    <div>
      <ContentHeader />
      <ChapterIndicator id={chapterId} />
      <BreadcrumbsWrapper>
        <GLMBreadcrumb />
        <li className="active">CHAPTER {chapterId}</li>
      </BreadcrumbsWrapper>
      <BookmarkLink
        path={props.location.pathname}
        title={`CHAPTER ${thisChapter.name} - ${thisChapter.title}`}
      />
      <section className="search-global-B" />
      <ContentWrapper
        path={props.location.pathname}
        title={`CHAPTER ${thisChapter.name} - ${thisChapter.title}`}
      >
        <section className="container-04c">
          {introBlockset}
          {partsList}
        </section>
      </ContentWrapper>
      <GoToFooter list={chapterList} />
    </div>
  );
};
