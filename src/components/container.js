import React, { Component } from 'react';
//import Helmet from 'react-helmet';
import FontSize from './fontSize';
import headerLogo from '../img/USSCGM.svg';
import logo from '../img/logo.png';
import arrowRight from '../img/static_chevron-right.svg';
import favicon from 'uswds/dist/img/favicons/favicon-57.png';
import icondotgov from 'uswds/dist/img/icon-dot-gov.svg';
import iconhttps from 'uswds/dist/img/icon-https.svg';
import close from 'uswds/dist/img/close.svg';
import { Link } from 'react-router-dom';
import SearchGuidelines from './searchGuidelines';
import '../custom.css';
const DefaultFontSize = 1.25;
class Container extends Component {
  state = { fontSize: DefaultFontSize };

  changeFontSize = direction => {
    const factor = 0.625;

    switch (direction) {
      case '+':
        this.setState(prevState => ({ fontSize: prevState.fontSize + factor }));
        break;
      case '-':
        this.setState(prevState => ({ fontSize: prevState.fontSize - factor }));
        break;
      default:
        this.setState({ fontSize: DefaultFontSize });
        break;
    }
    console.log(this.state.fontSize);
  };
  render() {
    return (
      <div>
        <header className="usa-header usa-header-extended" role="banner">
          <div className="usa-navbar">
            <div className="back-container">
              <button
                className="usa-menu-btn"
                style={{ backgroundColor: '#ffffff', border: '0px' }}
              >
                <span className="icon-chevron-left custom-position-header">
                  {' '}
                </span>
              </button>
            </div>
            <div className="logo-container">
              <img className="logo-icon" src={headerLogo} />
            </div>
            <div className="menu-container">
              <button
                className="usa-menu-btn"
                style={{ backgroundColor: '#ffffff', border: '0px' }}
              >
                <span className="icon-hambuger-menu custom-position-header" />
              </button>
            </div>
          </div>

          <nav role="navigation" className="usa-nav">
            <div className="usa-nav-inner">
              <button className="usa-nav-close">
                <span className="icon-hambuger-menu custom-position-header" />
              </button>
              <hr className="custom-linebreak-nav" />

              <ul className="usa-nav-primary usa-accordion">
                <li style={{ paddingTop: '0px' }}>
                  <a className="usa-nav-link" href="/">
                    <span>
                      <span className="icon-home custom-position-header" />
                      Home
                    </span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/home">
                    <span className="icon-guidelines-manual custom-position-header" />
                    <span>Guildelines Manual</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/si">
                    <span className="icon-appendix-a custom-position-header" />
                    <span>Appendix-A</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/ab">
                    <span className="icon-appendix-b custom-position-header" />
                    <span>Appendix-B</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/ac">
                    <span className="icon-appendix-c custom-position-header" />
                    <span>Appendix-C</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/grc">
                    <span className="icon-guildline-range custom-position-header" />
                    <span>Guideline Range</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/dol">
                    <span className="icon-drug-equivalency custom-position-header" />
                    <span>Drug Quantity</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/de">
                    <span className="icon-drug-equivalency custom-position-header" />
                    <span>Drug Equivalency</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/ai">
                    <span className="icon-home custom-position-header" />
                    <span>Applying the Guidelines</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/">
                    <span className="icon-bookmarks custom-position-header" />
                    <span>Bookmarks</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/">
                    <span className="icon-notes custom-position-header" />
                    <span>Notes</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/archives">
                    <span className="icon-applying-the-guildelines custom-position-header" />
                    <span>Archive</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/">
                    <span className="icon-updates custom-position-header" />
                    <span>Updates</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/">
                    <span className="icon-documents custom-position-header" />
                    <span>Disclaimer</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <div className="usa-overlay" />
        <main id="main-content">{this.props.children}</main>
      </div>
    );
  }
}

export default Container;
