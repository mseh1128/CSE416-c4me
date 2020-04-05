import React from 'react';
import Student from './Student';

import data from '../test/TestStudentData.json';

class StudentList extends React.Component {
	render() {
		return (
			<div className='student-list section'>
				{data.students.map((student) => {
					const { key } = student.key;
					return <Student college={this.props.college} key={key} student={student} />;
				})}
			</div>
		);
	}
}

export default StudentList;
