import React from 'react';

export default props => {
  return (
    <div>
      <section className="usa-section footer container-custom-result">
        <div className="usa-grid footer-B">
          <div className="usa-width-one-whole footer-a">
            <div className="usa-width-one-third">
              <input
                type="button"
                value="A+"
                onClick={() => props.changeFontSize('+')}
              />
            </div>
            <div class="usa-width-one-third">
              <input
                type="button"
                value="A"
                onClick={() => props.changeFontSize()}
              />
            </div>
            <div class="usa-width-one-third">
              <input
                type="button"
                value="A-"
                onClick={() => props.changeFontSize('-')}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
