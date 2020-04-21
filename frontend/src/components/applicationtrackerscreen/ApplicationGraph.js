import React, { Component } from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import Add from '@material-ui/icons/Add';
import PropTypes from 'prop-types';

import data from '../test/TestCollegeData.json';

import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

export class ApplicationGraph extends Component {
	state = {
		college: this.props.college,
		students: [],
	};

	render() {
		var elem = document.querySelector('.tabs');
		var options = {};
		var instance = M.Tabs.init(elem, options);

		document.addEventListener('DOMContentLoaded', function () {
			var elems = document.querySelectorAll('select');
			var instances = M.FormSelect.init(elems, options);
		});

		const college = this.state.college;

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
			gpa: {
				symbol: '4.0',
				color: 'rgb(23, 145, 10)',
			},
		};

		return (
			<div className='tracker_screen_container'>
				<div className='schoolsContainer'>
					<div id='studentListBanner'>
						<div></div>
						<span className='collegeTitleText'> Application Graph:</span>
						<span className='collegeTitleText'>{college.name}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default ApplicationGraph;
