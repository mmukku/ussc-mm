import React, { Component } from 'react';
import data from '../data/sc.json';
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
        <h2>Guideline Range Calculator</h2>
        <section>
          Use the Guideline Range Calculator to determine the applicable
          guideline range from the Sentencing Table (Chapter Five, Part A).
          First, select the Offense Level (1–43) as determined by applying
          Chapters Two and Three. Then, select the Criminal History Category
          (I–VI) as determined by applying Chapter Four, Part A. Results are
          displayed in months of imprisonment. “Life” means life imprisonment.
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
          <label htmlFor="category">Criminal History Category</label>
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
      console.log(min, max);
      let zn = _.find(zones, z => min >= z.min && max <= z.max);

      if (zn !== undefined) {
        zone = zn.zone;
      }

      this.setState({ sentence: sentence, zone: zone });
    }
  }
}

export default SC;
