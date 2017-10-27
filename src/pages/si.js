import React, { Component } from 'react';
import data from '../data/si.json';
import _ from 'lodash';
import Autosuggest from 'react-autosuggest';

const titleOptionList = _.uniqBy(data, 'Title').map(t => (
  <option key={t.Title}>{t.Title}</option>
));

const getSuggestionValue = suggestion => suggestion;
const shouldRenderSuggestions = () => true;

const renderSuggestion = suggestion => <div>{suggestion}</div>;
const theme = {
  container: {
    position: 'relative'
  },
  inputFocused: {
    outline: 'none'
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  suggestionsContainer: {
    display: 'none'
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    top: 51,
    width: 280,
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  suggestion: {
    cursor: 'pointer',
    padding: '10px 20px'
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd'
  }
};
class SI extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      statute: '',
      guidelines: [],
      statuteOptions: []
    };
  }

  render() {
    const value = this.state.statute;
    const statuteOptions = this.state.statuteOptions;

    const inputProps = {
      placeholder: 'Type Statute',
      value,
      onChange: this.onChange
    };

    let results = '';
    if (this.state.guidelines.length > 0) {
      results = (
        <section>
          <h4>Results</h4>
          <ul>{this.state.guidelines}</ul>
        </section>
      );
    }
    return (
      <div>
        <h2>Statutory Index</h2>
        <section>
          This index specifies the offense guideline section(s) in Chapter Two
          (Offense Conduct) applicable to the statute of conviction. If more
          than one guideline section is referenced for the particular statute,
          use the guideline most appropriate for the offense conduct charged in
          the count of which the defendant was convicted. For the rules
          governing the determination of the offense guideline section(s) from
          Chapter Two, and for any exceptions to those rules, see §1B1.2
          (Applicable Guidelines).
        </section>
        <section>
          <label htmlFor="title">Title</label>
          <select
            id="title"
            onChange={this.cascadestatute.bind(this)}
            value={this.state.title}
          >
            <option>Select</option>
            {titleOptionList}
          </select>
          <label htmlFor="statute">Statute</label>
          <Autosuggest
            suggestions={statuteOptions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            shouldRenderSuggestions={shouldRenderSuggestions}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            theme={theme}
          />
          <button onClick={this.search}>Go</button>
        </section>
        {results}
      </div>
    );
  }

  cascadestatute(e) {
    this.setState({ title: e.target.value, statute: '' });
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    let statuteOptions = _.filter(data, d => d.Title == this.state.title).map(
      x => x.Statute
    );

    return inputLength === 0
      ? statuteOptions
      : _.filter(
          statuteOptions,
          s => s.toLowerCase().slice(0, inputLength) === inputValue
        );
  }

  onChange = (event, { newValue }) => {
    this.setState({
      statute: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      statuteOptions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      statuteOptions: []
    });
  };

  search = () => {
    let results = _.find(
      data,
      d => d.Title == this.state.title && d.Statute === this.state.statute
    );
    if (results === undefined) return;

    let guidelines = results.Guidelines.split(',').map(gl => (
      <li key={gl}>
        <a href={`/gl/§${gl}`}>{gl}</a>
      </li>
    ));
    this.setState({ guidelines: guidelines });
  };
}

export default SI;
