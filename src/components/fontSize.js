import React from 'react';

export default props => {
  return (
    <div style={{ textAlign: 'right' }}>
      <button onClick={() => props.changeFontSize('-')}>A-</button>
      <button onClick={() => props.changeFontSize()}>A</button>
      <button onClick={() => props.changeFontSize('+')}>A+</button>
    </div>
  );
};
