import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SearchGuidelines extends Component {
  constructor(props) {
    super(props);
    this.state = { slug: '' };
  }

  goToSearch(e) {
    e.preventDefault();
    this.props.history.push('/search/' + this.state.slug);
  }
  render() {
    return (
      <form
        className="usa-search usa-search-small"
        onSubmit={e => this.goToSearch(e)}
      >
        <div role="search">
          <label className="usa-sr-only" htmlFor="search-field-small">
            Search small
          </label>
          <input
            id="search-field-small"
            type="search"
            value={this.state.slug}
            onChange={e => this.setState({ slug: e.target.value })}
          />
          <button type="submit">
            <span className="usa-sr-only">Search</span>
          </button>
        </div>
      </form>
    );
  }
}

export default withRouter(SearchGuidelines);
