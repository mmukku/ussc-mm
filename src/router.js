import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import Container from './components/container';
import asyncComponent from './components/asyncComponent';

const AsyncHome = asyncComponent(() => import('./pages/home'));
const AsyncSC = asyncComponent(() => import('./pages/sc'));
const AsyncSI = asyncComponent(() => import('./pages/si'));
const AsyncDOL = asyncComponent(() => import('./pages/dol'));
const AsyncDE = asyncComponent(() => import('./pages/de'));
const AsyncAmendments = asyncComponent(() => import('./pages/amendments'));
const AsyncParts = asyncComponent(() => import('./pages/parts'));
const AsyncSections = asyncComponent(() => import('./pages/sections'));
const AsyncGuidelines = asyncComponent(() => import('./pages/guidelines'));
const AsyncGuideline = asyncComponent(() => import('./pages/guideline'));
const AsyncApplicationInstructions = asyncComponent(() => import('./pages/ai'));
const AsyncAppendixB = asyncComponent(() => import('./pages/appendixb'));
const AsyncAppendixBPart = asyncComponent(() =>
  import('./pages/appendixbpart')
);
const AsyncArchives = asyncComponent(() => import('./pages/archives'));
const AsyncBookmarks = asyncComponent(() => import('./pages/bookmarks'));

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
			  path="/bookmarks"
			  component={AsyncBookmarks}
			  title="Bookmarks"
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
              path="/guidelines/:id"
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
              path="/de"
              component={AsyncDE}
              title="Drug Equivalency Calculator"
            />
            <Route
              exact
              path="/amendments"
              component={AsyncAmendments}
              title="Amendments"
            />
            <Route
              exact
              path="/archives"
              component={AsyncArchives}
              title="Archives"
            />
            <Route
              exact
              path="/ai"
              component={AsyncApplicationInstructions}
              title="Application Instructions"
            />

            <Route
              exact
              path="/ab"
              component={AsyncAppendixB}
              title="Appendix B"
            />
            <Route
              exact
              path="/ab/:part"
              component={AsyncAppendixBPart}
              title="Appendix B"
            />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default USSCRouter;
