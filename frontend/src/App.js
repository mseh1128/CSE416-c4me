import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.js';
import LoginScreen from './components/loginscreen/LoginScreen.js';
import RegisterScreen from './components/registerscreen/RegisterScreen.js';
import StudentScreen from './components/studentscreen/StudentScreen.js';
import CollegeSearchScreen from './components/collegesearchscreen/CollegeSearchScreen.js';
import ApplicationTrackerScreen from './components/applicationtrackerscreen/ApplicationTrackerScreen';
import ViewProfileScreen from './components/viewprofilescreen/ViewProfileScreen.js';
import ViewOtherScreen from './components/viewotherscreen/ViewOtherScreen.js';
import AdminScreen from './components/adminscreen/AdminScreen.js';
import authorizeComponent from './components/authentication/AuthComponent.js';
// // import { ProtectedRoute } from './components/authentication/ProtectedRoute.js';

import 'materialize-css/dist/css/materialize.min.css';

function App() {
	return (
		<BrowserRouter>
			<Navbar></Navbar>
			<Switch>
				<Route path='/' exact component={LoginScreen} />
				<Route path='/register' component={RegisterScreen} />

				<Route path='/applicationTracker/:id/view/:idStudent' component={ViewOtherScreen} />
				<Route path='/applicationTracker/:id' component={ApplicationTrackerScreen} />

				<Route path='/home' component={authorizeComponent(StudentScreen)} />

				<Route path='/search' component={authorizeComponent(CollegeSearchScreen)} />

				<Route path='/profile' component={authorizeComponent(ViewProfileScreen)} />

				<Route path='/admin' component={authorizeComponent(AdminScreen)} />

				<Route path='/:any' component={LoginScreen} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
