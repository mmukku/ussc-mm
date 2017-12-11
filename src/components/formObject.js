import React from 'react';

export default props => {
  return (
    <section className="usa-section search-global-B">
      <div className="usa-grid">
        <span className="container-font-dark-B-3">
          {props.label}
          <br />
        </span>
      </div>
      <div className="usa-grid">
        <div className="usa-width-one-whole search-box-global">
          <form className="usa-search usa-search-small">{props.children}</form>
        </div>
      </div>
    </section>
  );
};
