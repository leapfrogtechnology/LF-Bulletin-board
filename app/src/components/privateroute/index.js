import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { getUserLocalStorageData } from '../../utils/bulletinUtil';

/**
 * Check Is User Logged And Only render Component else Redirect To Login.
 *
 * @param {*} { Component: Component, ...rest }.
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const isAuthenticated = getUserLocalStorageData() ? true : false;

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
