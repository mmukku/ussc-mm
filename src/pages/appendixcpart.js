import React from 'react';
import { Link } from 'react-router-dom';
import SimpleContentHeader from '../components/simpleContentHeader';
import BreadcrumbsWrapper from '../components/breadcrumbsWrapper';
import data from '../data/appendix-c';

import scrollToElment from 'scroll-to-element';
import _ from 'lodash';

class AppendixCPart extends React.Component {
  state = {
    slug: '',
    searchResults: [_.toNumber(this.props.match.params.id || 1)]
  };

  filter = currentValue => {
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
  };

  renderSearchResults = () => {
    return this.state.searchResults.map(r => (
      <section
        className="usa-section"
        key={r}
        dangerouslySetInnerHTML={{
          __html: _.find(data, a => a.id === r).content
        }}
      />
    ));
  };

  prevButton = () => {
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
  };

  nextButton = () => {
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
  };

  navigation = () => {
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
  };

  render() {
    let content = (
      <p>
        <strong>No Amendments found.</strong>
      </p>
    );
    if (this.state.searchResults.length > 0) {
      content = this.renderSearchResults();
    }
    let currAmmendmentId = this.state.searchResults[0];

    return (
      <div>
        <SimpleContentHeader
          title="Appendix C"
          subtitle="Amendments to the Guidelines Manual"
        />
        <BreadcrumbsWrapper>
          <li>
            <a href="/ac">Appendix C</a>
          </li>
          <li>
            <a href="/ac">Results</a>
          </li>
          <li className="active">Amendment {currAmmendmentId}</li>
        </BreadcrumbsWrapper>
        <section className="usa-section custom-section">
          <div className="usa-grid container-04a">
            <div className="container-04">
              <div className="container-04-A">
                <div className="container-04-A1 container-font-light-Ea">
                  {content}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="usa-section footer custom-section">
          <div className="usa-grid">
            <div className="usa-width-one-half amendments-div">
              <span>{this.prevButton()}</span>
            </div>
            <div className="usa-width-one-half amendments-div">
              <span>{this.nextButton()}</span>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default AppendixCPart;
