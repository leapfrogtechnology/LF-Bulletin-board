import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MoreMenu from '../moreMenu';
import logo from '../../assets/images/bulletin-logo-inverse.png';

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInitials:
        props.user &&
        props.user.givenName &&
        props.user.familyName &&
        props.user.givenName[0] + props.user.familyName[0]
    };
  }

  render() {
    return (
      <div>
        <div className="sidemenu-bulletin-logo">
          <img src={logo} alt="bulletin logo" />
        </div>
        <Link to="/dashboard/list">
          <div className="sidemenu-icons">
            <i className="fa fa-desktop"></i>
          </div>
        </Link>

        <Link to="/dashboard/admin">
          <div className="sidemenu-icons">
            <i className="fa fa-user-o"></i>
          </div>
        </Link>
        <ul className="side-menu-list">
          <li>
            <span className="profile-name">{this.state.userInitials}</span>
          </li>
          <li>
            <MoreMenu />
          </li>
        </ul>
      </div>
    );
  }
}

SideMenu.propTypes = {
  user: PropTypes.object
};

export default SideMenu;
