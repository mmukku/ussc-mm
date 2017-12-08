import React from 'react';
import PartsLink from './partsLink';

export default props => {
  return (
    <li>
      <PartsLink chapterId={props.id}>CHAPTER {props.id}</PartsLink>
    </li>
  );
};
