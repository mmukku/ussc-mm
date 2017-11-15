import React, { Component } from 'react';
import data from '../data/si.json';
import _ from 'lodash';
import arrowRight from '../img/icons/static_chevron-right.svg';
import Autosuggest from 'react-autosuggest';

const titleOptionList = _.uniqBy(data, 'Title').map(t => (
  <option key={t.Title}>{t.Title}</option>
));

const getSuggestionValue = suggestion => suggestion;
const shouldRenderSuggestions = () => true;

const renderSuggestion = suggestion => <div>{suggestion}</div>;
const theme = {
  input: {
    fontFamily: 'Lato, sans-serif',
    fontSize: 16,
    color: '#ccc'
  },
  container: {
    position: 'relative'
  },
  inputFocused: {
    outline: 'none',
    fontFamily: 'Lato, sans-serif',
    fontSize: 16,
    color: '#ccc'
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
    border: '1px solid #035493',
    backgroundColor: '#06213b',
    fontFamily: 'Lato, sans-serif',
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
    backgroundColor: '#035493'
  }
};
class SI extends Component {
  state = {
    title: '',
    statute: '',
    guidelines: [],
    statuteOptions: []
  };

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
        <section className="usa-section grc-header">
          <div className="usa-grid">
            <div className="container-05-title">
              <div className="container-05-title-A">
                <div className="container-05-title-A1">
                  <span className="container-font-light-C">Results</span>
                </div>
              </div>
            </div>
            {this.state.guidelines}
          </div>
        </section>
      );
    }
    return (
      <div>
        <section className="usa-section usa-section-black container-custom-result">
          <div className="usa-grid">
            <div className="container-title">
              <span className="container-font-dark-B-2">
                Version 3.14-17<br />
              </span>
              <span className="container-font-dark-A-2">
                Appendix A<br />
              </span>
              <span className="container-font-dark-B-2">Statutory Index</span>
            </div>
          </div>
        </section>
        <section className="usa-section container-custom-result">
          <div className="usa-grid">
            <div className="container-03">
              <div className="container-05-A1">
                <div className="container-05-A1c container-font-light-Ea">
                  This index specifies the offense guideline section(s) in
                  Chapter Two (Offense Conduct) applicable to the statute of
                  conviction. If more than one guideline section is referenced
                  for the particular statute, use the guideline most appropriate
                  for the offense conduct charged in the count of which the
                  defendant was convicted. For the rules governing the
                  determination of the offense guideline section(s) from Chapter
                  Two, and for any exceptions to those rules, see §1B1.2
                  (Applicable Guidelines).<br />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="usa-section search-global-B">
          <div className="usa-grid">
            <span className="container-font-dark-B-3">
              TITLE<br />
            </span>
          </div>
          <div className="usa-grid">
            <div className="usa-width-one-whole search-box-global">
              <form className="usa-search usa-search-small">
                <select
                  id="title"
                  className="container-font-dark-B-4"
                  onChange={this.cascadestatute.bind(this)}
                  value={this.state.title}
                >
                  <option>Select</option>
                  {titleOptionList}
                </select>
              </form>
            </div>
          </div>
        </section>
        <section className="usa-section search-global-B">
          <div className="usa-grid">
            <div className="usa-width-one-whole search-box-global">
              <form className="usa-form">
                <fieldset>
                  <span className="container-font-dark-B-3">
                    STATUTE<br />
                  </span>
                  <Autosuggest
                    suggestions={statuteOptions}
                    onSuggestionsFetchRequested={
                      this.onSuggestionsFetchRequested
                    }
                    onSuggestionsClearRequested={
                      this.onSuggestionsClearRequested
                    }
                    getSuggestionValue={getSuggestionValue}
                    shouldRenderSuggestions={shouldRenderSuggestions}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                    theme={theme}
                  />
                </fieldset>
              </form>
            </div>
          </div>
        </section>
        <section className="usa-section search-global-B">
          <div className="usa-grid">
            <div className="usa-width-one-whole search-box-global">
              <button className="usa-button" onClick={this.search}>
                Search
              </button>
            </div>
          </div>
        </section>
        {results}
      </div>
    );
  }

  cascadestatute(e) {
    this.setState({ title: e.target.value, statute: '', guidelines: [] });
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    // eslint-disable-next-line
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
    // eslint-disable-next-line
    let results = _.find(
      data,
      d => d.Title == this.state.title && d.Statute === this.state.statute
    );
    if (results === undefined) return;

    let guidelines = results.Guidelines.split(',').map(gl => (
      <div className="container-05">
        <div className="container-05-A">
          <a href={`/gl/§${gl}`}>
            <div className="container-03-A-a">
              <div className="container-03-A1">
                <span className="container-font-light-D">{gl}</span>
              </div>
              <div className="container-03-A2">
                <img className="chevron-right-icon" src={arrowRight} />
              </div>
            </div>
          </a>
        </div>
      </div>
    ));
    this.setState({ guidelines: guidelines });
  };
}

export default SI;
