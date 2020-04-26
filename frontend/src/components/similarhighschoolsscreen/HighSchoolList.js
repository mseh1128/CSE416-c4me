import React from 'react';

import HighSchool from './HighSchool';
import data from '../test/TestHighSchoolData.json';

class HighSchoolList extends React.Component {
	render() {
		return (
			<div className='highschool-list section'>
				{data.highschools.map((highschool) => {
					let key = highschool.key;
					return <HighSchool key={key} highschool={highschool} />;
				})}
			</div>
		);
	}
}

export default HighSchoolList;
