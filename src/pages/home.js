import React from 'react';
import chapters from '../data/chapters.json';
import PartsLink from '../components/partsLink';

const chapterList = chapters.map(c => (
  <p key={c.id}>
    <PartsLink chapterId={c.id}>
      Chapter {c.id} - {c.title}
    </PartsLink>
  </p>
));

export default () => (
  <div>
    <h3>Chapters</h3>
    {chapterList}
  </div>
);
