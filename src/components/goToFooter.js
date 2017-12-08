import React from 'react';

export default props => {
  return (
    <section
      className="usa-section footer"
      style={{
        borderStyle: 'dotted',
        borderWidth: '0px',
        borderColor: 'grey',
        textAlign: 'center'
      }}
    >
      <div className="usa-grid footer-B">
        <div className="usa-width-one-whole">
          <select onChange={e => (window.location = e.target.value)}>
            <option>Go to</option>
            {props.list}
          </select>
        </div>
      </div>
    </section>
  );
};
