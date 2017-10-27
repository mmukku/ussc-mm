import React from 'react';
import lunr from 'lunr';
import idxData from '../data/gl_index.json';
import data from '../data/gl.json';
import _ from 'lodash';

const idx = lunr.Index.load(idxData);

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { slug: props.match.params.slug || '', results: [] };
  }

  componentDidMount() {
    this.search(this.state.slug);
  }

  componentWillReceiveProps(nextProps) {
    this.search(nextProps.match.params.slug);
  }

  search(slug) {
    if (slug !== '') {
      console.log(slug, 'here');
      let results = idx.search(slug).map(r => (
        <li key={r.ref}>
          <a href={`/gl/${r.ref}`}>{r.ref}</a>
          <div
            dangerouslySetInnerHTML={{
              __html: _.find(data, gl => gl.id === r.ref).title
            }}
          />
        </li>
      ));
      if (results.length === 0) {
        results = 'No results found.';
      }
      this.setState({ slug: slug, results: results });
      console.log(this.state);
    }
  }

  render() {
    return (
      <div>
        <h3>Guideline Search</h3>
        <form
          className="usa-search usa-search-big"
          onSubmit={e => {
            e.preventDefault();
            this.search(this.state.slug);
          }}
        >
          <div role="search">
            <input
              id="search-field-big"
              type="search"
              onChange={e => this.setState({ slug: e.target.value })}
              value={this.state.slug}
            />
            <button type="submit">
              <span className="usa-search-submit-text">Search</span>
            </button>
          </div>
        </form>
        <div className="usa-section">
          <ul className="usa-unstyled-list">{this.state.results}</ul>
        </div>
      </div>
    );
  }
}

export default Search;
