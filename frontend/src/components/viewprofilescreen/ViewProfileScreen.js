import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { firestoreConnect } from 'react-redux-firebase';

import 'materialize-css/dist/css/materialize.min.css';
import M, { TapTarget } from 'materialize-css';
import Home from '@material-ui/icons/Home';
import Edit from '@material-ui/icons/Edit';
import Save from '@material-ui/icons/Save';
import PropTypes from 'prop-types';

import StudentCollegesList from './StudentCollegesList.js';

// import data from '../test/TestStudentData.json';

import axios from 'axios';

export class ViewProfileScreen extends Component {
	//current way state obtains data is temporary to assist frontend development
	state = {
		disabled: true,
		username: '',
		name: '',
		residenceState: '',
		highSchoolName: '',
		highSchoolCity: '',
		highSchoolState: '',
		highSchoolGPA: '',
		collegeClass: '',
		major1: '',
		major2: '',
		SATMath: '',
		SATEBRW: '',
		ACTEng: '',
		ACTMath: '',
		ACTReading: '',
		ACTSci: '',
		ACTComp: '',
		SATLit: '',
		SATUSHist: '',
		SATWorldHist: '',
		SATMath1: '',
		SATMath2: '',
		SATEcoBio: '',
		SATMolBio: '',
		SATChem: '',
		SATPhysics: '',
		passedAPAmount: '',
	};

	goHome = () => {
		this.props.history.push('/home');
	};

	startEdit = () => {
		this.setState({ disabled: false });
	};

	saveChanges = async () => {
		try {
			const studentProfile = await axios.post('/updateStudentInfo', {
				state: this.state,
				userID: this.props.user.userID,
			});
			console.log(studentProfile);
		} catch (err) {
			console.log(err);
			console.log('Error occurred, could not retrieve all colleges');
		}
	};

	getScore(score) {
		if (score === -1 || score === '' || score === null || score === undefined) {
			return 'Not taken';
		} else return score;
	}

	getValue(score) {
		if (score === -1 || score === '' || score === null || score === undefined) {
			return '';
		} else return score;
	}

	componentDidMount = async () => {
		const { user } = this.props;
		const { username, name, userID } = user;

		try {
			const studentProfileData = await axios.get('/getStudentInfo', {
				params: { userID },
			});

			const studentProfile = studentProfileData.data[0];
			console.log(studentProfile);
			this.setState({ ...this.state, ...studentProfile });
		} catch (err) {
			console.log(err);
			console.log('Error occurred, could not get student info');
		}
	};

	handleChange = (e) => {
		const { target } = e;
		console.log(target);

		if (target.id === 'nameInput') {
			this.setState((state) => ({
				...state,
				name: target.value,
			}));
		} else {
			this.setState((state) => ({
				...state,
				[target.id]: target.value,
			}));
		}
	};

	//ensures that only numbers can be entered for certain inputs
	handleChangeNumber = (e) => {
		const { target } = e;
		if (/^\d+$/.test(target.value) || target.value === '') {
			this.setState((state) => ({
				...state,
				[target.id]: target.value,
			}));
		}
	};

	//ensures that only the correct range of numbers and entered
	handleChangeSAT = (e) => {
		const { target } = e;
		if (/^\d+$/.test(target.value) || target.value === '') {
			if (target.value > 800) {
				this.setState((state) => ({
					...state,
					[target.id]: 800,
				}));
				return;
			} else if (target.value > 100) {
				this.setState((state) => ({
					...state,
					[target.id]: target.value - (target.value % 10),
				}));
				return;
			}
			this.setState((state) => ({
				...state,
				[target.id]: target.value,
			}));
		}
	};

	//ensures that only the correct range of numbers and entered
	handleChangeACT = (e) => {
		const { target } = e;
		if (/^\d+$/.test(target.value) || target.value === '') {
			if (target.value > 36) {
				this.setState((state) => ({
					...state,
					[target.id]: 36,
				}));
				return;
			}
			this.setState((state) => ({
				...state,
				[target.id]: target.value,
			}));
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

		return (
			<div className='profile_screen_container'>
				<div className='profileContainer'>
					<div id='profileBanner'>
						<div />
						<span className='collegeTitleText'> Your Profile </span>
						<button className='profileButton' onClick={this.goHome}>
							{' '}
							<Home id='profileButtonSymbols' />{' '}
						</button>
						<div />
						<button className='profileButton' onClick={this.startEdit.bind(this)}>
							{' '}
							<Edit id='profileButtonSymbols' />{' '}
						</button>
						<div />
						<button className='profileButton' onClick={this.saveChanges.bind(this)}>
							{' '}
							<Save id='profileButtonSymbols' />{' '}
						</button>
					</div>
					<div id='profileList'>
						<div id='generalInfoList'>
							<div id='generalHSHeader'>
								<span className='profileHeader'>General Information</span>
								<span className='profileHeader'>General Education</span>
							</div>
							<div>
								<span className='profileText'>Name:</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='nameInput'
									style={{ left: '76px' }}
									disabled={this.state.disabled}
									onChange={this.handleChange}
									value={this.state.nameInput}
								></input>
								<span className='profileText' style={{ left: '124px' }}>
									HS Name:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='high_school_name'
									style={{ left: '149px' }}
									disabled={this.state.disabled}
									onChange={this.handleChange}
									value={this.state.high_school_name}
								></input>
							</div>
							<div>
								<span className='profileText'>Second major:</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='major2'
									style={{ left: '14px' }}
									disabled={this.state.disabled}
									onChange={this.handleChange}
									value={this.state.major2}
								></input>
								<span className='profileText' style={{ left: '63px' }}>
									HS City:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='high_school_city'
									style={{ left: '100px' }}
									disabled={this.state.disabled}
									onChange={this.handleChange}
									value={this.state.high_school_city}
								></input>
							</div>
							<div>
								<span className='profileText'>Residence State:</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='residence_state'
									disabled={this.state.disabled}
									onChange={this.handleChange}
									value={this.state.residence_state}
								></input>
								<span className='profileText' style={{ left: '49px' }}>
									HS State:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='high_school_state'
									style={{ left: '80px' }}
									disabled={this.state.disabled}
									onChange={this.handleChange}
									value={this.state.high_school_state}
								></input>
							</div>
							<div>
								<span className='profileText'>Desired major:</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='major1'
									style={{ left: '11px' }}
									disabled={this.state.disabled}
									onChange={this.handleChange}
									value={this.state.major1}
								></input>
								<span className='profileText' style={{ left: '58px' }}>
									GPA:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='GPA'
									style={{ left: '121px' }}
									disabled={this.state.disabled}
									onChange={this.handleChange}
									value={this.state.GPA}
								></input>
							</div>
							<div>
								<span className='profileText'>Grad Year:</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='college_class'
									style={{ left: '41px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeNumber}
									value={this.state.college_class}
								></input>
								<span className='profileText' style={{ left: '87px' }}>
									AP's Passed:
								</span>
								<input
									type='textfield'
									id='numOfAP'
									className='profilePrompt'
									style={{ left: '94px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeNumber}
									value={this.state.numOfAP}
									on_input
								></input>
							</div>
						</div>

						<div id='collegeInfoList'>
							<div id='generalCollegeHeader'>
								<span className='profileHeader'>Your Applications</span>
							</div>
							<StudentCollegesList disabled={this.state.disabled} />
						</div>
						<div id='educationInfoList'>
							<div id='generalHSHeader'>
								<span className='profileHeader'>SAT/ACT Scores</span>
								<span className='profileHeader'>SAT Scores</span>
							</div>
							<div>
								<span className='profileText'>SAT Math:</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SATMath'
									style={{ left: '41px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeSAT}
									value={this.state.SATMath}
								></input>
								<span className='profileText' style={{ left: '91px' }}>
									US:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SATUSHist'
									style={{ left: '166px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeSAT}
									value={this.state.SATUSHist}
								></input>
							</div>
							<div>
								<span className='profileText'>SAT EBRW:</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SATEBRW'
									style={{ left: '29px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeSAT}
									value={this.state.SATEBRW}
								></input>
								<span className='profileText' style={{ left: '80px' }}>
									World:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SATWorldHist'
									style={{ left: '128px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeSAT}
									value={this.state.SATWorldHist}
								></input>
							</div>
							<div>
								<span className='profileText'>ACT Math:</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='ACTMath'
									style={{ left: '37px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeACT}
									value={this.state.ACTMath}
								></input>
								<span className='profileText' style={{ left: '87px' }}>
									Math I:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SATMath1'
									style={{ left: '131px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeSAT}
									value={this.state.SATMath1}
								></input>
							</div>
							<div>
								<span className='profileText'>ACT English:</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='ACTEng'
									style={{ left: '20px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeACT}
									value={this.state.ACTEng}
								></input>
								<span className='profileText' style={{ left: '71px' }}>
									Math II:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SATMath2'
									style={{ left: '108px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeSAT}
									value={this.state.SATMath2}
								></input>
							</div>
							<div>
								<span className='profileText'>ACT Reading:</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='ACTReading'
									style={{ left: '14px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeACT}
									value={this.state.ACTReading}
								></input>
								<span className='profileText' style={{ left: '65px' }}>
									Eco Bio:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SATEcoBio'
									style={{ left: '103px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeSAT}
									value={this.state.SATEcoBio}
								></input>
							</div>

							<div>
								<span className='profileText'>ACT Science:</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='ACTSci'
									style={{ left: '21px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeACT}
									value={this.state.ACTSci}
								></input>
								<span className='profileText' style={{ left: '72px' }}>
									Chemistry:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SATChem'
									style={{ left: '88px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeSAT}
									value={this.state.SATChem}
								></input>
							</div>
							<div>
								<span className='profileText'>ACT Composite:</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='ACTComp'
									style={{ left: '-4px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeACT}
									value={this.state.ACTComp}
								></input>
								<span className='profileText' style={{ left: '48px' }}>
									Physics:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SATPhysics'
									style={{ left: '87px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeSAT}
									value={this.state.SATPhysics}
								></input>
							</div>
							<div>
								<span className='profileText' style={{ left: '400px' }}>
									Molecular Bio:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SATMolBio'
									style={{ left: '388px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeSAT}
									value={this.state.SATMolBio}
								></input>
							</div>
							<div>
								<span className='profileText' style={{ left: '400px' }}>
									Literature:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SATLit'
									style={{ left: '417px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeSAT}
									value={this.state.SATLit}
								></input>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ViewProfileScreen;
