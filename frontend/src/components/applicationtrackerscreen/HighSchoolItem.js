import React from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

import { Link } from 'react-router-dom';

class HighSchoolItem extends React.Component {
	getName = () => {
		let name = this.props.highschool.name;
		if (name === null || name === undefined) {
			return 'Unknown name';
		}
		if (name.length > 21) {
			let tempName = name.substring(0, 20) + '...';
			return tempName;
		} else return name;
	};

	render() {
		const highschool = this.props.highschool;

		return (
			<div className='trackerHighschoolItem'>
				<span> {this.getName()} </span>
				<Link
					to={{
						pathname:
							'/applicationTracker/' +
							this.props.college.collegeName +
							'/highSchools/' +
							highschool.name,
						state: {
							college: this.props.college,
						},
					}}
				>
					<button
						className='similarHSBtn'
						//onClick={this.props.goSimilarHighSchools.bind(this.self, highschool.name)}
					>
						{' '}
						Similar{' '}
					</button>
				</Link>

				<button
					className='deleteHSBtn'
					onClick={this.props.deleteHighschool.bind(this.self, highschool.key)}
				>
					{' '}
					X{' '}
				</button>
			</div>
		);
	}
}

export default HighSchoolItem;
