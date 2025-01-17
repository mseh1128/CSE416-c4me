import React from 'react';

import { Link } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

class HighSchool extends React.Component {
	state = {};

	getName = () => {
		if (
			this.props.highschool.highSchoolName === null ||
			this.props.highschool.highSchoolName === undefined
		) {
			return 'Unknown name';
		}
		if (this.props.highschool.highSchoolName.length > 34) {
			let tempName = this.props.highschool.highSchoolName.substring(0, 33) + '...';
			return tempName;
		} else return this.props.highschool.highSchoolName;
	};

	getValue = (value) => {
		if (value === null || value === undefined) return '';
		else return value;
	};

	getCity = () => {
		if (
			this.props.highschool.highSchoolCity === undefined ||
			this.props.highschool.highSchoolCity === null
		) {
			return 'Unknown';
		} else return this.props.highschool.highSchoolCity;
	};

	getState = () => {
		if (
			this.props.highschool.highSchoolState === undefined ||
			this.props.highschool.highSchoolState === null
		) {
			return 'Unknown';
		} else return this.props.highschool.highSchoolState;
	};

	getType = () => {
		if (
			this.props.highschool.institutionType === undefined ||
			this.props.highschool.institutionType === null
		) {
			return 'N/A';
		} else return this.props.highschool.institutionType;
	};

	getNumOfStudents = () => {
		if (
			this.props.highschool.numOfStudents === undefined ||
			this.props.highschool.numOfStudents === null
		) {
			return 'Unknown';
		} else return this.props.highschool.numOfStudents + ' Students';
	};

	getStudentTeacherRatio = () => {
		if (
			this.props.highschool.studentRatio === undefined ||
			this.props.highschool.studentRatio === null
		) {
			return 'Unknown';
		} else return this.props.highschool.studentRatio;
	};

	getAPEnrollment = () => {
		if (
			this.props.highschool.APEnrollmentPerc === undefined ||
			this.props.highschool.APEnrollmentPerc === null
		) {
			return 'N/A';
		} else return this.props.highschool.APEnrollmentPerc + '%';
	};

	getSATScore = () => {
		if (this.props.highschool.avgSAT === undefined || this.props.highschool.avgSAT === null) {
			return 'N/A';
		} else return this.props.highschool.avgSAT;
	};

	getACTScore = () => {
		if (this.props.highschool.avgACT === undefined || this.props.highschool.avgACT === null) {
			return 'N/A';
		} else return this.props.highschool.avgACT;
	};

	/*getNicheRating = () => {
		if (
			this.props.highschool.nicheGrade === undefined ||
			this.props.highschool.nicheGrade === null
		) {
			return '?';
		} else return this.props.highschool.nicheGrade;
	};*/

	getPercent = (type, amount) => {
		if (amount === undefined || amount === null) {
			return 0;
		}
		if (type == 'sat') {
			return (amount / 1600) * 100;
		}
		if (type == 'act') {
			return (amount / 36) * 100;
		}
	};

	/*getNicheColor = () => {
		if (
			this.props.highschool.nicheGrade === null ||
			this.props.highschool.nicheGrade === undefined
		) {
			return 'rgb(252, 3, 3)';
		}
		let grade = this.props.highschool.nicheGrade.charAt(0);
		if (grade === null || grade === undefined) return 'rgb(3, 144, 252)';
		else if (grade === 'A') return 'rgb(89, 175, 48)';
		else if (grade === 'B') return 'rgb(3, 144, 252)';
		else if (grade === 'C') return 'rgb(252, 207, 3)';
		else return 'rgb(252, 3, 3)';
	};*/

	render() {
		let theme = {
			SAT: {
				symbol: '‍1600',
				color: 'rgb(223, 105, 180)',
			},
			ACT: {
				symbol: '36',
				color: 'rgb(23, 105, 180)',
			},
		};

		const highschool = this.props.highschool;

		return (
			<Link
				to={{
					pathname:
						'/applicationTracker/' +
						this.props.college.collegeName +
						'/highSchools/' +
						highschool.highSchoolName,
					state: {
						college: this.props.college,
						highschool: highschool,
					},
				}}
			>
				<div className='highschoolCardPossible'>
					<div className='highschoolBoxTitle'>
						<div className='highschoolTitle'> {this.getName()} </div>
					</div>
					<div className='highschoolLocation'>{this.getCity() + ', ' + this.getState()}</div>
					<div className='highschoolType'>
						{' '}
						{this.getType() +
							' | ' +
							this.getNumOfStudents() +
							' | ' +
							this.getStudentTeacherRatio() +
							' Students/Teacher | AP Enrollment: ' +
							this.getAPEnrollment()}{' '}
					</div>
					<div className='highschoolScores'>
						<div className='highschoolSAT1'>
							{'Average SAT: '}
							<span className='highschoolSAT2'>{this.getSATScore()}</span>
						</div>
						<div className='highschoolSATBar'>
							<span className='highshoolText'>0</span>
							<Progress
								className='mathBar'
								percent={this.getPercent('sat', highschool.avgSAT)}
								status='SAT'
								theme={theme}
							/>
						</div>
						<div className='highschoolACT1'>
							{'Average ACT: '}
							<span className='highschoolACT2'>{this.getACTScore()}</span>
						</div>
						<div className='highschoolACTBar'>
							<span className='highschoolText'>0</span>
							<Progress
								className='ACTBar'
								percent={this.getPercent('act', highschool.avgACT)}
								status='ACT'
								theme={theme}
							/>
						</div>
					</div>
				</div>
			</Link>
		);
	}
}

export default HighSchool;

/*
<span className='highschoolNicheRating' style={{ color: this.getNicheColor() }}>
								{' '}
								{this.getNicheRating()}{' '}
							</span>
														<div></div>
							<span className='gradeText'> Niche Grade </span>
							*/
