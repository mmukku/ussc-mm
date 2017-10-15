import React, { Component } from 'react';
import data from '../data/de.json';
import _ from 'lodash';

const conversionTable = [
  { uom: 'oz', factor: 28.35, targetUOM: 'gm' },
  { uom: 'lb', factor: 453.6, targetUOM: 'gm' },
  { uom: 'lb', factor: 0.4536, targetUOM: 'kg' },
  { uom: 'gal', factor: 3.785, targetUOM: 'liters' },
  { uom: 'qt', factor: 0.946, targetUOM: 'liters' },
  { uom: 'gm', factor: 1, targetUOM: 'ml' },
  { uom: 'liter', factor: 1000, targetUOM: 'ml' },
  { uom: 'kg', factor: 1000, targetUOM: 'gm' },
  { uom: 'gm', factor: 1000, targetUOM: 'mg' },
  { uom: 'grain', factor: 64.8, targetUOM: 'mg' }
];

const weightPerDoseTable = [
  { substance: 'MDA', targetWeight: 250, targetUOM: 'mg' },
  { substance: 'MDMA', targetWeight: 250, targetUOM: 'mg' },
  { substance: 'Mescaline', targetWeight: 500, targetUOM: 'mg' },
  { substance: 'PCP*', targetWeight: 5, targetUOM: 'mg' },
  { substance: 'Peyote (dry)', targetWeight: 12, targetUOM: 'gm' },
  { substance: 'Peyote (wet)', targetWeight: 120, targetUOM: 'gm' },
  { substance: 'Psilocin*', targetWeight: 10, targetUOM: 'mg' },
  { substance: 'Psilocybe mushrooms (dry)', targetWeight: 5, targetUOM: 'gm' },
  { substance: 'Psilocybe mushrooms (wet)', targetWeight: 50, targetUOM: 'gm' },
  { substance: 'Psilocybin*', targetWeight: 10, targetUOM: 'mg' },
  {
    substance: '2,5-Dimethoxy-4-methylamphetamine (STP, DOM)*',
    targetWeight: 3,
    targetUOM: 'mg'
  },
  { substance: 'marihuana cigarette', targetWeight: 0.5, targetUOM: 'gm' },
  { substance: 'Amphetamine*', targetWeight: 10, targetUOM: 'mg' },
  { substance: 'Methamphetamine*', targetWeight: 5, targetUOM: 'mg' },
  { substance: 'Phenmetrazine (Preludin)*', targetWeight: 75, targetUOM: 'mg' }
];

let substanceList = _.uniqBy(data, 'substance');

substanceList = _.sortBy(substanceList, s => [s.substance]).map(ol => (
  <option key={ol.substance}>{ol.substance}</option>
));

//drug offence level
class DE extends Component {
  constructor() {
    super();
    this.state = {
      marihuana: undefined,
      substance: '',
      uom: '',
      uomList: '',
      qty: 0.0
    };
  }

  render() {
    let result = undefined;
    if (this.state.marihuana !== undefined) {
      let sourceUOM = this.state.marihuana.sourceUOM;
      if (sourceUOM === undefined) {
        sourceUOM = 'gm';
      }

      let conversionFactor = 1;
      let conversion = _.find(
        conversionTable,
        c => c.uom === this.state.uom && c.targetUOM === sourceUOM
      );
      if (conversion !== undefined) {
        conversionFactor = conversion.factor;
      }
      // console.log(this.state.uom, sourceUOM, conversionFactor);
      result = (
        <section>
          <div className="usa-alert usa-alert-info">
            <div className="usa-alert-body">
              <h4 className="usa-alert-heading">
                Marihuana:{' '}
                {this.state.qty *
                  conversionFactor *
                  this.state.marihuana.targetWeight}{' '}
                {this.state.marihuana.targetUOM}
              </h4>
            </div>
          </div>
        </section>
      );
    }
    return (
      <div>
        <h2>Drug Equivalency Calculator</h2>
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
            <option>Select</option>
            <option value="gm">gm</option>
            {this.state.uomList}
          </select>
          <button onClick={this.calculate.bind(this)}>Go</button>
        </section>
      </div>
    );
  }

  getUOMList(e) {
    let uom = _.filter(data, d => d.substance === e.target.value)[0].sourceUOM;
    if (uom === undefined) {
      uom = 'gm';
    }
    var uoml = _.filter(
      conversionTable,
      d => d.targetUOM === uom || d.sourceUOM === uom
    ).map(x => x.uom);

    let uomList = uoml.map(x => <option key={x}>{x}</option>);

    this.setState({ substance: e.target.value, uomList: uomList });
  }

  calculate(e) {
    let s = _.find(data, x => x.substance === this.state.substance);

    if (s !== undefined) {
      this.setState({ marihuana: s });
    }
  }
}

export default DE;
