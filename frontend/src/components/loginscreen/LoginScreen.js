import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { firestoreConnect } from 'react-redux-firebase';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

import PropTypes from 'prop-types';

import data from '../test/TestStudentData.json';

export class LoginScreen extends Component {
  state = {
    userID: '',
    password: '',
    hidden: true
  };

  checkCredentials = async () => {
    let password = this.state.password;
    let userID = this.state.userID;

    if (password.length === 0 || userID.length === 0) {
      this.setState({ hidden: false });
      return;
    }
    //else
    //this.goHome()

    //fetch all of a supposed user as a JSON object. if it turns up empty,
    let supposedUser = await fetch(
      'http://localhost:5201/tryToRetrieveUser?username=' +
        userID +
        '&password=' +
        password
    );
    let supposedUserAnswer = await supposedUser.json();
    console.log(supposedUserAnswer);
    if (supposedUser.status !== 200 || supposedUserAnswer.length === 0) {
      this.setState({ hidden: false });
      return;
    }

    this.goHome();
  };

  goRegister = () => {
    this.props.history.push('/register');
  };

  goHome = () => {
    this.props.history.push('/home');
  };

  handleChange = e => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [target.id]: target.value
    }));
  };

  render() {
    return (
      <div className="login_screen_container">
        <div className="loginContainer">
          <div></div>
          <span className="loginText"> Login </span>
          <div id="userID" className="input-field">
            <label htmlFor="userID" style={{ left: '20px' }}>
              UserID
            </label>
            <input
              className="active"
              type="email"
              name="userID"
              id="userID"
              onChange={this.handleChange}
            />
          </div>
          <div id="password" className="input-field">
            <label htmlFor="password" style={{ left: '20px' }}>
              Password
            </label>
            <input
              className="active"
              type="password"
              name="password"
              id="password"
              onChange={this.handleChange}
            />
          </div>
          <div className="loginButtons">
            <button id="login" onClick={this.checkCredentials}>
              {' '}
              submit{' '}
            </button>
            <button id="register" onClick={this.goRegister}>
              {' '}
              register{' '}
            </button>
          </div>
          <span className="errorText" hidden={this.state.hidden}>
            {' '}
            Wrong email or password{' '}
          </span>
        </div>
        <div className="banner">
          C4Me
          <br />
          Application Assistant
        </div>
      </div>
    );
  }
}

export default LoginScreen;
