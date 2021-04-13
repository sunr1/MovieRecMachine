import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './views/Home';
import AddMovie from "./views/AddMovie";
import './App.css';
import Navbar from "./components/Navbar";
import { Container } from "semantic-ui-react";

function App() {
  return (
    <Router>
      <Navbar />

      <Container style={{ padding: '4rem 2rem' }}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/add-movie' component={AddMovie} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
