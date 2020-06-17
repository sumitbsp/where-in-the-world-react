import React, { useState } from 'react';
import './App.css';

import {
  HashRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Home from './Home';
import Country from './Country';

function App() {

  const [uiMode, setUiMode] = useState('light');
  const [darkModeToggleText, setDarkModeToggleText] = useState('Dark Mode')
  const toggleUiMode = async () => {
    await setUiMode((uiMode === 'light' ? 'dark' : 'light'));
    setDarkModeToggleText((darkModeToggleText === 'Dark Mode' ? 'Light Mode' : 'Dark Mode'));
  }


  return (
    <div className="App">

      <div className="padding-x navbar" style={{ backgroundColor: (uiMode === 'light' ? '#fff' : '#2B3743') }}>
        <h1
          style={{ color: (uiMode === 'light' ? '#000' : '#fff') }}>
          Where In The World
        </h1>
        <div
          style={{ color: (uiMode === 'light' ? '#000' : '#fff') }}
          className="ui-mode-toggle" onClick={toggleUiMode}>
          {darkModeToggleText === 'Dark Mode' ? <i className="fa fa-moon-o  " style={{ color: 'black', fontSize: '1rem', fontWeight: '600' }}></i> : <i className="fa fa-sun-o  " style={{ color: 'white', fontSize: '1rem', fontWeight: '600' }}></i>} {darkModeToggleText}

        </div>
      </div>

      <Router>
        <Switch>
          <Route path="/" exact component={() => <Home uiState={uiMode} />} />
          <Route path="/:id" exact render={(props) => <Country {...props} uiState={uiMode} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
