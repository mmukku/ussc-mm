import React, { Component } from 'react';
import data from '../data/sc.json';
import _ from 'lodash';

const offenseLevelsList = _.uniqBy(data, 'offenseLevel').map(ol => (
  <option key={ol.offenseLevel}>{ol.offenseLevel}</option>
));

const categoryList = ['I', 'II', 'III', 'IV', 'V', 'VI'].map(c => (
  <option key={c}>{c}</option>
));

const zones = [
  { min: 0, max: 6, zone: 'A' },
  { min: 4, max: 15, zone: 'B' },
  { min: 10, max: 18, zone: 'C' },
  { min: 15, max: 100, zone: 'D' }
];

class SC extends Component {
  constructor() {
    super();
    this.state = {
      offenseLevel: '',
      category: '',
      sentence: null,
      zone: 'D'
    };
  }

  render() {
    let results = '';
    if (this.state.sentence) {
      let sentence = this.state.sentence;
      let description = `${sentence} months of`;

      if (sentence === 'life') {
        description = sentence;
      }

      description = `${description} imprisonment. Zone ${this.state.zone}.`;

      results = (
        <div className="usa-alert usa-alert-info">
          <div className="usa-alert-body">
            <h4 className="usa-alert-heading">{description}</h4>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h2>Sentencing Calculator</h2>
        <section>
          <p>
            This index specifies the offense guideline section(s) in Chapter Two
            (Offense Conduct) applicable to the statute of conviction. If more
            than one guideline section is referenced for the particular statute,
            use the guideline most appropriate for the offense conduct charged
            in the count of which the defendant was convicted. For the rules
            governing the determination of the offense guideline section(s) from
            Chapter Two, and for any exceptions to those rules, see §1B1.2
            (Applicable Guidelines).
          </p>
        </section>
        <section>{results}</section>
        <section>
          <label htmlFor="offenseLevel">Offense Level</label>
          <select
            id="offenseLevel"
            onChange={e => this.setState({ offenseLevel: e.target.value })}
            value={this.state.offenseLevel}
          >
            <option>Select</option>
            {offenseLevelsList}
          </select>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            onChange={e => this.setState({ category: e.target.value })}
          >
            <option>Select</option>
            {categoryList}
          </select>
          <button onClick={this.calculate.bind(this)}>Go</button>
        </section>
      </div>
    );
  }

  calculate(e) {
    let s = _.find(
      data,
      x =>
        // eslint-disable-next-line
        x.offenseLevel == this.state.offenseLevel
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
