import React, { Component } from 'react';
//import Helmet from 'react-helmet';
import FontSize from './fontSize';
import headerLogo from '../img/USSCGM.svg';
import logo from '../img/logo.png';
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
        <header
          className="custom-usa-header custom-usa-header-extended"
          role="banner"
        >
          <div className="custom-usa-navbar">
            <div className="back-container">
              <button className="usa-menu-btn" style={{ border: '0px' }}>
                <span className="usa-navbar-left icon-chevron-left-white">
                  {' '}
                </span>
              </button>
            </div>
            <div className="logo-container">
              <img className="logo-icon" src={headerLogo} />
            </div>
            <div className="menu-container">
              <button className="usa-menu-btn" style={{ border: '0px' }}>
                <span className="usa-navbar-right icon-hambuger-menu-white" />
              </button>
            </div>
          </div>

          <nav role="navigation" className="usa-nav">
            <div className="usa-nav-inner">
              <button className="usa-nav-close">
                <span className="icon-hambuger-menu usa-nav-icon" />
              </button>
              <hr className="usa-nav-hr" />

              <ul className="usa-nav-primary usa-accordion">
                <li style={{ paddingTop: '0px' }}>
                  <a className="usa-nav-link" href="/">
                    <span>
                      <span className="icon-home-nav usa-nav-icon" />
                      Home
                    </span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/home">
                    <span className="icon-guidelines-manual-nav usa-nav-icon" />
                    <span>Guidelines Manual</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/si">
                    <span className="icon-appendix-a-nav usa-nav-icon" />
                    <span>Appendix-A</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/ab">
                    <span className="icon-appendix-b-nav usa-nav-icon" />
                    <span>Appendix-B</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/ac">
                    <span className="icon-appendix-c-nav usa-nav-icon" />
                    <span>Appendix-C</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/grc">
                    <span className="icon-guildline-range-nav usa-nav-icon" />
                    <span>Guideline Range</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/dol">
                    <span className="icon-drug-equivalency-nav usa-nav-icon" />
                    <span>Drug Quantity</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/de">
                    <span className="icon-drug-equivalency-nav usa-nav-icon" />
                    <span>Drug Equivalency</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/ai">
                    <span className="icon-applying-the-guildelines-nav usa-nav-icon" />
                    <span>Applying the Guidelines</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/">
                    <span className="icon-bookmarks-nav usa-nav-icon" />
                    <span>Bookmarks</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/">
                    <span className="icon-notes-nav usa-nav-icon" />
                    <span>Notes</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/archives">
                    <span className="icon-archive-nav usa-nav-icon" />
                    <span>Archive</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/">
                    <span className="icon-updates-nav usa-nav-icon" />
                    <span>Updates</span>
                  </a>
                </li>
                <li>
                  <a className="usa-nav-link" href="/">
                    <span className="icon-documents-nav usa-nav-icon" />
                    <span>Disclaimer</span>
                  </a>
                </li>
                <li>
                  <Link to="/bookmarks" className="usa-nav-link">
                    <span>Bookmarks</span>
                  </Link>
                </li>
                <li>
                  <Link to="/notes" className="usa-nav-link">
                    <span>Notes</span>
                  </Link>
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
