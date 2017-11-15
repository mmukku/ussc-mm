import React from 'react';
import { get_notes_summary, get_note } from '../note';

export default props => {
  let summary = get_notes_summary();
  let display = [];
  for (var key in summary) {
    let items = [];
    for (var i = 0; i < summary[key].ids.length; i++) {
      items.push(
        <div
          dangerouslySetInnerHTML={{
            __html: get_note(key, summary[key].ids[i])
          }}
        />
      );
    }
    display.push(
      <div>
        <h2>
          <a href={key}>{summary[key].title}</a>
        </h2>
        {items}
      </div>
    );
  }
  if (display.length == 0) {
    display.push(<div>There are no notes.</div>);
  }
  return (
    <div>
      <h1>Notes</h1>
      {display}
    </div>
  );
};
