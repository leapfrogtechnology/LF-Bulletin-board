import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route  {...rest} render={props =>
    localStorage.getItem('isAuthenticated')? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location }
        }}
      />
    )
  }/>
);

PrivateRoute.propTypes = {
  component: PropTypes.object,
  location: PropTypes.object
};

export default PrivateRoute;
