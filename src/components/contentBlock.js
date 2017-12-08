import React from 'react';

export default props => {
  if (props.children.length !== 0) {
    return (
      <div className="container-05">
        <div className="container-05-A1">
          <div className="container-05-A1c">{props.children}</div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
