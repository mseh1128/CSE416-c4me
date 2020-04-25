import React from 'react';
//import { connect } from 'react-redux';
//import { compose } from 'redux';
import FilteredCollege from './FilteredCollege.js';
//import { firestoreConnect } from 'react-redux-firebase';

class FilteredCollegesList extends React.Component {
	render() {
		return (
			<div className='college-list section'>
				{this.props.colleges.map((college) => {
					let check = true;
					for (let x = 0; x < this.props.declaredColleges.length; x++) {
						if (college.collegeName === this.props.declaredColleges[x]) {
							check = false;
						}
					}
					if (check) {
						const { collegeName } = college;
						const key = collegeName;
						return (
							<FilteredCollege
								key={key}
								college={college}
								goAppTracker={this.props.goAppTracker}
								goSimilarStudents={this.props.goSimilarStudents}
							/>
						);
					}
				})}
			</div>
		);
	}
}

export default FilteredCollegesList;
