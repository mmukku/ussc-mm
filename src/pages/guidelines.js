import React from 'react';
import { Link } from 'react-router-dom';
import guideLines from '../data/guidelines.json';

export default props => {
  let chapterId = props.match.params.chapterId;
  let partId = props.match.params.part;
  let sectionId = props.match.params.sectionId;
  if (sectionId === undefined) {
    sectionId = '1';
  }
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
        <Link
          to={`/chapters/${chapterId}/parts/${partId}/sections/${sectionId}/guidelines/${gl.id}`}
          className="usa-nav-link"
        >
          <span>
            {gl.id} -{gl.title}
          </span>
        </Link>
      </li>
    ));
  let bc = `/chapters/${chapterId}/parts/${partId}/sections`;
  if (sectionId === '1') {
    bc = `/chapters/${chapterId}/parts/`;
  }
  return (
    <div>
      <h6>
        <Link to="/" className="usa-nav-link">
          <span>Home&nbsp;</span>
        </Link>&nbsp; > &nbsp;<Link to={bc} className="usa-nav-link">
          <span>Chapter {chapterId}</span>
        </Link>&nbsp; > &nbsp;Part {partId}
      </h6>
      <h3>
        Chapter {chapterId} - Part {partId}
      </h3>
      <ul>{guidelineList}</ul>
    </div>
  );
};
