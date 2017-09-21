import React from 'react';
import HomeLink from '../components/homeLink';
import PartsLink from '../components/partsLink';
import GuideLinesLink from '../components/guidelinesLink';

export default props => {
  let chapterId = props.match.params.chapterId;
  let partId = props.match.params.part;
  let sectionId = props.match.params.section;
  let id = props.match.params.id;

  return (
    <div>
      <h6>
        <HomeLink />&nbsp; > &nbsp;<PartsLink chapterId={chapterId}>
          Chapter {chapterId}
        </PartsLink>&nbsp; > &nbsp;
        <GuideLinesLink
          chapterId={chapterId}
          partId={partId}
          sectionId={props.match.params.section}
        >
          Part {partId}
        </GuideLinesLink>
        &nbsp; > &nbsp; {id}
      </h6>
      <h3>
        Chapter {chapterId} - Part {partId} - {sectionId} GuideLine- {id}
      </h3>
      <p>{id} content goes here.</p>
    </div>
  );
};
