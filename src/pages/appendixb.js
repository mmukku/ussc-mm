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
        <p>
          <strong>CONTENTS</strong>
        </p>
        <p>
          <strong>TITLE 18, UNITED STATES CODE</strong>
        </p>
        <p>
          <strong>CRIMES AND CRIMINAL PROCEDURE</strong>
        </p>
        <p>
          <strong>CHAPTER 227-SENTENCES</strong>
        </p>
        <p>
          <a href="/ab/18usc227a">
            <strong>SUBCHAPTER A-GENERAL PROVISIONS</strong>
          </a>
        </p>
        <p>
          <a href="/ab/18usc227b">
            <strong>SUBCHAPTER B-PROBATION</strong>
          </a>
        </p>
        <p>
          <a href="/ab/18usc227c">
            <strong>SUBCHAPTER C-FINES</strong>
          </a>
        </p>
        <p>
          <a href="/ab/18usc227d">
            <strong>SUBCHAPTER D-IMPRISONMENT</strong>
          </a>
        </p>
        <p>
          <strong>CHAPTER 229-POSTSENTENCE ADMINISTRATION</strong>
        </p>
        <p>
          <a href="/ab/18usc229c">
            <strong>SUBCHAPTER C-IMPRISONMENT</strong>
          </a>
        </p>
        <p>
          <a href="/ab/18usc232">
            <strong>CHAPTER 232-MISCELLANEOUS SENTENCING PROVISIONS</strong>
          </a>
        </p>
        <p>
          <a href="/ab/18usc235">
            <strong>CHAPTER 235-APPEAL</strong>
          </a>
        </p>
        <p>
          <a href="/ab/28usc">
            <strong>TITLE 28, UNITED STATES CODE</strong>
          </a>
        </p>
        <p>
          <strong>JUDICIARY AND JUDICIAL PROCEDURE</strong>
        </p>
        <p>
          <a href="/ab/publ">
            <strong>
              PROVISIONS OF PUBLIC LAWS GOVERNING THE COMMISSION OF SENTENCING
              GUIDELINES
            </strong>
          </a>
        </p>
      </ContentWrapper>
    </div>
  );
};
