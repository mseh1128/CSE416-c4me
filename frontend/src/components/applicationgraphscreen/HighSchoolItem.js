import React from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

class HighSchoolItem extends React.Component {
	render() {
		const highschool = this.props.highschool;

		return (
			<div className='highschoolItem'>
				<span> {highschool.name} </span>
				<button className='deleteHSBtn' disabled={true}>
					{' '}
					X{' '}
				</button>
			</div>
		);
	}
}

export default HighSchoolItem;
