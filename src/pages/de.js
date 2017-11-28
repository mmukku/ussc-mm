import React, { Component } from 'react';
import data from '../data/de.json';
import _ from 'lodash';

import conversionTable from '../data/ct.json';

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
  state = { equivalencies: [] };

  add = (index, weight, uom, notes) => {
    let es = [];
    this.setState(prevState => {
      for (let i = 0; i <= 2; i++) {
        let e = prevState.equivalencies[i];
        if (index === i) {
          e = e || {};
          e.weight = weight;
          e.uom = uom;
          e.notes = notes;
          es[index] = e;
        } else {
          if (e) es[i] = e;
        }
      }
      return { equivalencies: es };
    });
  };

  conversionFactor = (src, target) => {
    let conversionFactor = 1;
    if (src !== target) {
      let conversion = _.find(
        conversionTable,
        c => c.uom === src && c.targetUOM === target
      );
      conversionFactor = conversion.factor;
    }
    return conversionFactor;
  };

  calculate = () => {
    let totalWeight = 0.0;
    let currentUOM = '';
    let notes = '';

    for (let e of this.state.equivalencies) {
      if (e) {
        if (currentUOM === '') {
          currentUOM = e.uom;
        }
        totalWeight += this.conversionFactor(e.uom, currentUOM) * e.weight;
        if (e.notes && e.notes.length > 0 && e.notes !== notes) {
          notes += e.notes;
        }
      }
    }
    this.setState({ totalWeight: totalWeight, uom: currentUOM, notes: notes });
  };

  render() {
    let result = undefined;
    if (this.state.totalWeight) {
      result = (
        <section>
          <div className="usa-alert usa-alert-info">
            <div className="usa-alert-body">
              <h4 className="usa-alert-heading">
                Marihuana: {this.state.totalWeight} {this.state.uom}
              </h4>

              <em>{this.state.notes}</em>
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
        <DEPair index={0} add={this.add.bind(this)} />
        <DEPair index={1} add={this.add.bind(this)} />
        <DEPair index={2} add={this.add.bind(this)} />
        <section>
          <button onClick={this.calculate.bind(this)}>Go</button>
        </section>
        {result}
      </div>
    );
  }
}

class DEPair extends React.Component {
  state = { uomList: [] };

  handleSubstanceChange(e) {
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

    let uomList = _.uniq(uoml).map(x => <option key={x}>{x}</option>);

    this.setState(
      {
        substance: e.target.value,
        uom: uoml[0],
        uomList: uomList
      },
      this.calculate
    );
  }

  handleQtyChange(e) {
    this.setState({ qty: e.target.value }, this.calculate);
  }

  handleUOMChange(e) {
    this.setState({ uom: e.target.value }, this.calculate);
  }

  calculate() {
    const { substance, qty, uom } = this.state;
    if (!substance || !qty || !uom) return;
    let s = _.find(data, x => x.substance === substance);

    if (s !== undefined) {
      let sourceUOM = s.sourceUOM;
      if (sourceUOM === undefined) {
        sourceUOM = 'gm';
      }

      let conversionFactor = 1;
      let conversion = _.find(
        conversionTable,
        c => c.uom === uom && c.targetUOM === sourceUOM
      );
      if (conversion !== undefined) {
        conversionFactor = conversion.factor;
      }
      let notes = Notes;
      let noteEntry = _.find(
        NotesTable,
        nt => nt.substances.indexOf(substance) >= 0
      );
      if (noteEntry !== undefined) {
        notes = noteEntry.notes;
      }
      let weight = qty * conversionFactor * s.targetWeight;
      this.props.add(this.props.index, weight, s.targetUOM, notes);
    }
  }

  render() {
    const { substance, uomList } = this.state;
    return (
      <section>
        <select
          style={{ display: 'inline' }}
          onChange={this.handleSubstanceChange.bind(this)}
          value={substance}
        >
          <option>Select Substance</option>
          {substanceList}
        </select>
        <input
          id="qty"
          onChange={this.handleQtyChange.bind(this)}
          placeholder="Enter Weight"
          style={{ display: 'inline', width: '150px', margin: '5px' }}
        />
        {uomList.length > 0 ? (
          <select
            id="uom"
            style={{ display: 'inline', width: '75px' }}
            onChange={this.handleUOMChange.bind(this)}
          >
            {uomList}
          </select>
        ) : null}
      </section>
    );
  }
}

export default DE;
