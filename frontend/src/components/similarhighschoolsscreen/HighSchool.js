import React from 'react';

import { Link } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

class HighSchool extends React.Component {
	state = {};

	getName = () => {
		if (this.props.highschool.name === null || this.props.highschool.name === undefined) {
			return 'Unknown name';
		}
		if (this.props.highschool.name.length > 34) {
			let tempName = this.props.highschool.name.substring(0, 33) + '...';
			return tempName;
		} else return this.props.highschool.name;
	};

	getValue = (value) => {
		if (value === null || value === undefined) return '';
		else return value;
	};

	getCity = () => {
		if (this.props.highschool.city === undefined || this.props.highschool.city === null) {
			return 'Unknown';
		} else return this.props.highschool.city;
	};

	getState = () => {
		if (this.props.highschool.state === undefined || this.props.highschool.state === null) {
			return 'Unknown';
		} else return this.props.highschool.state;
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

		const highschool = this.props.highschool;

		return (
			<div className='highschoolCard'>
				<div className='highschoolBoxTitle'>
					<div className='highschoolTitle'> {this.getName()} </div>
				</div>
				<div className='highschoolLocation'>{this.getCity() + ', ' + this.getState()}</div>
			</div>
		);
	}
}

export default HighSchool;
