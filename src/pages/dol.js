import React, { Component } from 'react';
import data from '../data/dol.json';
import SimpleContentHeader from '../components/simpleContentHeader';
import ExplanatoryBox from '../components/explanatoryBox';
import Blockset from '../components/blockset';
import TitleBlock from '../components/titleBlock';
import ContentBlock from '../components/contentBlock';
import FormObject from '../components/formObject';
//import alertIcon from '../img/icons/static_alert.svg';
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
        <Blockset>
          <TitleBlock>Results</TitleBlock>
          <ContentBlock>
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
          </ContentBlock>
        </Blockset>
      );
    } else {
      result = <div />;
    }
    return (
      <div>
        <SimpleContentHeader title="Drug Quantity Calculator" />
        <ExplanatoryBox>
          Use the Drug Quantity Calculator to find the offense level for the
          controlled substance involved in the offense. First, select the
          substance involved in the offense. Then, enter the weight of the
          substance and the appropriate unit of measurement. Results will
          display the offense level specified in the Drug Quantity Table set
          forth in §2D1.1(c).
        </ExplanatoryBox>
        <FormObject label="Substance">
          <select
            className="container-font-dark-B-4"
            onChange={e => this.getUOMList(e)}
            value={this.state.substance}
          >
            <option>Select</option>
            {substanceList}
          </select>
        </FormObject>
        <FormObject label="Weight">
          <input
            type="text"
            required=""
            aria-required="true"
            placeholder="Enter Number"
            className="container-font-dark-B-4"
            onChange={this.handleQtyChange.bind(this)}
          />
        </FormObject>
        <FormObject label="Unit of Measure">
          <select
            className="container-font-dark-B-4"
            onChange={this.handleUOMChange.bind(this)}
            value={this.state.uom}
          >
            {this.state.uomList}
          </select>
        </FormObject>
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
