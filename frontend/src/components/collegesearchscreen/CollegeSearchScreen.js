import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { firestoreConnect } from 'react-redux-firebase';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import Add from '@material-ui/icons/Add';
import Down from '@material-ui/icons/ExpandMore';
import Up from '@material-ui/icons/ExpandLess';
import PropTypes from 'prop-types';

import FilteredCollegesList from './FilteredCollegesList.js';
import MajorFiltersList from './MajorFiltersList';

import data from '../test/TestCollegeData.json';

export class CollegeSearchScreen extends Component {
	state = {
		major: '',
		majorIndex: 0,
		majorList: [],
		currentSortType: 'nameUp',
		currentSortIncreasing: true,
		colleges: [],
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
			ebrwLB: '',
			ebrwUB: '',
			actLB: '',
			actUB: '',
			location: '',
			major1: '',
			major2: '',
		},
	};

	goCollegeSearch = () => {
		console.log('college search');
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
		if (this.state.major === '' || this.state.majorList.length === 2) {
			return;
		}

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
	};

	//determines which sorting symbol is shown
	getHidden = (type) => {
		if (this.state.currentSortType === type) return false;
		else return true;
	};

	//generalType is the sort type without direction. ex: type=nameUp, generalType=name
	getGeneralType = (type) => {
		let generalType = type.substring(0, type.length - 2);
		return generalType;
	};

	changeSort = (type) => {
		if (this.getGeneralType(this.state.currentSortType) === type) {
			if (this.state.currentSortIncreasing === true) {
				let newType = type + 'Dn';
				this.setState({ currentSortType: newType });
				this.setState({ currentSortIncreasing: false });
			} else {
				let newType = type + 'Up';
				this.setState({ currentSortType: newType });
				this.setState({ currentSortIncreasing: true });
			}
		} else {
			let newType = type + 'Up';
			this.setState({ currentSortType: newType });
			this.setState({ currentSortIncreasing: true });
		}
	};

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
			<div className='college_screen_container'>
				<div className='schoolsContainer'>
					<div id='collegeListBanner'>
						<div></div>
						<span className='collegeTitleText'> Filtered Colleges </span>
						<span class='sortNameBtn' onClick={this.changeSort.bind(this, 'name')}>
							{' '}
							Name
							<div hidden={this.getHidden('nameUp')}>
								<Up id='nameUp'></Up>
							</div>
							<div hidden={this.getHidden('nameDn')}>
								<Down id='nameDown'></Down>
							</div>
						</span>
						<span class='sortARBtn' onClick={this.changeSort.bind(this, 'AR')}>
							{' '}
							Admission Rate
							<div hidden={this.getHidden('ARUp')}>
								<Up id='ARUp'></Up>
							</div>
							<div hidden={this.getHidden('ARDn')}>
								<Down id='ARDown'></Down>
							</div>
						</span>
						<span class='sortCostBtn' onClick={this.changeSort.bind(this, 'cost')}>
							{' '}
							Cost
							<div hidden={this.getHidden('costUp')}>
								<Up id='costUp'></Up>
							</div>
							<div hidden={this.getHidden('costDn')}>
								<Down id='costDown'></Down>
							</div>
						</span>
						<span class='sortRankBtn' onClick={this.changeSort.bind(this, 'rank')}>
							{' '}
							Rank
							<div hidden={this.getHidden('rankUp')}>
								<Up id='rankUp'></Up>
							</div>
							<div hidden={this.getHidden('rankDn')}>
								<Down id='rankDown'></Down>
							</div>
						</span>
					</div>
					<div id='collegeList'>
						<FilteredCollegesList />
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
							<option value='1'>North East</option>
							<option value='2'>Midwest</option>
							<option value='3'>South</option>
							<option value='3'>West</option>
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
						<button className='searchCollegeBtn' onClick={this.goCollegeSearch}>
							{' '}
							Search Again{' '}
						</button>
						<button className='searchCollegeBtn' onClick={this.goCollegeReccomendation}>
							{' '}
							Reccomend Me Colleges{' '}
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default CollegeSearchScreen;
