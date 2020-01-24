import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import SideMenu from './SideMenu';
import ListEntries from '../listEntries';
import { checkLogin } from '../../services/auth';

class Dashboard extends Component {
  constructor() {
    super();

    this.user = JSON.parse(localStorage.getItem('user')) || '';
    checkLogin();
  }

  render() {
    return (
      <div className="clearfix">
        <div className="sidemenu-wrapper">
          <SideMenu user={this.user} />
        </div>

        <div>
          <div className="container">
            <Switch>
              <Route exact path="/dashboard/list" render={() => <ListEntries />} />
              <Redirect to="/dashboard/list" />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
