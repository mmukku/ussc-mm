import React from 'react';
import HomeLink from '../components/homeLink';
import PartsLink from '../components/partsLink';
import GuideLinesLink from '../components/guidelinesLink';
import guideLines from '../data/guidelines.json';

export default props => {
  let chapterId = props.match.params.chapterId;
  let partId = props.match.params.part;
  let sectionId = props.match.params.sectionId;
  let id = props.match.params.id;

  if (chapterId == undefined) {
    chapterId = id[1];
    partId = id[2];
    sectionId = id[3];
  }

  let filtered = guideLines.filter(
    gl => gl.chapter === chapterId && gl.part === partId
  );

  if (sectionId !== undefined) {
    filtered = filtered.filter(gl => gl.section === sectionId);
  }

  const guidelineList = filtered.map(gl => {
    if (gl.id !== id) {
      let link = `/chapters/${chapterId}/parts/${partId}/guidelines/${gl.id}`;
      if (sectionId !== undefined) {
        link = `/chapters/${chapterId}/parts/${partId}/sections/${sectionId}/guidelines/${gl.id}`;
      }

      return (
        <option key={gl.id} value={link}>
          {gl.id}
        </option>
      );
    }
  });

  let content = <p>{id} content goes here.</p>;
  const gl = guideLines.filter(gl => gl.id === id)[0];
  if (gl.img != undefined) {
    let img = require(`../img/${gl.img}`);
    content = <img src={img} alt="{gl.title}" />;
  }

  return (
    <div>
      <h6>
        <div className="usa-width-one-half">
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
        </div>
        <div className="usa-width-one-half">
          <select onChange={e => (window.location = e.target.value)}>
            <option>Go to</option>
            {guidelineList}
          </select>
        </div>
      </h6>
      <div className="usa-section">
        <h3>
          Chapter {chapterId} - Part {partId} - {sectionId} GuideLine- {id}
        </h3>
        {content}
      </div>
    </div>
  );
};
