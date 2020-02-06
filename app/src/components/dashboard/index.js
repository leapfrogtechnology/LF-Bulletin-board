import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import SideMenu from './SideMenu';
import ListAdmin from '../listAdmin';
import ListEntries from '../listEntries';
import { checkLogin } from '../../services/auth';
import { getUserLocalStorageData } from '../../utils/bulletinUtil';

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.getUser();
  }

  /**
   * This function checks for refresh and access token expiration,
   * this function saves user object with data from server with the id
   * and roles, as well as user data tamper in browser.
   *
   * @memberof Dashboard
   */
  async getUser() {
    let user = getUserLocalStorageData();
    const loggedInUser = await checkLogin();

    if (loggedInUser && user) {
      user = { ...user, ...loggedInUser.data.user };
      localStorage.setItem('user', JSON.stringify(user));

      this.setState({
        user
      });
    }
  }

  render() {
    return this.state.user ? (
      <div className="clearfix">
        <div className="sidemenu-wrapper">
          <SideMenu user={this.state.user} />
        </div>

        <div>
          <div className="container">
            <Switch>
              <Route exact path="/dashboard/list" render={() => <ListEntries />} />
              <Route exact path="/dashboard/admin">
                {this.state.user.role === 'super_admin' ? <ListAdmin /> : <Redirect to="/dashboard/list" />}
              </Route>
              <Redirect to="/dashboard/list" />
            </Switch>
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default Dashboard;
