import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom'
//import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { firestoreConnect } from 'react-redux-firebase';

import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import PropTypes from 'prop-types';

import StudentCollegesList from './StudentCollegesList.js'

import data from '../test/TestCollegeData.json'

export class StudentScreen extends Component {
    state = 
    {

    }

    goCollegeSearch = () => {
        console.log('college search')
    }

    makeStrict = () => {
        console.log('make strict')
    }


    render() {

        return (
            <div className="student_screen_container">
                <div className='schoolsContainer'>
                    <div id="collegeListBanner">
                        <div></div>
                        <span class="collegeTitleText"> Name </span> 
                        <span class="collegeTitleText"> Location </span> 
                        <span class="collegeTitleText"> Rank </span>
                        <span class="collegeTitleText"> Size </span>
                        <span class="collegeTitleText"> Admission Rate </span>
                    </div>
                    <StudentCollegesList />        
                </div>
                <div className='filtersContainer'>
                    <div className="filtersBanner">
                        <span id='filterHeaderText'>Filters:</span>
                        <form action="#" id='strictBoxLocation'>
                            <p>
                                <label id='strictBox'>
                                    <input type="checkbox" />
                                    <span id="strictText">Strict</span>
                                </label>
                            </p>
                        </form>
                    </div>
                    <div className="admissionRateFilter">
                        <span id='filtersText'>Admission Rate</span>
                        <div>
                            <input type="textfield" className='admissionRate' placeholder="2020" />
                            -
                            <input type="textfield" className='admissionRate' placeholder="2030"/>
                        </div>
                    </div>
                    <div className="costFilter">
                        <span id='filtersText'>Cost of Attendance</span>
                        <div>
                            <input type="textfield" className='cost' placeholder="0" />
                            -
                            <input type="textfield" className='cost' placeholder="100000"/>
                        </div>
                    </div>
                    <div className="rankFilter">
                        <span id='filtersText'>Rank</span>
                        <div>
                            <input type="textfield" className='rank' placeholder="1" />
                            -
                            <input type="textfield" className='rank' placeholder="10000"/>
                        </div>
                    </div>
                    <div className="sizeFilter">
                        <span id='filtersText'>Size</span>
                        <div>
                            <input type="textfield" className='size' placeholder="1" />
                            -
                            <input type="textfield" className='size' placeholder="100000"/>
                        </div>
                    </div>
                    <div>
                        <button id="searchCollegeBtn" onClick={this.goCollegeSearch}> Start college search </button>
                    </div>
                </div>
            </div>
        );
    }
}

  export default StudentScreen
