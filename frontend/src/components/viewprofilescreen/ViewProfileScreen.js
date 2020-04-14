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
		userIDInput: data.students[0].userID,
		nameInput: data.students[0].name,
		residence_state: data.students[0].residence_state,
		high_school_name: data.students[0].high_school_name,
		high_school_city: data.students[0].high_school_city,
		high_school_state: data.students[0].high_school_state,
		GPA: data.students[0].GPA,
		college_class: data.students[0].college_class,
		major1: data.students[0].major_1,
		major2: data.students[0].major_2,
		SAT_Math: data.students[0].SAT_Math,
		SAT_EBRW: data.students[0].SAT_EBRW,
		ACT_English: data.students[0].ACT_English,
		ACT_Math: data.students[0].ACT_Math,
		ACT_Reading: data.students[0].ACT_Reading,
		ACT_Science: data.students[0].ACT_Science,
		ACT_Composite: data.students[0].ACT_Composite,
		ACT_Literature: data.students[0].ACT_Literature,
		AP_US_hist: data.students[0].SAT_US_hist,
		AP_World_hist: data.students[0].SAT_World_hist,
		AP_Math_1: data.students[0].SAT_Math_1,
		AP_Math_2: data.students[0].SAT_Math_2,
		AP_Eco_Bio: data.students[0].SAT_Eco_Bio,
		AP_Mol_Bio: data.students[0].SAT_Mol_Bio,
		AP_Chemistry: data.students[0].SAT_Chemistry,
		AP_Physics: data.students[0].SAT_Physics,
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
		if (score === -1) {
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

		const student = data.student;

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
								<span className='profileText'>User ID:</span>
								<input
									type='textfield'
									id='userIDInput'
									className='profilePrompt'
									style={{ left: '60px' }}
									disabled={this.state.disabled}
									onChange={this.handleChange}
									value={this.state.userIDInput}
									on_input
								></input>
								<span className='profileText' style={{ left: '110px' }}>
									HS Name:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='high_school_name'
									style={{ left: '134px' }}
									disabled={this.state.disabled}
									onChange={this.handleChange}
									value={this.state.high_school_name}
								></input>
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
								<span className='profileText' style={{ left: '125px' }}>
									HS City:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='high_school_city'
									style={{ left: '161px' }}
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
								<span className='profileText' style={{ left: '61px' }}>
									Class:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='college_class'
									style={{ left: '120px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeNumber}
									value={this.state.college_class}
								></input>
							</div>
						</div>
						<div>
							<div id='collegeInfoList'>
								<div id='generalHSHeader'>
									<span className='profileHeader'>Your Applications</span>
								</div>
								<StudentCollegesList disabled={this.state.disabled} />
							</div>
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
								<span className='profileText' style={{ left: '87px' }}>
									Math I:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SAT_Math_1'
									style={{ left: '131px' }}
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
								<span className='profileText'>ACT Literature:</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='ACT_Literature'
									style={{ left: '-1px' }}
									disabled={this.state.disabled}
									onChange={this.handleChangeACT}
									value={this.getScore(this.state.ACT_Literature)}
								></input>
								<span className='profileText' style={{ left: '49px' }}>
									Molecular Bio:
								</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='SAT_Mol_Bio'
									style={{ left: '37px' }}
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
