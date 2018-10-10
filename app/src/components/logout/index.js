import React, { Component } from 'react';

import routeConstants from '../../constants/routeConstants';
import * as bulletinService from '../../services/bulletinService';

class Logout extends Component {

  logoutUser(){
    bulletinService.logOut().then(() => {
      
      localStorage.setItem('isAuthenticated', 0);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      window.location.href = routeConstants.LOGIN;
    });
  }

  render(){
    return ( 
      <button className = "btn btn-default" onClick={() => this.logoutUser()}>Logout</button>     
    );
  }

}
export default Logout;
