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
    status: this.props.college.status
  };

  getName = () => {
    if (this.props.college.name.length > 51) {
      let tempName = this.props.college.name.substring(0, 50) + '...';
      return tempName;
    } else return this.props.college.name;
  };

  getStyle = key => {
    if (key % 2 === 0) return { backgroundcolor: 'lightgrey' };
    else return { color: 'white' };
  };

  getStatus = () => {
    return this.state.status;
  };

  changeStatus = newStatus => {
    this.setState({ status: newStatus });
  };

  render() {
    var elem = document.querySelector('.tabs');
    var options = {};
    var instance = M.Tabs.init(elem, options);

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.collapsible');
      var instances = M.Collapsible.init(elems, options);
    });

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.dropdown-trigger');
      var instances = M.Dropdown.init(elems, options);
    });

    const college = this.props.college;

    const dropdownOptions = [
      'pending',
      'accepted',
      'denied',
      'deferrd',
      'wait-listed',
      'withdrawn'
    ];
    const defaultOption = dropdownOptions[0];

    return (
      <div
        className={'collegeCardProfile' + (college.key % 2)}
        id={'collegecard' + college.key}
      >
        <div className="collegeBoxTitleAndStatusProfile">
          <div className="collegeTitleProfile"> {this.getName()} </div>
          <Dropdown
            disabled={this.props.disabled}
            options={dropdownOptions}
            onChange={this._onSelect}
            value={this.getStatus()}
            placeholder="Select an option"
          />
        </div>
      </div>
    );
  }
}

export default StudentCollege;
