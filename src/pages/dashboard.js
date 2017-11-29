import React, { Component } from 'react';
import arrowRight from '../img/icons/static_chevron-right_b.svg';
import guidelinesManualColor from '../img/icons/static_guidelines-manual-color.svg';
import appendixBIcon from '../img/icons/static_appendix-b-color.svg';
import appendixAIcon from '../img/icons/static_appendix-a-color.svg';
import appendixCIcon from '../img/icons/static_appendix-c-color.svg';
import guidelineRangeIcon from '../img/icons/static_guildline-range-color.svg';
import drugQuantityIcon from '../img/icons/static_drug-quantity-color.svg';
import drugEquivalencyIcon from '../img/icons/static_drug-equivalency-color.svg';
import _ from 'lodash';

class Dashboard extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <section className="usa-section search-global-A">
          <div className="usa-grid">
            <div className="usa-width-one-whole">
              <form className="usa-search usa-search-small">
                <div role="search">
                  <label className="usa-sr-only" for="search-field-small">
                    Search small
                  </label>
                  <input id="search-field-small" type="search" name="search" />
                  <button type="submit">
                    <span className="usa-sr-only">Search</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="usa-section">
          <div className="usa-grid">
            <div className="container-01">
              <a href="/home">
                <div className="container-01-A">
                  <div className="container-01-A1">
                    <img
                      className="static_guidelines-manual-icon"
                      src={guidelinesManualColor}
                    />
                  </div>
                  <div className="container-01-A2">
                    <span className="container-font-light-B">
                      Version 3.14-17<br />
                    </span>
                    <span className="container-font-light-A">
                      Guidelines Manual<br />
                    </span>
                    <span className="container-font-light-Bd">2017</span>
                  </div>
                  <div className="container-01-A3">
                    <span className="icon-chevron-right container-icon-light-A" />
                  </div>
                </div>
              </a>
              <a href="/si">
                <div className="container-01-B">
                  <div className="container-01-B1">
                    <span className="container-font-light-B">
                      Appendix<br />
                    </span>
                    <span className="container-font-light-B">
                      <img className="appendex-a-icon" src={appendixAIcon} />
                      <br />
                    </span>
                    <span className="container-font-light-Bc">
                      Search Index<br />
                    </span>
                  </div>
                </div>
              </a>
              <a href="/ab">
                <div className="container-01-C">
                  <div className="container-01-B1">
                    <span className="container-font-light-B">
                      Appendix<br />
                    </span>
                    <span className="container-font-light-B">
                      <img className="appendex-b-icon" src={appendixBIcon} />
                      <br />
                    </span>
                    <span className="container-font-light-Bc">
                      Search Index<br />
                    </span>
                  </div>
                </div>
              </a>
              <a href="/ac">
                <div className="container-01-D">
                  <div className="container-01-B1">
                    <span className="container-font-light-B">
                      Appendix<br />
                    </span>
                    <span className="container-font-light-B">
                      <img className="appendex-c-icon" src={appendixCIcon} />
                      <br />
                    </span>
                    <span className="container-font-light-Bc">
                      Search Index<br />
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className="usa-section">
          <div className="usa-grid">
            <div className="container-01" style={{ border: 'auto' }}>
              <a href="/grc">
                <div className="container-01-B">
                  <div className="container-01-B1">
                    <span className="container-font-light-B">
                      Guideline Range<br />
                    </span>
                    <span className="container-font-light-B">
                      <img
                        className="sentencing-range-icon"
                        src={guidelineRangeIcon}
                      />
                      <br />
                    </span>
                  </div>
                </div>
              </a>
              <a href="/dol">
                <div className="container-01-C">
                  <div className="container-01-B1">
                    <span className="container-font-light-B">
                      Drug Quantity<br />
                    </span>
                    <span className="container-font-light-B">
                      <img
                        className="drug-quantity-icon"
                        src={drugQuantityIcon}
                      />
                      <br />
                    </span>
                  </div>
                </div>
              </a>
              <a href="/de">
                <div className="container-01-D">
                  <div className="container-01-B1">
                    <span className="container-font-light-B">
                      Drug Equivalency<br />
                    </span>
                    <span className="container-font-light-B">
                      <img
                        className="drug-equivalency-icon"
                        src={drugEquivalencyIcon}
                      />
                      <br />
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>
        <section className="usa-section container-color-warmgrey">
          <a href="/fut">
            <div className="usa-grid">
              <div className="container-02">
                <div className="container-02-B">
                  <span className="icon-frequently-used-tables container-icon-dark-A" />
                </div>
                <div className="container-02-C">
                  <span className="container-font-dark-A">
                    Frequently Used Tables<br />
                  </span>
                </div>
                <div className="container-02-D">
                  <img className="hamburger-menu-icon" src={arrowRight} />
                </div>
              </div>
            </div>
          </a>
        </section>
        <section className="usa-section container-color-warmgrey">
          <div className="usa-grid">
            <div className="container-02">
              <div className="container-02-B">
                <span className="icon-archive container-icon-dark-A" />
              </div>
              <div className="container-02-C">
                <span className="container-font-dark-A">
                  Archive<br />
                </span>
                <span className="container-font-dark-B">
                  Previous Guidelines Manual
                </span>
              </div>
              <div className="container-02-D">
                <img className="hamburger-menu-icon" src={arrowRight} />
              </div>
            </div>
          </div>
        </section>
        <section className="usa-section container-color-warmgrey">
          <div className="usa-grid">
            <div className="usa-width-one-whole">
              <div style={{ height: '300px' }} />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Dashboard;
