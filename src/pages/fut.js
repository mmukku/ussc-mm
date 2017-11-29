import React, { Component } from 'react';
import arrowRight from '../img/icons/static_chevron-right.svg';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class FrequentlyUsedTable extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <section className="usa-section usa-section-black">
          <div className="usa-grid">
            <div className="container-title-c">
              <span className="container-font-dark-A-2">
                Frequently Used Tables<br />
              </span>
            </div>
          </div>
        </section>
        <section className="usa-section container-custom-result">
          <div className="usa-grid container-03a">
            <div className="container-03">
              <a href="/gl/§5E1.2">
                <div className="container-03-A-a">
                  <div className="container-03-A1">
                    <span className="container-font-light-C">Fine Tables</span>
                  </div>
                  <div className="container-03-A2">
                    <img className="chevron-right-icon" src={arrowRight} />
                  </div>
                </div>
              </a>
              <a href="/gl/§2B1.1">
                <div className="container-03-A-b">
                  <div className="container-03-A1">
                    <span className="container-font-light-C">Loss Tables</span>
                  </div>
                  <div className="container-03-A2">
                    <img className="chevron-right-icon" src={arrowRight} />
                  </div>
                </div>
              </a>

              <a href="/gl/§7B1.4">
                <div className="container-03-A-a">
                  <div className="container-03-A1">
                    <span className="container-font-light-C">
                      Revocation Table
                    </span>
                  </div>
                  <div className="container-03-A2">
                    <img className="chevron-right-icon" src={arrowRight} />
                  </div>
                </div>
              </a>

              <a href="/chapters/5/parts/A/guidelines">
                <div className="container-03-A-b">
                  <div className="container-03-A1">
                    <span className="container-font-light-C">
                      Sentencing Table
                    </span>
                  </div>
                  <div className="container-03-A2">
                    <img className="chevron-right-icon" src={arrowRight} />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default FrequentlyUsedTable;
