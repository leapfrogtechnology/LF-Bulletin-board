import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import routeConstants from './constants/routeConstants';

import Home from './components/home';
import Login from './components/login';
import Dashboard from './components/dashboard';
import PrivateRoute from './components/privateroute'

const baseHref = process.env.BASE_HREF || '/';

const Router = () => (
  <BrowserRouter basename={baseHref}>
    <div>
      <Route exact path={routeConstants.HOME} component={Home} />
      <Route exact path={routeConstants.LOGIN} component={Login} />        
      <PrivateRoute path={routeConstants.DASHBOARD} component={Dashboard} />
      {/* <Route path={routeConstants.DASHBOARD} render={(obj) => (<Dashboard obj={obj}/>)} />         */}
    </div>
  </BrowserRouter>
);

export default Router;
