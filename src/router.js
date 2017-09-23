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
const AsyncSC = asyncComponent(() => import('./pages/sc'));
const AsyncSI = asyncComponent(() => import('./pages/si'));
const AsyncDOL = asyncComponent(() => import('./pages/dol'));
const AsyncAmendments = asyncComponent(() => import('./pages/amendments'));
const AsyncParts = asyncComponent(() => import('./pages/parts'));
const AsyncSections = asyncComponent(() => import('./pages/sections'));
const AsyncGuidelines = asyncComponent(() => import('./pages/guidelines'));
const AsyncGuideline = asyncComponent(() => import('./pages/guideline'));

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
              path="/chapters"
              component={AsyncHome}
              title="Chapters"
            />
            <Route
              exact
              path="/chapters/:chapterId/parts"
              component={AsyncParts}
              title="Parts"
            />
            <Route
              exact
              path="/chapters/:chapterId/parts/:part/sections"
              component={AsyncSections}
              title="Sections"
            />
            <Route
              exact
              path="/chapters/:chapterId/parts/:part/sections/:sectionId/guidelines"
              component={AsyncGuidelines}
              title="GuideLines"
            />
            <Route
              exact
              path="/chapters/:chapterId/parts/:part/guidelines"
              component={AsyncGuidelines}
              title="GuideLines"
            />
            <Route
              exact
              path="/chapters/:chapterId/parts/:part/sections/:sectionId/guidelines/:id"
              component={AsyncGuideline}
              title="GuideLine"
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
              path="/dol"
              component={AsyncDOL}
              title="Drug Qunatity Calculator"
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
