import React from 'react';
import { Link } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

class FilteredCollege extends React.Component {
	state = {
		status: 'Admitted',
	};

	getName = () => {
		if (this.props.college.collegeName.length > 33) {
			let tempName = this.props.college.collegeName.substring(0, 32) + '...';
			return tempName;
		} else return this.props.college.collegeName;
	};

	getType = () => {
		if (
			this.props.college.institutionType === undefined ||
			this.props.college.institutionType === null
		) {
			return 'nondescript';
		} else return this.props.college.institutionType;
	};

	getCity = () => {
		if (this.props.college.city === undefined || this.props.college.city === null) {
			return 'Unknown';
		} else return this.props.college.city;
	};

	getState = () => {
		if (this.props.college.state === undefined || this.props.college.state === null) {
			return 'Unknown';
		} else return this.props.college.state;
	};

	getAdmissionRate = () => {
		if (
			this.props.college.admissionRatePercent === undefined ||
			this.props.college.admissionRatePercent === null
		) {
			return 'Unknown';
		} else return Math.floor(this.props.college.admissionRatePercent * 10000) / 100 + '%';
	};

	getCompletionRate = () => {
		if (
			this.props.college.completionRate === undefined ||
			this.props.college.completionRate === null
		) {
			return 'Unknown';
		} else return Math.floor(this.props.college.admissionRatePercent * 100) / 100 + '%';
	};

	getRank = () => {
		if (this.props.college.ranking === undefined || this.props.college.ranking === null) {
			return '?';
		} else return this.props.college.ranking;
	};

	getSize = () => {
		if (this.props.college.size === undefined || this.props.college.size === null) {
			return 'Unknown';
		} else return this.props.college.size;
	};

	getPrice = () => {
		let inCost = '';
		if (
			this.props.college.inStateAttendanceCost === undefined ||
			this.props.college.inStateAttendanceCost === null
		) {
			inCost = 'N/A';
		} else inCost = '$' + this.props.college.inStateAttendanceCost;
		let outCost = '';
		if (
			this.props.college.outOfStateAttendanceCost === undefined ||
			this.props.college.outOfStateAttendanceCost === null
		) {
			outCost = 'N/A';
		} else outCost = '$' + this.props.college.outOfStateAttendanceCost;
		return inCost + ' | ' + outCost;
	};

	getDebt = () => {
		if (
			this.props.college.medianCompletedStudentDebt === undefined ||
			this.props.college.medianCompletedStudentDebt === null
		) {
			return 'Unknown';
		} else return '$' + this.props.college.medianCompletedStudentDebt;
	};

	getMathScore = () => {
		if (this.props.college.SATMathScore === undefined || this.props.college.SATMathScore === null) {
			return 'Unknown';
		} else return this.props.college.SATMathScore;
	};

	getEnglishScore = () => {
		if (this.props.college.SATEBRWScore === undefined || this.props.college.SATMathScore === null) {
			return 'Unknown';
		} else return this.props.college.SATEBRWScore;
	};

	getACTScore = () => {
		if (this.props.college.ACTScore === undefined || this.props.college.ACTScore === null) {
			return 'Unknown';
		} else return this.props.college.ACTScore;
	};

	getStatus = () => {
		return this.state.status;
	};

	changeStatus = (newStatus) => {
		this.setState({ status: newStatus });
	};

	apply = (e) => {
		e.stopPropagation();
		console.log('apply');
	};

	checkRec = () => {
		if (this.props.college.recScore === null || this.props.recScore === undefined) {
			return true;
		} else return false;
	};

	getPercent = (type, amount) => {
		if (amount === undefined || amount === null) {
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
		if (type == 'rec') {
			return amount;
		}
	};

	getRecColor = (score) => {
		if (score < 25) return 'rgb(252, 3, 3)';
		else if (score < 50) return 'rgb(252, 207, 3)';
		else if (score < 75) return 'rgb(89, 145, 78)';
		else return 'rgb(3, 144, 252)';
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

		const college = this.props.college;

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
			rec: {
				symbol: college.recScore,
				color: this.getRecColor(college.recScore),
			},
		};

		return (
			<div
				className='collegeCardSearched'
				onClick={this.props.goAppTracker.bind(this, college.collegeName)}
			>
				<div className='collegeBoxTitle'>
					<div className='collegeTitle'> {this.getName()} </div>
					<button id='applyBtn' onClick={this.apply}>
						Apply
					</button>
				</div>
				<div className='collegeLocation'>
					{' '}
					{this.getCity() + ', ' + this.getState()}
					<button
						id='goSimilarBtn'
						onClick={(e) => {
							e.stopPropagation();
							this.props.goSimiarStudents(this.props.college.collegeName);
						}}
					>
						{' '}
						Similar Students{' '}
					</button>
				</div>
				<div className='collegeType'>
					{' '}
					{this.getType() +
						' | ' +
						this.getAdmissionRate() +
						' Acceptance Rate | ' +
						this.getCompletionRate() +
						' Completion | Rank: ' +
						this.getRank()}{' '}
				</div>
				<div className='collegeBoxSizeAndMath'>
					<div className='collegeSize1'>{'Size:'}</div>
					<div className='collegeMath1'>
						{'Average SAT Math: '}
						<span className='collegeMath2'>{this.getMathScore()}</span>
					</div>
				</div>
				<div className='collegeBoxSizeAndBar'>
					<div className='collegeSize2'> {this.getSize()} </div>
					<span className='collegeText'>0</span>
					<Progress
						className='mathBar'
						percent={this.getPercent('math', college.SATMathScore)}
						status='math'
						theme={theme}
					/>
				</div>
				<div className='collegeBoxCostAndEnglish'>
					<div className='collegeCost1'> {'Avg Price:'} </div>
					<div className='collegeEnglish1'>
						{'Average SAT EBRW: '}
						<span className='collegeEnglish2'>{this.getEnglishScore()}</span>
					</div>
				</div>
				<div className='collegeBoxCostAndBar'>
					<div className='collegeCost2'> {this.getPrice()} </div>
					<span className='collegeText'>0</span>
					<Progress
						className='ebrwBar'
						percent={this.getPercent('ebrw', college.SATEBRWScore)}
						status='EBRW'
						theme={theme}
					/>
				</div>
				<div className='collegeBoxDebtAndACT'>
					<div className='collegeDebt1'> {'Avg Debt:'} </div>
					<div className='collegeACT1'>
						{'Average ACT: '}
						<span className='collegeACT2'>{this.getACTScore()}</span>
					</div>
				</div>
				<div className='collegeBoxDebtAndBar'>
					<div className='collegeDebt2'> {this.getDebt()} </div>
					<span className='collegeText'>0</span>
					<Progress
						className='ACTBar'
						percent={this.getPercent('act', college.ACTScore)}
						status='ACT'
						theme={theme}
					/>
				</div>
				<div hidden={this.checkRec()}>
					<Progress
						style={{ left: '410px' }}
						type='circle'
						width={120}
						symbolClassName='reccomendBar'
						percent={this.getPercent('rec', college.recScore)}
						status='rec'
						theme={theme}
					/>
				</div>
			</div>
		);
	}
}

export default FilteredCollege;
