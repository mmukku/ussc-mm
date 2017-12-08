import React from 'react';
import { Link } from 'react-router-dom';
import BookmarkLink from '../components/bookmarkLink';
import { ContentWrapper } from '../components/contentwrapper';
import SearchGuidelines from '../components/searchGuidelines';
import AppendixBContentHeader from '../components/appendixBContentHeader';
import ContentsLinkWrapper from '../components/contentsLinkWrapper';
import Blockset from '../components/blockset';
import TitleBlock from '../components/titleBlock';
import ContentBlock from '../components/contentBlock';

export default params => {
  return (
    <div>
      <AppendixBContentHeader />
      <BookmarkLink path={params.location.pathname} title="Appendix B" />
      <ContentWrapper path={params.location.pathname} title="Appendix B">
        <div className="appendix-b">
          <Blockset>
            <TitleBlock>Selected Sentencing Statutes</TitleBlock>
            <ContentBlock>
              <div className="container-font-light-Ea ab-content">
                This appendix sets forth the principal statutory provisions
                governing sentencing, the Sentencing Commission, and the
                drafting of sentencing guidelines,{' '}
                <strong className="noblock">as of May 1, 2016</strong>, as
                follows:
                <br />
              </div>
              <div
                className="usa-width-one-whole"
                style={{
                  'border-style': 'dotted',
                  'border-width': '0px',
                  'border-color': 'red'
                }}
              >
                <Link to="/ab/sss">
                  <button className="usa-button-secondary usa-focus">
                    Read More
                  </button>
                </Link>
              </div>
            </ContentBlock>
          </Blockset>
        </div>
        <hr className="usa-section-hr" />
        <section
          className="usa-section"
          style={{
            'border-style': 'dotted',
            'border-width': '0px',
            'border-color': 'grey',
            'text-align': 'center'
          }}
        >
          <div className="usa-grid">
            <div className="container-03">
              <Link to="/ab/18usc">
                <ContentsLinkWrapper>
                  <span className="container-font-light-C">TITLE 18 </span>
                  <span className="container-font-light-D">
                    UNITED STATES CODE
                  </span>
                </ContentsLinkWrapper>
              </Link>
              <Link to="/ab/28usc">
                <ContentsLinkWrapper>
                  <span className="container-font-light-C">TITLE 28 </span>
                  <span className="container-font-light-D">
                    UNITED STATES CODE
                  </span>
                </ContentsLinkWrapper>
              </Link>
              <Link to="/ab/publ">
                <ContentsLinkWrapper>
                  <span className="container-font-light-C">
                    PUBLIC LAWS GOVERNING THE COMMISSION AND THE DRAFTING OF
                    SENTENCING GUIDELINES
                  </span>
                </ContentsLinkWrapper>
              </Link>
            </div>
          </div>
        </section>
      </ContentWrapper>
    </div>
  );
};
