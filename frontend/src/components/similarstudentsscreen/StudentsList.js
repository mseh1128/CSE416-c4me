import React from 'react';
import Student from './Student';

import data from '../test/TestStudentData.json';

class StudentList extends React.Component {
	render() {
		return (
			<div className='student-list-similar section'>
				{this.props.students.map((student) => {
					let key = { userID: -1 };
					const { userID } = student.userID;
					key.userID = userID;
					return <Student collegeName={this.props.collegeName} key={key} student={student} />;
				})}
			</div>
		);
	}
}

export default StudentList;
