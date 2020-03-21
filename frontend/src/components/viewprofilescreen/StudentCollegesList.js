import React from 'react';
//import { connect } from 'react-redux';
//import { compose } from 'redux';
import StudentCollege from './StudentCollege';
//import { firestoreConnect } from 'react-redux-firebase';

import data from '../test/TestCollegeData.json'

class StudentCollegesList extends React.Component {
    render() {

        const disabled = this.props.disabled

        return (
            <div className="college-listProfile">
                { data.colleges.map(function(college) {
                    college.id = college.key;
                    return (
                        <StudentCollege college={college} disabled={disabled}/>
                    );})
                }
            </div>
        );
    }
}

export default StudentCollegesList