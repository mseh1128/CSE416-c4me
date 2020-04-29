import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import M from 'materialize-css';
import PropTypes from 'prop-types';
import axios from 'axios';
import HighSchoolList from './HighSchoolList';

export class PossibleHighSchoolsScreen extends Component {
	state = {
		componentFinishedLoad: false,
		college: '',
	};

	getName = (name) => {
		if (name.length > 60) {
			let tempName = name.substring(0, 59) + '...';
			return tempName;
		} else return name;
	};

	componentDidMount = () => {
		const college = this.props.location.state.college;
		this.setState({ college: college });
	};

	render() {
		var elem = document.querySelector('.tabs');
		var options = {};
		var instance = M.Tabs.init(elem, options);

		document.addEventListener('DOMContentLoaded', function () {
			var elems = document.querySelectorAll('select');
			var instances = M.FormSelect.init(elems, options);
		});

		if (false) {
			return <div>Loading...</div>;
		}

		return (
			<div className='similar_HSscreen_container'>
				<div className='schoolsContainer'>
					<div id='hsBanner'>
						<div></div>
						<span className='collegeTitleText'>Specify the Highschool: </span>
						<div />
					</div>
					<div id='similarHighSchoolsList'>
						<HighSchoolList college={this.state.college}></HighSchoolList>
					</div>
				</div>
			</div>
		);
	}
}

export default PossibleHighSchoolsScreen;
