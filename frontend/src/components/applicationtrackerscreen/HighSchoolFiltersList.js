import React from 'react';

import HighSchoolItem from './HighSchoolItem';

class HighSchoolFiltersList extends React.Component {
	render() {
		const highschools = this.props.highschools;
		const deleteHighschool = this.props.deleteHighschool;

		return (
			<div className='highschoolListBox'>
				{highschools.map(function (highschool) {
					highschool.id = highschool.key;
					const { key } = highschool.key;
					return (
						<HighSchoolItem key={key} highschool={highschool} deleteHighschool={deleteHighschool} />
					);
				})}
			</div>
		);
	}
}

export default HighSchoolFiltersList;
