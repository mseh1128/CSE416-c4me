import React from 'react';
//import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
//import { compose } from 'redux';
//import { firebaseConnect } from 'react-redux-firebase';

//import LoggedInLinks from './LoggedInLinks';
//import LoggedOutLinks from './LoggedOutLinks';

class Navbar extends React.Component {

  render() {
    //const { auth, profile } = this.props;
    //const links = auth.uid ? <LoggedInLinks profile={profile} /> : <LoggedOutLinks />;

    return (
      <nav className="nav-wrapper blue darken-3" id="navbar">
        <div className="container">
          <div id='logoContainer'>
              <div className='logo'>c4me</div>
          </div>
          
        </div>
      </nav>
    );
  };
}



export default Navbar