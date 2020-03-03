import React from 'react';
import logo from './logo.svg';
import './App.css';


//import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.js';
import StudentScreen from './components/studentscreen/StudentScreen.js';

import 'materialize-css/dist/css/materialize.min.css';

function App() {
  /*return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Yo its the spagehtti coders out here</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );*/

  return (
      <div>
        <Navbar></Navbar>
        <StudentScreen></StudentScreen>
      </div>
  );
}

export default App;
