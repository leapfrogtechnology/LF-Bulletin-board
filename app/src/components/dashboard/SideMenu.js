import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MoreMenu from '../moreMenu';
import logo from '../../../public/images/bulletin-logo-inverse.png';

class SideMenu extends Component {

  constructor (props) {
    super(props);

    this.state = {
      userInitials: props.user && props.user.givenName && props.user.familyName && props.user.givenName[0] + props.user.familyName[0]
    };
  }

  render() {
    return (
      <div>
        <div className="sidemenu-bulletin-logo">
          <img src={logo} alt="bulletin logo"/>
        </div>
        <ul className="side-menu-list">
          <li>
            <span href="javascript:void(0)" className="profile-name">{this.state.userInitials}</span>
          </li>
          <li>
            <MoreMenu/>
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
