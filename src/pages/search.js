import React from 'react';
import lunr from 'lunr';
import data from '../data/gl_index.json';

const idx = lunr.Index.load(data);

class Search extends React.Component {
  constructor(params) {
    super(params);
    this.state = { slug: params.match.params.slug || '', results: [] };
  }

  componentDidMount() {
    this.search();
  }

  search() {
    if (this.state.slug !== '') {
      console.log('searching .. idx loaded?');
      this.setState({ results: idx.search(this.state.slug) });
    }
  }

  render() {
    let items = '';
    if (this.state.results.length > 0) {
      items = this.state.results.map(r => (
        <li key={r.ref}>
          <a href={`/guidelines/${r.ref}`}>{r.ref}</a>
        </li>
      ));
    } else {
      if (this.state.slug.length > 0) {
        items = 'No results found.';
      }
    }

    return (
      <div>
        <h3>Guideline Search</h3>
        <form
          className="usa-search usa-search-big"
          onSubmit={e => {
            this.search();
            e.preventDefault();
          }}
        >
          <div role="search">
            <input
              id="search-field-big"
              type="search"
              name="search"
              onChange={e => this.setState({ slug: e.target.value })}
              value={this.state.slug}
            />
            <button type="submit">
              <span className="usa-search-submit-text">Search</span>
            </button>
          </div>
        </form>
        <ul>{items}</ul>
      </div>
    );
  }
}

export default Search;
