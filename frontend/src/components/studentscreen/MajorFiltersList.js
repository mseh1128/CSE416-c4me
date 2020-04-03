import React from 'react';
//import { connect } from 'react-redux';
//import { compose } from 'redux';
import StudentCollege from './StudentCollege';
//import { firestoreConnect } from 'react-redux-firebase';

import data from '../test/TestCollegeData.json';
import MajorItem from './MajorItem';

class MajorFiltersList extends React.Component {
	render() {
		const majors = this.props.majors;
		const deleteMajor = this.props.deleteMajor;

		return (
			<div className='majorListBox'>
				{majors.map(function (major) {
					major.id = major.key;
					const { key } = major.key;
					return <MajorItem key={key} major={major} deleteMajor={deleteMajor} />;
				})}
			</div>
		);
	}
}

export default MajorFiltersList;
