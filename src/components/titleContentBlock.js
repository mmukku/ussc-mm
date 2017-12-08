import React from 'react';

export default props => {
  if (props.children.length !== 0) {
    return (
      <div className="container-05-title-2">
        <div className="container-05-title-B">
          <div className="container-05-title-B1">{props.children}</div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
