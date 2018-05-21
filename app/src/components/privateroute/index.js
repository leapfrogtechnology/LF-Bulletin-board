import React from 'react';
import {
    Route,
    Redirect,
  } from 'react-router-dom';

const PrivateRoute = ({ component: Component}) => (
    <Route  render={props =>
    localStorage.getItem('isAuthenticated').toString() === 'true'
         ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
export default PrivateRoute;
