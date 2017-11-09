import React, { Component } from 'react';
import data from '../data/dol.json';
import _ from 'lodash';

let substanceList = _.uniqBy(data, 'substance');

substanceList = _.sortBy(substanceList, s => s.substance).map(ol => (
  <option key={ol.substance}>{ol.substance}</option>
));

const ConversionTable = [
  { uom: 'mg', factor: 0.001, targetUOM: 'g' },
  { uom: 'mg', factor: 0.000001, targetUOM: 'kg' },
  { uom: 'kg', factor: 1000, targetUOM: 'g' },
  { uom: 'kg', factor: 1000000, targetUOM: 'mg' },
  { uom: 'g', factor: 1000, targetUOM: 'mg' },
  { uom: 'g', factor: 0.001, targetUOM: 'kg' }
];

//drug offence level
class DOL extends Component {
  state = {
    offenseLevel: null,
    substance: '',
    uom: '',
    uomList: '',
    qty: 0.0
  };

  render() {
    let result = <div />;
    if (this.state.offenseLevel !== null) {
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
    } else {
      result = <div />;
    }
    return (
      <div>
        <h2>Drug Quantity Calculator</h2>
        {result}
        <section>
          <label htmlFor="substance">Substance</label>
          <select
            onChange={e => this.getUOMList(e)}
            value={this.state.substance}
          >
            <option>Select</option>
            {substanceList}
          </select>
          <label htmlFor="weight">Weight</label>
          <input onChange={this.handleQtyChange.bind(this)} />
          <label htmlFor="uom">Unit of measure</label>
          <select
            onChange={this.handleUOMChange.bind(this)}
            value={this.state.uom}
          >
            {this.state.uomList}
          </select>
          <button onClick={this.calculate.bind(this)}>Go</button>
        </section>
      </div>
    );
  }

  handleQtyChange(e) {
    this.setState({ offenseLevel: null, qty: e.target.value });
  }

  handleUOMChange(e) {
    this.setState({ offenseLevel: null, uom: e.target.value });
  }

  getUOMList(e) {
    let uoml = _.filter(data, d => d.substance === e.target.value);
    let uomList = _.uniqBy(uoml, 'uom').map(x => (
      <option key={x.uom}>{x.uom}</option>
    ));

    this.setState({
      offenseLevel: null,
      uom: uoml[0].uom,
      substance: e.target.value,
      uomList: uomList
    });
  }

  calculate(e) {
    let s = _.find(data, x => {
      if (x.substance !== this.state.substance) return false;
      console.log(x);
      let qty = this.state.qty;
      if (x.uom !== this.state.uom) {
        let conversionFactor = _.find(
          ConversionTable,
          u => u.uom === this.state.uom && u.targetUOM === x.uom
        );
        if (conversionFactor !== undefined) {
          qty = qty * conversionFactor.factor;
        } else {
          return false;
        }
      }
      console.log(this.state.qty, this.state.uom, qty, x.uom);
      if (x.min !== undefined) {
        if (qty < x.min) return false;
      }
      if (x.max !== undefined) {
        if (x.max < qty) return false;
      }
      return true;
    });
    if (s !== undefined) {
      this.setState({ offenseLevel: s.level });
    } else {
      this.setState({ offenseLevel: 'Not Found' });
    }
  }
}

export default DOL;
