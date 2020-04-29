import React from 'react';

import HighSchool from './HighSchool';
import data from '../test/TestHighSchoolData.json';

class HighSchoolList extends React.Component {
	render() {
		const college = this.props.college;
		return (
			<div className='highschool-list section'>
				{data.highschools.map((highschool) => {
					let key = highschool.key;
					return <HighSchool college={college} key={key} highschool={highschool} />;
				})}
			</div>
		);
	}
}

export default HighSchoolList;
