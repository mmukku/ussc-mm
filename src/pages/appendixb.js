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
        <p>
          <a href="/ab/sss">
            <strong>SELECTED SENTENCING STATUTES</strong>
          </a>
        </p>
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
          <a href="/ab/publ">
            <strong>JUDICIARY AND JUDICIAL PROCEDURE</strong>
          </a>
        </p>
      </ContentWrapper>
    </div>
  );
};
