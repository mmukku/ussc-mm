import React from 'react';

export default props => {
  return (
    <div key={props.key} className="container-03-A-b">
      <div className="container-03-A1">{props.children}</div>
      <div className="container-03-A2">
        <div className="chevron-right-icon" />
      </div>
    </div>
  );
};
