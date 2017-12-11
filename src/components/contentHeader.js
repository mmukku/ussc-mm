import React from 'react';
import SearchGuidelines from '../components/searchGuidelines';
import SimpleContentHeader from '../components/simpleContentHeader';

export default props => {
  return (
    <div>
      <SimpleContentHeader title={props.title} subtitle={props.subtitle} />
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
