import React from 'react';
import lunr from 'lunr';
import SearchGuidelines from '../components/searchGuidelines';
import idxData from '../data/gl_index.json';
import gldata from '../data/guidelines.json';
import bdata from '../data/appendix-b.json';
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
      let results = idx.search(slug).map(r => {
        let title, type;
        if (r.ref.indexOf('§') === 0) {
          let gl = _.find(gldata, sgl => sgl.id === r.ref);
          if (gl) {
            title = gl.title;
          } else {
            title = '[]';
          }
          type = 'gl';
        } else {
          type = 'ab';
          title = _.find(bdata, b => b.id === r.ref).simpleTitle;
        }

        return (
          <div className="container-03-A" key={r.ref}>
            <a href={`/${type}/${r.ref}`}>
              <div className="container-03-A1">
                <span className="container-font-light-C">{r.ref} - </span>
                <span className="container-font-light-D">{title}</span>
              </div>
              <div className="container-03-A2">
                <div className="chevron-right-icon" />
              </div>
            </a>
          </div>
        );
      });
      if (results.length === 0) {
        results = 'No results found.';
      }
      this.setState({ slug: slug, results: results });
    }
  }

  render() {
    return (
      <div>
        <section className="usa-section search-global-A">
          <div className="usa-grid">
            <div className="usa-width-one-whole">
              <SearchGuidelines />
            </div>
          </div>
        </section>
        <section
          className="usa-section"
          style={{
            borderStyle: 'dotted',
            borderWidth: '0px',
            borderColor: 'grey',
            textAlign: 'center'
          }}
        >
          <div className="usa-grid">
            <div className="container-03">{this.state.results}</div>
          </div>
        </section>
      </div>
    );
  }
}

export default Search;
