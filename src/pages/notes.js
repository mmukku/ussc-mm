import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { get_notes_summary, get_note, remove_note } from '../note';

function remove_note_wrapper(path, id) {
  return function() {
    remove_note(path, id);
    alert('Note removed');
    ReactDOM.render(<App />, document.getElementById('root'));
  };
}

export default props => {
  let summary = get_notes_summary();
  let display = [];
  for (var key in summary) {
    let items = [];
    for (var i = 0; i < summary[key].ids.length; i++) {
      let id = summary[key].ids[i];
      items.push(
        <div>
          <button onClick={remove_note_wrapper(key, id)}>Remove Note</button>
          <div
            dangerouslySetInnerHTML={{
              __html: get_note(key, id)
            }}
          />
        </div>
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
  if (display.length === 0) {
    display.push(<div>There are no notes.</div>);
  }
  return (
    <div>
      <h1>Notes</h1>
      {display}
    </div>
  );
};
