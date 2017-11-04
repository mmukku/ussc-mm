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
    } else {
      this.setState({ offenseLevel: 'Not Found' });
    }
  }
}

export default DOL;
