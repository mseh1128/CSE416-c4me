import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import Add from '@material-ui/icons/Add';
import PropTypes from 'prop-types';

import StudentCollegesList from './StudentCollegesList.js';
import MajorFiltersList from './MajorFiltersList';

import data from '../test/TestCollegeData.json';

import axios from 'axios';

export class StudentScreen extends Component {
	state = {
		major: '',
		majorIndex: 0,
		majorList: [],

		filters: {
			strict: false,
			name: '',
			admissionRateLB: '',
			admissionRateUB: '',
			costLB: '',
			costUB: '',
			rankLB: '',
			rankUB: '',
			sizeLB: '',
			sizeUB: '',
			mathLB: '',
			mathUB: '',
			ebrwLB: '',
			ebrwUB: '',
			actLB: '',
			actUB: '',
			location: '',
			major1: '',
			major2: '',
		},
	};

	goCollegeSearch = async() => {
		//let response = "Placeholder until response is changed."

		const filters = this.state.filters;

		try{
			let response = '';
			if (filters.strict === true){
				response = await axios.get('/getStrictFilteredColleges', {
					params: {
						strict: filters.strict,
						name: filters.name,
						admissionRateLB: filters.admissionRateLB,
						admissionRateUB: filters.admissionRateUB,
						costLB: filters.costLB,
						costUB: filters.costUB,
						rankLB: filters.rankLB,
						rankUB: filters.rankUB,
						sizeLB: filters.sizeLB,
						sizeUB: filters.sizeUB,
						ebrwLB: filters.ebrwLB,
						ebrwUB: filters.ebrwUB,
						actLB: filters.actLB,
						actUB: filters.actUB,
						location: filters.location,
						major1: filters.major1,
						major2: filters.major2
					}
				});
			}
			else{
				response = await axios.get('/getLaxFilteredColleges', {
					params: {
						strict: filters.strict,
						name: filters.name,
						admissionRateLB: filters.admissionRateLB,
						admissionRateUB: filters.admissionRateUB,
						costLB: filters.costLB,
						costUB: filters.costUB,
						rankLB: filters.rankLB,
						rankUB: filters.rankUB,
						sizeLB: filters.sizeLB,
						sizeUB: filters.sizeUB,
						mathLB: filters.mathLB,
						mathUB: filters.mathUB,
						ebrwLB: filters.ebrwLB,
						ebrwUB: filters.ebrwUB,
						actLB: filters.actLB,
						actUB: filters.actUB,
						location: filters.location,
						major1: filters.major1,
						major2: filters.major2
					}
				});
			}
			console.log(response);

			/*
			this.props.history.push('/search', {
				filters: filters,
				colleges: response
			});
			*/
			this.props.history.push('/search');
		} catch (err) {
			const {
				response: {data, status}
			} = err;
			console.log(err);
			const unknownErrorText = `An unknown error with error code ${status} occurred`;
			console.log(unknownErrorText);
		}

	};

	makeStrict = () => {
		console.log('make strict');
	};

	updateMajor = () => {
		let newMajor = document.getElementById('major').value;
		this.setState({ major: newMajor });
		console.log(newMajor);
	};

	addMajor = () => {
		if (this.state.major === '' || this.state.majorList.length === 2) return;

		let newMajor = {
			name: this.state.major,
			key: this.state.majorIndex,
			id: this.state.majorIndex,
		};
		this.setState({ majorIndex: this.state.majorIndex + 1 });
		let newList = this.state.majorList;
		newList.push(newMajor);
		this.setState({ majorList: newList });
		this.setState({ major: '' });
		document.getElementById('major').value = '';

		//updates the filters state with the new majors
		let newFilters = this.state.filters;
		if (this.state.majorList[0] !== undefined) {
			newFilters.major1 = this.state.majorList[0].name;
		}
		if (this.state.majorList[1] !== undefined) {
			newFilters.major2 = this.state.majorList[1].name;
		}
		this.setState({ filters: newFilters });
	};

	deleteMajor = (key) => {
		let newList = this.state.majorList.filter((item) => item.key !== key);
		this.setState({ majorList: newList });

		let newFilters = this.state.filters;
		newFilters.highschools = newList;
		this.setState({ filters: newFilters });
		console.log(this.state.filters);
	};

	//updates the filter state whenever a filter updates
	handleChange = (e) => {
		const { target } = e;
		let newFilters = this.state.filters;
		const id = target.id;
		newFilters[id] = target.value;
		newFilters.strict = document.getElementById('strict').checked;
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

		return (
			<div className='student_screen_container'>
				<div className='schoolsContainer'>
					<div id='collegeListBanner'>
						<div></div>
						<span className='collegeTitleText'> Your Applied Colleges </span>
					</div>
					<div id='collegeList'>
						<StudentCollegesList />
					</div>
				</div>
				<div className='filtersContainer'>
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
					<div className='input-field' id='nameFilter'>
						<input id='name' type='text' onChange={this.handleChange}></input>
						<label htmlFor='name'>College Name</label>
					</div>
					<div className='admissionRateFilter'>
						<span id='filtersText'>Admission Rate</span>
						<div>
							<input
								type='textfield'
								className='admissionRate'
								id='admissionRateLB'
								placeholder='0%'
								onChange={this.handleChange}
							/>
							-
							<input
								type='textfield'
								className='admissionRate'
								id='admissionRateUB'
								placeholder='100%'
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className='costFilter'>
						<span id='filtersText'>Cost of Attendance</span>
						<div>
							<input
								type='textfield'
								className='cost'
								id='costLB'
								placeholder='0'
								onChange={this.handleChange}
							/>
							-
							<input
								type='textfield'
								className='cost'
								id='costUB'
								placeholder='100000'
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className='rankFilter'>
						<span id='filtersText'>Rank</span>
						<div>
							<input
								type='textfield'
								className='rank'
								id='rankLB'
								placeholder='1'
								onChange={this.handleChange}
							/>
							-
							<input
								type='textfield'
								className='rank'
								id='rankUB'
								placeholder='10000'
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className='sizeFilter'>
						<span id='filtersText'>Size</span>
						<div>
							<input
								type='textfield'
								className='size'
								id='sizeLB'
								placeholder='1'
								onChange={this.handleChange}
							/>
							-
							<input
								type='textfield'
								className='size'
								id='sizeUB'
								placeholder='100000'
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className='scoreFilter'>
						<span id='filtersText'>Average Math Score</span>
						<div>
							<input
								type='textfield'
								className='score'
								id='mathLB'
								placeholder='1'
								onChange={this.handleChange}
							/>
							-
							<input
								type='textfield'
								className='score'
								id='mathUB'
								placeholder='800'
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className='scoreFilter'>
						<span id='filtersText'>Average EBRW Score</span>
						<div>
							<input
								type='textfield'
								className='score'
								id='ebrwLB'
								placeholder='1'
								onChange={this.handleChange}
							/>
							-
							<input
								type='textfield'
								className='score'
								id='ebrwUB'
								placeholder='800'
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className='scoreFilter'>
						<span id='filtersText'>Average ACT Score</span>
						<div>
							<input
								type='textfield'
								className='score'
								id='actLB'
								placeholder='1'
								onChange={this.handleChange}
							/>
							-
							<input
								type='textfield'
								className='score'
								id='actUB'
								placeholder='36'
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className='input-field col s12' id='locationFilter'>
						<select className='browser-default' id='location' onChange={this.handleChange}>
							<option value='' defaultValue>
								Choose a Location
							</option>
							<option value='Northeast'>Northeast</option>
							<option value='MidWest'>Midwest</option>
							<option value='South'>South</option>
							<option value='West'>West</option>
						</select>
					</div>
					<div id='majorFilterContainer'>
						<div className='input-field' id='majorFilter'>
							<input id='major' type='text' onChange={this.updateMajor.bind(this)}></input>
							<label htmlFor='major'>Two Desired Majors</label>
						</div>
						<a
							className='btn-floating btn-large waves-effect waves-light blue'
							id='enterMajorBtn'
							onClick={this.addMajor.bind(this.self)}
						>
							<Add></Add>
						</a>
					</div>
					<div id='chosenMajorContainer'>
						<MajorFiltersList majors={this.state.majorList} deleteMajor={this.deleteMajor} />
					</div>
					<div>
						<button id='searchCollegeBtn' onClick={this.goCollegeSearch}>
							{' '}
							Start college search{' '}
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default StudentScreen;
/*
<div id="collegeListBanner">
  <div></div>
  <span className="collegeTitleText"> Name </span>
  <span className="collegeTitleText"> Location </span>
  <span className="collegeTitleText"> Rank </span>
  <span className="collegeTitleText"> Size </span>
  <span className="collegeTitleText"> Admission Rate </span>
</div>*/
