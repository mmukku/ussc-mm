import React from 'react';
import data from '../data/appendix-b';

export default props => {
  let content = data.find(b => b.id === props.match.params.part).content;
  return (
    <div>
      <a href="/ab">AppendixB</a>
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
