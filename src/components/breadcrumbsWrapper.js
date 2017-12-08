import React from 'react';

export default props => {
  return (
    <section className="usa-section breadcrumb-global-A">
      <div className="usa-grid breadcrumb-global-A-1">
        <div className="usa-width-one-whole">
          <ol className="breadcrumb-b">{props.children}</ol>
        </div>
      </div>
    </section>
  );
};
