import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import App from '../App';
import { get_bookmarks, remove_bookmark } from '../bookmark';

/* return a function so that if the original variable changes the function is not affected; remove a bookmark,
	let the user know, and refresh the page */
function remove_bookmark_wrapper(id) {
  return function() {
    remove_bookmark(id);
    alert('Bookmark removed');
    ReactDOM.render(<App />, document.getElementById('root'));
  };
}

export default props => {
  let bookmarks = get_bookmarks();
  let bookmark_elements = [];
  for (var i = 0; i < bookmarks.data.length; i++) {
    let item = bookmarks.data[i];
    if (item !== null) {
      bookmark_elements.push(
        <div key={item.id}>
          <div>
            <Link to={item.path}>{item.title}</Link>
          </div>
          <button type="button" onClick={remove_bookmark_wrapper(item.id)}>
            Remove Bookmark
          </button>
        </div>
      );
    }
  }
  if (bookmark_elements.length === 0) {
    bookmark_elements.push(<p>There are no bookmarks.</p>);
  }
  return (
    <div>
      <h1>Bookmarks</h1>
      {bookmark_elements}
    </div>
  );
};
