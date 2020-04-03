import React, { Component } from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import Add from '@material-ui/icons/Add';
import PropTypes from 'prop-types';

import data from '../test/TestCollegeData.json';
import StudentList from './StudentList';

import HighSchoolFiltersList from './HighSchoolFiltersList';

export class ApplicationTrackerScreen extends Component {
	state = {
		highschool: '',
		highschoolIndex: 0,
		highschoolList: [],
		college: '',
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

	componentDidMount() {
		const { id } = this.props.match.params;
		console.log('id (key) is: ');
		console.log(id);

		const { colleges } = data;
		const college = colleges ? colleges[id] : null;
		this.setState({ college: college });
		// do any fetch api requests here & setState
	}

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

	render() {
		var elem = document.querySelector('.tabs');
		var options = {};
		var instance = M.Tabs.init(elem, options);

		document.addEventListener('DOMContentLoaded', function () {
			var elems = document.querySelectorAll('select');
			var instances = M.FormSelect.init(elems, options);
		});

		const college = this.state.college;

		return (
			<div className='tracker_screen_container'>
				<div className='schoolsContainer'>
					<div id='studentListBanner'>
						<div></div>
						<span className='collegeTitleText'> Application Tracker:</span>
						<span className='collegeTitleText'>{college.name}</span>
					</div>
					<div id='studentList'>
						<StudentList></StudentList>
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
				</div>
			</div>
		);
	}
}

export default ApplicationTrackerScreen;
