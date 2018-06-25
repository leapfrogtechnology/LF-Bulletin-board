import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './components/home';
import Login from './components/login';
import Bulletin from './components/bulletin';
import Dashboard from './components/dashboard';
import PrivateRoute from './components/privateroute';
import routeConstants from './constants/routeConstants';

const baseHref = process.env.BASE_HREF || '/';

const Router = () => (
  <BrowserRouter basename={baseHref}>
    <div>
      <Route exact path={routeConstants.HOME} component={Home} />
      <Route exact path={routeConstants.LOGIN} component={Login} /> 
      <Route exact path={routeConstants.BULLETIN} component={Bulletin} />       
      <PrivateRoute path={routeConstants.DASHBOARD} component={Dashboard} />
    </div>
  </BrowserRouter>
);

export default Router;
