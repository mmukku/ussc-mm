import React from 'react';
import sections from '../data/sections.json';
import guidelines from '../data/guidelines.json';
import ContentsGuidelineLink from '../components/contentsGuidelineLink';
import ContentsSectionLink from '../components/contentsSectionLink';
import Blockset from '../components/blockset';
import TitleBlock from '../components/titleBlock';
import TitleContentBlock from '../components/titleContentBlock';
import ContentBlock from '../components/contentBlock';
import _ from 'lodash';

export default props => {
  let hasSections =
    _.find(
      sections,
      s => s.chapter === props.part.chapter && s.part === props.part.id
    ) !== undefined;

  var titleContent;
  if (props.part.content) {
    titleContent = (
      <div
        className="container-font-light-Ea"
        dangerouslySetInnerHTML={{ __html: props.part.content }}
      />
    );
  } else {
    titleContent = '';
  }

  var generalList;
  if (hasSections) {
    generalList = _.filter(
      sections,
      s => s.chapter === props.part.chapter && s.part === props.part.id
    ).map(s => <ContentsSectionLink section={s} />);
  } else {
    generalList = _.filter(
      guidelines,
      gl => gl.chapter === props.part.chapter && gl.part === props.part.id
    ).map(gl => <ContentsGuidelineLink gl={gl} />);
  }

  return (
    <Blockset>
      <TitleBlock>
        PART {props.part.id} - {props.part.title}
      </TitleBlock>
      <TitleContentBlock>{titleContent}</TitleContentBlock>
      <ContentBlock>{generalList}</ContentBlock>
    </Blockset>
  );
};
