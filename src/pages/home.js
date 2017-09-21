import React from 'react';
import { Link } from 'react-router-dom';
import chapters from '../data/chapters.json';
import PartsLink from '../components/partsLink';

const chapterList = chapters.map(c => (
  <li key={c.id}>
    <PartsLink chapterId={c.id}>
      Chapter {c.id} - {c.title}
    </PartsLink>
  </li>
));

export default () => (
  <div>
    <h3>Chapters</h3>
    <ul>{chapterList}</ul>
  </div>
);
