import React from 'react';
//import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import { compose } from 'redux';
//import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
//import LoggedInLinks from './LoggedInLinks';
//import LoggedOutLinks from './LoggedOutLinks';

class Navbar extends React.Component {
  render() {
    //const { auth, profile } = this.props;
    //const links = auth.uid ? <LoggedInLinks profile={profile} /> : <LoggedOutLinks />;

    return (
      <nav className="nav-wrapper blue darken-3" id="navbar">
        <div className="container">
          <Link to="/home" id="logoContainer">
            <div id="logo">c4me</div>
          </Link>
        </div>
        <Link to="/profile" id="editContainer">
          <div id="editLogo">edit profile</div>
        </Link>
        <Link to="/" id="logOutContainer">
          <div id="logOutLogo">log out</div>
        </Link>
      </nav>
    );
  }
}

export default Navbar;
