import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import Container from './components/container';
import Home from './pages/home';
import SC from './pages/sc';
import SI from './pages/si';

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
        </Container>
      </Router>
    );
  }
}

export default App;
