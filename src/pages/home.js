import React from 'react';
import chapters from '../data/chapters.json';
import PartsLink from '../components/partsLink';
import { ContentWrapper } from '../components/contentwrapper';
import SearchGuidelines from '../components/searchGuidelines';

const chapterList = chapters.map(c => (
  <p key={c.id}>
    <PartsLink chapterId={c.id}>
      Chapter {c.id} - {c.title}
    </PartsLink>
  </p>
));
export default props => (
  <div>
    <section className="usa-section search-global-A">
      <div className="usa-grid">
        <div className="usa-width-one-whole">
          <SearchGuidelines />
        </div>
      </div>
    </section>
    <ContentWrapper path={props.location.pathname} title="Guidelines">
      <h3>Guidelines</h3>
      {chapterList}
    </ContentWrapper>
  </div>
);
