import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

//import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { firestoreConnect } from 'react-redux-firebase';

import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import Add from '@material-ui/icons/Add';
import PropTypes from 'prop-types';

import StudentCollegesList from './StudentCollegesList.js'

import data from '../test/TestStudentData.json'

export class ViewProfileScreen extends Component {
    state = 
    {
        disabled: true
    }

    getScore(score)
    {
        if(score===-1)
        {
            return "Not taken"
        }
        else return score
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
                                <input type="textfield" class="profilePrompt" style={{left: "134px"}} disabled={this.state.disabled} value={student.high_school_name}></input>
                            </div>
                            <div>
                                <span class="profileText">Name:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "76px"}} disabled={this.state.disabled} value={student.name}></input>
                                <span class="profileText" style={{left: "125px"}}>HS City:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "161px"}} disabled={this.state.disabled} value={student.high_school_city}></input>
                            </div>
                            <div>
                                <span class="profileText">Residence State:</span>
                                <input type="textfield" class="profilePrompt" disabled={this.state.disabled} value={student.residence_state}></input>
                                <span class="profileText" style={{left: "49px"}}>HS State:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "80px"}} disabled={this.state.disabled} value={student.high_school_state}></input>
                            </div>
                            <div>
                                <span class="profileText">Desired major:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "11px"}} disabled={this.state.disabled} value={student.major_1}></input>
                                <span class="profileText" style={{left: "58px"}}>GPA:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "121px"}} disabled={this.state.disabled} value={student.GPA}></input>
                            </div>
                            <div>
                                <span class="profileText">Second major:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "14px"}} disabled={this.state.disabled} value={student.major_2}></input>
                                <span class="profileText" style={{left: "61px"}}>Class:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "120px"}} disabled={this.state.disabled} value={student.college_class}></input>
                            </div>
                        </div>
                        <div>
                            <div id="collegeInfoList">
                                <div id="generalHSHeader">
                                    <span class="profileHeader">Your Applications</span>
                                </div>
                                <StudentCollegesList/>
                            </div>
                        </div>
                        <div id="educationInfoList">
                            <div id="generalHSHeader">
                                <span class="profileHeader">SAT/ACT Scores</span>
                                <span class="profileHeader">AP Scores</span>
                            </div>
                            <div >
                                <span class="profileText">SAT Math:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "41px"}} disabled={this.state.disabled} value={this.getScore(student.SAT_Math)}></input>
                                <span class="profileText" style={{left: "91px"}}>US:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "164px"}} disabled={this.state.disabled} value={this.getScore(student.AP_US_hist)}></input>
                            </div>
                            <div>
                                <span class="profileText">SAT EBRW:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "29px"}} disabled={this.state.disabled} value={this.getScore(student.SAT_EBRW)}></input>
                                <span class="profileText" style={{left: "80px"}}>World:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "127px"}} disabled={this.state.disabled} value={this.getScore(student.AP_World_hist)}></input>
                            </div>
                            <div>
                                <span class="profileText">ACT Math:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "36px"}} disabled={this.state.disabled} value={this.getScore(student.ACT_Math)}></input>
                                <span class="profileText" style={{left: "87px"}}>Math I:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "131px"}} disabled={this.state.disabled} value={this.getScore(student.AP_Math_1)}></input>
                            </div>
                            <div>
                                <span class="profileText">ACT English:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "20px"}} disabled={this.state.disabled} value={this.getScore(student.ACT_English)}></input>
                                <span class="profileText" style={{left: "71px"}}>Math II:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "108px"}} disabled={this.state.disabled} value={this.getScore(student.AP_Math_2)}></input>
                            </div>
                            <div>
                                <span class="profileText">ACT Reading:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "14px"}} disabled={this.state.disabled} value={this.getScore(student.ACT_Reading)}></input>
                                <span class="profileText" style={{left: "65px"}}>Eco Bio:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "103px"}} disabled={this.state.disabled} value={this.getScore(student.AP_Eco_Bio)}></input>
                            </div>
                            <div>
                                <span class="profileText">ACT Literature:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "-1px"}} disabled={this.state.disabled} value={this.getScore(student.ACT_Literature)}></input>
                                <span class="profileText" style={{left: "49px"}}>Molecular Bio:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "37px"}} disabled={this.state.disabled} value={this.getScore(student.AP_Mol_Bio)}></input>
                            </div>
                            <div>
                                <span class="profileText">ACT Science:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "21px"}} disabled={this.state.disabled} value={this.getScore(student.ACT_Science)}></input>
                                <span class="profileText" style={{left: "72px"}}>Chemistry:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "88px"}} disabled={this.state.disabled} value={this.getScore(student.AP_Chemistry)}></input>
                            </div>
                            <div>
                                <span class="profileText">ACT Composite:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "-4px"}} disabled={this.state.disabled} value={this.getScore(student.ACT_Composite)}></input>
                                <span class="profileText" style={{left: "48px"}}>Physics:</span>
                                <input type="textfield" class="profilePrompt" style={{left: "87px"}} disabled={this.state.disabled} value={this.getScore(student.AP_Physics)}></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

  export default ViewProfileScreen