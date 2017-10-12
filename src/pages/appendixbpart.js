import React from 'react';
import data from '../data/appendix-b';
import _ from 'lodash';

export default props => {
  let content = _.find(data, b => b.id === props.match.params.part).content;
  return (
    <div>
      <a href="/ab">AppendixB</a>
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
