import React from 'react';
import GuidelineLink from './guidelineLink';
import ContentsLinkWrapper from './contentsLinkWrapper';

export default props => {
  return (
    <GuidelineLink id={props.gl.id}>
      <ContentsLinkWrapper>
        <span className="container-font-light-C">{props.gl.id}</span>
        <br />
        <span className="container-font-light-Db">{props.gl.title}</span>
      </ContentsLinkWrapper>
    </GuidelineLink>
  );
};
