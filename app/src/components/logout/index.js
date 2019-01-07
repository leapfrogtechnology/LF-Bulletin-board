import swal from 'sweetalert';
import React, { Component } from 'react';


import * as bulletinUtil from '../../utils/bulletinUtil';
import * as bulletinService from '../../services/bulletinService';

class Logout extends Component {

  logoutUser(){
    bulletinService.logOut()
      .then(() => {
        bulletinUtil.logout();
      })
      .catch(err => {
        bulletinUtil.logout();
      });
  }

  render(){
    return ( 
      <button className = "btn btn-default" onClick={() => this.logoutUser()}>Logout</button>     
    );
  }

}
export default Logout;
