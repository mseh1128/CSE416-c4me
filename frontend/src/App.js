import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.js';
import LoginScreen from './components/loginscreen/LoginScreen.js';
import RegisterScreen from './components/registerscreen/RegisterScreen.js';
import SimilarStudentsScreen from './components/similarstudentsscreen/SimilarStudentsScreen.js';
import PossibleHighSchoolsScreen from './components/possiblehighschoolsscreen/PossibleHighSchoolsScreen.js';
import SimilarHighSchoolsScreen from './components/similarhighschoolsscreen/SimilarHighSchoolsScreen.js';
import CollegeSearchScreen from './components/collegesearchscreen/CollegeSearchScreen.js';
import ApplicationTrackerScreen from './components/applicationtrackerscreen/ApplicationTrackerScreen';
import ViewProfileScreen from './components/viewprofilescreen/ViewProfileScreen.js';
import ViewOtherScreen from './components/viewotherscreen/ViewOtherScreen.js';
import AdminScreen from './components/adminscreen/AdminScreen.js';
import authorizeComponent from './components/authentication/AuthComponent.js';
// // import { ProtectedRoute } from './components/authentication/ProtectedRoute.js';

import 'materialize-css/dist/css/materialize.min.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <BrowserRouter>
      <Navbar {...{ isAdmin, setIsAdmin }} />
      <Switch>
        <Route
          path='/'
          exact
          render={(routeProps) => (
            <LoginScreen {...{ setIsAdmin, ...routeProps }} />
          )}
        />
        <Route path='/register' component={RegisterScreen} />

        <Route
          path='/applicationTracker/:id/possibleHighSchools'
          component={PossibleHighSchoolsScreen}
        />
        <Route
          path='/applicationTracker/:id/highSchools/:hsName'
          component={SimilarHighSchoolsScreen}
        />
        <Route
          path='/applicationTracker/:id/view/:idStudent'
          component={ViewOtherScreen}
        />
        <Route
          path='/applicationTracker/:id'
          component={ApplicationTrackerScreen}
        />

        <Route
          path='/home'
          component={authorizeComponent(CollegeSearchScreen)}
        />

        <Route
          path='/search'
          component={authorizeComponent(CollegeSearchScreen)}
        />

        <Route
          path='/similarStudents/:id'
          component={authorizeComponent(SimilarStudentsScreen)}
        />

        <Route
          path='/profile'
          component={authorizeComponent(ViewProfileScreen)}
        />

        <Route path='/admin' component={authorizeComponent(AdminScreen)} />

        <Route path='/:any' component={LoginScreen} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
