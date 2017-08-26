import React from "react"
import "uswds/dist/css/uswds.min.css"
import "uswds"
import logo from './logo.png'

class Container extends React.Component {
    render() {
        return (<div style={{marginBottom: "5.9rem"}}>
        <a className="usa-skipnav" href="#main-content">Skip to main content</a>
        <header className="usa-header usa-header-basic" role="banner">
        <div className="usa-banner">
          <div className="usa-accordion">
            <header className="usa-banner-header">
              <div className="usa-grid usa-banner-inner">
              <img src="/assets/img/favicons/favicon-57.png" alt="U.S. flag" />
              <p>An official website of the United States government</p>
              <button className="usa-accordion-button usa-banner-button"
                aria-expanded="false" aria-controls="gov-banner">
                <span className="usa-banner-button-text">Here's how you know</span>
              </button>
              </div>
            </header>
            <div className="usa-banner-content usa-grid usa-accordion-content" id="gov-banner">
              <div className="usa-banner-guidance-gov usa-width-one-half">
                <img className="usa-banner-icon usa-media_block-img" src="/assets/img/icon-dot-gov.svg" alt="Dot gov" />
                <div className="usa-media_block-body">
                  <p>
                    <strong>The .gov means it’s official.</strong>
                    <br />
                    Federal government websites always use a .gov or .mil domain. Before sharing sensitive information online, make sure you’re on a .gov or .mil site by inspecting your browser’s address (or “location”) bar.
                  </p>
                </div>
              </div>
              <div className="usa-banner-guidance-ssl usa-width-one-half">
                <img className="usa-banner-icon usa-media_block-img" src="/assets/img/icon-https.svg" alt="SSL" />
                <div className="usa-media_block-body">
                  <p>This site is also protected by an SSL (Secure Sockets Layer) certificate that’s been signed by the U.S. government. The <strong>https://</strong> means all transmitted data is encrypted  — in other words, any information or browsing history that you provide is transmitted securely.</p>
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
                <a href="/" accessKey="1" title="Home" aria-label="Federal Agency Name Home">USSC <br/></a>
              </em>
            </div>
          </div>
          <nav role="navigation" className="usa-nav">
            <button className="usa-nav-close">
              <img src="/assets/img/close.svg" alt="close" />
            </button>
            <ul className="usa-nav-primary usa-accordion">
              <li>
                <button className="usa-accordion-button usa-nav-link" aria-expanded="false" aria-controls="side-nav-1">
                  <span>Guidelines</span>
                </button>
                <ul id="side-nav-1" className="usa-nav-submenu">
                  <li>
                    <a href="#">Appendix B</a>
                  </li>
                  <li>
                    <a href="#">Amendments</a>
                  </li>
                </ul>
              </li>
              <li>
                <a className="usa-nav-link" href="/sentencing-calculator/">
                  <span>Sentencing Calculator</span>
                </a>
              </li>
              <li>
                <a className="usa-nav-link" href="/appendix-a/">
                  <span>Statutory Index</span>
                </a>
              </li>
            </ul>
            <form className="usa-search usa-search-small">
              <div role="search">
                <label className="usa-sr-only" htmlFor="search-field-small">Search small</label>
                <input id="search-field-small" type="search" name="search" />
                <button type="submit">
                  <span className="usa-sr-only">Search</span>
                </button>
              </div>
            </form>
          </nav>
        </div>
        </header>
        <div className="usa-overlay"></div>
        <main className="usa-grid usa-section usa-content usa-layout-docs" id="main-content">
          {this.props.children}
          </main>
          <footer className="usa-footer usa-footer-medium" role="contentinfo">
    <div className="usa-grid usa-footer-return-to-top">
      <a href="#">Return to top</a>
    </div>
    <div className="usa-footer-primary-section">
      <div className="usa-grid-full">
        <nav className="usa-footer-nav">
          <ul className="usa-unstyled-list">
            <li className="usa-width-one-fourth usa-footer-primary-content">
              <a className="usa-footer-primary-link" href="javascript:void(0);">Primary link</a>
            </li>
            <li className="usa-width-one-fourth usa-footer-primary-content">
              <a className="usa-footer-primary-link" href="javascript:void(0);">Permanently relevant</a>
            </li>
            <li className="usa-width-one-fourth usa-footer-primary-content">
              <a className="usa-footer-primary-link" href="javascript:void(0);">Easy to understand</a>
            </li>
            <li className="usa-width-one-fourth usa-footer-primary-content">
              <a className="usa-footer-primary-link" href="javascript:void(0);">Site policies (example)</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div className="usa-footer-secondary_section">
      <div className="usa-grid">
        <div className="usa-footer-logo usa-width-one-half">
          <img className="usa-footer-logo-img" src={logo} alt="USSC logo" />
          <h3 className="usa-footer-logo-heading">UNITED STATES SENTENCING COMMISSION</h3>
        </div>
        <div className="usa-footer-contact-links usa-width-one-half">
          <a className="usa-link-facebook" href="javascript:void(0);">
            <span>Facebook</span>
          </a>
          <a className="usa-link-twitter" href="https://twitter.com/TheUSSCgov">
            <span>Twitter</span>
          </a>
          <a className="usa-link-youtube" href="https://www.youtube.com/playlist?list=PL4bcxoLSIaXcsFPehKYaifpR0bFAIr9wW">
            <span>YouTube</span>
          </a>
          <a className="usa-link-rss" href="https://www.ussc.gov/rss-frequently-asked-questions">
            <span>RSS</span>
          </a>
          <address>
            <h3 className="usa-footer-contact-heading">
            USSC HelpLine</h3>
            <p>The HelpLine assists practitioners in applying the guidelines.</p>
            <p>CONTACT: (202) 502-4545</p>
            <p>HOURS: 8:30 A.M. TO 5:00 P.M. (ET), MONDAY – FRIDAY.</p>

            <p>U.S. SENTENCING COMMISSION Office of Public Affairs <br />
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
        </div>);
        
    }
}

export default Container;

