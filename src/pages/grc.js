import React, { Component } from 'react';
import data from '../data/sc.json';
import alertIcon from '../img/icons/static_alert.svg';
import _ from 'lodash';

const offenseLevelsList = _.uniqBy(data, 'offenseLevel').map(ol => (
  <option key={ol.offenseLevel}>{ol.offenseLevel}</option>
));

const categoryList = [
  { value: 'I', text: 'CHC I (0 or 1 point)' },
  { value: 'II', text: 'CHC II (2 or 3 points)' },
  { value: 'III', text: 'CHC III (4, 5, or 6 points)' },
  { value: 'IV', text: 'CHC IV (7, 8, or 9 points)' },
  { value: 'V', text: 'CHC V (10, 11, or 12 points)' },
  { value: 'VI', text: 'CHC VI (13 or more points)' }
].map(c => (
  <option value={c.value} key={c.value}>
    {c.text}
  </option>
));

const zones = [
  { min: 0, max: 6, zone: 'A' },
  { min: 1, max: 15, zone: 'B' },
  { min: 10, max: 18, zone: 'C' },
  { min: 15, max: 361, zone: 'D' }
];

class SC extends Component {
  state = {
    offenseLevel: data[0].offenseLevel,
    category: 'I',
    sentence: null,
    zone: 'D'
  };

  render() {
    let results = '';
    if (this.state.sentence) {
      let sentence = this.state.sentence;
      let description = `${sentence} months of`;

      if (sentence === 'life') {
        description = sentence;
      }

      description = `${description} imprisonment.`;

      results = (
        <div>
          <section className="usa-section grc-header">
            <div className="usa-grid">
              <div className="container-05-title">
                <div className="container-05-title-A">
                  <div className="container-05-title-A1">
                    <span className="container-font-light-C">Results</span>
                  </div>
                </div>
              </div>
              <div className="container-05">
                <div className="container-05-A">
                  <div className="container-05-A1">
                    <div className="container-05-A1a">
                      <img className="alert-left-icon" src={alertIcon} />
                    </div>
                    <div className="container-05-A1b">
                      <div className="container-05-A1b-top">
                        <span className="container-font-light-C">
                          {description}
                        </span>
                      </div>
                      <div className="container-05-A1b-bottom">
                        <span className="container-font-light-D">
                          Zone {this.state.zone}.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    } else {
      results = <div />;
    }
    return (
      <div>
        <section className="usa-section usa-section-black grc-header">
          <div className="usa-grid">
            <div className="container-title-b">
              <span className="container-font-dark-B-2">
                Version 3.14-17<br />
              </span>
              <span className="container-font-dark-A-2">
                Guidelines Range<br />
              </span>
            </div>
          </div>
        </section>
        <section className="usa-section search-global-B">
          <div className="usa-grid">
            <span className="container-font-dark-B-3">
              OFFENSE LEVEL<br />
            </span>
          </div>
          <div className="usa-grid">
            <div className="usa-width-one-whole search-box-global">
              <form className="usa-search usa-search-small">
                <select
                  id="offenseLevel"
                  className="container-font-dark-B-4"
                  onChange={this.handleOffenceLevelChange.bind(this)}
                  value={this.state.offenseLevel}
                >
                  {offenseLevelsList}
                </select>
              </form>
            </div>
          </div>
        </section>
        <section className="usa-section search-global-B">
          <div className="usa-grid">
            <span className="container-font-dark-B-3">
              CATOGORY<br />
            </span>
          </div>
          <div className="usa-grid">
            <div className="usa-width-one-whole search-box-global">
              <form className="usa-search usa-search-small">
                <select
                  id="category"
                  className="container-font-dark-B-4"
                  value={this.state.category}
                  onChange={this.handleCategoryChange.bind(this)}
                >
                  {categoryList}
                </select>
              </form>
            </div>
          </div>
        </section>
        <section className="usa-section search-global-B">
          <div className="usa-grid">
            <div className="usa-width-one-whole search-box-global">
              <button
                className="usa-button"
                onClick={this.calculate.bind(this)}
              >
                Submit
              </button>
            </div>
          </div>
        </section>
        <section>{results}</section>
      </div>
    );
  }

  handleOffenceLevelChange(e) {
    this.setState({ sentence: null, offenseLevel: e.target.value });
  }

  handleCategoryChange(e) {
    this.setState({ sentence: null, category: e.target.value });
  }

  calculate(e) {
    console.log(this.state);
    let s = _.find(
      data,
      x =>
        // eslint-disable-next-line
        x.offenseLevel.toString() === this.state.offenseLevel.toString()
    );
    if (s !== undefined) {
      let zone = 'D';
      let sentence = s[this.state.category];
      let pair = sentence.split('-');

      let min = Number(pair[0]);
      let max = Number(pair[1]);
      let zn = _.find(zones, z => min >= z.min && max <= z.max);

      if (zn !== undefined) {
        zone = zn.zone;
      }

      this.setState({ sentence: sentence, zone: zone });
    }
  }
}

export default SC;
