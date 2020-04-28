import React from 'react';

import HighSchoolItem from './HighSchoolItem';

class HighSchoolFiltersList extends React.Component {
	render() {
		const college = this.props.college;
		const highschools = this.props.highschools;
		const deleteHighschool = this.props.deleteHighschool;
		const goSimilarHighSchools = this.props.goSimilarHighSchools;

		return (
			<div className='highschoolListBox'>
				{highschools.map(function (highschool) {
					highschool.id = highschool.key;
					const { key } = highschool.key;
					return (
						<HighSchoolItem
							key={key}
							college={college}
							highschool={highschool}
							goSimilarHighSchools={goSimilarHighSchools}
							deleteHighschool={deleteHighschool}
						/>
					);
				})}
			</div>
		);
	}
}

export default HighSchoolFiltersList;
