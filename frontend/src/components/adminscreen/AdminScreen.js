import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import 'materialize-css/dist/css/materialize.min.css';

import QuestionableList from './QuestionableList.js';

export class AdminScreen extends Component {
  state = {
    scrapeCollegeRankingText: 'Click the button to start',
    importCollegeScorecardText: 'Click the button to start',
    scrapeCollegeDataText: 'Click the button to start',
    deleteAllStudentProfilesText: 'Click the button to start',
    importStudentProfileText: 'Click the button to start',
    reviewQuestionableText: 'Click the button to start',
    questionableDecisions: [],
    showDecisions: false,
  };

  scrapeCollegeRankings = async () => {
    try {
      this.setState({ scrapeCollegeRankingText: 'Loading...' });
      const res = await axios.post('/scrapeCollegeRankings');
      // by default shows all colleges
      const { data } = res;
      this.setState({
        scrapeCollegeRankingText: data,
      });
    } catch (err) {
      console.log(err);
      console.log('Error occurred');
      this.setState({ importCollegeScorecardText: 'An error occurred' });
    }
  };

  importCollegeScorecard = async () => {
    try {
      this.setState({ importCollegeScorecardText: 'Loading...' });
      const res = await axios.post('/importCollegeScorecard');
      // by default shows all colleges
      const { data } = res;
      this.setState({
        importCollegeScorecardText: data,
      });
    } catch (err) {
      console.log(err);
      console.log('Error occurred');
      this.setState({ importCollegeScorecardText: 'An error occurred' });
    }
  };

  scrapeCollegeData = async () => {
    try {
      this.setState({ scrapeCollegeDataText: 'Loading...' });
      const res = await axios.post('/scrapeCollegeData');
      // by default shows all colleges
      const { data } = res;
      this.setState({
        scrapeCollegeDataText: data,
      });
    } catch (err) {
      console.log(err);
      console.log('Error occurred');
      this.setState({ scrapeCollegeDataText: 'An error occurred' });
    }
  };

  deleteStudents = async () => {
    try {
      this.setState({ deleteAllStudentProfilesText: 'Loading...' });
      const res = await axios.delete('/deleteStudentProfiles');
      // by default shows all colleges
      const { data } = res;
      this.setState({
        deleteAllStudentProfilesText: data,
      });
    } catch (err) {
      console.log(err);
      console.log('Error occurred');
      this.setState({ deleteAllStudentProfilesText: 'An error occurred' });
    }
  };

  importStudentData = async () => {
    try {
      this.setState({ importStudentProfileText: 'Loading...' });
      const res = await axios.post('/importStudentProfiles');
      // by default shows all colleges
      const { data } = res;
      this.setState({
        importStudentProfileText: data,
      });
    } catch (err) {
      console.log(err);
      console.log('Error occurred');
      this.setState({ importStudentProfileText: 'An error occurred' });
    }
  };

  review = async () => {
    try {
      const res = await axios.get('/getQuestionableAcceptanceInfo');
      const { data } = res;
      console.log(data);
      if (data.length == 0) {
        this.setState({
          questionableDecisions: data,
          reviewQuestionableText: 'There are no questionable decisions!',
          showDecisions: false,
        });
      } else {
        this.setState({
          questionableDecisions: data,
          reviewQuestionableText: 'Questionable decisions shown below!',
          showDecisions: true,
        });
      }
    } catch (err) {
      console.log(err);
      console.log('Error occurred');
      this.setState({ reviewQuestionableText: 'An error occurred' });
    }
  };

  checkQuestionable = (college, student) => {
    console.log('check');
    const { userID } = student;
    const { collegeName } = college;
    console.log(userID);
    console.log(collegeName);
    axios
      .put('/markQuestionableDecisionFalse', {
        userID,
        collegeName,
      })
      .then((res) => {
        console.log(res.data);
        this.review();
      })
      .catch((err) => {
        console.log(err);
        console.log('Error occurred');
        this.setState({
          reviewQuestionableText:
            'Something went wrong setting the decision to false!',
        });
      });
  };

  removeQuestionable = (college, student) => {
    console.log('remove');
    const { userID } = student;
    const { collegeName } = college;
    console.log(userID);
    console.log(collegeName);
    axios
      .put('/removeQuestionableDecision', {
        userID,
        collegeName,
      })
      .then((res) => {
        console.log(res.data);
        this.review();
      })
      .catch((err) => {
        console.log(err);
        console.log('Error occurred');
        this.setState({
          reviewQuestionableText: 'Something went wrong removing the decision!',
        });
      });
  };

  render() {
    const {
      scrapeCollegeRankingText,
      importCollegeScorecardText,
      scrapeCollegeDataText,
      deleteAllStudentProfilesText,
      importStudentProfileText,
      reviewQuestionableText,
    } = this.state;
    return (
      <div className="admin_screen_container">
        <div className="adminContainer">
          <div id="adminBanner">
            <div></div>
            <span className="adminTitleText"> Admin functions </span>
          </div>
          <div id="adminBtns">
            <div>
              <button className="adminBtn" onClick={this.scrapeCollegeRankings}>
                {' '}
                Scrape College Rankings{'\n '}
              </button>
              <span className="adminTxt">{scrapeCollegeRankingText}</span>
            </div>
            <div>
              <button
                className="adminBtn"
                onClick={this.importCollegeScorecard}
              >
                {' '}
                Import College Scorecard data file{' '}
              </button>
              <span className="adminTxt">{importCollegeScorecardText}</span>
            </div>
            <div>
              <button className="adminBtn" onClick={this.scrapeCollegeData}>
                {' '}
                Scrape CollegeData.com{' '}
              </button>
              <span className="adminTxt">{scrapeCollegeDataText}</span>
            </div>
            <div>
              <button className="adminBtn" onClick={this.deleteStudents}>
                {' '}
                Delete all Student Profiles{' '}
              </button>
              <span className="adminTxt">{deleteAllStudentProfilesText}</span>
            </div>
            <div>
              <button className="adminBtn" onClick={this.importStudentData}>
                {' '}
                Import Student Profile Dataset{' '}
              </button>
              <span className="adminTxt">{importStudentProfileText}</span>
            </div>
            <div>
              <button className="adminBtn" onClick={this.review.bind(this)}>
                {' '}
                Review Questionable acceptance decisions{' '}
              </button>
              <span className="adminTxt">{reviewQuestionableText}</span>
            </div>
          </div>
          <div hidden={!this.state.showDecisions}>
            <QuestionableList
              questionableDecisions={this.state.questionableDecisions}
              removeQuestionable={this.removeQuestionable}
              checkQuestionable={this.checkQuestionable}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AdminScreen;
