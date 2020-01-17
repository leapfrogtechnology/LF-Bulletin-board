import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  getUserImage() {
    return this.props.user && this.props.user.imageUrl ? this.props.user.imageUrl : null;
  }

  render() {
    return (
      <div>
        <div className="sidemenu-bulletin-logo">
          <img src={logo} alt="bulletin logo" />
        </div>
        <ul className="side-menu-list">
          <li>
            {this.getUserImage() ? (
              <img src={this.getUserImage()} alt={this.state.userInitials} className="circular-img" />
            ) : (
              <span className="profile-name">{this.state.userInitials}</span>
            )}
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
