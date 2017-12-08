import React from 'react';
import Parts from '../data/parts.json';
import ChapterBreadcrumb from '../components/chapterBreadcrumb';
import BookmarkLink from '../components/bookmarkLink';
import { ContentWrapper } from '../components/contentwrapper';
import Chapters from '../data/chapters.json';
import ChapterContentHeader from '../components/chapterContentHeader';
import ChapterIndicator from '../components/chapterIndicator';
import GoToFooter from '../components/goToFooter';
import BreadcrumbsWrapper from '../components/breadcrumbsWrapper';
import GLMBreadcrumb from '../components/glmBreadcrumb';
import PartContents from '../components/partContents';
import _ from 'lodash';

export default props => {
  let chapterId = props.match.params.chapterId;
  let partId = props.match.params.part;

  const thisPart = _.find(
    Parts,
    p => p.chapter === chapterId && p.id === partId
  );

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

  return (
    <div>
      <ChapterContentHeader />
      <ChapterIndicator id={chapterId} />
      <BreadcrumbsWrapper>
        <GLMBreadcrumb />
        <ChapterBreadcrumb id={chapterId} />
        <li className="active">PART {partId}</li>
      </BreadcrumbsWrapper>
      <BookmarkLink
        path={props.location.pathname}
        title={`CHAPTER ${chapterId} PART ${partId} - ${thisPart.title}`}
      />
      <ContentWrapper
        path={props.location.pathname}
        title={`CHAPTER ${chapter.name} PART ${partId} - ${thisPart.title}`}
      >
        <section className="container-04c">
          <PartContents part={thisPart} />
        </section>
      </ContentWrapper>
      <GoToFooter list={partList} />
    </div>
  );
};
