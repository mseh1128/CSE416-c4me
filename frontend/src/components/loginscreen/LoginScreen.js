import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

//import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { firestoreConnect } from 'react-redux-firebase';

import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";

import PropTypes from 'prop-types';

import data from '../test/TestStudentData.json'

export class LoginScreen extends Component {
    state = {
        userID: '',
        password: '',
        hidden: true
      }

    checkCredentials = () => {
        if(this.state.password.length===0 || this.state.userID.length===0)
            this.setState({hidden: false})
        else
            this.goHome()
    }

    goRegister = () => {
        this.props.history.push('/register')
    }

    goHome = () => {
        this.props.history.push('/home')
    }
    
    handleChange = (e) => {
        const { target } = e;
    
        this.setState(state => ({
          ...state,
          [target.id]: target.value,
        }));
    }

    render() {

        return (
            <div className="login_screen_container">
                <div className='loginContainer'>
                    <div></div>
                    <span class='loginText'> Login </span>
                    <div id="userID" className="input-field">
                        <label htmlFor="userID" style={{left: "20px"}}>UserID</label>
                        <input className="active" type="email" name="userID" id="userID" onChange={this.handleChange} />
                    </div>
                    <div id="password" className="input-field">
                        <label htmlFor="password" style={{left: "20px"}}>Password</label>
                        <input className="active" type="password" name="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div class="loginButtons">
                        <button id="login" onClick={this.checkCredentials}> submit </button>
                        <button id="register" onClick={this.goRegister}> register </button>
                    </div>
                    <span class='errorText' hidden={this.state.hidden}> Wrong email or password </span>  
                </div>
                    <div className="banner">
                        C4Me<br />
                        Application Assistant
                    </div>
            </div>
        );
    }
}

  export default LoginScreen