import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { firestoreConnect } from 'react-redux-firebase';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import Home from '@material-ui/icons/Home';
import Edit from '@material-ui/icons/Edit';
import Save from '@material-ui/icons/Save';
import PropTypes from 'prop-types';

import StudentCollegesList from './StudentCollegesList.js';

import data from '../test/TestStudentData.json';

export class ViewProfileScreen extends Component {
  state = {
    disabled: true,
    userIDInput: data.student.userID,
    name: data.student.name,
    residence_state: data.student.residence_state,
    high_school_name: data.student.high_school_name,
    high_school_city: data.student.high_school_city,
    high_school_state: data.student.high_school_state,
    GPA: data.student.GPA,
    college_class: data.student.college_class,
    major1: data.student.major_1,
    major2: data.student.major_2,
    SAT_Math: data.student.SAT_Math,
    SAT_EBRW: data.student.SAT_EBRW,
    ACT_English: data.student.ACT_English,
    ACT_Math: data.student.ACT_Math,
    ACT_Reading: data.student.ACT_Reading,
    ACT_Science: data.student.ACT_Science,
    ACT_Composite: data.student.ACT_Composite,
    ACT_Literature: data.student.ACT_Literature,
    AP_US_hist: data.student.AP_US_hist,
    AP_World_hist: data.student.AP_World_hist,
    AP_Math_1: data.student.AP_Math_1,
    AP_Math_2: data.student.AP_Math_2,
    AP_Eco_Bio: data.student.AP_Eco_Bio,
    AP_Mol_Bio: data.student.AP_Mol_Bio,
    AP_Chemistry: data.student.AP_Chemistry,
    AP_Physics: data.student.AP_Physics
  };

  goHome = () => {
    this.props.history.push('/home');
  };

  startEdit = () => {
    this.setState({ disabled: false });
  };

  //these parts are certainly not going to be like this
  //but they are quick and dirty ways to change the thing.

  changeNonAcademicInfo = async attribute => {
    let info = document.getElementById(attribute).value;
    let response = await fetch('http://localhost:5201/updateStudentInfo', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        category: attribute,
        value: info,
        userID: data.student.userID
      })
    });
  };

  changeAcademicInfo = async attribute => {
    let info = document.getAttributeById(attribute).value;
    let infoAsNumber = Number(info);

    let response = await fetch('http://localhost:5201/updateProfileInfo', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        category: attribute,
        value: info,
        userID: data.student.userID
      })
    });
  };

  getScore(score) {
    if (score === -1) {
      return 'Not taken';
    } else return score;
  }

  handleChange = e => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [target.id]: target.value
    }));
  };

  render() {
    var elem = document.querySelector('.tabs');
    var options = {};
    var instance = M.Tabs.init(elem, options);

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, options);
    });

    const student = data.student;

    return (
      <div className="profile_screen_container">
        <div className="profileContainer">
          <div id="profileBanner">
            <div />
            <span className="collegeTitleText"> Your Profile </span>
            <button className="profileButton" onClick={this.goHome}>
              {' '}
              <Home id="profileButtonSymbols" />{' '}
            </button>
            <div />
            <button
              className="profileButton"
              onClick={this.startEdit.bind(this)}
            >
              {' '}
              <Edit id="profileButtonSymbols" />{' '}
            </button>
            <div />
            <button className="profileButton">
              {' '}
              <Save id="profileButtonSymbols" />{' '}
            </button>
          </div>
          <div id="profileList">
            <div id="generalInfoList">
              <div id="generalHSHeader">
                <span className="profileHeader">General Information</span>
                <span className="profileHeader">General Education</span>
              </div>
              <div>
                <span className="profileText">User ID:</span>
                <input
                  type="textfield"
                  id="userIDInput"
                  className="profilePrompt"
                  style={{ left: '60px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.state.userIDInput}
                  on_input
                ></input>
                <span className="profileText" style={{ left: '110px' }}>
                  HS Name:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="high_school_name"
                  style={{ left: '134px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.state.high_school_name}
                ></input>
              </div>
              <div>
                <span className="profileText">Name:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="name"
                  style={{ left: '76px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.state.name}
                ></input>
                <span className="profileText" style={{ left: '125px' }}>
                  HS City:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="high_school_city"
                  style={{ left: '161px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.state.high_school_city}
                ></input>
              </div>
              <div>
                <span className="profileText">Residence State:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="residence_state"
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.state.residence_state}
                ></input>
                <span className="profileText" style={{ left: '49px' }}>
                  HS State:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="high_school_state"
                  style={{ left: '80px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.state.high_school_state}
                ></input>
              </div>
              <div>
                <span className="profileText">Desired major:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="major1"
                  style={{ left: '11px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.state.major1}
                ></input>
                <span className="profileText" style={{ left: '58px' }}>
                  GPA:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="GPA"
                  style={{ left: '121px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.state.GPA}
                ></input>
              </div>
              <div>
                <span className="profileText">Second major:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="major2"
                  style={{ left: '14px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.state.major2}
                ></input>
                <span className="profileText" style={{ left: '61px' }}>
                  Class:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="college_class"
                  style={{ left: '120px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.state.college_class}
                ></input>
              </div>
            </div>
            <div>
              <div id="collegeInfoList">
                <div id="generalHSHeader">
                  <span className="profileHeader">Your Applications</span>
                </div>
                <StudentCollegesList disabled={this.state.disabled} />
              </div>
            </div>
            <div id="educationInfoList">
              <div id="generalHSHeader">
                <span className="profileHeader">SAT/ACT Scores</span>
                <span className="profileHeader">AP Scores</span>
              </div>
              <div>
                <span className="profileText">SAT Math:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="SAT_Math"
                  style={{ left: '41px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getScore(this.state.SAT_Math)}
                ></input>
                <span className="profileText" style={{ left: '91px' }}>
                  US:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="AP_US_hist"
                  style={{ left: '164px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getScore(this.state.AP_US_hist)}
                ></input>
              </div>
              <div>
                <span className="profileText">SAT EBRW:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="SAT_EBRW"
                  style={{ left: '29px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getScore(this.state.SAT_EBRW)}
                ></input>
                <span className="profileText" style={{ left: '80px' }}>
                  World:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="AP_World_hist"
                  style={{ left: '127px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getScore(this.state.AP_World_hist)}
                ></input>
              </div>
              <div>
                <span className="profileText">ACT Math:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="ACT_Math"
                  style={{ left: '36px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getScore(this.state.ACT_Math)}
                ></input>
                <span className="profileText" style={{ left: '87px' }}>
                  Math I:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="AP_Math_1"
                  style={{ left: '131px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getScore(this.state.AP_Math_1)}
                ></input>
              </div>
              <div>
                <span className="profileText">ACT English:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="ACT_English"
                  style={{ left: '20px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getScore(this.state.ACT_English)}
                ></input>
                <span className="profileText" style={{ left: '71px' }}>
                  Math II:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="AP_Math_2"
                  style={{ left: '108px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getScore(this.state.AP_Math_2)}
                ></input>
              </div>
              <div>
                <span className="profileText">ACT Reading:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="ACT_Reading"
                  style={{ left: '14px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getScore(this.state.ACT_Reading)}
                ></input>
                <span className="profileText" style={{ left: '65px' }}>
                  Eco Bio:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="AP_Eco_Bio"
                  style={{ left: '103px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getScore(this.state.AP_Eco_Bio)}
                ></input>
              </div>
              <div>
                <span className="profileText">ACT Literature:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="ACT_Literature"
                  style={{ left: '-1px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getScore(this.state.ACT_Literature)}
                ></input>
                <span className="profileText" style={{ left: '49px' }}>
                  Molecular Bio:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="AP_Mol_Bio"
                  style={{ left: '37px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getScore(this.state.AP_Mol_Bio)}
                ></input>
              </div>
              <div>
                <span className="profileText">ACT Science:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="ACT_Science"
                  style={{ left: '21px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getScore(this.state.ACT_Science)}
                ></input>
                <span className="profileText" style={{ left: '72px' }}>
                  Chemistry:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="AP_Chemistry"
                  style={{ left: '88px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getScore(this.state.AP_Chemistry)}
                ></input>
              </div>
              <div>
                <span className="profileText">ACT Composite:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="ACT_Composite"
                  style={{ left: '-4px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getScore(this.state.ACT_Composite)}
                ></input>
                <span className="profileText" style={{ left: '48px' }}>
                  Physics:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="AP_Physics"
                  style={{ left: '87px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getScore(this.state.AP_Physics)}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewProfileScreen;
