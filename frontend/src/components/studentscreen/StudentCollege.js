import React from 'react';
//import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { firestoreConnect } from 'react-redux-firebase';
//import { tsConstructSignatureDeclaration } from '@babel/types';

import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";

class StudentCollege extends React.Component {

    state  = 
    {
        status: this.props.college.status
    }

    getStatus = () => {
        return this.state.status
    }

    changeStatus  = (newStatus) => {
        this.setState({status: newStatus})
    }

    render() {

        var elem = document.querySelector('.tabs');
        var options = {}
        var instance = M.Tabs.init(elem, options);

        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.collapsible');
            var instances = M.Collapsible.init(elems, options);
          });

        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.dropdown-trigger');
            var instances = M.Dropdown.init(elems, options);
          });

        const college = this.props.college

        return (
           <div className='collegeCard'>
                <div class="collegeBox0">
                    <div class="collegeTitle"> {college.name} </div> 
                    <a class='dropdown-trigger btn' href='#' data-target='dropdown1'> {this.getStatus()} </a>
                    <ul id='dropdown1' class='dropdown-content'>
                        <li><a href="#!" onClick={this.changeStatus.bind(this.self, "pending")}>pending</a></li>
                        <li class="divider" tabindex="-1"></li>
                        <li><a href="#!" onClick={this.changeStatus.bind(this.self, "accepted")}>accepted</a></li>
                        <li class="divider" tabindex="-1"></li>
                        <li><a href="#!" onClick={this.changeStatus.bind(this.self, "denied")}>denied</a></li>
                        <li class="divider" tabindex="-1"></li>
                        <li><a href="#!" onClick={this.changeStatus.bind(this.self, "deferred")}>deferred</a></li>
                        <li class="divider" tabindex="-1"></li>
                        <li><a href="#!" onClick={this.changeStatus.bind(this.self, "wait-listed")}>wait-listed</a></li>
                        <li class="divider" tabindex="-1"></li>
                        <li><a href="#!" onClick={this.changeStatus.bind(this.self, "withdrawn")}>withdrawn</a></li>
                    </ul>
                </div>
                <div class="collegeLocation"> {college.location + " | Rank: " + college.ranking} </div> 
                <div class="collegeType"> {college.type + " | " + college.admission_rate + "% Acceptance Rate | "  +  college.completion_rate + "% Completion Rate"} </div> 
                <div class="collegeBox1">
                    <div class="collegeSize1">{"Size:"}</div> 
                    <div class="collegeMath1">{"Average SAT Math: "}<span class="collegeMath2">{college.avg_SAT_Math}</span></div>
                </div>
                <div class="collegeSize2"> {college.size} </div> 
                <div class="collegeBox2">
                    <div class="collegeCost1"> {"Avg Price:"} </div> 
                    <div class="collegeEnglish1">{"Average SAT EBRW: "}<span class="collegeEnglish2">{college.avg_EBRW}</span></div>
                </div>
                <div class="collegeCost2"> {'$' + college.cost} </div> 
                <div class="collegeBox3">
                    <div class="collegeDebt1"> {"Avg Debt:"} </div> 
                    <div class="collegeACT1">{"Average ACT: "}<span class="collegeACT2">{college.avg_ACT}</span></div>
                </div>
                <div class="collegeDebt2"> {'$' + college.debt} </div> 
           </div>
        );
    }
}

export default StudentCollege
/*
<ul class="collapsible">
<li>
    <div class="collapsible-header" id="collegeBanner"> 
        <div class="collegeTitleText"> {college.name} </div> 
        <div class="collegeTitleText"> {college.location} </div> 
        <div class="collegeTitleText"> {college.ranking} </div> 
        <div class="collegeTitleText"> {college.size} </div> 
        <div class="collegeTitleText"> {college.admission_rate} %</div> 
    </div>
    <div class="collapsible-body" >
        <div id="collegeBody">
            <div class="collegeMoney">
                <span class="collegeBodyText"> Avg Cost: {'$' + college.cost} </span> 
                <span class="collegeBodyText"> Avg Debt: {'$' + college.debt} </span> 
            </div>
            <span class="collegeBodyText"> Completion Rate:  {college.completion_rate + '%'} </span> 
            <span class="collegeBodyText"> Type:  {college.type} </span> 
            <div class="collegeScores">
                <span class="collegeBodyText"> Avg Math SAT: {college.avg_SAT_Math} </span> 
                <span class="collegeBodyText"> Avg EBRW: {college.avg_EBRW} </span>
                <span class="collegeBodyText"> Avg ACT: {college.avg_ACT} </span>  
            </div>
            <span class="collegeBodyText"> Admission Status: </span> 
            <a class='dropdown-trigger btn' href='#' data-target='dropdown1'> {this.getStatus()} </a>
            <ul id='dropdown1' class='dropdown-content'>
                <li><a href="#!">pending</a></li>
                <li class="divider" tabindex="-1"></li>
                <li><a href="#!">accepted</a></li>
                <li class="divider" tabindex="-1"></li>
                <li><a href="#!">denied</a></li>
                <li class="divider" tabindex="-1"></li>
                <li><a href="#!">deferred</a></li>
                <li class="divider" tabindex="-1"></li>
                <li><a href="#!">wait-listed</a></li>
                <li class="divider" tabindex="-1"></li>
                <li><a href="#!">withdrawn</a></li>
            </ul>
        </div>
    </div>
</li>
</ul>*/