import React from 'react';
//import { connect } from 'react-redux';
//import { compose } from 'redux';
import FilteredCollege from './FilteredCollege.js';
//import { firestoreConnect } from 'react-redux-firebase';

class FilteredCollegesList extends React.Component {
  render() {
    console.log('IN FILTERED COLLEGERS LIST');
    console.log(this.props.declaredColleges);
    return (
      <div className='college-list section'>
        {this.props.colleges.map((college) => {
          let alreadyApplied = false;
          const { declaredColleges } = this.props;
          if (declaredColleges.length !== 0) {
            for (let idx = 0; idx < declaredColleges.length; idx++) {
              if (college.collegeName === declaredColleges[idx]) {
                alreadyApplied = true;
                declaredColleges.splice(idx, 1);
              }
            }
          }
          const { collegeName } = college;
          const key = collegeName;
          return (
            <FilteredCollege
              key={key}
              apply={this.props.apply}
              college={college}
              goAppTracker={this.props.goAppTracker}
              goSimilarStudents={this.props.goSimilarStudents}
              alreadyApplied={alreadyApplied}
            />
          );
        })}
      </div>
    );
  }
}

export default FilteredCollegesList;
