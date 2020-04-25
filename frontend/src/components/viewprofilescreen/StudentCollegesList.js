import React from 'react';
//import { connect } from 'react-redux';
//import { compose } from 'redux';
import StudentCollege from './StudentCollege';
//import { firestoreConnect } from 'react-redux-firebase';

import data from '../test/TestCollegeData.json';

class StudentCollegesList extends React.Component {
  render() {
    return (
      <div className="college-list-view section">
        {this.props.colleges.map((college, idx) => {
          const { collegeName } = college;
          const key = collegeName;
          return (
            <StudentCollege
              key={key}
              index={idx}
              college={college}
              disabled={this.props.disabled}
              setAcceptanceStatus={this.props.setAcceptanceStatus}
            />
          );
        })}
      </div>
    );
  }
}

export default StudentCollegesList;
