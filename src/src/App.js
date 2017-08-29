import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet';
import Container from './components/container';
import Home from './pages/home';
import SC from './pages/sc';
import SI from './pages/si';

const title = "USSC Guidelines";

const routes = [
  {
    title: "Home",
    path: "/",
    component: Home,
    exact: true
  },
  {
    title: "Sentencing Calculator",
    path: "/sc",
    component: SC,
    exact: true
  },
  {
    title: "Statutory Index",
    path: "/si",
    component: SI,
    exact: true
  }
]

class App extends Component {
  render() {
    return (
      <Router>
       <Container>
         <Helmet titleTemplate={`%s - ${title}`} />       
         <Switch>
            {routes.map((route, i) => (
              <Route key={i} {...route} />
            ))}
          </Switch>
      </Container>
      </Router>
      
    );
  }
}

export default App;
