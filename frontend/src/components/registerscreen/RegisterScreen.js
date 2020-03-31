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
const nonRepeatingPassword = 'Your password does not match up!';
const duplicateIDAndPassword =
  ' That username and password combo has been used ';

export class RegisterScreen extends Component {
  state = {
    userID: '',
    name: '',
    password: '',
    passwordCheck: '',
    hideErrorMessage: true,
    errorTextContent: null
  };

  checkCredentials = async () => {
    const { name, password, passwordCheck } = this.state;
    const username = this.state.userID;

    // name = 'manav';
    // username = 'ian';
    // password = 'feawaa';
    // passwordCheck = 'feawaa';

    if (
      username.length === 0 ||
      password.length === 0 ||
      name.length === 0 ||
      passwordCheck.length === 0
    ) {
      this.setState({
        hideErrorMessage: false,
        errorTextContent: nothingWasEntered
      });
      return;
    }

    if (password !== passwordCheck) {
      this.setState({
        hideErrorMessage: false,
        errorTextContent: nonRepeatingPassword
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5201/addNewStudent', {
        username,
        password,
        name
      });
      if (response.status !== 200) {
        console.log(`Status code of ${response.state} given`);
      }
      this.props.history.push('/');
    } catch (err) {
      console.log('In error handling!');
      const {
        response: { data, status }
      } = err;
      const duplicateText = 'Duplicate account found!';
      if (status === 400 && data === duplicateText) {
        this.setState({
          hideErrorMessage: false,
          errorTextContent: duplicateText
        });
      } else {
        console.log(err);
        const unknownErrorText = `An unknown error with error code ${status} occurred`;
        this.setState({
          hideErrorMessage: false,
          errorTextContent: unknownErrorText
        });
      }
    }
  };

  goLogin = () => {
    this.props.history.push('/');
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
    const { hideErrorMessage, errorTextContent } = this.state;
    let errorMessage = null;
    if (!hideErrorMessage) {
      errorMessage = <span className="errorText">{errorTextContent}</span>;
    }

    return (
      <div className="register_screen_container">
        <div className="registerContainer">
          <div></div>
          <span className="loginText"> Register </span>
          <div id="name" className="input-field">
            <label htmlFor="name" style={{ left: '20px' }}>
              Name
            </label>
            <input
              className="active"
              type="email"
              name="name"
              id="name"
              onChange={this.handleChange}
            />
          </div>
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
          <div id="passwordCheck" className="input-field">
            <label htmlFor="password" style={{ left: '20px' }}>
              Enter Password again
            </label>
            <input
              className="active"
              type="password"
              name="passwordCheck"
              id="passwordCheck"
              onChange={this.handleChange}
            />
          </div>
          <div className="loginButtons">
            <button id="login" onClick={this.checkCredentials}>
              {' '}
              submit{' '}
            </button>
            <button id="register" onClick={this.goLogin}>
              {' '}
              cancel{' '}
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

export default RegisterScreen;
