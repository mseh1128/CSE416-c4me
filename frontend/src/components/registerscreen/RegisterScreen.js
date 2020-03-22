import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

//import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { firestoreConnect } from 'react-redux-firebase';

import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";

import PropTypes from 'prop-types';

import data from '../test/TestStudentData.json'

export class RegisterScreen extends Component {
    state = {
        userID: '',
        userIDCheck: '',
        password: '',
        passwordCheck: '',
        hidden: true
      }

    checkCredentials = () => {
        if(this.state.password.length===0 || this.state.userID.length===0)
            this.setState({hidden: false})
        else
            this.goHome()
    }

    goLogin = () => {
        this.props.history.push('/')
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
            <div className="register_screen_container">
                <div className='registerContainer'>
                    <div></div>
                    <span class='loginText'> Register </span>
                    <div id="userID" className="input-field">
                        <label htmlFor="userID" style={{left: "20px"}}>UserID</label>
                        <input className="active" type="email" name="userID" id="userID" onChange={this.handleChange} />
                    </div>
                    <div id="userIDCheck" className="input-field">
                        <label htmlFor="userIDCheck" style={{left: "20px"}}>Enter UserID again</label>
                        <input className="active" type="email" name="userIDCheck" id="userIDCheck" onChange={this.handleChange} />
                    </div>
                    <div id="password" className="input-field">
                        <label htmlFor="password" style={{left: "20px"}}>Password</label>
                        <input className="active" type="password" name="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div id="passwordCheck" className="input-field">
                        <label htmlFor="password" style={{left: "20px"}}>Enter Password again</label>
                        <input className="active" type="password" name="passwordCheck" id="passwordCheck" onChange={this.handleChange} />
                    </div>
                    <div class="loginButtons">
                        <button id="login" onClick={this.checkCredentials}> submit </button>
                        <button id="register" onClick={this.goLogin}> cancel </button>
                    </div>
                    <span class='errorText' hidden={this.state.hidden}> email or password does not match </span>  
                </div>
                    <div className="banner">
                        C4Me<br />
                        Application Assistant
                    </div>
            </div>
        );
    }
}

  export default RegisterScreen