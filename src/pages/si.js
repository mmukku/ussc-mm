import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SimpleContentHeader from '../components/simpleContentHeader';
import ContentsLinkWrapper from '../components/contentsLinkWrapper';
import Blockset from '../components/blockset';
import TitleBlock from '../components/titleBlock';
import ContentBlock from '../components/contentBlock';
import ExplanatoryBox from '../components/explanatoryBox';
import FormObject from '../components/formObject';
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
        <Blockset>
          <TitleBlock>Results</TitleBlock>
          <ContentBlock>{this.state.guidelines}</ContentBlock>
        </Blockset>
      );
    }
    return (
      <div>
        <SimpleContentHeader title="Appendix A" subtitle="Statutory Index" />
        <ExplanatoryBox>
          This index specifies the offense guideline section(s) in Chapter Two
          (Offense Conduct) applicable to the statute of conviction. If more
          than one guideline section is referenced for the particular statute,
          use the guideline most appropriate for the offense conduct charged in
          the count of which the defendant was convicted. For the rules
          governing the determination of the offense guideline section(s) from
          Chapter Two, and for any exceptions to those rules, see §1B1.2
          (Applicable Guidelines).<br />
        </ExplanatoryBox>
        <FormObject label="Title">
          <select
            id="title"
            className="container-font-dark-B-4"
            onChange={this.cascadestatute.bind(this)}
            value={this.state.title}
          >
            <option>Select</option>
            {titleOptionList}
          </select>
        </FormObject>
        <FormObject label="Statute">
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
        </FormObject>
        <section className="usa-section search-global-B">
          <div className="usa-grid">
            <div className="usa-width-one-whole search-box-global">
              <button
                type="button"
                className="usa-button"
                onClick={this.search}
              >
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
      d =>
        d.Title.toString() === this.state.title &&
        d.Statute === this.state.statute
    );
    if (results === undefined) return;

    let guidelines = results.Guidelines.split(',').map(gl => (
      <Link to={`/gl/§${gl}`}>
        <ContentsLinkWrapper>
          <span className="container-font-light-D">{gl}</span>
        </ContentsLinkWrapper>
      </Link>
    ));
    this.setState({ guidelines: guidelines });
  };
}

export default SI;
