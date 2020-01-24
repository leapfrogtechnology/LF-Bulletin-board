import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MoreMenu from '../moreMenu';

import logo from '../../assets/images/bulletin-logo-inverse.png';
import screenIcon from '../../assets/images/screen_icon.svg';
import userIcon from '../../assets/images/user_icon.svg';

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

  getUserImage() {
    return this.props.user && this.props.user.imageUrl ? this.props.user.imageUrl : null;
  }

  render() {
    return (
      <div className="sidemenu-container">
        <div className="sidemenu-bulletin-logo">
          <img src={logo} alt="bulletin logo" />
        </div>
        <Link to="/dashboard/list">
          <div className="sidemenu-icons">
            <img src={screenIcon} alt="Screen" />
          </div>
        </Link>

        <Link to="/dashboard/admin">
          <div className="sidemenu-icons">
            <img src={userIcon} alt="User" />
          </div>
        </Link>

        <div className="side-menu-list">
          <div>
            {this.getUserImage() ? (
              <img src={this.getUserImage()} alt={this.state.userInitials} className="circular-img" />
            ) : (
              <span className="profile-name">{this.state.userInitials}</span>
            )}
          </div>
          <MoreMenu />
        </div>
      </div>
    );
  }
}

SideMenu.propTypes = {
  user: PropTypes.object
};

export default SideMenu;
