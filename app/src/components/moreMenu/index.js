import React, { Component } from 'react';

import Logout from '../logout';

class MoreMenu extends Component {

  constructor () {
    super();

    this.state = {
      showMenu: false
    };

    this.hideMenu = this.hideMenu.bind(this);
  }

  showMenu (event) {
    event.preventDefault();
    this.setState({
      showMenu: true
    }, () => {
      document.addEventListener('click', this.hideMenu);
    });
  }

  hideMenu (event) {
    event.preventDefault();
    if(!this.dropDownMenu.contains(event.target)){
      this.setState({
        showMenu: false
      }, () => {
        document.removeEventListener('click', this.hideMenu);
      });
    }
  }
  
  render () {
    return (
      <div 
        className="more-menu-wrapper"
        ref={(element) => {
          this.dropDownMenu = element;
        }}
      >
        <span onClick={(event) => this.showMenu(event)}><i href="javascript:void(0)" className="icon ion-more"></i></span>
        {this.state.showMenu
          ?(
            <div className="more-menu">
              <Logout/>
            </div>
          ): (
            null
          )
        
        }
      </div>
    );
  }

}

export default MoreMenu;
