import React from 'react';
//import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { firestoreConnect } from 'react-redux-firebase';
//import { tsConstructSignatureDeclaration } from '@babel/types';

import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class StudentCollege extends React.Component {

    state  = 
    {
        status: this.props.college.status
    }

    getName= () => {
        if(this.props.college.name.length>32)
        {
            let tempName = this.props.college.name.substring(0,30) + "..."
            return tempName
        }
        else
            return this.props.college.name
    }

    getStatus = () => {
        return this.state.status
    }

    changeStatus  = (newStatus) => {
        this.setState({status: newStatus})
    }

    getPercent = (type, amount) => {
        if(type=="math")
        {
            return (amount/800 * 100)
        }
        if(type=="ebrw")
        {
            return (amount/800 * 100)
        }
        if(type=="act")
        {
            return (amount/36 * 100)
        }
        if(type=="rec")
        {
            return (amount)
        }
    }

    getRecColor = (score) => {
        if(score<25)
            return 'rgb(252, 3, 3)'
        else if(score<50)
            return 'rgb(252, 207, 3)'
        else if(score<75)
            return 'rgb(89, 145, 78)'
        else
            return 'rgb(3, 144, 252)'
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

        let theme=
        {
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
            },
            rec: {
              symbol: college.reccomendScore,
              color: this.getRecColor(college.reccomendScore)
            }
        }

        const dropdownOptions = [
            'pending', 'accepted', 'denied', 'deferrd', 'wait-listed', 'withdrawn'
          ];
          const defaultOption = dropdownOptions[0];

        return (
           <div className='collegeCard'>
                <div class="collegeBoxTitleAndStatus">
                    <div class="collegeTitle"> {this.getName()} </div> 
                    <Dropdown options={dropdownOptions} onChange={this._onSelect} value={this.getStatus()} placeholder="Select an option" />
                </div>
                <div class="collegeLocation"> {college.location} </div> 
                <div class="collegeType"> {college.type + " | " + college.admission_rate + "% Acceptance Rate | "  +  college.completion_rate + "% Completion Rate | Rank: " + college.ranking} </div> 
                <div class="collegeBoxSizeAndMath">
                    <div class="collegeSize1">{"Size:"}</div> 
                    <div class="collegeMath1">{"Average SAT Math: "}<span class="collegeMath2">{college.avg_SAT_Math}</span></div>
                </div>
                <div class="collegeBoxSizeAndBar">
                    <div class="collegeSize2"> {college.size}  </div> 
                    <span class="collegeText">0</span>
                    <Progress class="mathBar" percent={this.getPercent("math", college.avg_SAT_Math)} status="math" theme={theme} />
                </div>
                <div class="collegeBoxCostAndEnglish">
                    <div class="collegeCost1"> {"Avg Price:"} </div> 
                    <div class="collegeEnglish1">{"Average SAT EBRW: "}<span class="collegeEnglish2">{college.avg_EBRW}</span></div>
                </div>
                <div class="collegeBoxCostAndBar">
                    <div class="collegeCost2"> {'$' + college.cost} </div> 
                    <span class="collegeText">0</span>
                    <Progress class="ebrwBar" percent={this.getPercent("ebrw", college.avg_EBRW)} status="EBRW" theme={theme} />
                </div>
                <div class="collegeBoxDebtAndACT">
                    <div class="collegeDebt1"> {"Avg Debt:"} </div> 
                    <div class="collegeACT1">{"Average ACT: "}<span class="collegeACT2">{college.avg_ACT}</span></div>
                </div>
                <div class="collegeBoxDebtAndBar">
                    <div class="collegeDebt2"> {'$' + college.debt} </div> 
                    <span class="collegeText">0</span>
                    <Progress class="ACTBar" percent={this.getPercent("act", college.avg_ACT)} status="ACT" theme={theme} />
                </div>
                <Progress type="circle" width={120} symbolClassName="reccomendBar" percent={this.getPercent("rec", college.reccomendScore)} status="rec" theme={theme} />
           </div>
        );
    }
}

export default StudentCollege
/*

 <a class='dropdown-trigger btn' href='#' data-target={'dropdown' + college.key}> {this.getStatus()} </a>
                    <ul id={'dropdown' + college.key} class='dropdown-content'>
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