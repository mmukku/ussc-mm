import React from 'react';
import Chapters from '../data/chapters.json';
import _ from 'lodash';

export default props => {
  if (props.id !== undefined) {
    let chapter = _.find(
      Chapters,
      c => c.id.toString() === props.id.toString()
    );
    return (
      <div>
        <section className="usa-section usa-section-blue">
          <div className="usa-grid">
            <div className="container-title-c">
              <span className="container-font-dark-B-5">
                CHAPTER {props.id}
                <br />
              </span>
            </div>
          </div>
        </section>
        <section className="usa-section usa-section-white">
          <div className="usa-grid">
            <div className="container-title-c">
              <span className="container-font-light-Db">
                {chapter.title}
                <br />
              </span>
            </div>
          </div>
        </section>
      </div>
    );
  } else {
    return null;
  }
};
