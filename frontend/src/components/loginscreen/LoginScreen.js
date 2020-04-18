import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { firestoreConnect } from 'react-redux-firebase';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

import PropTypes from 'prop-types';

import data from '../test/TestStudentData.json';

import axios from 'axios';

const nothingWasEntered = 'Please fill in all the fields!';

export class LoginScreen extends Component {
  state = {
    userID: '',
    password: '',
    hideErrorMessage: true,
    errorTextContent: null,
  };

  checkCredentials = async () => {
    const { userID, password } = this.state;
    if (password.length === 0 || userID.length === 0) {
      this.setState({
        hideErrorMessage: false,
        errorTextContent: nothingWasEntered,
      });
      return;
    }
    try {
      const response = await axios.post('/loginUser', {
        username: userID,
        password: password,
      });
      const { data, status } = response;
      if (status !== 200) {
        console.log(`Status code of ${status} given`);
      }
      const { jwtToken, isAdmin } = data;
      console.log(data);
      localStorage.setItem('user-id-jwt', jwtToken);
      if (isAdmin) {
        this.props.setIsAdmin(true);
        this.props.history.push('/admin');
      } else {
        this.props.setIsAdmin(false);
        this.props.history.push('/home');
      }
    } catch (err) {
      console.log(err);
      // const {
      //   response: { data, status },
      // } = err;
      // const userFoundMessage = 'User not found!';
      // if (status === 400 && data === userFoundMessage) {
      //   this.setState({
      //     hideErrorMessage: false,
      //     errorTextContent: userFoundMessage,
      //   });
      // } else {
      //   console.log(err);
      //   const unknownErrorText = `An unknown error with error code ${status} occurred`;
      //   this.setState({
      //     hideErrorMessage: false,
      //     errorTextContent: unknownErrorText,
      //   });
      // }
    }
  };

  goRegister = () => {
    this.props.history.push('/register');
  };

  goHome = () => {
    this.props.history.push('/home');
  };

  handleChange = (e) => {
    const { target } = e;

    this.setState((state) => ({
      ...state,
      [target.id]: target.value,
    }));
  };

  render() {
    const { hideErrorMessage, errorTextContent } = this.state;
    let errorMessage = null;
    if (!hideErrorMessage) {
      errorMessage = <span className="errorText">{errorTextContent}</span>;
    }

    return (
      <div className="login_screen_container">
        <div className="loginContainer">
          <div></div>
          <span className="loginText"> Login </span>
          <div id="userID" className="input-field">
            <label htmlFor="userID" style={{ left: '20px' }}>
              Username
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
          {errorMessage}
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
