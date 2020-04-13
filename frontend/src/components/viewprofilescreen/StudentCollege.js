import React from 'react';
//import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { firestoreConnect } from 'react-redux-firebase';
//import { tsConstructSignatureDeclaration } from '@babel/types';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class StudentCollege extends React.Component {
	state = {
		status: this.props.college.status,
	};

	//cuts a name short if the name of the college is too long for the card
	getName = () => {
		if (this.props.college.name.length > 32) {
			let tempName = this.props.college.name.substring(0, 30) + '...';
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

		const dropdownOptions = [
			'pending',
			'accepted',
			'denied',
			'deferred',
			'wait-listed',
			'withdrawn',
		];
		const defaultOption = dropdownOptions[0];

		return (
			<div className='collegeCard'>
				<div className='collegeBoxTitleAndStatus'>
					<div className='collegeTitle'> {this.getName()} </div>
					<Dropdown
						disabled={this.props.disabled}
						options={dropdownOptions}
						onChange={this._onSelect}
						value={this.getStatus()}
						placeholder='Select an option'
					/>
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
				<Progress
					style={{ left: '410px' }}
					type='circle'
					width={120}
					symbolClassName='reccomendBar'
					percent={this.getPercent('rec', college.reccomendScore)}
					status='rec'
					theme={theme}
				/>
			</div>
		);
	}
}

export default StudentCollege;
/*

 <a className='dropdown-trigger btn' href='#' data-target={'dropdown' + college.key}> {this.getStatus()} </a>
                    <ul id={'dropdown' + college.key} className='dropdown-content'>
                        <li><a href="#!" onClick={this.changeStatus.bind(this.self, "pending")}>pending</a></li>
                        <li className="divider" tabindex="-1"></li>
                        <li><a href="#!" onClick={this.changeStatus.bind(this.self, "accepted")}>accepted</a></li>
                        <li className="divider" tabindex="-1"></li>
                        <li><a href="#!" onClick={this.changeStatus.bind(this.self, "denied")}>denied</a></li>
                        <li className="divider" tabindex="-1"></li>
                        <li><a href="#!" onClick={this.changeStatus.bind(this.self, "deferred")}>deferred</a></li>
                        <li className="divider" tabindex="-1"></li>
                        <li><a href="#!" onClick={this.changeStatus.bind(this.self, "wait-listed")}>wait-listed</a></li>
                        <li className="divider" tabindex="-1"></li>
                        <li><a href="#!" onClick={this.changeStatus.bind(this.self, "withdrawn")}>withdrawn</a></li>
                    </ul>



<ul className="collapsible">
<li>
    <div className="collapsible-header" id="collegeBanner"> 
        <div className="collegeTitleText"> {college.name} </div> 
        <div className="collegeTitleText"> {college.location} </div> 
        <div className="collegeTitleText"> {college.ranking} </div> 
        <div className="collegeTitleText"> {college.size} </div> 
        <div className="collegeTitleText"> {college.admission_rate} %</div> 
    </div>
    <div className="collapsible-body" >
        <div id="collegeBody">
            <div className="collegeMoney">
                <span className="collegeBodyText"> Avg Cost: {'$' + college.cost} </span> 
                <span className="collegeBodyText"> Avg Debt: {'$' + college.debt} </span> 
            </div>
            <span className="collegeBodyText"> Completion Rate:  {college.completion_rate + '%'} </span> 
            <span className="collegeBodyText"> Type:  {college.type} </span> 
            <div className="collegeScores">
                <span className="collegeBodyText"> Avg Math SAT: {college.avg_SAT_Math} </span> 
                <span className="collegeBodyText"> Avg EBRW: {college.avg_EBRW} </span>
                <span className="collegeBodyText"> Avg ACT: {college.avg_ACT} </span>  
            </div>
            <span className="collegeBodyText"> Admission Status: </span> 
            <a className='dropdown-trigger btn' href='#' data-target='dropdown1'> {this.getStatus()} </a>
            <ul id='dropdown1' className='dropdown-content'>
                <li><a href="#!">pending</a></li>
                <li className="divider" tabindex="-1"></li>
                <li><a href="#!">accepted</a></li>
                <li className="divider" tabindex="-1"></li>
                <li><a href="#!">denied</a></li>
                <li className="divider" tabindex="-1"></li>
                <li><a href="#!">deferred</a></li>
                <li className="divider" tabindex="-1"></li>
                <li><a href="#!">wait-listed</a></li>
                <li className="divider" tabindex="-1"></li>
                <li><a href="#!">withdrawn</a></li>
            </ul>
        </div>
    </div>
</li>
</ul>*/
