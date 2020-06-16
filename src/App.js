import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
  Switch
} from "react-router-dom";
import Home from './Home';
import Country from './Country';
import NavBar from './Navbar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:id" exact component={Country} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
