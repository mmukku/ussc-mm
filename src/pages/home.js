import React from 'react';
import { Link } from 'react-router-dom';
import chapters from '../data/chapters.json';
import PartsLink from '../components/partsLink';
import ContentsLinkWrapper from '../components/contentsLinkWrapper';
import ContentHeader from '../components/contentHeader';

const chapterList = chapters.map(c => (
  <PartsLink chapterId={c.id}>
    <ContentsLinkWrapper>
      <span className="container-font-light-C">CHAPTER {c.id}</span>
      <br />
      <span className="container-font-light-Db">{c.title}</span>
    </ContentsLinkWrapper>
  </PartsLink>
));
export default props => (
  <div>
    <ContentHeader />
    <section className="usa-section">
      <div className="usa-grid">
        <div className="container-03">{chapterList}</div>
      </div>
    </section>
    <section className="usa-section">
      <div className="usa-grid">
        <div className="container-03">
          <Link to="/si">
            <ContentsLinkWrapper>
              <span className="container-font-light-C">APPENDIX A</span>
              <br />
              <span className="container-font-light-Db">Statutory Index</span>
            </ContentsLinkWrapper>
          </Link>
        </div>
      </div>
    </section>
  </div>
);
