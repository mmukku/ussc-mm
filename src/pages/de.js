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
  { uom: 'ml', factor: 1, targetUOM: 'gm' },
  { uom: 'liter', factor: 1000, targetUOM: 'ml' },
  { uom: 'mg', factor: 0.001, targetUOM: 'gm' },
  { uom: 'kg', factor: 1000, targetUOM: 'gm' },
  { uom: 'gm', factor: 1000, targetUOM: 'mg' },
  { uom: 'grain', factor: 64.8, targetUOM: 'mg' }
];

const Notes =
  'Provided, that the minimum offense level from the Drug Quantity Table for this controlled substance individually, or in combination with another controlled substance, is level 12.';

const NotesTable = [
  {
    substances: 'Flunitrazepam',
    notes:
      'Provided, that the minimum offense level from the Drug Quantity Table for flunitrazepam individually, or in combination with any Schedule I or II depressants, Schedule III substances, Schedule IV substances, and Schedule V substances is level 8.'
  },
  {
    substances: 'Schedule III Substances (except ketamine)',
    notes:
      'Provided, that the combined equivalent weight of all Schedule III substances (except ketamine), Schedule IV substances (except flunitrazepam), and Schedule V substances shall not exceed 79.99 kilograms of marihuana.'
  },
  {
    substances: 'Schedule IV Substances (except Flunitrazepam)',
    notes:
      'Provided, that the combined equivalent weight of all Schedule IV (except flunitrazepam) and V substances shall not exceed 9.99 kilograms of marihuana.'
  },
  {
    substances: 'Schedule V Substances',
    notes:
      'Provided, that the combined equivalent weight of Schedule V substances shall not exceed 2.49 kilograms of marihuana.'
  },
  {
    substances: 'Ephedrine,Phenylpropanolamine,Pseudoephedrine',
    notes:
      'Provided, that in a case involving ephedrine, pseudoephedrine, or phenylpropanolamine tablets, use the weight of the ephedrine, pseudoephedrine, or phenylpropanolamine contained in the tablets, not the weight of the entire tablets, in calculating the base offense level.'
  },
  {
    substances:
      'Marihuana/Cannabis, granulated, powdered, etc., Hashish Oil, Cannabis Resin or Hashish, Tetrahydrocannabinol, Organic, Tetrahydrocannabinol, Synthetic, Schedule I or II Depressant (except gamma-hydroxybutyric acid), Gamma-Hydroxybutyric Acid, Ketamine, 1,4-butanediol, Gamma Butyrolactone',
    notes: ''
  }
];

// const weightPerDoseTable = [
//   { substance: 'MDA', targetWeight: 250, targetUOM: 'mg' },
//   { substance: 'MDMA', targetWeight: 250, targetUOM: 'mg' },
//   { substance: 'Mescaline', targetWeight: 500, targetUOM: 'mg' },
//   { substance: 'PCP*', targetWeight: 5, targetUOM: 'mg' },
//   { substance: 'Peyote (dry)', targetWeight: 12, targetUOM: 'gm' },
//   { substance: 'Peyote (wet)', targetWeight: 120, targetUOM: 'gm' },
//   { substance: 'Psilocin*', targetWeight: 10, targetUOM: 'mg' },
//   { substance: 'Psilocybe mushrooms (dry)', targetWeight: 5, targetUOM: 'gm' },
//   { substance: 'Psilocybe mushrooms (wet)', targetWeight: 50, targetUOM: 'gm' },
//   { substance: 'Psilocybin*', targetWeight: 10, targetUOM: 'mg' },
//   {
//     substance: '2,5-Dimethoxy-4-methylamphetamine (STP, DOM)*',
//     targetWeight: 3,
//     targetUOM: 'mg'
//   },
//   { substance: 'marihuana cigarette', targetWeight: 0.5, targetUOM: 'gm' },
//   { substance: 'Amphetamine*', targetWeight: 10, targetUOM: 'mg' },
//   { substance: 'Methamphetamine*', targetWeight: 5, targetUOM: 'mg' },
//   { substance: 'Phenmetrazine (Preludin)*', targetWeight: 75, targetUOM: 'mg' }
// ];

let substanceList = _.uniqBy(data, 'substance');

substanceList = _.sortBy(substanceList, s => [s.substance]).map(ol => (
  <option key={ol.substance}>{ol.substance}</option>
));

//drug offence level
class DE extends Component {
  constructor() {
    super();
    this.state = {
      marihuana: null,
      substance: '',
      uom: '',
      uomList: '',
      qty: 0.0
    };
  }

  render() {
    let result;
    if (this.state.marihuana !== null) {
      let sourceUOM = this.state.marihuana.substanceUOM;
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
      let notes = Notes;
      let noteEntry = _.find(
        NotesTable,
        nt => nt.substances.indexOf(this.state.substance) >= 0
      );
      if (noteEntry !== undefined) {
        notes = noteEntry.notes;
      }
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
              <em>{notes}</em>
            </div>
          </div>
        </section>
      );
    } else {
      result = <div />;
    }
    return (
      <div>
        <h2>Drug Equivalency Calculator</h2>
        <p>
          Use the Drug Equivalency Calculator to convert the quantity of
          controlled substance involved in the offense to its equivalent
          quantity of marihuana. In a case involving more than one controlled
          substance, convert each controlled substance into its marihuana
          equivalency and then add all converted quantities.
        </p>
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
            value={this.state.qty}
            onChange={this.handleQtyChange.bind(this)}
          />
          <label htmlFor="uom">Unit of measure</label>
          <select
            id="uom"
            value={this.state.uom}
            onChange={this.handleUOMChange.bind(this)}
          >
            {this.state.uomList}
          </select>
          <button onClick={this.calculate.bind(this)}>Go</button>
        </section>
      </div>
    );
  }

  getUOMList(e) {
    let uom = _.filter(data, d => d.substance === e.target.value)[0]
      .substanceUOM;
    if (uom === undefined) {
      uom = 'gm';
    }
    let uoml = [];
    uoml[0] = uom;

    uoml = _.concat(
      uoml,
      _.filter(
        conversionTable,
        d => d.sourceUOM === uom || d.targetUOM === uom
      ).map(x => x.uom)
    );

    let uomList = uoml.map(x => <option key={x}>{x}</option>);

    this.setState({
      substance: e.target.value,
      marihuana: null,
      uom: uoml[0],
      uomList: uomList
    });
  }

  handleQtyChange(e) {
    this.setState({ marihuana: null, qty: e.target.value });
  }

  handleUOMChange(e) {
    this.setState({ marihuana: null, uom: e.target.value });
  }

  calculate(e) {
    let s = _.find(data, x => x.substance === this.state.substance);
    if (s !== undefined) {
      this.setState({ marihuana: s });
    }
  }
}

export default DE;
