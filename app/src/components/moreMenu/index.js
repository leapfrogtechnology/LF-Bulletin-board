import React, { Component } from 'react';

import Logout from '../logout';
import logoutIcon from '../../assets/images/logout_icon.svg';

class MoreMenu extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false
    };

    this.hideMenu = this.hideMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();
    this.setState(
      {
        showMenu: true
      },
      () => {
        document.addEventListener('click', this.hideMenu);
      }
    );
  }

  hideMenu(event) {
    event.preventDefault();
    if (!this.dropDownMenu.contains(event.target)) {
      this.setState(
        {
          showMenu: false
        },
        () => {
          document.removeEventListener('click', this.hideMenu);
        }
      );
    }
  }

  render() {
    return (
      <div
        className="more-menu-wrapper sidemenu-icons"
        ref={(element) => {
          this.dropDownMenu = element;
        }}
        onClick={(event) => this.showMenu(event)}
      >
        <img src={logoutIcon} alt="Log Out" />
        {this.state.showMenu ? (
          <div className="more-menu">
            <Logout />
          </div>
        ) : null}
      </div>
    );
  }
}

export default MoreMenu;
