import React from 'react';
import elasticlunr from 'elasticlunr';
import indxgl from './data/gl_index';

const indexDump = JSON.parse(indxgl);
console.time('load');
const idx = elasticlunr.Index.load(indexDump);

export default params => {
  return <div>Hello</div>;
};
