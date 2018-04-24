import React, { Component } from 'react';
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
            <span><i href="javascript:void(0)" className="icon ion-more"></i></span>
          </li>
        </ul>
      </div>
    );
  }

}

export default SideMenu;
