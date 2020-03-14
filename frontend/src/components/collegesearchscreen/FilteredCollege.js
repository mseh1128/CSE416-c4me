import React from 'react';
import { Link } from 'react-router-dom';
//import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { firestoreConnect } from 'react-redux-firebase';
//import { tsConstructSignatureDeclaration } from '@babel/types';

import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

class FilteredCollege extends React.Component {

    state  = 
    {
        status: this.props.college.status
    }

    getName= () => {
        if(this.props.college.name.length>49)
        {
            let tempName = this.props.college.name.substring(0,48) + "..."
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

        return (
           <Link to={"/applicationTracker/" + college.name} className='collegeCardSearched' >
                <div class="collegeBoxTitle">
                    <div class="collegeTitle"> {this.getName()} </div> 
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
           </Link>
        );
    }
}

export default FilteredCollege