import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import M, { TapTarget } from 'materialize-css';
import Undo from '@material-ui/icons/Undo';
import PropTypes from 'prop-types';

import StudentCollegesList from './StudentCollegesList.js';

//import data from '../test/TestStudentData.json';

import axios from 'axios';

export class ViewOtherScreen extends Component {
  //current way state obtains data is temporary to assist frontend development
  state = {
    disabled: true,
    username: '',
    name: '',
    residenceState: '',
    highSchoolName: '',
    highSchoolCity: '',
    highSchoolState: '',
    highSchoolGPA: '',
    collegeClass: '',
    major1: '',
    major2: '',
    SATMath: '',
    SATEBRW: '',
    ACTEng: '',
    ACTMath: '',
    ACTReading: '',
    ACTSci: '',
    ACTComp: '',
    SATLit: '',
    SATUSHist: '',
    SATWorldHist: '',
    SATMath1: '',
    SATMath2: '',
    SATEcoBio: '',
    SATMolBio: '',
    SATChem: '',
    SATPhysics: '',
    passedAPAmount: '',
    collegesWithDecs: [],
    finishedLoading: false,
    college: '',
  };

  componentDidMount = async () => {
    const studentName = this.props.location.state.studentName;
    const college = this.props.location.state.college;

    this.setState({ college: college });

    try {
      //remember, you made a meme here.
      //before you push, change to a legitimate name
      const theVoiceOfLoveTakeYouHigher = await axios.get(
        '/getUserIDThroughOtherInfo',
        {
          params: {
            studentName: studentName,
          },
        }
      );

      const userID = theVoiceOfLoveTakeYouHigher.data.userID;
      const allData = await Promise.all([
        axios.get('/getStudentInfo', {
          params: { userID },
        }),
        axios.get('/getCollegesFromStudentDecs', {
          params: { userID },
        }),
      ]);

      const studentProfile = allData[0].data[0];
      const collegesData = allData[1].data;
      console.log(studentProfile);
      this.setState({
        ...studentProfile,
        collegesWithDecs: collegesData,
        finishedLoading: true,
      });

      console.log(this.state);
    } catch (err) {
      console.log(err);
      console.log('Error occurred, could not fetch other student');
    }
  };

  goBack = async () => {
    //const { id } = this.props.match.params;
    console.log(id);

    let queryStudentsDecisions = '';
    const id = this.state.college.collegeName;
    try {
      queryStudentsDecisions = await axios.get('/retrieveStudentsDecisions', {
        params: {
          collegeName: id,
        },
      });

      this.props.history.push({
        pathname: '/applicationTracker/' + id,
        state: {
          college: this.state.college,
          studentsWhoApplied: queryStudentsDecisions.data,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  getValue = (value) => {
    if (value === -1 || value == null) {
      return '';
    }
    return value;
  };

  getScore(score) {
    if (score === -1) {
      return 'Not taken';
    } else return score;
  }

  render() {
    var elem = document.querySelector('.tabs');
    var options = {};
    var instance = M.Tabs.init(elem, options);

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, options);
    });

    return (
      <div className="profile_screen_container">
        <div className="profileContainer">
          <div id="otherProfileBanner">
            <div />
            <span className="collegeTitleText"> Student's Profile </span>
            <button className="profileButton" onClick={this.goBack}>
              {' '}
              <Undo id="profileButtonSymbols" />{' '}
            </button>
            <div />
          </div>
          <div id="profileList">
            <div id="generalInfoList">
              <div id="generalHSHeader">
                <span className="profileHeader">General Information</span>
                <span className="profileHeader">General Education</span>
              </div>
              <div>
                <span className="profileText">Username:</span>
                <input
                  type="textfield"
                  id="username"
                  className="profilePrompt"
                  style={{ left: '43px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getValue(this.state.username)}
                ></input>
                <span className="profileText" style={{ left: '92px' }}>
                  HS Name:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="highSchoolName"
                  style={{ left: '116px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getValue(this.state.highSchoolName)}
                ></input>
              </div>
              <div>
                <span className="profileText">Name:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="nameInput"
                  style={{ left: '76px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getValue(this.state.name)}
                ></input>
                <span className="profileText" style={{ left: '125px' }}>
                  HS City:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="highSchoolCity"
                  style={{ left: '161px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getValue(this.state.highSchoolCity)}
                ></input>
              </div>
              <div>
                <span className="profileText">Residence State:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="residenceState"
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getValue(this.state.residenceState)}
                ></input>
                <span className="profileText" style={{ left: '49px' }}>
                  HS State:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="highSchoolState"
                  style={{ left: '80px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getValue(this.state.highSchoolState)}
                ></input>
              </div>
              <div>
                <span className="profileText">Desired major:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="major1"
                  style={{ left: '11px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getValue(this.state.major1)}
                ></input>
                <span className="profileText" style={{ left: '58px' }}>
                  GPA:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="highSchoolGPA"
                  style={{ left: '121px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getValue(this.state.highSchoolGPA)}
                ></input>
              </div>
              <div>
                <span className="profileText">Second major:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="major2"
                  style={{ left: '14px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChange}
                  value={this.getValue(this.state.major2)}
                ></input>
                <span className="profileText" style={{ left: '61px' }}>
                  Grad Year:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="collegeClass"
                  style={{ left: '80px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChangeNumber}
                  value={this.getValue(this.state.collegeClass)}
                ></input>
              </div>
              <div>
                <span className="profileText" style={{ left: '395px' }}>
                  AP's Passed:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  style={{ left: '405px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChangeNumber}
                  value={this.getValue(this.state.passedAPAmount)}
                ></input>
              </div>
            </div>

            <div id="collegeInfoList">
              <div id="generalCollegeHeader">
                <span className="profileHeader">Your Applications</span>
              </div>
              <StudentCollegesList
                colleges={this.state.collegesWithDecs}
                disabled={this.state.disabled}
              />
            </div>
            <div id="educationInfoList">
              <div id="generalHSHeader">
                <span className="profileHeader">SAT/ACT Scores</span>
                <span className="profileHeader">SAT Scores</span>
              </div>
              <div>
                <span className="profileText">SAT Math:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="SATMath"
                  style={{ left: '41px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChangeSAT}
                  value={this.getValue(this.state.SATMath)}
                ></input>
                <span className="profileText" style={{ left: '91px' }}>
                  US:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="SATUSHist"
                  style={{ left: '166px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChangeSAT}
                  value={this.getValue(this.state.SATUSHist)}
                ></input>
              </div>
              <div>
                <span className="profileText">SAT EBRW:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="SATEBRW"
                  style={{ left: '29px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChangeSAT}
                  value={this.getValue(this.state.SATEBRW)}
                ></input>
                <span className="profileText" style={{ left: '80px' }}>
                  World:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="SATWorldHist"
                  style={{ left: '128px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChangeSAT}
                  value={this.getValue(this.state.SATWorldHist)}
                ></input>
              </div>
              <div>
                <span className="profileText">ACT Math:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="ACTMath"
                  style={{ left: '37px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChangeACT}
                  value={this.getValue(this.state.ACTMath)}
                ></input>
                <span className="profileText" style={{ left: '87px' }}>
                  Math I:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="SATMath1"
                  style={{ left: '131px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChangeSAT}
                  value={this.getValue(this.state.SATMath1)}
                ></input>
              </div>
              <div>
                <span className="profileText">ACT English:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="ACTEng"
                  style={{ left: '20px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChangeACT}
                  value={this.getValue(this.state.ACTEng)}
                ></input>
                <span className="profileText" style={{ left: '71px' }}>
                  Math II:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="SATMath2"
                  style={{ left: '108px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChangeSAT}
                  value={this.getValue(this.state.SATMath2)}
                ></input>
              </div>
              <div>
                <span className="profileText">ACT Reading:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="ACTReading"
                  style={{ left: '14px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChangeACT}
                  value={this.getValue(this.state.ACTReading)}
                ></input>
                <span className="profileText" style={{ left: '65px' }}>
                  Eco Bio:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="SATEcoBio"
                  style={{ left: '103px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChangeSAT}
                  value={this.getValue(this.state.SATEcoBio)}
                ></input>
              </div>

              <div>
                <span className="profileText">ACT Science:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="ACTSci"
                  style={{ left: '21px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChangeACT}
                  value={this.getValue(this.state.ACTSci)}
                ></input>
                <span className="profileText" style={{ left: '72px' }}>
                  Chemistry:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="SATChem"
                  style={{ left: '88px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChangeSAT}
                  value={this.getValue(this.state.SATChem)}
                ></input>
              </div>
              <div>
                <span className="profileText">ACT Composite:</span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="ACTComp"
                  style={{ left: '-4px' }}
                  disabled={true}
                  onChange={this.handleChangeACT}
                  value={this.state.ACTComp}
                ></input>
                <span className="profileText" style={{ left: '48px' }}>
                  Physics:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="SATPhysics"
                  style={{ left: '87px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChangeSAT}
                  value={this.getValue(this.state.SATPhysics)}
                ></input>
              </div>
              <div>
                <span className="profileText" style={{ left: '400px' }}>
                  Molecular Bio:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="SATMolBio"
                  style={{ left: '388px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChangeSAT}
                  value={this.getValue(this.state.SATMolBio)}
                ></input>
              </div>
              <div>
                <span className="profileText" style={{ left: '400px' }}>
                  Literature:
                </span>
                <input
                  type="textfield"
                  className="profilePrompt"
                  id="SATLit"
                  style={{ left: '417px' }}
                  disabled={this.state.disabled}
                  onChange={this.handleChangeSAT}
                  value={this.getValue(this.state.SATLit)}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewOtherScreen;
