import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

class SideMenu extends Component {

  render() {
    return (
      <div>
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
