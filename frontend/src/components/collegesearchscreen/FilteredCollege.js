import React from 'react';
import { Link } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

class FilteredCollege extends React.Component {
	state = {
		status: this.props.college.status,
	};

	getName = () => {
		if (this.props.college.name.length > 49) {
			let tempName = this.props.college.name.substring(0, 48) + '...';
			return tempName;
		} else return this.props.college.name;
	};

	getStatus = () => {
		return this.state.status;
	};

	changeStatus = (newStatus) => {
		this.setState({ status: newStatus });
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
				symbol: college.reccomendScore,
				color: this.getRecColor(college.reccomendScore),
			},
		};

		return (
			<Link to={'/applicationTracker/' + college.key} className='collegeCardSearched'>
				<div className='collegeBoxTitle'>
					<div className='collegeTitle'> {this.getName()} </div>
				</div>
				<div className='collegeLocation'> {college.location} </div>
				<div className='collegeType'>
					{' '}
					{college.type +
						' | ' +
						college.admission_rate +
						'% Acceptance Rate | ' +
						college.completion_rate +
						'% Completion Rate | Rank: ' +
						college.ranking}{' '}
				</div>
				<div className='collegeBoxSizeAndMath'>
					<div className='collegeSize1'>{'Size:'}</div>
					<div className='collegeMath1'>
						{'Average SAT Math: '}
						<span className='collegeMath2'>{college.avg_SAT_Math}</span>
					</div>
				</div>
				<div className='collegeBoxSizeAndBar'>
					<div className='collegeSize2'> {college.size} </div>
					<span className='collegeText'>0</span>
					<Progress
						className='mathBar'
						percent={this.getPercent('math', college.avg_SAT_Math)}
						status='math'
						theme={theme}
					/>
				</div>
				<div className='collegeBoxCostAndEnglish'>
					<div className='collegeCost1'> {'Avg Price:'} </div>
					<div className='collegeEnglish1'>
						{'Average SAT EBRW: '}
						<span className='collegeEnglish2'>{college.avg_EBRW}</span>
					</div>
				</div>
				<div className='collegeBoxCostAndBar'>
					<div className='collegeCost2'> {'$' + college.cost} </div>
					<span className='collegeText'>0</span>
					<Progress
						className='ebrwBar'
						percent={this.getPercent('ebrw', college.avg_EBRW)}
						status='EBRW'
						theme={theme}
					/>
				</div>
				<div className='collegeBoxDebtAndACT'>
					<div className='collegeDebt1'> {'Avg Debt:'} </div>
					<div className='collegeACT1'>
						{'Average ACT: '}
						<span className='collegeACT2'>{college.avg_ACT}</span>
					</div>
				</div>
				<div className='collegeBoxDebtAndBar'>
					<div className='collegeDebt2'> {'$' + college.debt} </div>
					<span className='collegeText'>0</span>
					<Progress
						className='ACTBar'
						percent={this.getPercent('act', college.avg_ACT)}
						status='ACT'
						theme={theme}
					/>
				</div>
			</Link>
		);
	}
}

export default FilteredCollege;
