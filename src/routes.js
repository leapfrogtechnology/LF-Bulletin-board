import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './components/login';
import Dashboard from './components/dashboard';
import PrivateRoute from './components/privateroute';
import BulletinScreen from './components/bulletinScreen';
import PageNotFound from './components/commons/PageNotFound';

import routeConstants from './constants/routeConstants';

const baseHref = process.env.BASE_HREF || '/';

const Router = () => (
  <BrowserRouter basename={baseHref}>
    <Switch>
      <Route  path={routeConstants.LOGIN} component={Login} /> 
      <Route exact path={routeConstants.BULLETIN} component={BulletinScreen} />       
      <PrivateRoute path={routeConstants.DASHBOARD} component={Dashboard} />
      <Route component={PageNotFound}/>
    </Switch>
  </BrowserRouter>
);

export default Router;
