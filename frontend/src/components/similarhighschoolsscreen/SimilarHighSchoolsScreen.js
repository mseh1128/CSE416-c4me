import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import M from 'materialize-css';
import Undo from '@material-ui/icons/Undo';
import PropTypes from 'prop-types';
import axios from 'axios';
import HighSchoolList from './HighSchoolList';

export class SimilarHighSchoolsScreen extends Component {
	state = {
		componentFinishedLoad: false,
		college: [],
		highschool: [],
		similarHighSchools: [],
	};

	goBack = async () => {
		//const { id } = this.props.match.params;

		console.log(this.state);

		let queryStudentsDecisions = '';
		const id = this.state.college.collegeName;
		//console.log(id);
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
		this.setState({ college: college });
		const highschool = this.props.location.state.highschool;
		this.setState({ highschool: highschool });

		console.log('here');
		console.log(highschool);
		try {
			const similarHighSchools = await axios.get('/getHighSchoolSimilarities', {
				params: {
					highSchoolName: highschool.highSchoolName,
					highSchoolState: highschool.highSchoolState,
					highSchoolCity: highschool.highSchoolCity,
				},
			});
			console.log(similarHighSchools.data);
			console.log('here');
			this.setState({ highschools: similarHighSchools.data });
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

		if (false) {
			return <div>Loading...</div>;
		}

		const highschoolName = this.props.match.params.hsName;
		console.log(this.state);

		return (
			<div className='similar_HSscreen_container'>
				<div className='schoolsContainer'>
					<div id='hsBanner'>
						<div></div>
						<span className='collegeTitleText'>Similar HighSchools: </span>
						<span className='collegeTitleText'>{this.getName(highschoolName)}</span>
						<button className='profileButton' onClick={this.goBack}>
							{' '}
							<Undo id='profileButtonSymbols' />{' '}
						</button>
						<div />
					</div>
					<div id='similarHighSchoolsList'>
						<HighSchoolList></HighSchoolList>
					</div>
				</div>
			</div>
		);
	}
}

export default SimilarHighSchoolsScreen;
