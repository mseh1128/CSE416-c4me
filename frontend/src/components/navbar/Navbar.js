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
    console.log(this.props);
    let editOrAdminButton = (
      <Link to="/profile" id="editContainer">
        <div id="editLogo">edit profile</div>
      </Link>
    );
    if (this.props.isAdmin) {
      editOrAdminButton = (
        <Link to="/admin" id="editContainer">
          <div id="editLogo">admin page</div>
        </Link>
      );
    }
    return (
      <nav className="nav-wrapper blue darken-3" id="navbar">
        <div className="container">
          <Link to="/home" id="logoContainer">
            <div id="logo">c4me</div>
          </Link>
        </div>
        {editOrAdminButton}
        <Link to="/" id="logOutContainer">
          <div id="logOutLogo" onClick={() => this.props.setIsAdmin(false)}>
            log out
          </div>
        </Link>
      </nav>
    );
  }
}

export default Navbar;
