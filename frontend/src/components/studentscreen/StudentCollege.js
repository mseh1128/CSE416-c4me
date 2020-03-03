import React from 'react';
//import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { firestoreConnect } from 'react-redux-firebase';
//import { tsConstructSignatureDeclaration } from '@babel/types';

import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";

class StudentCollege extends React.Component {

    getStatus = () => {
        return "pending"
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
            </ul>
        );
    }
}

export default StudentCollege