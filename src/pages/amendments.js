import React from 'react';
import data from '../data/appendix-c';
import _ from 'lodash';

class Amendments extends React.Component {
  constructor() {
    super();
    this.state = {
      slug: '1',
      searchResults: [1]
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    var currentValue = event.target.value;

    this.filter(currentValue);
  }

  filter(currentValue) {
    this.setState({ slug: currentValue });
    let results = [];
    if (_.toNumber(currentValue) > 0) {
      results = _.filter(data, a => a.id === _.toNumber(currentValue)).map(
        a => a.id
      );
    } else {
      console.log(typeof currentValue);
      results = _.filter(data, a => a.edt === _.toString(currentValue)).map(
        a => a.id
      );
    }

    this.setState({ searchResults: results });
  }

  renderSearchResults() {
    return this.state.searchResults.map(r => (
      <section
        key={r}
        className="usa-section"
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
        Next &nbsp;&gt;
      </button>
    );
  }

  navigation() {
    if (this.state.searchResults.length === 1) {
      return (
        <div className="usa-section">
          <div className="usa-width-one-half">{this.prevButton()}</div>
          <div className="usa-width-one-half">{this.nextButton()}</div>
        </div>
      );
    }
  }

  render() {
    let content = 'No Results.';
    if (this.state.searchResults.length > 0) {
      content = this.renderSearchResults();
    }

    return (
      <div className="usa-section">
        <div className="usa-section">
          <div className="usa-width-one-half">
            <h2>Amendments</h2>
          </div>
          <div className="usa-width-one-half">
            <input
              onChange={this.handleSearch}
              value={this.state.slug}
              placeholder="Search by amemdment number or mm/dd/yyyy"
            />
          </div>
        </div>
        {this.navigation()}
        {content}
        {this.navigation()}
      </div>
    );
  }
}

export default Amendments;
