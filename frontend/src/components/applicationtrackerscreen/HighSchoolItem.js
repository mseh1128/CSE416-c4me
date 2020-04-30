import React from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

import { Link } from 'react-router-dom';

import axios from 'axios';

class HighSchoolItem extends React.Component {
  state = {
    highschools: '',
  };

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

  componentDidMount = async () => {
    try {
      const potentialHighSchools = await axios.get('/getHighSchoolFromName', {
        params: {
          highSchoolName: this.props.highschool.name,
        },
      });
      console.log(potentialHighSchools.data);
      this.setState({ highschools: potentialHighSchools.data });
    } catch (err) {
      console.log(err);
    }
  };

  getLink = () => {
    console.log(this.state.highschools);
    console.log(this.state.highschools.length);
    console.log(this.props.college);
    let link = {};

    if (this.state.highschools.length === 0) {
    } else if (this.state.highschools.length === 1) {
      link = {
        pathname:
          '/applicationTracker/' +
          this.props.college.collegeName +
          '/highSchools/' +
          this.props.highschool.name,
        state: {
          college: this.props.college,
        },
      };
    } else if (this.state.highschools.length > 1) {
      link = {
        pathname:
          '/applicationTracker/' +
          this.props.college.collegeName +
          '/possibleHighSchools',
        state: {
          college: this.props.college,
          highschoolName: this.props.highschool.name,
        },
      };
      console.log(link);
    }
    return link;
  };

  render() {
    const highschool = this.props.highschool;

    return (
      <div className='trackerHighschoolItem'>
        <span> {this.getName()} </span>
        <Link to={this.getLink()}>
          <button className='similarHSBtn'> Similar </button>
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
