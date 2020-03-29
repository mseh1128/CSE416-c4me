import React from "react";
//import { connect } from 'react-redux';
//import { compose } from 'redux';
import StudentCollege from "./StudentCollege";
//import { firestoreConnect } from 'react-redux-firebase';

import data from "../test/TestCollegeData.json";

class StudentCollegesList extends React.Component {
  render() {
    return (
      <div className='college-list section'>
        {data.colleges.map(college => {
          const { key } = college;
          return <StudentCollege key={key} college={college} />;
        })}
      </div>
    );
  }
}

export default StudentCollegesList;
