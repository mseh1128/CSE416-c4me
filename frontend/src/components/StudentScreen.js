import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom'
//import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { firestoreConnect } from 'react-redux-firebase';

import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import PropTypes from 'prop-types';



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
                    <span>list colleges</span>
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
