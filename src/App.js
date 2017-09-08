import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import Container from './components/container';
import asyncComponent from './components/asyncComponent';

const AsyncHome = asyncComponent(() => import('./pages/home'));
const AsyncSC = asyncComponent(() => import('./pages/sc'));
const AsyncSI = asyncComponent(() => import('./pages/si'));
const AsyncAmendments  = asyncComponent(() => import('./pages/amendments'));
const title = 'USSC Guidelines';

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Helmet titleTemplate={`%s - ${title}`} />
          <Route exact path="/" component={AsyncHome} title="Home" />
          <Route path="/sc" component={AsyncSC} title="Sentencing Calculator" />
          <Route path="/si" component={AsyncSI} title="Statutory Index" />
          <Route path="/amendments" component={AsyncAmendments} title="Amendments" />
        </Container>
      </Router>
    );
  }
}

export default App;
