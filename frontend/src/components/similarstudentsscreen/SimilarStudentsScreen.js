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
		console.log('in componentdidmount for similar students screen');
		const students = this.props.location.state.similarStudents;

		Promise.all(
			students.map((userID) => {
				return axios.get('/getStudentInfo', {
					params: { userID },
				});
			})
		)
			.then((results) => {
				const resultsArr = results.map(({ data }) => data[0]);
				for (let x = 0; x < resultsArr.length; x = x + 1) {
					resultsArr[x].userID = students[x];
				}
				console.log(resultsArr);
				this.setState({ students: resultsArr, componentFinishedLoad: true });
			})
			.catch((err) => {
				console.log(err);
				alert(err);
			});
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
		const collegeName = this.props.match.params.id;

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
						<StudentsList students={this.state.students} collegeName={collegeName} />
					</div>
				</div>
			</div>
		);
	}
}

export default SimilarStudentsScreen;
