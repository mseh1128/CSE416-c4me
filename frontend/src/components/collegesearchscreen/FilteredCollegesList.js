import React from 'react';
//import { connect } from 'react-redux';
//import { compose } from 'redux';
import FilteredCollege from './FilteredCollege.js';
//import { firestoreConnect } from 'react-redux-firebase';

import data from '../test/TestCollegeData.json';

class FilteredCollegesList extends React.Component {
	render() {
		return (
			<div className='college-list section'>
				{this.props.colleges.map((college) => {
					const { collegeName } = college;
					return (
						<FilteredCollege key={collegeName} college={college} goAppTracker={this.props.goAppTracker} />
					);
				})}
			</div>
		);
	}
}

export default FilteredCollegesList;
