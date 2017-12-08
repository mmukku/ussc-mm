import React from 'react';
import GuidelinesLink from './guidelinesLink';
import ContentsLinkWrapper from './contentsLinkWrapper';

export default props => {
  return (
    <GuidelinesLink
      chapterId={props.section.chapter}
      partId={props.section.part}
      sectionId={props.section.id}
    >
      <ContentsLinkWrapper>
        <span className="container-font-light-C">{props.section.title}</span>
      </ContentsLinkWrapper>
    </GuidelinesLink>
  );
};
