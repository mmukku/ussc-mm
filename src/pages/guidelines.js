import React from 'react';
import guideLines from '../data/guidelines.json';
import HomeLink from '../components/homeLink';
import PartsLink from '../components/partsLink';
import SectionsLink from '../components/sectionsLink';
import GuidelineLink from '../components/guidelineLink';

export default props => {
  let chapterId = props.match.params.chapterId;
  let partId = props.match.params.part;
  let sectionId = props.match.params.sectionId;
  if (sectionId === undefined) {
    sectionId = '1';
  }
  console.log(props.match.params);
  console.dir(
    guideLines.filter(
      gl =>
        gl.chapter === chapterId &&
        gl.part === partId &&
        gl.section === sectionId
    )
  );
  let guidelineList = guideLines
    .filter(
      gl =>
        gl.chapter === chapterId &&
        gl.part === partId &&
        gl.section === sectionId
    )
    .map(gl => (
      <li key={gl.id}>
        <GuidelineLink
          chapterId={chapterId}
          partId={partId}
          sectionId={sectionId}
          id={gl.id}
        >
          {gl.id} -{gl.title}
        </GuidelineLink>
      </li>
    ));

  var bc = undefined;
  var text = <span>{`Part ${partId}`}</span>;
  if (props.match.params.sectionId !== undefined) {
    bc = (
      <SectionsLink chapterId={chapterId} partId={partId}>
        Part {partId}
      </SectionsLink>
    );
    text = <span>&nbsp; > &nbsp; {`Section ${sectionId}`}</span>;
  }

  return (
    <div>
      <h6>
        <div className="usa-width-one-half">
          <HomeLink />&nbsp; > &nbsp;<PartsLink chapterId={chapterId}>
            Chapter {chapterId}
          </PartsLink>{' '}
          &nbsp; > &nbsp; {bc} {text}
        </div>
        <div className="usa-width-one-half">&lt; Prev | Next &gt;</div>
      </h6>
      <h3>
        Chapter {chapterId} - Part {partId}
      </h3>
      <ul>{guidelineList}</ul>
    </div>
  );
};
