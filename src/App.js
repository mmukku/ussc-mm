import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import Container from './components/container';
import Home from './pages/home';
import SC from './pages/sc';
import SI from './pages/si';
import Amendments from './pages/amendments';

const title = 'USSC Guidelines';

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Helmet titleTemplate={`%s - ${title}`} />
          <Route exact path="/" component={Home} title="Home" />
          <Route path="/sc" component={SC} title="Sentencing Calculator" />
          <Route path="/si" component={SI} title="Statutory Index" />
          <Route path="/amendments" component={Amendments} title="Amendments" />
        </Container>
      </Router>
    );
  }
}

export default App;
