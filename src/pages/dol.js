import React, { Component } from 'react';
import data from '../data/dol.json';
import _ from 'lodash';

let substanceList = _.uniqBy(data, 'substance');

substanceList = _.sortBy(substanceList, s => s.substance).map(ol => (
  <option key={ol.substance}>{ol.substance}</option>
));

//drug offence level
class DOL extends Component {
  state = {
    offenseLevel: undefined,
    substance: '',
    uom: '',
    uomList: '',
    qty: 0.0
  };

  render() {
    let result = undefined;
    if (this.state.offenseLevel !== undefined) {
      result = (
        <section>
          <div className="usa-alert usa-alert-info">
            <div className="usa-alert-body">
              <h4 className="usa-alert-heading">
                Offense Level: {this.state.offenseLevel}
              </h4>
            </div>
          </div>
        </section>
      );
    }
    return (
      <div>
        <h2>Drug Quantity Calculator</h2>
        {result}
        <section>
          <label htmlFor="substance">Substance</label>
          <select
            id="substance"
            onChange={e => this.getUOMList(e)}
            value={this.state.substance}
          >
            <option>Select</option>
            {substanceList}
          </select>
          <label htmlFor="weight">Weight</label>
          <input
            id="qty"
            onChange={e => this.setState({ qty: e.target.value })}
          />
          <label htmlFor="uom">Unit of measure</label>
          <select
            id="uom"
            onChange={e => this.setState({ uom: e.target.value })}
          >
            {this.state.uomList}
          </select>
          <button onClick={this.calculate.bind(this)}>Go</button>
        </section>
      </div>
    );
  }

  getUOMList(e) {
    let uoml = _.filter(data, d => d.substance === e.target.value);
    let uomList = _.uniqBy(uoml, 'uom').map(x => (
      <option key={x.uom}>{x.uom}</option>
    ));

    this.setState({ substance: e.target.value, uomList: uomList });
  }

  calculate(e) {
    let s = _.find(data, x => {
      if (x.substance !== this.state.substance || x.uom !== this.state.uom)
        return false;
      if (x.min !== undefined) {
        if (this.state.qty < x.min) return false;
      }
      if (x.max !== undefined) {
        if (x.max < this.state.qty) return false;
      }
      return true;
    });
    if (s !== undefined) {
      this.setState({ offenseLevel: s.level });
    }
  }
}

export default DOL;
