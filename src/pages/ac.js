import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data/appendix-c';
import ContentsLinkWrapper from '../components/contentsLinkWrapper';
import SimpleContentHeader from '../components/simpleContentHeader';
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

                  return (
                    <Link to={currentHref}>
                      <ContentsLinkWrapper>
                        <span className="container-font-light-C">
                          Amendments {'\u00A0'} {'\u00A0'}
                        </span>
                        <span className="container-font-light-D">
                          {labelResult}
                        </span>
                      </ContentsLinkWrapper>
                    </Link>
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

                  return (
                    <Link to={currentHref}>
                      <ContentsLinkWrapper>
                        <span className="container-font-light-C">
                          Amendments {'\u00A0'} {'\u00A0'}
                        </span>
                        <span className="container-font-light-D">
                          {name.Text}
                        </span>
                      </ContentsLinkWrapper>
                    </Link>
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

    window.location.href = '/ac/' + searchVal;
  };

  render() {
    return (
      <div>
        <SimpleContentHeader
          title="Appendix C"
          subtitle="Amendments to the Guidelines Manual"
        />
        <section className="usa-section search-global-B">
          <div className="usa-grid">
            <div className="usa-width-one-whole">
              <form
                className="usa-search usa-search-small"
                onSubmit={e => {
                  this.handleClick(this.state.slug);
                  e.preventDefault();
                }}
              >
                <div role="search">
                  <label className="usa-sr-only" htmlFor="search-field-small">
                    SEARCH BY AMENDMENT NUMBER OR DATE
                  </label>
                  <input
                    id="inputAmmendmentNumber"
                    type="search"
                    placeholder="Enter Number or Effective Date (MM/DD/YYYY)"
                    value={this.state.slug}
                    onChange={e => this.setState({ slug: e.target.value })}
                  />
                  <button type="submit">
                    <span className="usa-sr-only">Search</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
        {this.amendmentsList()}
      </div>
    );
  }
}

export default Amendments;
