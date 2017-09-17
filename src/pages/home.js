import React from 'react';
import { Link } from 'react-router-dom';

const chapters = [1, 2, 3, 4, 5, 6, 7, 8].map(i => (
  <li key={i}>
    <Link to={`/chapters/${i}`} className="usa-nav-link">
      <span>Chapter {i}</span>
    </Link>
  </li>
));

export default () => (
  <div>
    <h3>Guidelines</h3>

    <ul>{chapters}</ul>
  </div>
);
