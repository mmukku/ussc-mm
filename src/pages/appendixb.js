import React from 'react';
import { Link } from 'react-router-dom';
import BookmarkLink from '../components/bookmarkLink';
import { ContentWrapper } from '../components/contentwrapper';

export default params => {
  return (
    <div>
      <BookmarkLink path={params.location.pathname} title="Appendix B" />
      <ContentWrapper path={params.location.pathname} title="Appendix B">
        <p>
          <strong>APPENDIX B</strong>
        </p>
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
                <div class="container-05-A1c container-font-light-Ea">
                  This appendix sets forth the principal statutory provisions
                  governing sentencing, the Sentencing Commission, and the
                  drafting of sentencing guidelines,{' '}
                  <strong>as of May 1, 2016</strong>, as follows:
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
                <div className="container-03-A1">
                  <a href="/ab/18usc">
                    <span className="container-font-light-C">TITLE 18 </span>
                    <span className="container-font-light-D">
                      UNITED STATES CODE
                    </span>
                  </a>
                </div>
              </div>
              <div className="container-03-A-b">
                <div className="container-03-A1">
                  <a href="/ab/28usc">
                    <span className="container-font-light-C">TITLE 28 </span>
                    <span className="container-font-light-D">
                      UNITED STATES CODE
                    </span>
                  </a>
                </div>
              </div>
              <div className="container-03-A-a">
                <div className="container-03-A1">
                  <a href="/ab/publ">
                    <span className="container-font-light-C">
                      PUBLIC LAWS GOVERNING THE COMMISSION AND THE DRAFTING OF
                      SENTENCING GUIDELINES
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ContentWrapper>
    </div>
  );
};
