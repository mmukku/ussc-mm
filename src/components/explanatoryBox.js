import React from 'react';

export default props => {
  return (
    <section className="usa-section container-custom-result">
      <div className="usa-grid">
        <div className="container-03">
          <div className="container-05-A1">
            <div className="container-05-A1c container-font-light-Ea">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
