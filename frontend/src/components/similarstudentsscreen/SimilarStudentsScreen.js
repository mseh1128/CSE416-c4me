import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { firestoreConnect } from 'react-redux-firebase';
import M from 'materialize-css';
import Undo from '@material-ui/icons/Undo';
import Down from '@material-ui/icons/ExpandMore';
import Up from '@material-ui/icons/ExpandLess';
import PropTypes from 'prop-types';
import { Range, getTrackBackground } from 'react-range';
import axios from 'axios';

import { sliderConfig } from '../../helpers/constants';
const { admissionRate, costOfAttendance, rank, size, avgSAT, avgACT } = sliderConfig;

export class SimilarStudentsScreen extends Component {
	state = {};

	goBack = () => {
		this.props.history.push('/search');
	};

	componentDidMount = async () => {
		try {
			const allColleges = await axios.get('/getAllColleges');
			const { data } = allColleges;
			// by default shows all colleges
			this.setState({ colleges: data, componentFinishedLoad: true });
		} catch (err) {
			console.log(err);
			console.log('Error occurred, could not retrieve all colleges');
		}
	};

	//deteradmissionRate.mines which sorting symbol is shown
	getHidden = (type) => {
		if (this.state.currentSortType === type) return false;
		else return true;
	};

	//generalType is the sort type without direction. ex: type=nameUp, generalType=name
	getGeneralType = (type) => {
		let generalType = type.substring(0, type.length - 2);
		return generalType;
	};

	changeSort = (type) => {
		if (this.getGeneralType(this.state.currentSortType) === type) {
			if (this.state.currentSortIncreasing === true) {
				let newType = type + 'Dn';
				this.setState({ currentSortType: newType });
				this.setState({ currentSortIncreasing: false });
			} else {
				let newType = type + 'Up';
				this.setState({ currentSortType: newType });
				this.setState({ currentSortIncreasing: true });
			}
		} else {
			let newType = type + 'Up';
			this.setState({ currentSortType: newType });
			this.setState({ currentSortIncreasing: true });
		}
	};

	sortingFunction = (a, b, ascending) => {
		// equal items sort equally
		if (a === b) {
			return 0;
		}
		// nulls sort after anything else
		else if (a === null) {
			return 1;
		} else if (b === null) {
			return -1;
		}
		// otherwise, if we're ascending, lowest sorts first
		else if (ascending) {
			return a < b ? -1 : 1;
		}
		// if descending, highest sorts first
		else {
			return a < b ? 1 : -1;
		}
	};

	sortColleges = () => {
		// nameUp
		// null results will show at the end!
		// attendance cost sorting based on avg of instate
		const { colleges, currentSortType } = this.state;
		if (currentSortType === 'nameDn') {
			return colleges.sort((a, b) => this.sortingFunction(a.collegeName, b.collegeName, true));
		} else if (currentSortType === 'nameUp') {
			return colleges.sort((a, b) => this.sortingFunction(a.collegeName, b.collegeName, false));
		} else if (currentSortType === 'ARDn') {
			return colleges.sort((a, b) =>
				this.sortingFunction(a.admissionRatePercent, b.admissionRatePercent, true)
			);
		} else if (currentSortType === 'ARUp') {
			return colleges.sort((a, b) =>
				this.sortingFunction(a.admissionRatePercent, b.admissionRatePercent, false)
			);
		} else if (currentSortType === 'costDn') {
			return colleges.sort((a, b) =>
				this.sortingFunction(a.inStateAttendanceCost, b.inStateAttendanceCost, true)
			);
		} else if (currentSortType === 'costUp') {
			return colleges.sort((a, b) =>
				this.sortingFunction(a.inStateAttendanceCost, b.inStateAttendanceCost, false)
			);
		} else if (currentSortType === 'rankDn') {
			return colleges.sort((a, b) => this.sortingFunction(a.ranking, b.ranking, true));
		} else if (currentSortType === 'rankUp') {
			return colleges.sort((a, b) => this.sortingFunction(a.ranking, b.ranking, false));
		} else {
			console.log('COULD NOT IDENTIFY CURRENT SORT TYPE!');
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

		if (
			this.state.colleges === undefined ||
			(this.state.colleges.length == 0 && !this.state.componentFinishedLoad)
		) {
			return <div>Loading...</div>;
		}
		console.log(this.state.colleges);

		return (
			<div className='similar_screen_container'>
				<div className='schoolsContainer'>
					<div id='otherProfileBanner'>
						<div></div>
						<span className='collegeTitleText'>Similar Students: </span>
						<button className='profileButton' onClick={this.goBack}>
							{' '}
							<Undo id='profileButtonSymbols' />{' '}
						</button>
						<div />
					</div>
					<div id='similarStudentsList'>similar students</div>
				</div>
			</div>
		);
	}
}

export default SimilarStudentsScreen;
