import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route  
    {...rest} 
    render={props => {
      const isAuthenticated = JSON.parse(localStorage.getItem('user'))? true: false;

      return isAuthenticated? (
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
  component: PropTypes.object,
  location: PropTypes.object
};

export default PrivateRoute;
