import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Check Is User Logged And Only render Component else Redirect To Login.
 *
 * @param {*} { Component: Component, ...rest }.
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const isAuthenticated = JSON.parse(localStorage.getItem('user')) ? true : false;

      return isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object
};

export default PrivateRoute;
