import React from 'react';
import SearchGuidelines from '../components/searchGuidelines';

export default props => {
  return (
    <div>
      <section className="usa-section usa-section-black">
        <div className="usa-grid">
          <div className="container-title">
            <span className="container-font-dark-B-2">
              Version 3.14-17
              <br />
            </span>
            <span className="container-font-dark-A-2">
              Guidelines Manual
              <br />
            </span>
            <span className="container-font-dark-B-2">2017</span>
          </div>
        </div>
      </section>
      <section className="usa-section search-global-A">
        <div className="usa-grid">
          <div className="usa-width-one-whole">
            <SearchGuidelines />
          </div>
        </div>
      </section>
    </div>
  );
};
