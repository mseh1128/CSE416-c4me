import React, { Component } from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import Add from '@material-ui/icons/Add';
import PropTypes from 'prop-types';

import data from '../test/TestCollegeData.json';

import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

import { ResponsiveScatterPlot } from '@nivo/scatterplot';

export class ApplicationGraph extends Component {
  state = {
    college: this.props.college,
    students: this.props.students,
    graphType: 'SAT',
  };

  isHidden = (type) => {
    if (type === this.state.graphType) {
      return false;
    } else return true;
  };

  setGraphType = (type) => {
    this.setState({ graphType: type });
  };

  getMeanGPA = () => {
    let sum = 0;
    let num = 0;

    this.state.students.forEach((student) => {
      if (
        student.highSchoolGPA !== null &&
        student.highSchoolGPA !== undefined
      ) {
        sum = sum + student.highSchoolGPA;
        num = num + 1;
      }
    });

    let avg = sum / num;

    let heightOfGraph = 541 - 71;
    let percente = avg / 4;
    let height = heightOfGraph * percente + 71;

    return height.toString();
  };

  getMeanSAT = () => {
    let sum = 0;
    let num = 0;

    this.state.students.forEach((student) => {
      if (
        student.SATMath !== null &&
        student.SATMath !== undefined &&
        student.SATEBRW !== null &&
        student.SATEBRW !== undefined
      ) {
        sum = sum + student.SATMath + student.SATEBRW;
        num = num + 1;
      }
    });

    let avg = sum / num;

    let widthOfGraph = 1010 - 90;
    let percente = avg / 1600;
    let width = widthOfGraph * percente + 90;

    console.log(avg);

    return width.toString();
  };

  getMeanACT = () => {
    let sum = 0;
    let num = 0;

    this.state.students.forEach((student) => {
      if (student.ACTComp !== null && student.ACTComp !== undefined) {
        sum = sum + student.ACTComp;
        num = num + 1;
      }
    });

    let avg = sum / num;

    let widthOfGraph = 1010 - 90;
    let percente = avg / 36;
    let width = widthOfGraph * percente + 90;

    console.log(avg);

    return width.toString();
  };

  getMeanPercente = (data) => {
    let sum = 0;
    let num = 0;

    data[0].data.forEach((data) => {
      sum = sum + data.x;
      num = num + 1;
    });

    data[1].data.forEach((data) => {
      sum = sum + data.x;
      num = num + 1;
    });

    data[2].data.forEach((data) => {
      sum = sum + data.x;
      num = num + 1;
    });

    let avg = sum / num;

    let widthOfGraph = 1010 - 90;
    let percente = avg / 100;
    let width = widthOfGraph * percente + 90;

    console.log(avg);

    return width.toString();
  };

  getAcceptedValuesSAT = () => {
    let data = [];
    let num = 0;

    this.state.students.forEach((student) => {
      if (student.acceptanceStatus === 'accepted') {
        if (student.SATMath !== null && student.SATEBRW !== null) {
          data[num] = {
            x: student.SATMath + student.SATEBRW,
            y: student.highSchoolGPA,
          };
          num = num + 1;
        }
      }
    });
    return data;
  };

  getDeniedValuesSAT = () => {
    let data = [];
    let num = 0;

    this.state.students.forEach((student) => {
      if (student.acceptanceStatus === 'denied') {
        if (student.SATMath !== null && student.SATEBRW !== null) {
          data[num] = {
            x: student.SATMath + student.SATEBRW,
            y: student.highSchoolGPA,
          };
          num = num + 1;
        }
      }
    });
    return data;
  };

  getOtherValuesSAT = () => {
    let data = [];
    let num = 0;
    this.state.students.forEach((student) => {
      if (
        student.acceptanceStatus !== 'denied' &&
        student.acceptanceStatus !== 'accepted'
      ) {
        if (student.SATMath !== null && student.SATEBRW !== null) {
          // console.log('within here in getothervals');
          data[num] = {
            x: student.SATMath + student.SATEBRW,
            y: student.highSchoolGPA,
          };
          num = num + 1;
        }
      }
    });
    return data;
  };

  getAcceptedValuesACT = () => {
    let data = [];
    let num = 0;

    this.state.students.forEach((student) => {
      if (student.acceptanceStatus === 'accepted') {
        if (student.ACTComp !== null) {
          data[num] = {
            x: student.ACTComp,
            y: student.highSchoolGPA,
          };
          num = num + 1;
        }
      }
    });
    return data;
  };

  getDeniedValuesACT = () => {
    let data = [];
    let num = 0;

    this.state.students.forEach((student) => {
      if (student.acceptanceStatus === 'denied') {
        if (student.ACTComp !== null) {
          data[num] = {
            x: student.ACTComp,
            y: student.highSchoolGPA,
          };
          num = num + 1;
        }
      }
    });
    return data;
  };

  getOtherValuesACT = () => {
    let data = [];
    let num = 0;

    this.state.students.forEach((student) => {
      if (
        student.acceptanceStatus !== 'denied' &&
        student.acceptanceStatus !== 'accepted'
      ) {
        if (student.ACTComp !== null) {
          data[num] = {
            x: student.ACTComp,
            y: student.highSchoolGPA,
          };
          num = num + 1;
        }
      }
    });
    return data;
  };

  getAcceptedValuesStandardScores = () => {
    let data = [];
    let num = 0;

    this.state.students.forEach((student) => {
      if (student.acceptanceStatus === 'accepted') {
        let totalPercente = 0;
        let totalNum = 0;

        let check = true;
        if (student.SATChem !== null) {
          totalPercente = totalPercente + (student.SATChem / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATEcoBio !== null) {
          totalPercente = totalPercente + (student.SATEcoBio / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATLit !== null) {
          totalPercente = totalPercente + (student.SATLit / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATMath1 !== null) {
          totalPercente = totalPercente + (student.SATMath1 / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATMath2 !== null) {
          totalPercente = totalPercente + (student.SATMath2 / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATMolBio !== null) {
          totalPercente = totalPercente + (student.SATMolBio / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATPhysics !== null) {
          totalPercente = totalPercente + (student.SATPhysics / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATUSHist !== null) {
          totalPercente = totalPercente + (student.SATUSHist / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATWorldHist !== null) {
          totalPercente = totalPercente + (student.SATWorldHist / 800) * 0.05;
          totalNum = totalNum + 1;
        }

        let remainingPercente = 100 - totalNum * 5;

        if (
          student.SATMath !== null &&
          student.SATEBRW !== null &&
          student.ACTComp !== null
        ) {
          totalPercente =
            totalPercente +
            ((student.SATMath + student.SATEBRW) / 1600) *
              (remainingPercente / 2);
          totalPercente =
            totalPercente + (student.ACTComp / 36) * (remainingPercente / 2);
        } else if (student.ACTComp !== null) {
          totalPercente =
            totalPercente + (student.ACTComp / 36) * remainingPercente;
        } else if (student.SATMath !== null && student.SATEBRW !== null) {
          totalPercente =
            totalPercente +
            ((student.SATMath + student.SATEBRW) / 1600) * remainingPercente;
        } else check = false;

        if (check) {
          data[num] = {
            x: totalPercente,
            y: student.highSchoolGPA,
          };
          num = num + 1;
        }
      }
    });
    return data;
  };

  getDeniedValuesStandardScores = () => {
    let data = [];
    let num = 0;

    this.state.students.forEach((student) => {
      if (student.acceptanceStatus === 'denied') {
        let totalPercente = 0;
        let totalNum = 0;

        let check = true;
        if (student.SATChem !== null) {
          totalPercente = totalPercente + (student.SATChem / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATEcoBio !== null) {
          totalPercente = totalPercente + (student.SATEcoBio / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATLit !== null) {
          totalPercente = totalPercente + (student.SATLit / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATMath1 !== null) {
          totalPercente = totalPercente + (student.SATMath1 / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATMath2 !== null) {
          totalPercente = totalPercente + (student.SATMath2 / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATMolBio !== null) {
          totalPercente = totalPercente + (student.SATMolBio / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATPhysics !== null) {
          totalPercente = totalPercente + (student.SATPhysics / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATUSHist !== null) {
          totalPercente = totalPercente + (student.SATUSHist / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATWorldHist !== null) {
          totalPercente = totalPercente + (student.SATWorldHist / 800) * 0.05;
          totalNum = totalNum + 1;
        }

        let remainingPercente = 100 - totalNum * 5;

        if (
          student.SATMath !== null &&
          student.SATEBRW !== null &&
          student.ACTComp !== null
        ) {
          totalPercente =
            totalPercente +
            ((student.SATMath + student.SATEBRW) / 1600) *
              (remainingPercente / 2);
          totalPercente =
            totalPercente + (student.ACTComp / 36) * (remainingPercente / 2);
        } else if (student.ACTComp !== null) {
          totalPercente =
            totalPercente + (student.ACTComp / 36) * remainingPercente;
        } else if (student.SATMath !== null && student.SATEBRW !== null) {
          totalPercente =
            totalPercente +
            ((student.SATMath + student.SATEBRW) / 1600) * remainingPercente;
        } else check = false;

        if (check) {
          data[num] = {
            x: totalPercente,
            y: student.highSchoolGPA,
          };
          num = num + 1;
        }
      }
    });
    return data;
  };

  getOtherValuesStandardScores = () => {
    let data = [];
    let num = 0;

    this.state.students.forEach((student) => {
      if (
        student.acceptanceStatus !== 'denied' &&
        student.acceptanceStatus !== 'accepted'
      ) {
        let totalPercente = 0;
        let totalNum = 0;

        let check = true;
        if (student.SATChem !== null) {
          totalPercente = totalPercente + (student.SATChem / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATEcoBio !== null) {
          totalPercente = totalPercente + (student.SATEcoBio / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATLit !== null) {
          totalPercente = totalPercente + (student.SATLit / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATMath1 !== null) {
          totalPercente = totalPercente + (student.SATMath1 / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATMath2 !== null) {
          totalPercente = totalPercente + (student.SATMath2 / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATMolBio !== null) {
          totalPercente = totalPercente + (student.SATMolBio / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATPhysics !== null) {
          totalPercente = totalPercente + (student.SATPhysics / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATUSHist !== null) {
          totalPercente = totalPercente + (student.SATUSHist / 800) * 0.05;
          totalNum = totalNum + 1;
        }
        if (student.SATWorldHist !== null) {
          totalPercente = totalPercente + (student.SATWorldHist / 800) * 0.05;
          totalNum = totalNum + 1;
        }

        let remainingPercente = 100 - totalNum * 5;

        if (
          student.SATMath !== null &&
          student.SATEBRW !== null &&
          student.ACTComp !== null
        ) {
          totalPercente =
            totalPercente +
            ((student.SATMath + student.SATEBRW) / 1600) *
              (remainingPercente / 2);
          totalPercente =
            totalPercente + (student.ACTComp / 36) * (remainingPercente / 2);
        } else if (student.ACTComp !== null) {
          totalPercente =
            totalPercente + (student.ACTComp / 36) * remainingPercente;
        } else if (student.SATMath !== null && student.SATEBRW !== null) {
          totalPercente =
            totalPercente +
            ((student.SATMath + student.SATEBRW) / 1600) * remainingPercente;
        } else check = false;

        if (check) {
          data[num] = {
            x: totalPercente,
            y: student.highSchoolGPA,
          };
          num = num + 1;
        }
      }
    });
    return data;
  };

  render() {
    var elem = document.querySelector('.tabs');
    var options = {};
    var instance = M.Tabs.init(elem, options);

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, options);
    });

    const college = this.state.college;

    let theme = {
      math: {
        symbol: '‍800',
        color: 'rgb(223, 105, 180)',
      },
      EBRW: {
        symbol: '800',
        color: 'rgb(153, 105, 180)',
      },
      ACT: {
        symbol: '36',
        color: 'rgb(23, 105, 180)',
      },
      gpa: {
        symbol: '4.0',
        color: 'rgb(23, 145, 10)',
      },
    };

    const satData = [
      {
        id: 'Denied',
        data: this.getDeniedValuesSAT(),
      },
      {
        id: 'Accepted',
        data: this.getAcceptedValuesSAT(),
      },
      {
        id: 'Other',
        data: this.getOtherValuesSAT(),
      },
    ];

    const actData = [
      {
        id: 'Denied',
        data: this.getDeniedValuesACT(),
      },
      {
        id: 'Accepted',
        data: this.getAcceptedValuesACT(),
      },
      {
        id: 'Other',
        data: this.getOtherValuesACT(),
      },
    ];

    const standardData = [
      {
        id: 'Denied',
        data: this.getDeniedValuesStandardScores(),
      },
      {
        id: 'Accepted',
        data: this.getAcceptedValuesStandardScores(),
      },
      {
        id: 'Other',
        data: this.getOtherValuesStandardScores(),
      },
    ];
    console.log(standardData);

    return (
      <div className='tracker_screen_container'>
        <div className='schoolsContainer'>
          <div id='profileBanner'>
            <div></div>
            <span className='collegeTitleText'>
              {' '}
              {'Application Graph: GPA vs ' + this.state.graphType}
            </span>
            <span className='collegeTitleText'>{college.name}</span>
          </div>
          <div>
            <div id='graphContainerSAT' hidden={this.isHidden('SAT')}>
              <ResponsiveScatterPlot
                data={satData}
                margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
                xScale={{ type: 'linear', min: 0, max: 1600 }}
                xFormat={function (e) {
                  return 'SAT Score: ' + e;
                }}
                yScale={{ type: 'linear', min: 0, max: 4 }}
                yFormat={function (e) {
                  return 'GPA: ' + e;
                }}
                colors={{ scheme: 'set1' }}
                blendMode='multiply'
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: 'bottom',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'SAT Scores',
                  legendPosition: 'middle',
                  legendOffset: 46,
                }}
                axisLeft={{
                  orient: 'left',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'GPA',
                  legendPosition: 'middle',
                  legendOffset: -60,
                }}
                legends={[
                  {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 130,
                    translateY: 0,
                    itemWidth: 100,
                    itemHeight: 12,
                    itemsSpacing: 5,
                    itemDirection: 'left-to-right',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
              <div
                className='meanLineGPA'
                style={{ bottom: this.getMeanGPA() + 'px' }}
              />
              <div
                className='meanLineOther'
                style={{ left: this.getMeanSAT() + 'px' }}
              />
            </div>
            <div id='graphContainerACT' hidden={this.isHidden('ACT')}>
              <ResponsiveScatterPlot
                data={actData}
                margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
                xScale={{ type: 'linear', min: 0, max: 36 }}
                xFormat={function (e) {
                  return 'ACT Score: ' + e;
                }}
                yScale={{ type: 'linear', min: 0, max: 4 }}
                yFormat={function (e) {
                  return 'GPA: ' + e;
                }}
                colors={{ scheme: 'set1' }}
                blendMode='multiply'
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: 'bottom',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'ACT Scores',
                  legendPosition: 'middle',
                  legendOffset: 46,
                }}
                axisLeft={{
                  orient: 'left',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'GPA',
                  legendPosition: 'middle',
                  legendOffset: -60,
                }}
                legends={[
                  {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 130,
                    translateY: 0,
                    itemWidth: 100,
                    itemHeight: 12,
                    itemsSpacing: 5,
                    itemDirection: 'left-to-right',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
              <div
                className='meanLineGPA'
                style={{ bottom: this.getMeanGPA() + 'px' }}
              />
              <div
                className='meanLineOther'
                style={{ left: this.getMeanACT() + 'px' }}
              />
            </div>
            <div
              id='graphContainerStandard'
              hidden={this.isHidden('Standardized Tests')}
            >
              <ResponsiveScatterPlot
                data={standardData}
                margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
                xScale={{ type: 'linear', min: 0, max: 100 }}
                xFormat={function (e) {
                  return e + '%';
                }}
                yScale={{ type: 'linear', min: 0, max: 4 }}
                yFormat={function (e) {
                  return 'GPA: ' + e;
                }}
                colors={{ scheme: 'set1' }}
                blendMode='multiply'
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: 'bottom',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Standardized Test Percentage',
                  legendPosition: 'middle',
                  legendOffset: 46,
                }}
                axisLeft={{
                  orient: 'left',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'GPA',
                  legendPosition: 'middle',
                  legendOffset: -60,
                }}
                legends={[
                  {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 130,
                    translateY: 0,
                    itemWidth: 100,
                    itemHeight: 12,
                    itemsSpacing: 5,
                    itemDirection: 'left-to-right',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
              <div
                className='meanLineGPA'
                style={{ bottom: this.getMeanGPA() + 'px' }}
              />
              <div
                className='meanLineOther'
                style={{ left: this.getMeanPercente(standardData) + 'px' }}
              />
            </div>
            <div id='graphBtnContainer'>
              <div></div>
              <span className='collegeTitleText'> X Axis: </span>
              <div></div>
              <button
                className='graphBtns'
                onClick={this.setGraphType.bind(this, 'SAT')}
              >
                SAT
              </button>
              <div></div>
              <button
                className='graphBtns'
                onClick={this.setGraphType.bind(this, 'ACT')}
              >
                ACT
              </button>
              <div></div>
              <button
                className='graphBtns'
                onClick={this.setGraphType.bind(this, 'Standardized Tests')}
              >
                Standardized Tests
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ApplicationGraph;
