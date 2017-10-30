import React from 'react';
import data from '../data/appendix-c';
import _ from 'lodash';

class Amendments extends React.Component {
  constructor(props) {
    super(props);
    let id = props.match.params.id || 1;
    this.state = {
      slug: '',
      searchResults: [_.toNumber(id)]
    };

    this.filter = this.filter.bind(this);
  }

  filter(currentValue) {
    if (currentValue !== undefined) {
      this.setState({ slug: currentValue });
    } else {
      currentValue = this.state.slug;
    }

    let results = [];
    if (_.toNumber(currentValue) > 0) {
      results = _.filter(data, a => a.id === _.toNumber(currentValue)).map(
        a => a.id
      );
    } else {
      var d = new Date(currentValue);
      if (_.isDate(d)) {
        let delimiter = '/';
        function pad(s) {
          return s < 10 ? '0' + s : s;
        }
        let formatted = [
          pad(d.getMonth() + 1),
          pad(d.getDate()),
          d.getFullYear()
        ].join(delimiter);
        results = _.filter(data, a => a.edt === _.toString(formatted)).map(
          a => a.id
        );
      }
    }

    this.setState({ searchResults: results });
  }

  renderSearchResults() {
    return this.state.searchResults.map(r => (
      <section
        className="usa-section"
        key={r}
        dangerouslySetInnerHTML={{
          __html: _.find(data, a => a.id === r).content
        }}
      />
    ));
  }

  prevButton() {
    let current = this.state.searchResults[0];
    if (current > 1) {
      return (
        <button className="usa-button" onClick={() => this.filter(current - 1)}>
          &lt; Previous
        </button>
      );
    }
    return (
      <button className="usa-button" disabled>
        &lt; Previous
      </button>
    );
  }

  nextButton() {
    let current = this.state.searchResults[0];
    if (current < data.length) {
      return (
        <button className="usa-button" onClick={() => this.filter(current + 1)}>
          Next &gt;
        </button>
      );
    }
    return (
      <button className="usa-button" disabled>
        Next &gt;
      </button>
    );
  }

  navigation() {
    if (this.state.searchResults.length === 1) {
      return (
        <div style={{ float: 'right' }}>
          <span className="usa-button-list">
            <span>{this.prevButton()}</span>
            <span>{this.nextButton()}</span>
          </span>
        </div>
      );
    }
  }

  render() {
    let content = (
      <p>
        <strong>No Amendments found.</strong>
      </p>
    );
    if (this.state.searchResults.length > 0) {
      content = this.renderSearchResults();
    }

    return (
      <div>
        <h2>Amendments</h2>
        <form
          className="usa-search usa-search-big"
          onSubmit={e => {
            this.filter(this.state.slug);
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
              placeholder="Search by amemdment number or date"
            />
            <button type="submit">
              <span className="usa-search-submit-text">Search</span>
            </button>
          </div>
        </form>
        {this.navigation()}
        {content}
        {this.navigation()}
      </div>
    );
  }
}

export default Amendments;
