import React, { Component } from 'react';
//import Helmet from 'react-helmet';
import FontSize from './fontSize';
import headerLogo from '../img/USSCGM.svg';
import { Link } from 'react-router-dom';
import '../custom.css';
const DefaultFontSize = 1.7;
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
    var footerResult = '';
    var paddingBottomPage = '0%';
    var pathname = window.location.pathname;

    if (
      pathname !== '/' &&
      pathname !== '/si' &&
      pathname !== '/grc' &&
      pathname !== '/dol' &&
      pathname !== '/de'
    ) {
      paddingBottomPage = '22%';
      footerResult = <FontSize changeFontSize={this.changeFontSize} />;
    }
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
              <img
                className="logo-icon"
                src={headerLogo}
                alt="United States Sentencing Commission Guideline Manual"
              />
            </div>
            <div className="menu-container">
              <button className="usa-menu-btn" style={{ border: '0px' }}>
                <span className="usa-navbar-right icon-hambuger-menu-white" />
              </button>
            </div>
          </div>

          <nav className="usa-nav">
            <div className="usa-nav-inner">
              <button className="usa-nav-close">
                <span className="icon-hambuger-menu usa-nav-icon" />
              </button>
              <hr className="usa-nav-hr" />

              <ul className="usa-nav-primary usa-accordion">
                <li style={{ paddingTop: '0px' }}>
                  <Link className="usa-nav-link" to="/">
                    <span>
                      <span className="icon-home-nav usa-nav-icon" />
                      Home
                    </span>
                  </Link>
                </li>
                <li>
                  <Link className="usa-nav-link" to="/home">
                    <span className="icon-guidelines-manual-nav usa-nav-icon" />
                    <span>Guidelines Manual</span>
                  </Link>
                </li>
                <li>
                  <Link className="usa-nav-link" to="/si">
                    <span className="icon-appendix-a-nav usa-nav-icon" />
                    <span>Appendix-A</span>
                  </Link>
                </li>
                <li>
                  <Link className="usa-nav-link" to="/ab">
                    <span className="icon-appendix-b-nav usa-nav-icon" />
                    <span>Appendix-B</span>
                  </Link>
                </li>
                <li>
                  <Link className="usa-nav-link" to="/ac">
                    <span className="icon-appendix-c-nav usa-nav-icon" />
                    <span>Appendix-C</span>
                  </Link>
                </li>
                <li>
                  <Link className="usa-nav-link" to="/grc">
                    <span className="icon-guildline-range-nav usa-nav-icon" />
                    <span>Guideline Range</span>
                  </Link>
                </li>
                <li>
                  <Link className="usa-nav-link" to="/dol">
                    <span className="icon-drug-equivalency-nav usa-nav-icon" />
                    <span>Drug Quantity</span>
                  </Link>
                </li>
                <li>
                  <Link className="usa-nav-link" to="/de">
                    <span className="icon-drug-equivalency-nav usa-nav-icon" />
                    <span>Drug Equivalency</span>
                  </Link>
                </li>
                <li>
                  <Link className="usa-nav-link" to="/ai">
                    <span className="icon-applying-the-guildelines-nav usa-nav-icon" />
                    <span>Applying the Guidelines</span>
                  </Link>
                </li>
                <li>
                  <Link className="usa-nav-link" to="/bookmarks">
                    <span className="icon-bookmarks-nav usa-nav-icon" />
                    <span>Bookmarks</span>
                  </Link>
                </li>
                <li>
                  <Link className="usa-nav-link" to="/notes">
                    <span className="icon-notes-nav usa-nav-icon" />
                    <span>Notes</span>
                  </Link>
                </li>
                <li>
                  <Link className="usa-nav-link" to="/archives">
                    <span className="icon-archive-nav usa-nav-icon" />
                    <span>Archive</span>
                  </Link>
                </li>
                <li>
                  <Link className="usa-nav-link" to="/">
                    <span className="icon-updates-nav usa-nav-icon" />
                    <span>Updates</span>
                  </Link>
                </li>
                <li>
                  <Link className="usa-nav-link" to="/">
                    <span className="icon-documents-nav usa-nav-icon" />
                    <span>Disclaimer</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <div className="usa-overlay" />
        <main
          id="main-content"
          style={{
            fontSize: this.state.fontSize + 'rem',
            'padding-bottom': paddingBottomPage
          }}
        >
          {this.props.children}
        </main>
        <footer>{footerResult}</footer>
      </div>
    );
  }
}

export default Container;
