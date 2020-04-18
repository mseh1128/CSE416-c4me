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

import data from '../test/TestStudentData.json';

import axios from 'axios';

export class ViewProfileScreen extends Component {
	//current way state obtains data is temporary to assist frontend development
	state = {
		disabled: true,
		userIDInput: '',
		nameInput: '',
		residence_state: '',
		high_school_name: '',
		high_school_city: '',
		high_school_state: '',
		GPA: '',
		college_class: '',
		major1: '',
		major2: '',
		SAT_Math: '',
		SAT_EBRW: '',
		ACT_English: '',
		ACT_Math: '',
		ACT_Reading: '',
		ACT_Science: '',
		ACT_Composite: '',
		SAT_Literature: '',
		SAT_US_hist: '',
		SAT_World_hist: '',
		SAT_Math_1: '',
		SAT_Math_2: '',
		SAT_Eco_Bio: '',
		SAT_Mol_Bio: '',
		SAT_Chemistry: '',
		SAT_Physics: '',
		numOfAP: '',
	};

	componentDidMount = async () => {
		try {
			const response = await axios.get('/retrieveAStudent', {
				params: {
					userID: this.props.user.userID,
				},
			});
			console.log(this.props.user);
			console.log(response.data);
			this.setState({
				userIDInput: this.props.user.userID,
				nameInput: this.props.user.name,
				residence_state: response.data.residenceState,
				high_school_name: response.data.highSchoolName,
				high_school_city: response.data.highSchoolCity,
				high_school_state: response.data.highSchoolState,
				GPA: response.data.highSchoolGPA,
				college_class: response.data.classOf,
				major1: response.data.major1,
				major2: response.data.major2,
				SAT_Math: response.data.SATMath,
				SAT_EBRW: response.data.SATEBRW,
				SAT_Literature: response.data.SATLit,
				ACT_English: response.data.ACTEng,
				ACT_Math: response.data.ACTMath,
				ACT_Reading: response.data.ACTReading,
				ACT_Science: response.data.ACTSci,
				ACT_Composite: response.data.ACTComp,
				SAT_US_hist: response.data.SATUSHist,
				SAT_World_hist: response.data.SATWorldHist,
				SAT_Math_1: response.data.SATMath1,
				SAT_Math_2: response.data.SATMath2,
				SAT_Eco_Bio: response.data.SATEcoBio,
				SAT_Mol_Bio: response.data.SATMolBio,
				SAT_Chemistry: response.data.SATChem,
				SAT_Physics: response.data.SATPhysics,
				numOfAP: response.data.passedAPAmount,
			});
		} catch (err) {
			const {
				response: { data, status },
			} = err;
			console.log(err);
			const unknownErrorText = `An unknown error with error code ${status} occurred`;
			console.log(unknownErrorText);
			return;
		}
	};

	goHome = () => {
		this.props.history.push('/home');
	};

	startEdit = () => {
		this.setState({ disabled: false });
	};

	//these parts are certainly not going to be like this
	//but they are quick and dirty ways to change the thing.

	changeNonAcademicInfo = async (attribute) => {
		let info = document.getElementById(attribute).value;
		let response = await fetch('/updateStudentInfo', {
			method: 'POST',
			headers: { 'Content-Type': 'text/plain' },
			body: JSON.stringify({
				category: attribute,
				value: info,
				userID: data.students[0].userID,
			}),
		});
	};

	changeAcademicInfo = async (attribute) => {
		let info = document.getAttributeById(attribute).value;
		let infoAsNumber = Number(info);

		let response = await fetch('/updateProfileInfo', {
			method: 'POST',
			headers: { 'Content-Type': 'text/plain' },
			body: JSON.stringify({
				category: attribute,
				value: info,
				userID: data.students[0].userID,
			}),
		});
	};

	getScore(score) {
		if (score === -1 || score === '') {
			return 'Not taken';
		} else return score;
	}

	handleChange = (e) => {
		const { target } = e;
		this.setState((state) => ({
			...state,
			[target.id]: target.value,
		}));
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
						<button className='profileButton'>
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
									id='SAT_Math'
									style={{ left: '41px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeSAT}
									value={this.getScore(this.state.SAT_Math)}
								></input>
								<span className='profileText' style={{ left: '91px' }}>
									US:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SAT_US_hist'
									style={{ left: '164px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeSAT}
									value={this.getScore(this.state.SAT_US_hist)}
								></input>
							</div>
							<div>
								<span className='profileText'>SAT EBRW:</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SAT_EBRW'
									style={{ left: '29px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeSAT}
									value={this.getScore(this.state.SAT_EBRW)}
								></input>
								<span className='profileText' style={{ left: '80px' }}>
									World:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SAT_World_hist'
									style={{ left: '127px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeSAT}
									value={this.getScore(this.state.SAT_World_hist)}
								></input>
							</div>
							<div>
								<span className='profileText'>SAT Literature:</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SAT_Literature'
									style={{ left: '3px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeSAT}
									value={this.getScore(this.state.SAT_Literature)}
								></input>
								<span className='profileText' style={{ left: '54px' }}>
									Math I:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SAT_Math_1'
									style={{ left: '96px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeSAT}
									value={this.getScore(this.state.SAT_Math_1)}
								></input>
							</div>
							<div>
								<span className='profileText'>ACT English:</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='ACT_English'
									style={{ left: '20px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeACT}
									value={this.getScore(this.state.ACT_English)}
								></input>
								<span className='profileText' style={{ left: '71px' }}>
									Math II:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SAT_Math_2'
									style={{ left: '108px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeSAT}
									value={this.getScore(this.state.SAT_Math_2)}
								></input>
							</div>
							<div>
								<span className='profileText'>ACT Reading:</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='ACT_Reading'
									style={{ left: '14px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeACT}
									value={this.getScore(this.state.ACT_Reading)}
								></input>
								<span className='profileText' style={{ left: '65px' }}>
									Eco Bio:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SAT_Eco_Bio'
									style={{ left: '103px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeSAT}
									value={this.getScore(this.state.SAT_Eco_Bio)}
								></input>
							</div>
							<div>
								<span className='profileText'>ACT Math:</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='ACT_Math'
									style={{ left: '36px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeACT}
									value={this.getScore(this.state.ACT_Math)}
								></input>
								<span className='profileText' style={{ left: '86px' }}>
									Molecular Bio:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SAT_Mol_Bio'
									style={{ left: '75px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeSAT}
									value={this.getScore(this.state.SAT_Mol_Bio)}
								></input>
							</div>
							<div>
								<span className='profileText'>ACT Science:</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='ACT_Science'
									style={{ left: '21px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeACT}
									value={this.getScore(this.state.ACT_Science)}
								></input>
								<span className='profileText' style={{ left: '72px' }}>
									Chemistry:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SAT_Chemistry'
									style={{ left: '88px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeSAT}
									value={this.getScore(this.state.SAT_Chemistry)}
								></input>
							</div>
							<div>
								<span className='profileText'>ACT Composite:</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='ACT_Composite'
									style={{ left: '-4px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeACT}
									value={this.getScore(this.state.ACT_Composite)}
								></input>
								<span className='profileText' style={{ left: '48px' }}>
									Physics:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SAT_Physics'
									style={{ left: '87px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeSAT}
									value={this.getScore(this.state.SAT_Physics)}
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
