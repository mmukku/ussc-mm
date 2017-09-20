import React from 'react';
import { Link } from 'react-router-dom';
import guideLines from '../data/guidelines.json';

export default props => {
  let chapterId = props.match.params.chapterId;
  let partId = props.match.params.part;
  let sectionId = props.match.params.section;
  return (
    <div>
      <h3>
        Chapter {chapterId} - Part {partId} - Section {sectionId} - GuideLine:{' '}
        {props.match.params.id}
      </h3>
    </div>
  );
};
