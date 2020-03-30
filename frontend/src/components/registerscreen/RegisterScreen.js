import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

//import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { firestoreConnect } from 'react-redux-firebase';

import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";

import PropTypes from 'prop-types';

import data from '../test/TestStudentData.json'

const nothingWasEntered = " You did not enter a username and password ";
const nonRepeatingUsername = " Your username does not match up ";
const nonRepeatingPassword = " Your password does not match up ";
const usedIDAndPassword = " That username and password combo has been used ";

export class RegisterScreen extends Component {


    state = {
        userID: '',
        userIDCheck: '',
        password: '',
        passwordCheck: '',
        hidden: true
      }

    checkCredentials = async() => {
        let password = this.state.password;
        let username= this.state.userID;
        let passwordCheck = this.state.passwordCheck;
        let usernameCheck = this.state.userIDCheck;

        if(username.length===0 || password.length===0 || usernameCheck.length===0 || passwordCheck.length===0){
            this.setState({hidden: false})
            document.getElementById("errorText").textContent = nothingWasEntered
            return
        }


        if(username !== usernameCheck){
            this.setState({hidden: false})
            document.getElementById("errorText").textContent = nonRepeatingUsername
            return
        }

        if(password !== passwordCheck){
            this.setState({hidden: false})
            document.getElementById("errorText").textContent = nonRepeatingPassword
            return
        }

        let supposedUser = await fetch("http://localhost:5201/addANewStudent?username=" + username + "&password=" + password + "&name=" + name)
        let supposedUserAnswer = await supposedUser.json()
        if (supposedUser.status !== 200 || supposedUserAnswer.length !== 0 ){
            this.setState({hidden:false})
            document.getElementById("errorText").textContent = usedIDAndPassword
            return
        }

        this.props.history.push('/')
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
                        <button id="login" onClick={this.checkCredentials}> Register Student </button>
                        <button id="register" onClick={this.goLogin}> Cancel </button>
                    </div>
                    <span id="errorText" class='errorText' hidden={this.state.hidden}> You did not enter a username and password </span>
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
