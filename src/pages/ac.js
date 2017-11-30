import React from 'react';
import data from '../data/appendix-c';
import _ from 'lodash';
import arrowRight from '../img/icons/static_chevron-right.svg';

class Amendments extends React.Component {
  state = {
    slug: '',
    searchResults: [_.toNumber(this.props.match.params.id || 1)]
  };

  amendmentsList = () => {
    var currentSearchValue = this.props.match.params.id;
    var d = new Date(currentSearchValue);
    if (
      currentSearchValue !== undefined &&
      (!isNaN(this.props.match.params.id) || _.isDate(d))
    ) {
      let results = [];
      if (_.toNumber(currentSearchValue) > 0) {
        results = _.filter(
          data,
          a => a.id === _.toNumber(currentSearchValue)
        ).map(a => a.id);
      } else {
        if (_.isDate(d)) {
          let delimiter = '/';
          function pad(s) {
            return s < 10 ? '0' + s : s;
          }
          let formatted = [
            pad(d.getMonth() + 1),
            pad(d.getDate()),
            d.getFullYear()
          ].join(delimiter);
          results = _.filter(data, a => a.edt === _.toString(formatted)).map(
            a => a.id
          );
        }
      }

      return (
        <div>
          <section className="usa-section">
            <div className="usa-grid">
              <div className="container-03">
                {results.map(function(name, index) {
                  let labelResult = name;

                  let currentHref = '/ac/amendment/' + name;
                  let divBoxColorClassName = 'container-03-A-b';
                  if (index === 0 || !!(index && !(index % 2)))
                    divBoxColorClassName = 'container-03-A-a';

                  return (
                    <a href={currentHref}>
                      <div className={divBoxColorClassName}>
                        <div className="container-03-A1">
                          <span className="container-font-light-C">
                            Amendments {'\u00A0'} {'\u00A0'}
                          </span>
                          <span className="container-font-light-D">
                            {labelResult}
                          </span>
                        </div>
                        <div className="container-03-A2">
                          <img
                            alt=""
                            className="chevron-right-icon"
                            src={arrowRight}
                          />
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      );
    } else {
      let ammendmentArray = [
        { Text: '1-50', Val: 1 },
        { Text: '51-100', Val: 51 },
        { Text: '101-150', Val: 101 },
        { Text: '151-200', Val: 151 },
        { Text: '201-250', Val: 201 },
        { Text: '251-300', Val: 251 },
        { Text: '301-350', Val: 301 },
        { Text: '351-400', Val: 351 },
        { Text: '401-450', Val: 401 },
        { Text: '451-500', Val: 451 },
        { Text: '501-550', Val: 501 },
        { Text: '551-600', Val: 551 },
        { Text: '601-650', Val: 601 },
        { Text: '651-700', Val: 651 },
        { Text: '701-750', Val: 701 },
        { Text: '751-800', Val: 751 },
        { Text: '801-804', Val: 801 }
      ];

      return (
        <div>
          <section className="usa-section">
            <div className="usa-grid">
              <div className="container-03">
                {ammendmentArray.map(function(name, index) {
                  let currentHref = '/ac/amendment/' + name.Val;
                  let divBoxColorClassName = 'container-03-A-b';
                  if (index === 0 || !!(index && !(index % 2)))
                    divBoxColorClassName = 'container-03-A-a';

                  return (
                    <a href={currentHref}>
                      <div className={divBoxColorClassName}>
                        <div className="container-03-A1">
                          <span className="container-font-light-C">
                            Amendments {'\u00A0'} {'\u00A0'}
                          </span>
                          <span className="container-font-light-D">
                            {name.Text}
                          </span>
                        </div>
                        <div className="container-03-A2">
                          <img
                            alt=""
                            className="chevron-right-icon"
                            src={arrowRight}
                          />
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      );
    }
  };

  handleClick = searchVal => {
    searchVal = searchVal.replace(/\//g, '-');
    alert(searchVal);

    window.location.href = '/ac/' + searchVal;
  };

  render() {
    return (
      <div>
        <form
          className="usa-search usa-search-big"
          onSubmit={e => {
            this.handleClick(this.state.slug);
            e.preventDefault();
          }}
        >
          <section className="usa-section usa-section-black">
            <div className="usa-grid">
              <div className="container-title">
                <span className="container-font-dark-B-2">
                  Version 3.14-17
                  <br />
                </span>
                <span className="container-font-dark-A-2">
                  Appendix C
                  <br />
                </span>
                <span className="container-font-dark-B-2">
                  Amendments to the Guidelines Manual
                </span>
              </div>
            </div>
          </section>
          <section className="usa-section search-global-B">
            <div className="usa-grid">
              <div className="usa-width-one-whole">
                <form className="usa-form">
                  <fieldset>
                    <span className="container-font-dark-B-3">
                      SEARCH BY AMENDMENT NUMBER OR DATE<br />
                    </span>
                    <input
                      type="text"
                      required=""
                      aria-required="true"
                      id="inputAmmendmentNumber"
                      placeholder="Enter Number or Date (MM/DD/YYYY)"
                      className="container-font-dark-B-4"
                      onChange={e => this.setState({ slug: e.target.value })}
                      value={this.state.slug}
                    />
                  </fieldset>
                </form>
              </div>
            </div>
          </section>
          <section className="usa-section search-global-B">
            <div className="usa-grid">
              <div className="usa-width-one-whole">
                <a>
                  <button type="submit" className="usa-button" />
                </a>
              </div>
            </div>
          </section>
        </form>
        {this.amendmentsList()}
      </div>
    );
  }
}

export default Amendments;
