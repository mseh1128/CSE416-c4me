import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router-dom';
import { getJwt } from '../../helpers';

const authorizeComponent = WrappedComponent => {
  class AuthComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: undefined
      };
    }
    componentDidMount() {
      this.getUser();
    }
    getUser() {
      const jwt = getJwt();
      console.log(jwt);
      if (!jwt) {
        this.setState({
          user: null
        });
        return;
      }
      axios
        .get('/getUser', { headers: { Authorization: `Bearer ${getJwt()}` } })
        .then(res => {
          this.setState({
            user: res.data
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            user: null
          });
        });
    }
    render() {
      const { user } = this.state;
      if (user === null) {
        this.props.history.push('/');
      }
      if (user === undefined) {
        return <div>Loading...</div>;
      }
      return <WrappedComponent {...this.props} />;
    }
  }
  return AuthComponent;
};

export default authorizeComponent;
