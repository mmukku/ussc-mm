import React from 'react';

export default props => {
  return (
    <section key={props.key} className="usa-section">
      <div className="usa-grid">{props.children}</div>
    </section>
  );
};
