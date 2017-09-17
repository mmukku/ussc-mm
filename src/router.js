import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  IndexRoute,
  Link
} from 'react-router-dom';
import Helmet from 'react-helmet';
import Container from './components/container';
import asyncComponent from './components/asyncComponent';

const AsyncHome = asyncComponent(() => import('./pages/home'));
const AsyncChapter = asyncComponent(() => import('./pages/chapter'));
const AsyncSC = asyncComponent(() => import('./pages/sc'));
const AsyncSI = asyncComponent(() => import('./pages/si'));
const AsyncAmendments = asyncComponent(() => import('./pages/amendments'));
const title = 'USSC Guidelines';

class USSCRouter extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Helmet titleTemplate={`%s - ${title}`} />
          <Switch>
            <Route exact path="/" component={AsyncHome} title="Home" />
            <Route
              exact
              path="/chapters/:id"
              component={AsyncChapter}
              title="Chapters"
            />
            <Route
              exact
              path="/sc"
              component={AsyncSC}
              title="Sentencing Calculator"
            />
            <Route
              exact
              path="/si"
              component={AsyncSI}
              title="Statutory Index"
            />
            <Route
              exact
              path="/amendments"
              component={AsyncAmendments}
              title="Amendments"
            />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default USSCRouter;
