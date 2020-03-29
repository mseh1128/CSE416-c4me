import React from "react";
//import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { firestoreConnect } from 'react-redux-firebase';
//import { tsConstructSignatureDeclaration } from '@babel/types';

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";

class MajorItem extends React.Component {
  render() {
    const major = this.props.major;

    return (
      <div className='majorItem'>
        <span> {major.name} </span>
        <button
          className='deleteMajorBtn'
          onClick={this.props.deleteMajor.bind(this.self, major.key)}
        >
          {" "}
          X{" "}
        </button>
      </div>
    );
  }
}

export default MajorItem;
