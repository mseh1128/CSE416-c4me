import React, { Component } from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import Add from '@material-ui/icons/Add';
import PropTypes from 'prop-types';

import data from '../test/TestCollegeData.json';
import StudentList from './StudentList';

import HighSchoolFiltersList from './HighSchoolFiltersList';

import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

export class ApplicationTrackerScreen extends Component {
	state = {
			highschool: '',
			highschoolIndex: 0,
			highschoolList: [],
			college: '',
			studentsWhoApplied: [],
			filters: {
				strict: false,
				collegeClassLB: '',
				collegeClassUB: '',
				isAccepted: false,
				isPending: false,
				isWaitListed: false,
				isDeferred: false,
				isDenied: false,
				isWithdrawn: false,
				highschools: [],
			},
		};
/*
	componentDidMount() {
		const { id } = this.props.match.params;
		console.log('id (key) is: ');
		console.log(id);

		const { colleges } = data;
		const college = colleges ? colleges[id] : null;
		this.setState({ college: college });
		// do any fetch api requests here & setState
	}
*/

componentDidMount() {
	const college = this.props.location.state.college;
	const studentsWhoApplied = this.props.location.state.studentsWhoApplied;
	this.setState({college: college});
	this.setState({studentsWhoApplied: studentsWhoApplied});
	console.log(this.state.college);
	console.log(this.state.studentsWhoApplied);

	// do any fetch api requests here & setState
}

	goGraph = () => {
		const { id } = this.props.match.params;
		this.props.history.push('/applicationTracker/' + id + '/graph');
	};

	goCollegeSearch = () => {
		this.props.history.push('/search');
	};

	updateHighschool = () => {
		let newHighschool = document.getElementById('highschool').value;
		this.setState({ highschool: newHighschool });
		console.log(newHighschool);
	};

	addHighschool = () => {
		if (this.state.highschool === '') {
			return;
		}

		let newHighschool = {
			name: this.state.highschool,
			key: this.state.highschoolIndex,
			id: this.state.highschoolIndex,
		};
		this.setState({ highschoolIndex: this.state.highschoolIndex + 1 });
		let newList = this.state.highschoolList;
		newList.push(newHighschool);
		this.setState({ highschoolList: newList });
		this.setState({ highschool: '' });
		document.getElementById('highschool').value = '';

		//updates the filters state with the new majors
		let newFilters = this.state.filters;
		newFilters.highschools = this.state.highschoolList.map((item) => item.name);
		this.setState({ filters: newFilters });
	};

	deleteHighschool = (key) => {
		let newList = this.state.highschoolList.filter((item) => item.key !== key);
		this.setState({ highschoolList: newList });

		//updates the filters state with the new majors
		let newFilters = this.state.filters;
		newFilters.highschools = newList.map((item) => item.name);
		this.setState({ filters: newFilters });
		console.log(this.state.filters);
	};

	handleChange = (e) => {
		const { target } = e;
		let newFilters = this.state.filters;
		const id = target.id;
		newFilters[id] = target.value;
		if (newFilters[id] === 'on') {
			newFilters[id] = target.checked;
		}
		this.setState({ filters: newFilters });
		console.log(this.state.filters);
	};

	getPercent = (type, amount) => {
		if (type == 'math') {
			return (amount / 800) * 100;
		}
		if (type == 'ebrw') {
			return (amount / 800) * 100;
		}
		if (type == 'act') {
			return (amount / 36) * 100;
		}
		if (type == 'gpa') {
			return (amount / 4.0) * 100;
		}
	};

	render() {
		var elem = document.querySelector('.tabs');
		var options = {};
		var instance = M.Tabs.init(elem, options);

		document.addEventListener('DOMContentLoaded', function () {
			var elems = document.querySelectorAll('select');
			var instances = M.FormSelect.init(elems, options);
		});

		//const college = this.state.college;
		const college = this.props.location.state.college;
		const studentsWhoApplied = this.props.location.state.studentsWhoApplied;

		let theme = {
			math: {
				symbol: '‍800',
				color: 'rgb(223, 105, 180)',
			},
			EBRW: {
				symbol: '800',
				color: 'rgb(153, 105, 180)',
			},
			ACT: {
				symbol: '36',
				color: 'rgb(23, 105, 180)',
			},
			gpa: {
				symbol: '4.0',
				color: 'rgb(23, 145, 10)',
			},
		};

		return (
			<div className='tracker_screen_container'>
				<div className='schoolsContainer'>
					<div id='studentListBanner'>
						<div></div>
						<span className='collegeTitleText'> Application Tracker:</span>
						<span className='collegeTitleText'>{college.collegeName}</span>
					</div>
					<div id='studentList'>
						<StudentList
							college={college}
							students={studentsWhoApplied}>
						</StudentList>
					</div>
				</div>
				<div className='trackerFiltersContainer'>
					<div className='filtersBanner'>
						<span id='filterHeaderText'>Filters:</span>
						<form action='#' id='strictBoxLocation'>
							<p>
								<label id='strictBox'>
									<input type='checkbox' id='strict' onChange={this.handleChange} />
									<span id='strictText'>Strict</span>
								</label>
							</p>
						</form>
					</div>
					<div className='collegeClassFilter'>
						<span id='filtersText'>College Class</span>
						<div>
							<input
								type='textfield'
								className='collegeClass'
								placeholder='2020'
								id='collegeClassLB'
								onChange={this.handleChange}
							/>
							-
							<input
								type='textfield'
								className='collegeClass'
								placeholder='2030'
								id='collegeClassUB'
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className='appStatusFilter'>
						<span id='filtersText'>Application Status</span>
						<form action='#' id='acceptedBoxLocation'>
							<p>
								<label id='acceptedBox'>
									<input type='checkbox' id='isAccepted' onChange={this.handleChange} />
									<span id='strictText'>Accepted</span>
								</label>
							</p>
						</form>
						<form action='#' id='pendingBoxLocation'>
							<p>
								<label id='pendingBox'>
									<input type='checkbox' id='isPending' onChange={this.handleChange} />
									<span id='strictText'>Pending</span>
								</label>
							</p>
						</form>
						<form action='#' id='wait-listedBoxLocation'>
							<p>
								<label id='wait-listedBox'>
									<input type='checkbox' id='isWaitListed' onChange={this.handleChange} />
									<span id='strictText'>Wait-listed</span>
								</label>
							</p>
						</form>
						<form action='#' id='deferredBoxLocation'>
							<p>
								<label id='deferredBox'>
									<input type='checkbox' id='isDeferred' onChange={this.handleChange} />
									<span id='strictText'>Deferred</span>
								</label>
							</p>
						</form>
						<form action='#' id='deniedBoxLocation'>
							<p>
								<label id='deniedBox'>
									<input type='checkbox' id='isDenied' onChange={this.handleChange} />
									<span id='strictText'>Denied</span>
								</label>
							</p>
						</form>
						<form action='#' id='withdrawnBoxLocation'>
							<p>
								<label id='withdrawnBox'>
									<input type='checkbox' id='isWithdrawn' onChange={this.handleChange} />
									<span id='strictText'>Withdrawn</span>
								</label>
							</p>
						</form>
					</div>
					<div id='highschoolFilterContainer'>
						<div className='input-field' id='highschoolFilter'>
							<input
								id='highschool'
								type='text'
								onChange={this.updateHighschool.bind(this)}
							></input>
							<label htmlFor='highschool'>Applicants Highschool</label>
						</div>
						<a
							className='btn-floating btn-large waves-effect waves-light blue'
							id='enterHighschoolBtn'
							onClick={this.addHighschool.bind(this.self)}
						>
							<Add></Add>
						</a>
					</div>
					<div id='chosenHSContainer'>
						<HighSchoolFiltersList
							highschools={this.state.highschoolList}
							deleteHighschool={this.deleteHighschool}
						/>
					</div>
					<div>
						<button className='searchCollegeBtn' onClick={this.goCollegeSearch}>
							{' '}
							Back to college search{' '}
						</button>
					</div>
					<div id='trackerStatContainer'>
						<div className='filtersBanner'>
							<span id='filterStatsText'>Stats of accepted students</span>
						</div>
						<div className='acceptedGPA1'>
							{'Average GPA: '}
							<span className='acceptedGPA2'>{3.6}</span>
						</div>
						<div className='acceptedGPAScore'>
							<span className='acceptedText'>0</span>
							<Progress
								className='mathBar'
								percent={this.getPercent('gpa', 3.6)}
								status='gpa'
								theme={theme}
							/>
						</div>
						<div className='acceptedMath1'>
							{'Average Math SAT Score: '}
							<span className='acceptedMath2'>{600}</span>
						</div>
						<div className='acceptedMathScore'>
							<span className='acceptedText'>0</span>
							<Progress
								className='mathBar'
								percent={this.getPercent('math', 600)}
								status='math'
								theme={theme}
							/>
						</div>
						<div className='acceptedEBRW1'>
							{'Average Math SAT Score: '}
							<span className='acceptedEBRW2'>{650}</span>
						</div>
						<div className='acceptedEBRWScore'>
							<span className='acceptedText'>0</span>
							<Progress
								className='mathBar'
								percent={this.getPercent('ebrw', 650)}
								status='EBRW'
								theme={theme}
							/>
						</div>
						<div className='acceptedACT1'>
							{'Average Math SAT Score: '}
							<span className='acceptedACT2'>{30}</span>
						</div>
						<div className='acceptedACTScore'>
							<span className='acceptedText'>0</span>
							<Progress
								className='mathBar'
								percent={this.getPercent('act', 30)}
								status='ACT'
								theme={theme}
							/>
						</div>
						<button id='graphBtn' onClick={this.goGraph}>
							{' '}
							See Graph{' '}
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default ApplicationTrackerScreen;
