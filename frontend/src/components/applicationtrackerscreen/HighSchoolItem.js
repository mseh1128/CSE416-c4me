import React from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

class HighSchoolItem extends React.Component {
	render() {
		const highschool = this.props.highschool;

		return (
			<div className='trackerHighschoolItem'>
				<span> {highschool.name} </span>
				<button
					className='similarHSBtn'
					onClick={this.props.goSimilarHighSchools.bind(this.self, highschool.name)}
				>
					{' '}
					Similar{' '}
				</button>
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
