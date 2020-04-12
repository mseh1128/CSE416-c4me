import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { firestoreConnect } from 'react-redux-firebase';
import M from 'materialize-css';
import Add from '@material-ui/icons/Add';
import Down from '@material-ui/icons/ExpandMore';
import Up from '@material-ui/icons/ExpandLess';
import PropTypes from 'prop-types';
import { Range, getTrackBackground } from 'react-range';
import axios from 'axios';

import FilteredCollegesList from './FilteredCollegesList.js';
import MajorFiltersList from './MajorFiltersList';

import data from '../test/TestCollegeData.json';

const admissionRateStep = 0.1;
const admissionRateMin = 0;
const admissionRateMax = 100;

const costOfAttendanceStep = 0.1;
const costOfAttendanceMin = 0;
const costOfAttendanceMax = 500000;

const rankStep = 1;
const rankMin = 1;
const rankMax = 1000;

const sizeStep = 1;
const sizeMin = 1;
const sizeMax = 20000;

const avgSATStep = 1;
const avgSATMin = 200;
const avgSATMax = 800;

const avgACTStep = 1;
const avgACTMin = 1;
const avgACTMax = 36;

export class CollegeSearchScreen extends Component {
  state = {
    major: '',
    majorIndex: 0,
    majorList: [],
    currentSortType: 'nameUp',
    currentSortIncreasing: true,
    colleges: [],
    filters: {
      admissionRateValues: [0, 100],
      costOfAttendanceValues: [0, 500000],
      rank: [1, 1000],
      size: [1, 20000],
      avgMathScore: [200, 800],
      avgEBRWScore: [200, 800],
      avgACTScore: [1, 36],
      location: '',
      major1: '',
      major2: '',
      strict: false,
      name: '',
    },
  };

  componentDidMount = async () => {
    try {
      const allColleges = await axios.get('/getAllColleges');
      const { data } = allColleges;
      // by default shows all colleges
      this.setState({ colleges: data });
    } catch (err) {
      console.log(err);
      console.log('Error occurred, could not retrieve all colleges');
    }
  };

  goCollegeSearch = () => {
    console.log('college search');
  };

  goAppTracker = (id) => {
    this.props.history.push('/applicationTracker/' + id);
  };

  makeStrict = () => {
    console.log('make strict');
  };

  updateMajor = () => {
    let newMajor = document.getElementById('major').value;
    this.setState({ major: newMajor });
    console.log(newMajor);
  };

  addMajor = () => {
    if (this.state.major === '' || this.state.majorList.length === 2) {
      return;
    }

    let newMajor = {
      name: this.state.major,
      key: this.state.majorIndex,
      id: this.state.majorIndex,
    };
    this.setState({ majorIndex: this.state.majorIndex + 1 });
    let newList = this.state.majorList;
    newList.push(newMajor);
    this.setState({ majorList: newList });
    this.setState({ major: '' });
    document.getElementById('major').value = '';

    //updates the filters state with the new majors
    let newFilters = this.state.filters;
    if (this.state.majorList[0] !== undefined) {
      newFilters.major1 = this.state.majorList[0].name;
    }
    if (this.state.majorList[1] !== undefined) {
      newFilters.major2 = this.state.majorList[1].name;
    }
    this.setState({ filters: newFilters });
  };

  deleteMajor = (key) => {
    let newList = this.state.majorList.filter((item) => item.key !== key);
    this.setState({ majorList: newList });
  };

  //deteradmissionRateMines which sorting symbol is shown
  getHidden = (type) => {
    if (this.state.currentSortType === type) return false;
    else return true;
  };

  //generalType is the sort type without direction. ex: type=nameUp, generalType=name
  getGeneralType = (type) => {
    let generalType = type.substring(0, type.length - 2);
    return generalType;
  };

  changeSort = (type) => {
    if (this.getGeneralType(this.state.currentSortType) === type) {
      if (this.state.currentSortIncreasing === true) {
        let newType = type + 'Dn';
        this.setState({ currentSortType: newType });
        this.setState({ currentSortIncreasing: false });
      } else {
        let newType = type + 'Up';
        this.setState({ currentSortType: newType });
        this.setState({ currentSortIncreasing: true });
      }
    } else {
      let newType = type + 'Up';
      this.setState({ currentSortType: newType });
      this.setState({ currentSortIncreasing: true });
    }
  };

  handleChange = (e) => {
    const { target } = e;
    let newFilters = this.state.filters;
    const id = target.id;
    newFilters[id] = target.value;
    newFilters.strict = document.getElementById('strict').checked;
    this.setState({ filters: newFilters });
    console.log(this.state.filters);
  };

  render() {
    var elem = document.querySelector('.tabs');
    var options = {};
    var instance = M.Tabs.init(elem, options);

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, options);
    });

    if (this.state.colleges === undefined || this.state.colleges.length == 0) {
      return <div>Loading...</div>;
    }

    return (
      <div className="college_screen_container">
        <div className="schoolsContainer">
          <div id="collegeListBanner">
            <div></div>
            <span className="collegeTitleText">Filtered Colleges </span>
            <span
              className="sortNameBtn"
              onClick={this.changeSort.bind(this, 'name')}
            >
              {' '}
              Name
              <div hidden={this.getHidden('nameUp')}>
                <Up id="nameUp"></Up>
              </div>
              <div hidden={this.getHidden('nameDn')}>
                <Down id="nameDown"></Down>
              </div>
            </span>
            <span
              className="sortARBtn"
              onClick={this.changeSort.bind(this, 'AR')}
            >
              {' '}
              Admission Rate
              <div hidden={this.getHidden('ARUp')}>
                <Up id="ARUp"></Up>
              </div>
              <div hidden={this.getHidden('ARDn')}>
                <Down id="ARDown"></Down>
              </div>
            </span>
            <span
              className="sortCostBtn"
              onClick={this.changeSort.bind(this, 'cost')}
            >
              {' '}
              Cost
              <div hidden={this.getHidden('costUp')}>
                <Up id="costUp"></Up>
              </div>
              <div hidden={this.getHidden('costDn')}>
                <Down id="costDown"></Down>
              </div>
            </span>
            <span
              className="sortRankBtn"
              onClick={this.changeSort.bind(this, 'rank')}
            >
              {' '}
              Rank
              <div hidden={this.getHidden('rankUp')}>
                <Up id="rankUp"></Up>
              </div>
              <div hidden={this.getHidden('rankDn')}>
                <Down id="rankDown"></Down>
              </div>
            </span>
          </div>
          <div id="collegeList">
            <FilteredCollegesList
              goAppTracker={this.goAppTracker}
              colleges={this.state.colleges}
            />
          </div>
        </div>
        <div className="filtersContainer">
          <div className="filtersBanner">
            <span id="filterHeaderText">Filters:</span>
            <form action="#" id="strictBoxLocation">
              <p>
                <label id="strictBox">
                  <input
                    type="checkbox"
                    id="strict"
                    onChange={this.handleChange}
                  />
                  <span id="strictText">Strict</span>
                </label>
              </p>
            </form>
          </div>
          <div className="input-field" id="nameFilter">
            <input id="name" type="text" onChange={this.handleChange}></input>
            <label htmlFor="name">College Name</label>
          </div>

          <div className="admissionRateFilter">
            <span id="filtersText">Admission Rate</span>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Range
                values={this.state.filters.admissionRateValues}
                step={admissionRateStep}
                min={admissionRateMin}
                max={admissionRateMax}
                onChange={(values) =>
                  this.setState((prevState) => ({
                    filters: {
                      ...prevState.filters,
                      admissionRateValues: values,
                    },
                  }))
                }
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: '36px',
                      display: 'flex',
                      width: '60%',
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: '5px',
                        width: '100%',
                        borderRadius: '4px',
                        background: getTrackBackground({
                          values: this.state.filters.admissionRateValues,
                          colors: ['#ccc', '#548BF4', '#ccc'],
                          min: admissionRateMin,
                          max: admissionRateMax,
                        }),
                        alignSelf: 'center',
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ index, props, isDragged }) => {
                  if (index === 0) {
                    return (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '30px',
                          width: '30px',
                          borderRadius: '4px',
                          backgroundColor: '#FFF',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          boxShadow: '0px 2px 6px #AAA',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: '3px',
                            left: '-40px',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            fontFamily:
                              'Arial,Helvetica Neue,Helvetica,sans-serif',
                            padding: '4px',
                            borderRadius: '4px',
                            backgroundColor: '#548BF4',
                          }}
                        >
                          {this.state.filters.admissionRateValues[
                            index
                          ].toFixed(1)}
                        </div>
                        <div
                          style={{
                            height: '16px',
                            width: '5px',
                            backgroundColor: isDragged ? '#548BF4' : '#CCC',
                          }}
                        />
                      </div>
                    );
                  }
                  return (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '30px',
                        width: '30px',
                        borderRadius: '4px',
                        backgroundColor: '#FFF',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 2px 6px #AAA',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: '3px',
                          right: '-50px',
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: '14px',
                          fontFamily:
                            'Arial,Helvetica Neue,Helvetica,sans-serif',
                          padding: '4px',
                          borderRadius: '4px',
                          backgroundColor: '#548BF4',
                        }}
                      >
                        {this.state.filters.admissionRateValues[index].toFixed(
                          index
                        )}
                      </div>
                      <div
                        style={{
                          height: '16px',
                          width: '5px',
                          backgroundColor: isDragged ? '#548BF4' : '#CCC',
                        }}
                      />
                    </div>
                  );
                }}
              />
            </div>
          </div>

          <div className="costFilter">
            <span id="filtersText">Cost of Attendance</span>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Range
                values={this.state.filters.costOfAttendanceValues}
                step={costOfAttendanceStep}
                min={costOfAttendanceMin}
                max={costOfAttendanceMax}
                onChange={(values) =>
                  this.setState((prevState) => ({
                    filters: {
                      ...prevState.filters,
                      costOfAttendanceValues: values,
                    },
                  }))
                }
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: '36px',
                      display: 'flex',
                      width: '60%',
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: '5px',
                        width: '100%',
                        borderRadius: '4px',
                        background: getTrackBackground({
                          values: this.state.filters.costOfAttendanceValues,
                          colors: ['#ccc', '#548BF4', '#ccc'],
                          min: costOfAttendanceMin,
                          max: costOfAttendanceMax,
                        }),
                        alignSelf: 'center',
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ index, props, isDragged }) => {
                  if (index === 0) {
                    return (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '30px',
                          width: '30px',
                          borderRadius: '4px',
                          backgroundColor: '#FFF',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          boxShadow: '0px 2px 6px #AAA',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: '3px',
                            left: '-35px',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            fontFamily:
                              'Arial,Helvetica Neue,Helvetica,sans-serif',
                            padding: '4px',
                            borderRadius: '4px',
                            backgroundColor: '#548BF4',
                          }}
                        >
                          {this.state.filters.costOfAttendanceValues[
                            index
                          ].toFixed(1)}
                        </div>
                        <div
                          style={{
                            height: '16px',
                            width: '5px',
                            backgroundColor: isDragged ? '#548BF4' : '#CCC',
                          }}
                        />
                      </div>
                    );
                  }
                  return (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '30px',
                        width: '30px',
                        borderRadius: '4px',
                        backgroundColor: '#FFF',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 2px 6px #AAA',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: '3px',
                          right: '-50px',
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: '14px',
                          fontFamily:
                            'Arial,Helvetica Neue,Helvetica,sans-serif',
                          padding: '4px',
                          borderRadius: '4px',
                          backgroundColor: '#548BF4',
                        }}
                      >
                        {this.state.filters.costOfAttendanceValues[
                          index
                        ].toFixed(index)}
                      </div>
                      <div
                        style={{
                          height: '16px',
                          width: '5px',
                          backgroundColor: isDragged ? '#548BF4' : '#CCC',
                        }}
                      />
                    </div>
                  );
                }}
              />
            </div>
          </div>
          <div className="rankFilter">
            <span id="filtersText">Rank</span>
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Range
                  values={this.state.filters.rank}
                  step={rankStep}
                  min={rankMin}
                  max={rankMax}
                  onChange={(values) =>
                    this.setState((prevState) => ({
                      filters: {
                        ...prevState.filters,
                        rank: values,
                      },
                    }))
                  }
                  renderTrack={({ props, children }) => (
                    <div
                      onMouseDown={props.onMouseDown}
                      onTouchStart={props.onTouchStart}
                      style={{
                        ...props.style,
                        height: '36px',
                        display: 'flex',
                        width: '60%',
                      }}
                    >
                      <div
                        ref={props.ref}
                        style={{
                          height: '5px',
                          width: '100%',
                          borderRadius: '4px',
                          background: getTrackBackground({
                            values: this.state.filters.rank,
                            colors: ['#ccc', '#548BF4', '#ccc'],
                            min: rankMin,
                            max: rankMax,
                          }),
                          alignSelf: 'center',
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  )}
                  renderThumb={({ index, props, isDragged }) => {
                    if (index === 0) {
                      return (
                        <div
                          {...props}
                          style={{
                            ...props.style,
                            height: '30px',
                            width: '30px',
                            borderRadius: '4px',
                            backgroundColor: '#FFF',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0px 2px 6px #AAA',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: '3px',
                              left: '-35px',
                              color: '#fff',
                              fontWeight: 'bold',
                              fontSize: '14px',
                              fontFamily:
                                'Arial,Helvetica Neue,Helvetica,sans-serif',
                              padding: '4px',
                              borderRadius: '4px',
                              backgroundColor: '#548BF4',
                            }}
                          >
                            {this.state.filters.rank[index].toFixed(1)}
                          </div>
                          <div
                            style={{
                              height: '16px',
                              width: '5px',
                              backgroundColor: isDragged ? '#548BF4' : '#CCC',
                            }}
                          />
                        </div>
                      );
                    }
                    return (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '30px',
                          width: '30px',
                          borderRadius: '4px',
                          backgroundColor: '#FFF',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          boxShadow: '0px 2px 6px #AAA',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: '3px',
                            right: '-50px',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            fontFamily:
                              'Arial,Helvetica Neue,Helvetica,sans-serif',
                            padding: '4px',
                            borderRadius: '4px',
                            backgroundColor: '#548BF4',
                          }}
                        >
                          {this.state.filters.rank[index].toFixed(index)}
                        </div>
                        <div
                          style={{
                            height: '16px',
                            width: '5px',
                            backgroundColor: isDragged ? '#548BF4' : '#CCC',
                          }}
                        />
                      </div>
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div className="sizeFilter">
            <span id="filtersText">Size</span>
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Range
                  values={this.state.filters.size}
                  step={sizeStep}
                  min={sizeMin}
                  max={sizeMax}
                  onChange={(values) =>
                    this.setState((prevState) => ({
                      filters: {
                        ...prevState.filters,
                        size: values,
                      },
                    }))
                  }
                  renderTrack={({ props, children }) => (
                    <div
                      onMouseDown={props.onMouseDown}
                      onTouchStart={props.onTouchStart}
                      style={{
                        ...props.style,
                        height: '36px',
                        display: 'flex',
                        width: '60%',
                      }}
                    >
                      <div
                        ref={props.ref}
                        style={{
                          height: '5px',
                          width: '100%',
                          borderRadius: '4px',
                          background: getTrackBackground({
                            values: this.state.filters.size,
                            colors: ['#ccc', '#548BF4', '#ccc'],
                            min: sizeMin,
                            max: sizeMax,
                          }),
                          alignSelf: 'center',
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  )}
                  renderThumb={({ index, props, isDragged }) => {
                    if (index === 0) {
                      return (
                        <div
                          {...props}
                          style={{
                            ...props.style,
                            height: '30px',
                            width: '30px',
                            borderRadius: '4px',
                            backgroundColor: '#FFF',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0px 2px 6px #AAA',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: '3px',
                              left: '-35px',
                              color: '#fff',
                              fontWeight: 'bold',
                              fontSize: '14px',
                              fontFamily:
                                'Arial,Helvetica Neue,Helvetica,sans-serif',
                              padding: '4px',
                              borderRadius: '4px',
                              backgroundColor: '#548BF4',
                            }}
                          >
                            {this.state.filters.size[index].toFixed(1)}
                          </div>
                          <div
                            style={{
                              height: '16px',
                              width: '5px',
                              backgroundColor: isDragged ? '#548BF4' : '#CCC',
                            }}
                          />
                        </div>
                      );
                    }
                    return (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '30px',
                          width: '30px',
                          borderRadius: '4px',
                          backgroundColor: '#FFF',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          boxShadow: '0px 2px 6px #AAA',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: '3px',
                            right: '-50px',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            fontFamily:
                              'Arial,Helvetica Neue,Helvetica,sans-serif',
                            padding: '4px',
                            borderRadius: '4px',
                            backgroundColor: '#548BF4',
                          }}
                        >
                          {this.state.filters.size[index].toFixed(index)}
                        </div>
                        <div
                          style={{
                            height: '16px',
                            width: '5px',
                            backgroundColor: isDragged ? '#548BF4' : '#CCC',
                          }}
                        />
                      </div>
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div className="scoreFilter">
            <span id="filtersText">Average Math Score</span>
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Range
                  values={this.state.filters.avgMathScore}
                  step={avgSATStep}
                  min={avgSATMin}
                  max={avgSATMax}
                  onChange={(values) =>
                    this.setState((prevState) => ({
                      filters: {
                        ...prevState.filters,
                        avgMathScore: values,
                      },
                    }))
                  }
                  renderTrack={({ props, children }) => (
                    <div
                      onMouseDown={props.onMouseDown}
                      onTouchStart={props.onTouchStart}
                      style={{
                        ...props.style,
                        height: '36px',
                        display: 'flex',
                        width: '60%',
                      }}
                    >
                      <div
                        ref={props.ref}
                        style={{
                          height: '5px',
                          width: '100%',
                          borderRadius: '4px',
                          background: getTrackBackground({
                            values: this.state.filters.avgMathScore,
                            colors: ['#ccc', '#548BF4', '#ccc'],
                            min: avgSATMin,
                            max: avgSATMax,
                          }),
                          alignSelf: 'center',
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  )}
                  renderThumb={({ index, props, isDragged }) => {
                    if (index === 0) {
                      return (
                        <div
                          {...props}
                          style={{
                            ...props.style,
                            height: '30px',
                            width: '30px',
                            borderRadius: '4px',
                            backgroundColor: '#FFF',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0px 2px 6px #AAA',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: '3px',
                              left: '-35px',
                              color: '#fff',
                              fontWeight: 'bold',
                              fontSize: '14px',
                              fontFamily:
                                'Arial,Helvetica Neue,Helvetica,sans-serif',
                              padding: '4px',
                              borderRadius: '4px',
                              backgroundColor: '#548BF4',
                            }}
                          >
                            {this.state.filters.avgMathScore[index].toFixed(1)}
                          </div>
                          <div
                            style={{
                              height: '16px',
                              width: '5px',
                              backgroundColor: isDragged ? '#548BF4' : '#CCC',
                            }}
                          />
                        </div>
                      );
                    }
                    return (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '30px',
                          width: '30px',
                          borderRadius: '4px',
                          backgroundColor: '#FFF',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          boxShadow: '0px 2px 6px #AAA',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: '3px',
                            right: '-50px',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            fontFamily:
                              'Arial,Helvetica Neue,Helvetica,sans-serif',
                            padding: '4px',
                            borderRadius: '4px',
                            backgroundColor: '#548BF4',
                          }}
                        >
                          {this.state.filters.avgMathScore[index].toFixed(
                            index
                          )}
                        </div>
                        <div
                          style={{
                            height: '16px',
                            width: '5px',
                            backgroundColor: isDragged ? '#548BF4' : '#CCC',
                          }}
                        />
                      </div>
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div className="scoreFilter">
            <span id="filtersText">Average EBRW Score</span>
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Range
                  values={this.state.filters.avgEBRWScore}
                  step={avgSATStep}
                  min={avgSATMin}
                  max={avgSATMax}
                  onChange={(values) =>
                    this.setState((prevState) => ({
                      filters: {
                        ...prevState.filters,
                        avgEBRWScore: values,
                      },
                    }))
                  }
                  renderTrack={({ props, children }) => (
                    <div
                      onMouseDown={props.onMouseDown}
                      onTouchStart={props.onTouchStart}
                      style={{
                        ...props.style,
                        height: '36px',
                        display: 'flex',
                        width: '60%',
                      }}
                    >
                      <div
                        ref={props.ref}
                        style={{
                          height: '5px',
                          width: '100%',
                          borderRadius: '4px',
                          background: getTrackBackground({
                            values: this.state.filters.avgEBRWScore,
                            colors: ['#ccc', '#548BF4', '#ccc'],
                            min: avgSATMin,
                            max: avgSATMax,
                          }),
                          alignSelf: 'center',
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  )}
                  renderThumb={({ index, props, isDragged }) => {
                    if (index === 0) {
                      return (
                        <div
                          {...props}
                          style={{
                            ...props.style,
                            height: '30px',
                            width: '30px',
                            borderRadius: '4px',
                            backgroundColor: '#FFF',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0px 2px 6px #AAA',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: '3px',
                              left: '-35px',
                              color: '#fff',
                              fontWeight: 'bold',
                              fontSize: '14px',
                              fontFamily:
                                'Arial,Helvetica Neue,Helvetica,sans-serif',
                              padding: '4px',
                              borderRadius: '4px',
                              backgroundColor: '#548BF4',
                            }}
                          >
                            {this.state.filters.avgEBRWScore[index].toFixed(1)}
                          </div>
                          <div
                            style={{
                              height: '16px',
                              width: '5px',
                              backgroundColor: isDragged ? '#548BF4' : '#CCC',
                            }}
                          />
                        </div>
                      );
                    }
                    return (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '30px',
                          width: '30px',
                          borderRadius: '4px',
                          backgroundColor: '#FFF',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          boxShadow: '0px 2px 6px #AAA',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: '3px',
                            right: '-50px',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            fontFamily:
                              'Arial,Helvetica Neue,Helvetica,sans-serif',
                            padding: '4px',
                            borderRadius: '4px',
                            backgroundColor: '#548BF4',
                          }}
                        >
                          {this.state.filters.avgEBRWScore[index].toFixed(
                            index
                          )}
                        </div>
                        <div
                          style={{
                            height: '16px',
                            width: '5px',
                            backgroundColor: isDragged ? '#548BF4' : '#CCC',
                          }}
                        />
                      </div>
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div className="scoreFilter">
            <span id="filtersText">Average ACT Score</span>
            <div>
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <Range
                    values={this.state.filters.avgACTScore}
                    step={avgACTStep}
                    min={avgACTMin}
                    max={avgACTMax}
                    onChange={(values) =>
                      this.setState((prevState) => ({
                        filters: {
                          ...prevState.filters,
                          avgACTScore: values,
                        },
                      }))
                    }
                    renderTrack={({ props, children }) => (
                      <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                          ...props.style,
                          height: '36px',
                          display: 'flex',
                          width: '60%',
                        }}
                      >
                        <div
                          ref={props.ref}
                          style={{
                            height: '5px',
                            width: '100%',
                            borderRadius: '4px',
                            background: getTrackBackground({
                              values: this.state.filters.avgACTScore,
                              colors: ['#ccc', '#548BF4', '#ccc'],
                              min: avgACTMin,
                              max: avgACTMax,
                            }),
                            alignSelf: 'center',
                          }}
                        >
                          {children}
                        </div>
                      </div>
                    )}
                    renderThumb={({ index, props, isDragged }) => {
                      if (index === 0) {
                        return (
                          <div
                            {...props}
                            style={{
                              ...props.style,
                              height: '30px',
                              width: '30px',
                              borderRadius: '4px',
                              backgroundColor: '#FFF',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              boxShadow: '0px 2px 6px #AAA',
                            }}
                          >
                            <div
                              style={{
                                position: 'absolute',
                                top: '3px',
                                left: '-35px',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                fontFamily:
                                  'Arial,Helvetica Neue,Helvetica,sans-serif',
                                padding: '4px',
                                borderRadius: '4px',
                                backgroundColor: '#548BF4',
                              }}
                            >
                              {this.state.filters.avgACTScore[index].toFixed(1)}
                            </div>
                            <div
                              style={{
                                height: '16px',
                                width: '5px',
                                backgroundColor: isDragged ? '#548BF4' : '#CCC',
                              }}
                            />
                          </div>
                        );
                      }
                      return (
                        <div
                          {...props}
                          style={{
                            ...props.style,
                            height: '30px',
                            width: '30px',
                            borderRadius: '4px',
                            backgroundColor: '#FFF',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0px 2px 6px #AAA',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: '3px',
                              right: '-50px',
                              color: '#fff',
                              fontWeight: 'bold',
                              fontSize: '14px',
                              fontFamily:
                                'Arial,Helvetica Neue,Helvetica,sans-serif',
                              padding: '4px',
                              borderRadius: '4px',
                              backgroundColor: '#548BF4',
                            }}
                          >
                            {this.state.filters.avgACTScore[index].toFixed(
                              index
                            )}
                          </div>
                          <div
                            style={{
                              height: '16px',
                              width: '5px',
                              backgroundColor: isDragged ? '#548BF4' : '#CCC',
                            }}
                          />
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="input-field col s12" id="locationFilter">
            <select
              className="browser-default"
              id="location"
              onChange={this.handleChange}
            >
              <option value="" defaultValue>
                Choose a Location
              </option>
              <option value="1">North East</option>
              <option value="2">Midwest</option>
              <option value="3">South</option>
              <option value="3">West</option>
            </select>
          </div>
          <div id="majorFilterContainer">
            <div className="input-field" id="majorFilter">
              <input
                id="major"
                type="text"
                onChange={this.updateMajor.bind(this)}
              ></input>
              <label htmlFor="major">Two Desired Majors</label>
            </div>
            <a
              className="btn-floating btn-large waves-effect waves-light blue"
              id="enterMajorBtn"
              onClick={this.addMajor.bind(this.self)}
            >
              <Add></Add>
            </a>
          </div>
          <div id="chosenMajorContainer">
            <MajorFiltersList
              majors={this.state.majorList}
              deleteMajor={this.deleteMajor}
            />
          </div>
          <div>
            <button className="searchCollegeBtn" onClick={this.goCollegeSearch}>
              {' '}
              Search Again{' '}
            </button>
            <button
              className="searchCollegeBtn"
              onClick={this.goCollegeReccomendation}
            >
              {' '}
              Reccomend Me Colleges{' '}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CollegeSearchScreen;
