import React from 'react';
import logo from './logo.svg';
import './App.css';


import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.js';
import LoginScreen from './components/loginscreen/LoginScreen.js';
import RegisterScreen from './components/registerscreen/RegisterScreen.js';
import StudentScreen from './components/studentscreen/StudentScreen.js';
import CollegeSearchScreen from './components/collegesearchscreen/CollegeSearchScreen.js';
import ApplicationTrackerScreen from './components/applicationtrackerscreen/ApplicationTrackerScreen'
import ViewProfileScreen from './components/viewprofilescreen/ViewProfileScreen.js';

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
      <BrowserRouter>
        <Navbar></Navbar>
        <Switch>
            <Route exact path="/" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/applicationTracker/:name" component={ApplicationTrackerScreen} />
            <Route path="/home" component={StudentScreen} />
            <Route path="/search" component={CollegeSearchScreen} />
            <Route path="/profile" component={ViewProfileScreen} />
            <Route path="/:any" component={StudentScreen} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
