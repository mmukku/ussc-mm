import React, { Component } from 'react';
import data from '../data/dol.json';
import _ from 'lodash';

import conversionTable from '../data/ct.json';

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
        <section className="usa-section">
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
                  <div className="container-05-A1b">
                    <div className="container-05-A1b-top">
                      <span className="container-font-light-C">
                        Offense Level <br />
                      </span>
                    </div>
                    <div className="container-05-A1b-bottom">
                      <span className="container-font-light-D">
                        {this.state.offenseLevel} <br />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      result = <div />;
    }
    return (
      <div>
        <section className="usa-section usa-section-black">
          <div className="usa-grid">
            <div className="container-title-b">
              <span className="container-font-dark-B-2">
                Version 3.14-17<br />
              </span>
              <span className="container-font-dark-A-2">
                Drug Quantity Calculator<br />
              </span>
            </div>
          </div>
        </section>
        <p>
          Use the Drug Quantity Calculator to find the offense level for the
          controlled substance involved in the offense. First, select the
          substance involved in the offense. Then, enter the weight of the
          substance and the appropriate unit of measurement. Results will
          display the offense level specified in the Drug Quantity Table set
          forth in §2D1.1(c).
        </p>
        <section className="usa-section search-global-B">
          <div className="usa-grid">
            <span className="container-font-dark-B-3">
              SUBSTANCE<br />
            </span>
          </div>
          <div className="usa-grid">
            <div className="usa-width-one-whole">
              <form className="usa-search usa-search-small">
                <select
                  className="container-font-dark-B-4"
                  onChange={e => this.getUOMList(e)}
                  value={this.state.substance}
                >
                  <option>Select</option>
                  {substanceList}
                </select>
              </form>
            </div>
          </div>
        </section>
        <section className="usa-section search-global-B">
          <div className="usa-grid">
            <div className="usa-width-one-whole">
              <form className="usa-form">
                <fieldset>
                  <span className="container-font-dark-B-3">
                    WEIGHT<br />
                  </span>
                  <input
                    type="text"
                    required=""
                    aria-required="true"
                    placeholder="Enter Number"
                    className="container-font-dark-B-4"
                    onChange={this.handleQtyChange.bind(this)}
                  />
                </fieldset>
              </form>
            </div>
          </div>
        </section>
        <section className="usa-section search-global-B">
          <div className="usa-grid">
            <span className="container-font-dark-B-3">
              UNIT OF MEASURE<br />
            </span>
          </div>
          <div className="usa-grid">
            <div className="usa-width-one-whole">
              <form className="usa-search usa-search-small">
                <select
                  className="container-font-dark-B-4"
                  onChange={this.handleUOMChange.bind(this)}
                  value={this.state.uom}
                >
                  {this.state.uomList}
                </select>
              </form>
            </div>
          </div>
        </section>
        <section className="usa-section search-global-B">
          <div className="usa-grid">
            <div className="usa-width-one-whole">
              <button
                className="usa-button"
                onClick={this.calculate.bind(this)}
              >
                Submit
              </button>
            </div>
          </div>
        </section>
        {result}
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
    let substance = _.find(data, d => d.substance === e.target.value);
    let uoml = _.concat(
      substance.uom,
      _.filter(conversionTable, d => d.targetUOM === substance.uom).map(
        x => x.uom
      )
    );
    let uomList = uoml.map(x => <option key={x}>{x}</option>);
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
          conversionTable,
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
