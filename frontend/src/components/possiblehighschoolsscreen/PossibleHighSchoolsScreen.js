import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import M from 'materialize-css';
import PropTypes from 'prop-types';
import axios from 'axios';
import HighSchoolList from './HighSchoolList';
import Undo from '@material-ui/icons/Undo';

export class PossibleHighSchoolsScreen extends Component {
	state = {
		componentFinishedLoad: false,
		college: '',
		highschools: [],
	};

	goBack = async () => {
		//const { id } = this.props.match.params;

		console.log(this.state);

		let queryStudentsDecisions = '';
		const id = this.state.college.collegeName;
		console.log(id);
		try {
			queryStudentsDecisions = await axios.get('/retrieveStudentsDecisions', {
				params: {
					collegeName: id,
				},
			});

			this.props.history.push({
				pathname: '/applicationTracker/' + id,
				state: {
					college: this.state.college,
					studentsWhoApplied: queryStudentsDecisions.data,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	getName = (name) => {
		if (name.length > 60) {
			let tempName = name.substring(0, 59) + '...';
			return tempName;
		} else return name;
	};

	componentDidMount = async () => {
		const college = this.props.location.state.college;
		const highschoolName = this.props.location.state.highschoolName;
		this.setState({ college: college });
		console.log(college);
		console.log('in here');
		try {
			const potentialHighSchools = await axios.get('/getHighSchoolFromName', {
				params: {
					highSchoolName: highschoolName,
				},
			});
			console.log(potentialHighSchools);
			this.setState({ highschools: potentialHighSchools.data });
		} catch (err) {
			console.log(err);
		}

		this.setState({ componentFinishedLoad: true });
	};

	render() {
		var elem = document.querySelector('.tabs');
		var options = {};
		var instance = M.Tabs.init(elem, options);

		document.addEventListener('DOMContentLoaded', function () {
			var elems = document.querySelectorAll('select');
			var instances = M.FormSelect.init(elems, options);
		});

		if (!this.state.componentFinishedLoad) {
			return <div>Loading...</div>;
		}

		return (
			<div className='similar_HSscreen_container'>
				<div className='schoolsContainer'>
					<div id='hsBanner'>
						<div></div>
						<span className='collegeTitleText'>Specify the Highschool: </span>
						<div></div>
						<button className='profileButton' onClick={this.goBack}>
							{' '}
							<Undo id='profileButtonSymbols' />{' '}
						</button>
						<div />
					</div>
					<div id='similarHighSchoolsList'>
						<HighSchoolList
							college={this.state.college}
							highschools={this.state.highschools}
						></HighSchoolList>
					</div>
				</div>
			</div>
		);
	}
}

export default PossibleHighSchoolsScreen;
