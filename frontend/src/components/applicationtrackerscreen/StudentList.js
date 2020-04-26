import React from 'react';
import Student from './Student';

class StudentList extends React.Component {
	render() {
		return (
			<div className='student-list section'>
				{this.props.students.map((student) => {
					let key = { userID: -1, college: this.props.collegeName };
					const { userID } = student.userID;
					key.userID = userID;
					return <Student college={this.props.college} key={key} student={student} />;
				})}
			</div>
		);
	}
}

export default StudentList;
