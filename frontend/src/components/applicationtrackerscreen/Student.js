import React from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

class Student extends React.Component {
  state = {

  };

  getName = () => {
    if (this.props.student.name.length > 20) {
      let tempName = this.props.student.name.substring(0, 20) + '...';
      return tempName;
    } else return this.props.student.name;
  };

  getMajors = () => {
    const m1 = this.props.student.major_1
    const m2 = this.props.student.major_2
    if(m1 != '' && m2 != '')
      return m1 + " | " + m2
    else if(m1 != '' && m2 === '')
      return m1
    else if(m2 != '' && m1 === '')
      return m2
    else
      return "Undecided"
  }

  getPercent = (type, amount) => {
    if (type == 'math') {
      return (amount / 800) * 100;
    }
    if (type == 'ebrw') {
      return (amount / 800) * 100;
    }
    if (type == 'act') {
      return (amount / 36) * 100;
    }
    if (type == 'rec') {
      return amount;
    }
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

    const student = this.props.student;

    let theme = {
      math: {
        symbol: '‍800',
        color: 'rgb(223, 105, 180)'
      },
      EBRW: {
        symbol: '800',
        color: 'rgb(153, 105, 180)'
      },
      ACT: {
        symbol: '36',
        color: 'rgb(23, 105, 180)'
      }
    };

    return (
      <div className="studentCard">
        <div className="studentBoxTitleAndStatus">
            <div className="collegeTitle"> {this.getName()} </div>
            <div className="studentStatus"> {student.status} </div>
        </div>
        <div className="collegeLocation"> {student.high_school_name} </div>
        <div className="collegeType">
          { this.getMajors() }
        </div>
      </div>
    );
  }
}

export default Student;
