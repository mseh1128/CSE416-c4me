import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import M, { TapTarget } from 'materialize-css';
import Undo from '@material-ui/icons/Undo';
import Edit from '@material-ui/icons/Edit';
import Save from '@material-ui/icons/Save';
import PropTypes from 'prop-types';

import StudentCollegesList from './StudentCollegesList.js';

//import data from '../test/TestStudentData.json';

import axios from 'axios';

export class ViewOtherScreen extends Component {
	//current way state obtains data is temporary to assist frontend development
	state = {
		college: '',
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
		passedAPAmount: ''
	};

	componentDidMount = async () => {
		const studentName = this.props.location.state.studentName;
		const college = this.props.location.state.college;

		try{
			//remember, you made a meme here.
			//before you push, change to a legitimate name
			const theVoiceOfLoveTakeYouHigher = await axios.get('/getUserIDThroughOtherInfo', {
				params:{
					studentName: studentName
				}
			});

			const userID = theVoiceOfLoveTakeYouHigher.data.userID;
			const studentInfo = await axios.get('/getStudentInfo', {
				params: {
					userID: userID
				}
			});

			const actualStudentInfo = studentInfo.data[0];
			console.log(actualStudentInfo);
			this.setState({ ...this.state, ...actualStudentInfo});
			console.log(this.state);
		}	catch (err){
			console.log(err);
			console.log('Error occurred, could not fetch other student');
		}
	}

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

	goBack = () => {
		const { id } = this.props.match.params;
		this.props.history.push('/applicationTracker/' + id);
	};

	getScore(score) {
		if (score === -1) {
			return 'Not taken';
		} else return score;
	}

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
						<span className='collegeTitleText'> Student's Profile </span>
						<button className='profileButton' onClick={this.goBack}>
							{' '}
							<Undo id='profileButtonSymbols' />{' '}
						</button>
						<div />
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
									value={this.state.username}
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
									value={this.state.highSchoolName}
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
									value={this.state.name}
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
									value={this.state.highSchoolCity}
								></input>
							</div>
							<div>
								<span className='profileText'>Residence State:</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='residence_state'
									disabled={this.state.disabled}
									value={this.state.residenceState}
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
									value={this.state.highSchoolState}
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
									value={this.state.highSchoolGPA}
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
									value={this.state.collegeClass}
								></input>
							</div>
						</div>
						<div>
							<div id='collegeInfoList'>
								<div id='generalHSHeader'>
									<span className='profileHeader'>Their Applications</span>
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
									value={this.getScore(this.state.SATMath)}
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
									value={this.getScore(this.state.SATUSHist)}
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
									value={this.getScore(this.state.SATEBRW)}
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
									value={this.getScore(this.state.SATWorldHist)}
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
									value={this.getScore(this.state.ACTMath)}
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
									value={this.getScore(this.state.SATMath1)}
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
									value={this.getScore(this.state.ACTEng)}
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
									value={this.getScore(this.state.SATMath2)}
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
									value={this.getScore(this.state.ACTReading)}
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
									value={this.getScore(this.state.SATEcoBio)}
								></input>
							</div>
							<div>
								<span className='profileText'>SAT Literature:</span>
								<input
									type='textfield'
									className='profilePrompt'
									id='ACT_Literature'
									style={{ left: '-1px' }}
									disabled={this.state.disabled}
									value={this.getScore(this.state.SATLit)}
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
									value={this.getScore(this.state.SATMolBio)}
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
									value={this.getScore(this.state.ACTSci)}
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
									value={this.getScore(this.state.SATChem)}
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
									value={this.getScore(this.state.ACTComp)}
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
									value={this.getScore(this.state.SATPhysics)}
								></input>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ViewOtherScreen;
