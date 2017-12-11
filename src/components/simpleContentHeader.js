import React from 'react';

export default props => {
  var titleClass, subtitleBlock;
  if (props.subtitle === undefined) {
    titleClass = 'container-title-b';
    subtitleBlock = null;
  } else {
    titleClass = 'container-title';
    subtitleBlock = (
      <span className="container-font-dark-B-2">{props.subtitle}</span>
    );
  }
  return (
    <section className="usa-section usa-section-black">
      <div className="usa-grid">
        <div className={titleClass}>
          <span className="container-font-dark-B-2">
            Version 3.14-17
            <br />
          </span>
          <span className="container-font-dark-A-2">
            {props.title}
            <br />
          </span>
          {subtitleBlock}
        </div>
      </div>
    </section>
  );
};
