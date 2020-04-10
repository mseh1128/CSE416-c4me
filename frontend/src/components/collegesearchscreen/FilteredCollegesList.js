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
				{data.colleges.map((college) => {
					const { key } = college;
					return (
						<FilteredCollege key={key} college={college} goAppTracker={this.props.goAppTracker} />
					);
				})}
			</div>
		);
	}
}

export default FilteredCollegesList;
