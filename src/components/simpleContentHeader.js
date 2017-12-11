import React from 'react';

export default props => {
  return (
    <section className="usa-section usa-section-black">
      <div className="usa-grid">
        <div className="container-title">
          <span className="container-font-dark-B-2">
            Version 3.14-17
            <br />
          </span>
          <span className="container-font-dark-A-2">
            {props.title}
            <br />
          </span>
          <span className="container-font-dark-B-2">{props.subtitle}</span>
        </div>
      </div>
    </section>
  );
};
