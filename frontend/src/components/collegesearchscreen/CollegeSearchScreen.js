import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
//import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { firestoreConnect } from 'react-redux-firebase';

import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import Add from '@material-ui/icons/Add';
import PropTypes from 'prop-types';

import FilteredCollegesList from './FilteredCollegesList.js'
import MajorFiltersList from './MajorFiltersList'

import data from '../test/TestCollegeData.json'

export class CollegeSeachScreen extends Component {
    state = 
    {
        major: "",
        majorIndex: 0,
        majorList: []
    }

    goCollegeSearch = () => {
        console.log('college search')
    }

    makeStrict = () => {
        console.log('make strict')
    }

    updateMajor = () => {
        let newMajor = document.getElementById("major").value
        this.setState({major: newMajor})
        console.log(newMajor)
    }

    addMajor = () => {
        if(this.state.major === "" || this.state.majorList.length===2)
        {
            return
        }

        let newMajor = 
        {
            name: this.state.major,
            key: this.state.majorIndex,
            id: this.state.majorIndex
        }
        this.setState({majorIndex: this.state.majorIndex+1})
        let newList = this.state.majorList
        newList.push(newMajor)
        this.setState({majorList: newList})
        this.setState({major: ""})
        document.getElementById("major").value = ""    
    }

    deleteMajor = (key) => {
        let newList = this.state.majorList.filter(item => item.key !== key)
        this.setState({majorList: newList})
    }

    render() {

        var elem = document.querySelector('.tabs');
        var options = {}
        var instance = M.Tabs.init(elem, options);

        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems, options);
          });

        return (
            <div className="student_screen_container">
                <div className='schoolsContainer'>
                
                    <div id="collegeListBanner">
                        <div></div>
                        <span class="collegeTitleText"> Filtered Colleges </span> 
                    </div>
                    <div id="collegeList">
                        <FilteredCollegesList />  
                    </div>      
                </div>
                <div className='filtersContainer'>
                    <div className="filtersBanner">
                        <span id='filterHeaderText'>Filters:</span>
                        <form action="#" id='strictBoxLocation'>
                            <p>
                                <label id='strictBox'>
                                    <input type="checkbox" />
                                    <span id="strictText">Strict</span>
                                </label>
                            </p>
                        </form>
                    </div>
                    <div class="input-field" id='nameFilter'>
                        <input id="name" type="text" ></input>
                        <label for="name">College Name</label>
                    </div>
                    <div className="admissionRateFilter">
                        <span id='filtersText'>Admission Rate</span>
                        <div>
                            <input type="textfield" className='admissionRate' placeholder="0%" />
                            -
                            <input type="textfield" className='admissionRate' placeholder="100%"/>
                        </div>
                    </div>
                    <div className="costFilter">
                        <span id='filtersText'>Cost of Attendance</span>
                        <div>
                            <input type="textfield" className='cost' placeholder="0" />
                            -
                            <input type="textfield" className='cost' placeholder="100000"/>
                        </div>
                    </div>
                    <div className="rankFilter">
                        <span id='filtersText'>Rank</span>
                        <div>
                            <input type="textfield" className='rank' placeholder="1" />
                            -
                            <input type="textfield" className='rank' placeholder="10000"/>
                        </div>
                    </div>
                    <div className="sizeFilter">
                        <span id='filtersText'>Size</span>
                        <div>
                            <input type="textfield" className='size' placeholder="1" />
                            -
                            <input type="textfield" className='size' placeholder="100000"/>
                        </div>
                    </div>
                    <div className="scoreFilter">
                        <span id='filtersText'>Average Math Score</span>
                        <div>
                            <input type="textfield" className='score' placeholder="1" />
                            -
                            <input type="textfield" className='score' placeholder="800"/>
                        </div>
                    </div>
                    <div className="scoreFilter">
                        <span id='filtersText'>Average EBRW Score</span>
                        <div>
                            <input type="textfield" className='score' placeholder="1" />
                            -
                            <input type="textfield" className='score' placeholder="800"/>
                        </div>
                    </div>
                    <div className="scoreFilter">
                        <span id='filtersText'>Average ACT Score</span>
                        <div>
                            <input type="textfield" className='score' placeholder="1" />
                            -
                            <input type="textfield" className='score' placeholder="36"/>
                        </div>
                    </div>
                    <div class="input-field col s12" id='locationFilter'>
                        <select class="browser-default">
                            <option value="" selected>Choose a Location</option>
                            <option value="1">North East</option>
                            <option value="2">Midwest</option>
                            <option value="3">South</option>
                            <option value="3">West</option>
                        </select>
                    </div>
                    <div id='majorFilterContainer'>
                        <div class="input-field" id='majorFilter'>
                            <input id="major" type="text" onChange={this.updateMajor.bind(this)}></input>
                            <label for="major">Two Desired Majors</label>
                        </div>
                        <a class="btn-floating btn-large waves-effect waves-light blue" id="enterMajorBtn" onClick={this.addMajor.bind(this.self)}><Add></Add></a>
                    </div>
                    <div id='chosenMajorContainer'>
                        <MajorFiltersList majors={this.state.majorList} deleteMajor={this.deleteMajor}/>
                    </div>
                    <div>
                        <button class="searchCollegeBtn" onClick={this.goCollegeSearch}> Start college search </button>
                        <button class="searchCollegeBtn" onClick={this.goCollegeReccomendation}> Reccomend Me Colleges </button>
                    </div>
                </div>
            </div>
        );
    }
}

  export default CollegeSeachScreen
