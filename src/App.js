import React, { useState } from 'react';
import './App.css';

import {
  HashRouter as Router,
  Route,
  Switch
} from "react-router-dom";

// importing components
import Home from './Home';
import Country from './Country';

function App() {

  //writing navbar in app component to pass the dark mode state to child component as props

  //setting dark mode light mode in state
  const [uiMode, setUiMode] = useState('light');

  //setting the text to be show in dark mode toggle div in state
  const [darkModeToggleText, setDarkModeToggleText] = useState('Dark Mode')

  // function to toggle light and dark mode 
  const toggleUiMode = async () => {
    await setUiMode((uiMode === 'light' ? 'dark' : 'light'));
    //changing the text of the dark mode toggle div
    setDarkModeToggleText((darkModeToggleText === 'Dark Mode' ? 'Light Mode' : 'Dark Mode'));
  }


  return (
    <div className="App">
      {/* adding the navbar w/o router to show it on both pages*/}
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

      {/* bringing in router */}
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
