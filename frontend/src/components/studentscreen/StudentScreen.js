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
        //const data = data.colleges;
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
                    <div>
                        <button id="searchCollegeBtn" onClick={this.goCollegeSearch}> Start college search </button>
                    </div>
                    <div>
                        <span id='filtersText'>Filters:</span>
                        <span id='strictText'>Strict filters?</span>
                        <input type="checkbox" id="strictBox" checked={false} onChange={this.makeStrict}/>
                    </div>
                </div>
            </div>
        );
    }
}

  export default StudentScreen
