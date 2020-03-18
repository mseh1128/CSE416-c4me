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
                            <span class="profileHeader">General</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

  export default ViewProfileScreen
