import React, { Component } from 'react';
//import Helmet from 'react-helmet';
import logo from '../img/logo.png';
import favicon from 'uswds/dist/img/favicons/favicon-57.png';
import icondotgov from 'uswds/dist/img/icon-dot-gov.svg';
import iconhttps from 'uswds/dist/img/icon-https.svg';
import close from 'uswds/dist/img/close.svg';
import { Link } from 'react-router-dom';
// import '../ussc.css';

class Container extends Component {
  render() {
    return (
      <div style={{ marginBottom: '5.9rem' }}>
        <a className="usa-skipnav" href="#main-content">
          Skip to main content
        </a>
        <header className="usa-header usa-header-basic" role="banner">
          <div className="usa-banner">
            <div className="usa-accordion">
              <header className="usa-banner-header">
                <div className="usa-grid usa-banner-inner">
                  <img src={favicon} alt="U.S. flag" />
                  <p>An official website of the United States government</p>
                  <button
                    className="usa-accordion-button usa-banner-button"
                    aria-expanded="false"
                    aria-controls="gov-banner"
                  >
                    <span className="usa-banner-button-text">
                      Here's how you know
                    </span>
                  </button>
                </div>
              </header>
              <div
                className="usa-banner-content usa-grid usa-accordion-content"
                id="gov-banner"
              >
                <div className="usa-banner-guidance-gov usa-width-one-half">
                  <img
                    className="usa-banner-icon usa-media_block-img"
                    src={icondotgov}
                    alt="Dot gov"
                  />
                  <div className="usa-media_block-body">
                    <p>
                      <strong>The .gov means it’s official.</strong>
                      <br />
                      Federal government websites always use a .gov or .mil
                      domain. Before sharing sensitive information online, make
                      sure you’re on a .gov or .mil site by inspecting your
                      browser’s address (or “location”) bar.
                    </p>
                  </div>
                </div>
                <div className="usa-banner-guidance-ssl usa-width-one-half">
                  <img
                    className="usa-banner-icon usa-media_block-img"
                    src={iconhttps}
                    alt="SSL"
                  />
                  <div className="usa-media_block-body">
                    <p>
                      This site is also protected by an SSL (Secure Sockets
                      Layer) certificate that’s been signed by the U.S.
                      government. The <strong>https://</strong> means all
                      transmitted data is encrypted — in other words, any
                      information or browsing history that you provide is
                      transmitted securely.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="usa-nav-container">
            <div className="usa-navbar">
              <button className="usa-menu-btn">Menu</button>
              <div className="usa-logo" id="logo">
                <em className="usa-logo-text">
                  <a
                    href="/"
                    title="Home"
                    aria-label="Federal Agency Name Home"
                  >
                    USSC <br />
                  </a>
                </em>
              </div>
            </div>
            <nav className="usa-nav">
              <button className="usa-nav-close">
                <img src={close} alt="close" />
              </button>
              <ul className="usa-nav-primary usa-accordion">
                <li>
                  <button
                    className="usa-accordion-button usa-nav-link"
                    aria-expanded="false"
                    aria-controls="side-nav-1"
                  >
                    <span>Guidelines</span>
                  </button>
                  <ul id="side-nav-1" className="usa-nav-submenu">
                    <li>
                      <Link to="/" className="usa-nav-link">
                        <span>2016</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/ai" className="usa-nav-link">
                        <span>Applying Instructions</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/si" className="usa-nav-link">
                        <span>Appendix A</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/ab" className="usa-nav-link">
                        <span>Appendix B</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/amendments" className="usa-nav-link">
                        <span>Appendix C</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/archives" className="usa-nav-link">
                        <span>Archives</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <button
                    className="usa-accordion-button usa-nav-link"
                    aria-expanded="false"
                    aria-controls="side-nav-2"
                  >
                    <span>Tables</span>
                  </button>
                  <ul id="side-nav-2" className="usa-nav-submenu">
                    <li>
                      <Link to="/guidelines/§8C2.4" className="usa-nav-link">
                        <span>Fine Table</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/guidelines/§2B1.1" className="usa-nav-link">
                        <span>Loss Table</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/guidelines/§7B1.4" className="usa-nav-link">
                        <span>Revocation Table</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/chapters/5/parts/A/guidelines"
                        className="usa-nav-link"
                      >
                        <span>Sentencing Table</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/guidelines/§2T4.1" className="usa-nav-link">
                        <span>Tax Table</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/sc" className="usa-nav-link">
                    <span>Sentencing Calculator</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dol" className="usa-nav-link">
                    <span>Drug Quantity Calculator</span>
                  </Link>
                </li>
                <li>
                  <Link to="/de" className="usa-nav-link">
                    <span>Drug Equivalency Calculator</span>
                  </Link>
                </li>
				<li>
				  <Link to="/bookmarks" className="usa-nav-link">
				    <span>Bookmarks</span>
				  </Link>
				</li>
              </ul>
              <form className="usa-search usa-search-small">
                <div role="search">
                  <label className="usa-sr-only" htmlFor="search-field-small">
                    Search small
                  </label>
                  <input id="search-field-small" type="search" name="search" />
                  <button type="submit">
                    <span className="usa-sr-only">Search</span>
                  </button>
                </div>
              </form>
            </nav>
          </div>
        </header>
        <div className="usa-overlay" />
        <main
          className="usa-grid usa-content usa-layout-docs"
          id="main-content"
        >
          {this.props.children}
        </main>
        <footer className="usa-footer usa-footer-medium" role="contentinfo">
          <div className="usa-grid usa-footer-return-to-top">
            <Link to="/" className="usa-nav-link">
              <span>Return to Home</span>
            </Link>
          </div>
          <div className="usa-footer-primary-section">
            <div className="usa-grid-full">
              <nav className="usa-footer-nav">
                <ul className="usa-unstyled-list">
                  <li className="usa-width-one-fourth usa-footer-primary-content">
                    <a className="usa-footer-primary-link" href="/">
                      Primary link
                    </a>
                  </li>
                  <li className="usa-width-one-fourth usa-footer-primary-content">
                    <a className="usa-footer-primary-link" href="/">
                      Permanently relevant
                    </a>
                  </li>
                  <li className="usa-width-one-fourth usa-footer-primary-content">
                    <a className="usa-footer-primary-link" href="/">
                      Easy to understand
                    </a>
                  </li>
                  <li className="usa-width-one-fourth usa-footer-primary-content">
                    <a className="usa-footer-primary-link" href="/">
                      Site policies (example)
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="usa-footer-secondary_section">
            <div className="usa-grid">
              <div className="usa-footer-logo usa-width-one-half">
                <img
                  className="usa-footer-logo-img"
                  src={logo}
                  alt="USSC logo"
                />
                <h3 className="usa-footer-logo-heading">
                  UNITED STATES SENTENCING COMMISSION
                </h3>
              </div>
              <div className="usa-footer-contact-links usa-width-one-half">
                <a className="usa-link-facebook" href="/">
                  <span>Facebook</span>
                </a>
                <a
                  className="usa-link-twitter"
                  href="https://twitter.com/TheUSSCgov"
                >
                  <span>Twitter</span>
                </a>
                <a
                  className="usa-link-youtube"
                  href="https://www.youtube.com/playlist?list=PL4bcxoLSIaXcsFPehKYaifpR0bFAIr9wW"
                >
                  <span>YouTube</span>
                </a>
                <a
                  className="usa-link-rss"
                  href="https://www.ussc.gov/rss-frequently-asked-questions"
                >
                  <span>RSS</span>
                </a>
                <address>
                  <h3 className="usa-footer-contact-heading">USSC HelpLine</h3>
                  <p>
                    The HelpLine assists practitioners in applying the
                    guidelines.
                  </p>
                  <p>CONTACT: (202) 502-4545</p>
                  <p>HOURS: 8:30 A.M. TO 5:00 P.M. (ET), MONDAY – FRIDAY.</p>

                  <p>
                    U.S. SENTENCING COMMISSION Office of Public Affairs <br />
                    One Columbus Circle, NE Suite 2-500, <br />
                    South Lobby <br />
                    Washington, DC, 20002-8002 <br />
                    Main: (202) 502-4500
                  </p>
                  <a href="mailto:PubAffairs@ussc.gov">PubAffairs@ussc.gov</a>
                </address>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Container;
