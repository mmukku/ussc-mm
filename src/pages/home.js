import React from 'react';
import { Link } from 'react-router-dom';
import chapters from '../data/chapters.json';

const chapterList = chapters.map(c => (
  <li key={c.id}>
    <Link to={`/chapters/${c.id}/parts`} className="usa-nav-link">
      <span>
        Chapter {c.id} - {c.title}
      </span>
    </Link>
  </li>
));

export default () => (
  <div>
    <h3>Chapters</h3>
    <ul>{chapterList}</ul>
  </div>
);
