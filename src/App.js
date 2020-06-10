import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Home from './Home';
import Country from './Country';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/country/:id" component={Country} />
      </Router>
    </div>
  );
}

export default App;
