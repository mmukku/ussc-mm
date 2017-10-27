import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import Container from './components/container';
import asyncComponent from './components/asyncComponent';
import Home from './pages/home';
import Parts from './pages/parts';
import Sections from './pages/sections';
import Guidelines from './pages/guidelines';
import Guideline from './pages/gl';
//import Search from './pages/search';

const AsyncSearch = asyncComponent(() => import('./pages/search'));
const AsyncGRC = asyncComponent(() => import('./pages/grc'));
const AsyncSI = asyncComponent(() => import('./pages/si'));
const AsyncDOL = asyncComponent(() => import('./pages/dol'));
const AsyncDE = asyncComponent(() => import('./pages/de'));
const AsyncAmendments = asyncComponent(() => import('./pages/ac'));

const AsyncApplicationInstructions = asyncComponent(() => import('./pages/ai'));
const AsyncAppendixB = asyncComponent(() => import('./pages/appendixb'));
const AsyncAppendixBPart = asyncComponent(() =>
  import('./pages/appendixbpart')
);
const AsyncArchives = asyncComponent(() => import('./pages/archives'));

const title = 'USSC Guidelines';

class USSCRouter extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Helmet titleTemplate={`%s - ${title}`} />
          <Switch>
            <Route exact path="/" component={Home} title="Home" />
            <Route exact path="/chapters" component={Home} title="Chapters" />
            <Route
              exact
              path="/search/:slug?"
              component={AsyncSearch}
              title="Search"
            />
            <Route
              exact
              path="/chapters/:chapterId/parts"
              component={Parts}
              title="Parts"
            />
            <Route
              exact
              path="/chapters/:chapterId/parts/:part/sections"
              component={Sections}
              title="Sections"
            />
            <Route
              exact
              path="/chapters/:chapterId/parts/:part/sections/:sectionId/guidelines"
              component={Guidelines}
              title="Guidelines"
            />
            <Route
              exact
              path="/chapters/:chapterId/parts/:part/guidelines"
              component={Guidelines}
              title="Guidelines"
            />
            <Route
              exact
              path="/gl/:id"
              component={Guideline}
              title="Guideline"
            />
            <Route
              exact
              path="/grc"
              component={AsyncGRC}
              title="Guideline Range Calculator"
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
              path="/ac"
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
              title="Appliation Instructions"
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
