import React from 'react';

import { Link } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

class Student extends React.Component {
	state = {};

	getName = () => {
		if (this.props.student.name.length > 20) {
			let tempName = this.props.student.name.substring(0, 20) + '...';
			return tempName;
		} else return this.props.student.name;
	};

	getMajors = () => {
		const m1 = this.props.student.major1;
		const m2 = this.props.student.major2;
		if (m1 != '' && m1 != null && m2 != '' && m2 != null) return m1 + ' | ' + m2;
		else if (m1 != '' && m1 != null && (m2 === '' || m2 === null)) return m1;
		else if (m2 != '' && m2 != null && (m1 === '' || m1 === null)) return m2;
		else return 'Undecided';
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
		if (type == 'rec') {
			return amount;
		}
	};

	getValue = (value) => {
		if (value === null || value === undefined) return '';
		else return value;
	};

	getScore = (value) => {
		if (value === null || value === undefined) return 'Not Taken';
		else return value;
	};

	render() {
		var elem = document.querySelector('.tabs');
		var options = {};
		var instance = M.Tabs.init(elem, options);

		document.addEventListener('DOMContentLoaded', function () {
			var elems = document.querySelectorAll('.collapsible');
			var instances = M.Collapsible.init(elems, options);
		});

		document.addEventListener('DOMContentLoaded', function () {
			var elems = document.querySelectorAll('.dropdown-trigger');
			var instances = M.Dropdown.init(elems, options);
		});

		const student = this.props.student;

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
		};

		return (
			//<Link to={'/applicationTracker/' + this.props.college.collegeName + '/view/' + student.key}>
			<Link
				to={{
					pathname:
						'/applicationTracker/' + this.props.college.collegeName + '/view/' + student.name,
					state: {
						studentName: student.name,
						college: this.props.collegeName,
					},
				}}
			>
				<div className='studentCard'>
					<div className='studentBoxTitleAndStatus'>
						<div className='studentTitle'> {this.getName()} </div>
						<div className='studentStatus'> {student.acceptanceStatus} </div>
					</div>
					<div className='studentLocation'> {this.getValue(student.highSchoolName)} </div>
					<div className='studentMajors'>{this.getMajors()}</div>
					<div className='studentMath1'>
						{'SAT Math Score: '}
						<span className='studentMath2'>{this.getScore(student.SATMath)}</span>
					</div>
					<div className='studentMathScore'>
						<span className='studentText'>0</span>
						<Progress
							className='mathBar'
							percent={this.getPercent('math', student.SATMath)}
							status='math'
							theme={theme}
						/>
					</div>
					<div className='studentEBRW1'>
						{'SAT EBRW Score: '}
						<span className='studentEBRW2'>{this.getScore(student.SATEBRW)}</span>
					</div>
					<div className='studentEBRWScore'>
						<span className='studentText'>0</span>
						<Progress
							className='ebrwBar'
							percent={this.getPercent('ebrw', student.SATEBRW)}
							status='EBRW'
							theme={theme}
						/>
					</div>
					<div className='studentACT1'>
						{'ACT Composite Score: '}
						<span className='studentACT2'>{this.getScore(student.ACTComp)}</span>
					</div>
					<div className='studentEBRWScore'>
						<span className='studentText'>0</span>
						<Progress
							className='ACTBar'
							percent={this.getPercent('act', student.ACTComp)}
							status='ACT'
							theme={theme}
						/>
					</div>
				</div>
			</Link>
		);
	}
}

export default Student;
