import React from 'react';
//import { connect } from 'react-redux';
//import { compose } from 'redux';
import FilteredCollege from './FilteredCollege.js';
//import { firestoreConnect } from 'react-redux-firebase';

class FilteredCollegesList extends React.Component {
  render() {
    console.log('in filtered college list, props are');
    console.log(this.props.colleges[0]);
    return (
      <div className="college-list section">
        {this.props.colleges.map((college) => {
          const { collegeName } = college;
          const key = collegeName;
          return (
            <FilteredCollege
              key={key}
              college={college}
              goAppTracker={this.props.goAppTracker}
            />
          );
        })}
      </div>
    );
  }
}

export default FilteredCollegesList;
