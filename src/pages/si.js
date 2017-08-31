import React, { Component } from 'react';
import data from '../data/si.json';
import _ from 'lodash';

const titleOptionList = _.uniqBy(data, 'Title').map(t => (
  <option key={t.Title}>{t.Title}</option>
));

class SI extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      statute: '',
      guidelines: [],
      statuteOptionList: null
    };
  }

  render() {
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
        <p>
          This index specifies the offense guideline section(s) in Chapter Two
          (Offense Conduct) applicable to the statute of conviction. If more
          than one guideline section is referenced for the particular statute,
          use the guideline most appropriate for the offense conduct charged in
          the count of which the defendant was convicted. For the rules
          governing the determination of the offense guideline section(s) from
          Chapter Two, and for any exceptions to those rules, see §1B1.2
          (Applicable Guidelines).{' '}
        </p>
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
          <select
            id="statute"
            value={this.state.statute}
            onChange={e => this.setState({ statute: e.target.value })}
          >
            <option>Select</option>
            {this.state.statuteOptionList}
          </select>
          <button onClick={this.search.bind(this)}>Go</button>
        </section>
        {results}
      </div>
    );
  }

  cascadestatute(e) {
    let title = e.target.value;
    // eslint-disable-next-line
    let statuteOptions = data
      .filter(d => d.Title == title)
      .map(x => <option key={x.Statute}>{x.Statute}</option>);
    this.setState({ title: title, statuteOptionList: statuteOptions });
  }

  search() {
    // eslint-disable-next-line
    let results = _.find(
      data,
      d => d.Title == this.state.title && d.Statute == this.state.statute
    );
    if (results === undefined) return;

    let guidelines = results.Guidelines.split(',').map(gl => (
      <li key={gl}>
        <a href="/sc/">{gl}</a>
      </li>
    ));
    this.setState({ guidelines: guidelines });
  }
}

export default SI;
