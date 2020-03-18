import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

//import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { firestoreConnect } from 'react-redux-firebase';

import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import Add from '@material-ui/icons/Add';
import PropTypes from 'prop-types';

import data from '../test/TestStudentData.json'

export class ViewProfileScreen extends Component {
    state = 
    {
        disabled: true
    }

    render() {

        var elem = document.querySelector('.tabs');
        var options = {}
        var instance = M.Tabs.init(elem, options);

        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems, options);
          });

          const student = data.student

        return (
            <div className="profile_screen_container">
                <div className='schoolsContainer'>
                    <div id="collegeListBanner">
                        <div></div>
                        <span class="collegeTitleText"> Your Profile </span> 
                    </div>
                    <div id="profileList">
                        <div id="generalInfoList">
                            <div id="generalHSHeader">
                                <span class="profileHeader">General Information</span>
                                <span class="profileHeader">General Education</span>
                            </div>
                            <div >
                                <span class="profileText">User ID:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "60px"}} disabled={this.state.disabled} value={student.userID}></input>
                                <span class="profileText" style={{left: "110px"}}>HS Name:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "100px"}} disabled={this.state.disabled} value={student.high_school_name}></input>
                            </div>
                            <div>
                                <span class="profileText">Name:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "76px"}} disabled={this.state.disabled} value={student.name}></input>
                                <span class="profileText" style={{left: "125px"}}>HS City:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "127px"}} disabled={this.state.disabled} value={student.high_school_city}></input>
                            </div>
                            <div>
                                <span class="profileText">Residence State:</span>
                                <input type="textfield" class="profilePrompt" disabled={this.state.disabled} value={student.residence_state}></input>
                                <span class="profileText" style={{left: "49px"}}>HS State:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "46px"}} disabled={this.state.disabled} value={student.high_school_state}></input>
                            </div>
                            <div>
                                <span class="profileText">Desired major:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "11px"}} disabled={this.state.disabled} value={student.major_1}></input>
                                <span class="profileText" style={{left: "58px"}}>GPA:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "87px"}} disabled={this.state.disabled} value={student.GPA}></input>
                            </div>
                            <div>
                                <span class="profileText">Second major:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "14px"}} disabled={this.state.disabled} value={student.major_2}></input>
                                <span class="profileText" style={{left: "61px"}}>Class:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "86px"}} disabled={this.state.disabled} value={student.college_class}></input>
                            </div>
                        </div>
                        <div id="generalInfoList">
                            <div id="generalHSHeader">
                                <span class="profileHeader">General Education</span>
                                <span class="profileHeader">Highschool General Information</span>
                            </div>
                            <div >
                                <span class="profileText">GPA:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "84px"}} disabled={this.state.disabled} value={student.GPA}></input>
                                <span class="profileText" style={{left: "110px"}}>HS Name:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "100px"}} disabled={this.state.disabled} value={student.high_school_name}></input>
                            </div>
                            <div>
                                <span class="profileText">Name:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "76px"}} disabled={this.state.disabled} value={student.name}></input>
                                <span class="profileText" style={{left: "125px"}}>HS City:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "127px"}} disabled={this.state.disabled} value={student.high_school_city}></input>
                            </div>
                            <div>
                                <span class="profileText">Residence State:</span>
                                <input type="textfield" class="profilePrompt" disabled={this.state.disabled} value={student.residence_state}></input>
                                <span class="profileText" style={{left: "49px"}}>HS State:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "46px"}} disabled={this.state.disabled} value={student.high_school_state}></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

  export default ViewProfileScreen
