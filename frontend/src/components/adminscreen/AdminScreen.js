import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';

export class AdminScreen extends Component {
	state = {};

	render() {
		return (
			<div className='admin_screen_container'>
				<div className='adminContainer'>
					<div id='adminBanner'>
						<div></div>
						<span className='adminTitleText'> Admin functions </span>
					</div>
					<button className='adminBtn'> Scrape College Rankings </button>
					<button className='adminBtn'> Import College Scorecard data file </button>
					<button className='adminBtn'> Scrape CollegeData.com </button>
					<button className='adminBtn'> Delete all Student Profiles </button>
					<button className='adminBtn'> Import Student Profile Dataset </button>
					<button className='adminBtn'> Review Questionable acceptance decisions </button>
				</div>
			</div>
		);
	}
}

export default AdminScreen;
