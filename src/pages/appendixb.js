import React from 'react';
import { Link } from 'react-router-dom';
import BookmarkLink from '../components/bookmarkLink';
import { ContentWrapper } from '../components/contentwrapper';
import SearchGuidelines from '../components/searchGuidelines';

export default params => {
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
              Appendix B
              <br />
            </span>
            <span className="container-font-dark-B-2">
              Selected Sentencing Statutes
            </span>
          </div>
        </div>
      </section>
      <section className="usa-section search-global-A">
        <div className="usa-grid">
          <SearchGuidelines />
        </div>
      </section>
      <BookmarkLink path={params.location.pathname} title="Appendix B" />
      <ContentWrapper path={params.location.pathname} title="Appendix B">
        <div className="usa-grid">
          <div className="container-05-title">
            <div className="container-05-A-button">
              <div className="container-05-title-A1">
                <span className="container-font-light-C">
                  SELECTED SENTENCING STATUTES
                </span>
              </div>
            </div>
          </div>
          <div className="container-05">
            <div className="container-05b-A">
              <div className="container-05-A1">
                <div className="container-05-A1c container-font-light-Ea ab-content">
                  This appendix sets forth the principal statutory provisions
                  governing sentencing, the Sentencing Commission, and the
                  drafting of sentencing guidelines,{' '}
                  <strong className="noblock">as of May 1, 2016</strong>, as
                  follows:
                  <br />
                </div>
              </div>
              <div
                className="usa-width-one-whole"
                style={{
                  'border-style': 'dotted',
                  'border-width': '0px',
                  'border-color': 'red'
                }}
              >
                <a href="/ab/sss">
                  <button className="usa-button-secondary usa-focus">
                    Read More
                  </button>
                </a>
              </div>
            </div>
          </div>
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
              <div className="container-03-A-a">
                <Link to="/ab/18usc">
                  <div className="container-03-A1">
                    <span className="container-font-light-C">TITLE 18 </span>
                    <span className="container-font-light-D">
                      UNITED STATES CODE
                    </span>
                  </div>
                  <div className="container-03-A2">
                    <div className="chevron-right-icon" />
                  </div>
                </Link>
              </div>
              <div className="container-03-A-b">
                <Link to="/ab/28usc">
                  <div className="container-03-A1">
                    <span className="container-font-light-C">TITLE 28 </span>
                    <span className="container-font-light-D">
                      UNITED STATES CODE
                    </span>
                  </div>
                  <div className="container-03-A2">
                    <div className="chevron-right-icon" />
                  </div>
                </Link>
              </div>
              <div className="container-03-A-a">
                <Link to="/ab/publ">
                  <div className="container-03-A1">
                    <span className="container-font-light-C">
                      PUBLIC LAWS GOVERNING THE COMMISSION AND THE DRAFTING OF
                      SENTENCING GUIDELINES
                    </span>
                  </div>
                  <div className="container-03-A2">
                    <div className="chevron-right-icon" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ContentWrapper>
    </div>
  );
};
