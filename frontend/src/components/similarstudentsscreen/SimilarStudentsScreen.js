import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import M from 'materialize-css';
import Undo from '@material-ui/icons/Undo';
import PropTypes from 'prop-types';
import axios from 'axios';

import StudentsList from './StudentsList.js';

export class SimilarStudentsScreen extends Component {
	state = {
		students: '',
		componentFinishedLoad: false,
	};

	goBack = () => {
		this.props.history.push('/search');
	};

	componentDidMount = () => {
		let students = this.props.location.state.similarStudents;
		this.setState({ students: students, componentFinishedLoad: true });

		/*let s = Promise.all(
			students.map((student) => {
			  return new Promise((resolve, reject) => {
				axios.get('/getStudentInfo', {
					params: { student.value },
				})
		})}));*/
	};

	render() {
		var elem = document.querySelector('.tabs');
		var options = {};
		var instance = M.Tabs.init(elem, options);

		document.addEventListener('DOMContentLoaded', function () {
			var elems = document.querySelectorAll('select');
			var instances = M.FormSelect.init(elems, options);
		});

		if (
			this.state.students === undefined ||
			(this.state.students.length == 0 && !this.state.componentFinishedLoad)
		) {
			return <div>Loading...</div>;
		}
		console.log(this.state.students);

		return (
			<div className='similar_screen_container'>
				<div className='schoolsContainer'>
					<div id='otherProfileBanner'>
						<div></div>
						<span className='collegeTitleText'>Similar Students: </span>
						<button className='profileButton' onClick={this.goBack}>
							{' '}
							<Undo id='profileButtonSymbols' />{' '}
						</button>
						<div />
					</div>
					<div id='similarStudentsList'>
						<StudentsList students={this.state.students} />
					</div>
				</div>
			</div>
		);
	}
}

export default SimilarStudentsScreen;
