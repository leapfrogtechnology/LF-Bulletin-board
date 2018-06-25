import React, { Component } from 'react';

import MoreMenu from '../moreMenu';
import logo from '../../../public/images/bulletin-logo-inverse.png';

class SideMenu extends Component {

  render() {
    return (
      <div>
        <div className="sidemenu-bulletin-logo">
          <img src={logo} alt="bulletin logo"/>
        </div>
        <ul className="side-menu-list">
          <li>
            <span href="javascript:void(0)" className="profile-name">AA</span>
          </li>
          <li>
            <MoreMenu/>
          </li>
        </ul>
      </div>
    );
  }

}

export default SideMenu;
