import React, { Component } from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import Add from '@material-ui/icons/Add';
import PropTypes from 'prop-types';

import data from '../test/TestCollegeData.json';
import StudentList from './StudentList';

import HighSchoolFiltersList from './HighSchoolFiltersList';
import ApplicationGraph from './ApplicationGraph';

import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

import { Range, getTrackBackground } from 'react-range';

import { sliderConfig } from '../../helpers/constants';
const { collegeClass } = sliderConfig;

export class ApplicationTrackerScreen extends Component {
	state = {
		highschool: '',
		highschoolIndex: 0,
		highschoolList: [],
		college: '',
		studentsWhoApplied: [],
		filters: {
			strict: false,
			collegeClassValues: [2016, 2030],
			isAccepted: false,
			isPending: false,
			isWaitListed: false,
			isDeferred: false,
			isDenied: false,
			isWithdrawn: false,
			highschools: [],
		},
		onGraph: false,
	};

	componentDidMount() {
		const college = this.props.location.state.college;
		const studentsWhoApplied = this.props.location.state.studentsWhoApplied;
		this.setState({ college: college });
		this.setState({ studentsWhoApplied: studentsWhoApplied });
		console.log(this.state.college);
		console.log(this.state.studentsWhoApplied);

		// do any fetch api requests here & setState
	}

	switchGraph = () => {
		let bool = !this.state.onGraph;
		this.setState({ onGraph: bool });

		if (bool) {
			document.getElementById('graphBtn').innerHTML = 'See Students';
		} else {
			document.getElementById('graphBtn').innerHTML = 'See Graph';
		}
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

	getAvgGPA = () => {
		let students = this.state.studentsWhoApplied;
		console.log(students);
		let sum = 0;
		let num = 0;
		students.forEach((student) => {
			if (student.highSchoolGPA !== null) {
				sum = sum + student.highSchoolGPA;
				num = num + 1;
			}
		});
		let avg = sum / num;
		return Math.floor(avg * 10) / 10;
	};

	getAvgAcceptedGPA = () => {
		let students = this.state.studentsWhoApplied;
		console.log(students);
		let sum = 0;
		let num = 0;
		students.forEach((student) => {
			if (student.highSchoolGPA !== null && student.acceptanceStatus === 'accepted') {
				sum = sum + student.highSchoolGPA;
				num = num + 1;
			}
		});
		let avg = sum / num;
		return Math.floor(avg * 10) / 10;
	};

	getAvgSATMath = () => {
		let students = this.state.studentsWhoApplied;
		let sum = 0;
		let num = 0;
		students.forEach((student) => {
			if (student.SATMath !== null) {
				sum = sum + student.SATMath;
				num = num + 1;
			}
		});
		let avg = sum / num;
		return Math.floor(avg);
	};

	getAvgAcceptedSATMath = () => {
		let students = this.state.studentsWhoApplied;
		let sum = 0;
		let num = 0;
		students.forEach((student) => {
			if (student.SATMath !== null && student.acceptanceStatus === 'accepted') {
				sum = sum + student.SATMath;
				num = num + 1;
			}
		});
		let avg = sum / num;
		return Math.floor(avg);
	};

	getAvgSATEBRW = () => {
		let students = this.state.studentsWhoApplied;
		let sum = 0;
		let num = 0;
		students.forEach((student) => {
			if (student.SATEBRW !== null) {
				sum = sum + student.SATEBRW;
				num = num + 1;
			}
		});
		let avg = sum / num;
		return Math.floor(avg);
	};

	getAvgAcceptedSATEBRW = () => {
		let students = this.state.studentsWhoApplied;
		let sum = 0;
		let num = 0;
		students.forEach((student) => {
			if (student.SATEBRW !== null && student.acceptanceStatus === 'accepted') {
				sum = sum + student.SATEBRW;
				num = num + 1;
			}
		});
		let avg = sum / num;
		return Math.floor(avg);
	};

	getAvgACT = () => {
		let students = this.state.studentsWhoApplied;
		let sum = 0;
		let num = 0;
		students.forEach((student) => {
			if (student.ACTComp !== null) {
				sum = sum + student.ACTComp;
				num = num + 1;
			}
		});
		let avg = sum / num;
		return Math.floor(avg);
	};

	getAvgAcceptedACT = () => {
		let students = this.state.studentsWhoApplied;
		let sum = 0;
		let num = 0;
		students.forEach((student) => {
			if (student.ACTComp !== null && student.acceptanceStatus === 'accepted') {
				sum = sum + student.ACTComp;
				num = num + 1;
			}
		});
		let avg = sum / num;
		return Math.floor(avg);
	};

	getPercent = (type, amount) => {
		if (amount == -1) {
			return 0;
		}

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
				<div className='schoolsContainer' hidden={this.state.onGraph}>
					<div id='studentListBanner'>
						<div></div>
						<span className='collegeTitleText'> Application Tracker:</span>
						<span className='collegeTitleText'>{college.collegeName}</span>
					</div>
					<div id='studentList'>
						<StudentList college={college} students={studentsWhoApplied}></StudentList>
					</div>
				</div>
				<div className='graphContainer' hidden={!this.state.onGraph}>
					<ApplicationGraph college={college} students={studentsWhoApplied} />
				</div>
				<div className='trackerFiltersContainer'>
					<div className='filtersBanner'>
						<span id='filterHeaderText'>Filters:</span>
						<form action='#' id='strictBoxLocation'>
							<p>
								<label id='strictBox'>
									<input
										type='checkbox'
										id='strict'
										onChange={this.handleChange}
										disabled={this.state.onGraph}
									/>
									<span id='strictText'>Strict</span>
								</label>
							</p>
						</form>
					</div>
					<div className='collegeClassFilter'>
						<span id='filtersText'>College Class</span>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								flexWrap: 'wrap',
							}}
						>
							<Range
								disabled={this.state.onGraph}
								values={this.state.filters.collegeClassValues}
								step={collegeClass.step}
								min={collegeClass.min}
								max={collegeClass.max}
								onChange={(values) =>
									this.setState((prevState) => ({
										filters: {
											...prevState.filters,
											collegeClassValues: values,
										},
									}))
								}
								renderTrack={({ props, children }) => (
									<div
										onMouseDown={props.onMouseDown}
										onTouchStart={props.onTouchStart}
										style={{
											...props.style,
											height: '36px',
											display: 'flex',
											width: '60%',
										}}
									>
										<div
											ref={props.ref}
											style={{
												height: '5px',
												width: '100%',
												borderRadius: '4px',
												background: getTrackBackground({
													values: this.state.filters.collegeClassValues,
													colors: ['#ccc', '#548BF4', '#ccc'],
													min: collegeClass.min,
													max: collegeClass.max,
												}),
												alignSelf: 'center',
											}}
										>
											{children}
										</div>
									</div>
								)}
								renderThumb={({ index, props, isDragged }) => {
									if (index === 0) {
										return (
											<div
												{...props}
												style={{
													...props.style,
													height: '30px',
													width: '30px',
													borderRadius: '4px',
													backgroundColor: '#FFF',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													boxShadow: '0px 2px 6px #AAA',
												}}
											>
												<div
													style={{
														position: 'absolute',
														top: '3px',
														left: '-40px',
														color: '#fff',
														fontWeight: 'bold',
														fontSize: '14px',
														fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
														padding: '4px',
														borderRadius: '4px',
														backgroundColor: '#548BF4',
													}}
												>
													{this.state.filters.collegeClassValues[index].toFixed(1)}
												</div>
												<div
													style={{
														height: '16px',
														width: '5px',
														backgroundColor: isDragged ? '#548BF4' : '#CCC',
													}}
												/>
											</div>
										);
									}
									return (
										<div
											{...props}
											style={{
												...props.style,
												height: '30px',
												width: '30px',
												borderRadius: '4px',
												backgroundColor: '#FFF',
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												boxShadow: '0px 2px 6px #AAA',
											}}
										>
											<div
												style={{
													position: 'absolute',
													top: '3px',
													right: '-50px',
													color: '#fff',
													fontWeight: 'bold',
													fontSize: '14px',
													fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
													padding: '4px',
													borderRadius: '4px',
													backgroundColor: '#548BF4',
												}}
											>
												{this.state.filters.collegeClassValues[index].toFixed(index)}
											</div>
											<div
												style={{
													height: '16px',
													width: '5px',
													backgroundColor: isDragged ? '#548BF4' : '#CCC',
												}}
											/>
										</div>
									);
								}}
							/>
						</div>
					</div>
					<div className='appStatusFilter'>
						<span id='filtersText'>Application Status</span>
						<form action='#' id='acceptedBoxLocation'>
							<p>
								<label id='acceptedBox'>
									<input
										type='checkbox'
										id='isAccepted'
										onChange={this.handleChange}
										disabled={this.state.onGraph}
									/>
									<span id='strictText'>Accepted</span>
								</label>
							</p>
						</form>
						<form action='#' id='pendingBoxLocation'>
							<p>
								<label id='pendingBox'>
									<input
										type='checkbox'
										id='isPending'
										onChange={this.handleChange}
										disabled={this.state.onGraph}
									/>
									<span id='strictText'>Pending</span>
								</label>
							</p>
						</form>
						<form action='#' id='wait-listedBoxLocation'>
							<p>
								<label id='wait-listedBox'>
									<input
										type='checkbox'
										id='isWaitListed'
										onChange={this.handleChange}
										disabled={this.state.onGraph}
									/>
									<span id='strictText'>Wait-listed</span>
								</label>
							</p>
						</form>
						<form action='#' id='deferredBoxLocation'>
							<p>
								<label id='deferredBox'>
									<input
										type='checkbox'
										id='isDeferred'
										onChange={this.handleChange}
										disabled={this.state.onGraph}
									/>
									<span id='strictText'>Deferred</span>
								</label>
							</p>
						</form>
						<form action='#' id='deniedBoxLocation'>
							<p>
								<label id='deniedBox'>
									<input
										type='checkbox'
										id='isDenied'
										onChange={this.handleChange}
										disabled={this.state.onGraph}
									/>
									<span id='strictText'>Denied</span>
								</label>
							</p>
						</form>
						<form action='#' id='withdrawnBoxLocation'>
							<p>
								<label id='withdrawnBox'>
									<input
										type='checkbox'
										id='isWithdrawn'
										onChange={this.handleChange}
										disabled={this.state.onGraph}
									/>
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
								disabled={this.state.onGraph}
							></input>
							<label htmlFor='highschool'>Applicants Highschool</label>
						</div>
						<a
							className='btn-floating btn-large waves-effect waves-light blue'
							id='enterHighschoolBtn'
							onClick={this.addHighschool.bind(this.self)}
							disabled={this.state.onGraph}
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
					<div className='btnContainer'>
						<div></div>
						<button className='backSearchBtn' onClick={this.goCollegeSearch}>
							{' '}
							Back to college search{' '}
						</button>
						<button className='applicantFilterBtn'> Apply filters </button>
					</div>
					<div id='trackerStatContainer'>
						<div className='filtersBanner'>
							<span id='filterStatsText'>Stats of all students</span>
						</div>
						<div className='acceptedGPA1'>
							{'Average GPA: '}
							<span className='acceptedGPA2'>{this.getAvgGPA()}</span>
						</div>
						<div className='acceptedGPAScore'>
							<span className='acceptedText'>0</span>
							<Progress
								className='mathBar'
								percent={this.getPercent('gpa', this.getAvgGPA())}
								status='gpa'
								theme={theme}
							/>
						</div>
						<div className='acceptedMath1'>
							{'Average Math SAT Score: '}
							<span className='acceptedMath2'>{this.getAvgSATMath()}</span>
						</div>
						<div className='acceptedMathScore'>
							<span className='acceptedText'>0</span>
							<Progress
								className='mathBar'
								percent={this.getPercent('math', this.getAvgSATMath())}
								status='math'
								theme={theme}
							/>
						</div>
						<div className='acceptedEBRW1'>
							{'Average EBRW SAT Score: '}
							<span className='acceptedEBRW2'>{this.getAvgSATEBRW()}</span>
						</div>
						<div className='acceptedEBRWScore'>
							<span className='acceptedText'>0</span>
							<Progress
								className='mathBar'
								percent={this.getPercent('ebrw', this.getAvgSATEBRW())}
								status='EBRW'
								theme={theme}
							/>
						</div>
						<div className='acceptedACT1'>
							{'Average ACT Score: '}
							<span className='acceptedACT2'>{this.getAvgACT()}</span>
						</div>
						<div className='acceptedACTScore'>
							<span className='acceptedText'>0</span>
							<Progress
								className='mathBar'
								percent={this.getPercent('act', this.getAvgACT())}
								status='ACT'
								theme={theme}
							/>
						</div>
						<div className='filtersBanner'>
							<span id='filterStatsText'>Stats of accepted students</span>
						</div>
						<div className='acceptedGPA1'>
							{'Average GPA: '}
							<span className='acceptedGPA2'>{this.getAvgAcceptedGPA()}</span>
						</div>
						<div className='acceptedGPAScore'>
							<span className='acceptedText'>0</span>
							<Progress
								className='mathBar'
								percent={this.getPercent('gpa', this.getAvgAcceptedGPA())}
								status='gpa'
								theme={theme}
							/>
						</div>
						<div className='acceptedMath1'>
							{'Average Math SAT Score: '}
							<span className='acceptedMath2'>{this.getAvgAcceptedSATMath()}</span>
						</div>
						<div className='acceptedMathScore'>
							<span className='acceptedText'>0</span>
							<Progress
								className='mathBar'
								percent={this.getPercent('math', this.getAvgAcceptedSATMath())}
								status='math'
								theme={theme}
							/>
						</div>
						<div className='acceptedEBRW1'>
							{'Average EBRW SAT Score: '}
							<span className='acceptedEBRW2'>{this.getAvgAcceptedSATEBRW()}</span>
						</div>
						<div className='acceptedEBRWScore'>
							<span className='acceptedText'>0</span>
							<Progress
								className='mathBar'
								percent={this.getPercent('ebrw', this.getAvgAcceptedSATEBRW())}
								status='EBRW'
								theme={theme}
							/>
						</div>
						<div className='acceptedACT1'>
							{'Average ACT Score: '}
							<span className='acceptedACT2'>{this.getAvgAcceptedACT()}</span>
						</div>
						<div className='acceptedACTScore'>
							<span className='acceptedText'>0</span>
							<Progress
								className='mathBar'
								percent={this.getPercent('act', this.getAvgAcceptedACT())}
								status='ACT'
								theme={theme}
							/>
						</div>
						<button id='graphBtn' onClick={this.switchGraph}>
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
