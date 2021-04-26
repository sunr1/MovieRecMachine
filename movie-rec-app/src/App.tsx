import React from "react";
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
import CreateList from "./views/CreateList";
import MovieDetails from "./views/MovieDetails";
import BrowseLists from "./views/BrowseLists";

function App() {
  return (
    <Router>
      <Navbar />

      <Container style={{ padding: '4rem 2rem' }}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/create' component={CreateList} />
          <Route exact path='/movie/:id' component={MovieDetails} />
          <Route exact path='/lists' component={BrowseLists} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
