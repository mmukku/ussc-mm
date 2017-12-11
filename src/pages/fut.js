import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContentsLinkWrapper from '../components/contentsLinkWrapper';

class FrequentlyUsedTable extends Component {
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
              <Link to="/gl/§5E1.2">
                <ContentsLinkWrapper>
                  <span className="container-font-light-C">Fine Tables</span>
                </ContentsLinkWrapper>
              </Link>
              <Link to="/losstable">
                <ContentsLinkWrapper>
                  <span className="container-font-light-C">Loss Tables</span>
                </ContentsLinkWrapper>
              </Link>

              <Link to="/gl/§7B1.4">
                <ContentsLinkWrapper>
                  <span className="container-font-light-C">
                    Revocation Table
                  </span>
                </ContentsLinkWrapper>
              </Link>

              <Link to="/chapters/5/parts/A/guidelines">
                <ContentsLinkWrapper>
                  <span className="container-font-light-C">
                    Sentencing Table
                  </span>
                </ContentsLinkWrapper>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default FrequentlyUsedTable;
