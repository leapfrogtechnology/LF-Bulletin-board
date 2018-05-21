import React, {Component} from 'react';
import Redirect from 'react-router-dom';

class Logout extends Component {

  constructor(){
    super(); 
    this.state = {
      authenticate: localStorage.getItem('isAuthenticated')
    };
  }
  logoutUser(){
    this.setState({
      authenticate: false
    });
    localStorage.setItem('isAuthenticated', false);
  }
  render(){
    return authenticate=== 'false' ?
      (
                <Redirect to= "/"/>
      ): (
            <button className = "btn btn-default">Logout</button>
);
  }

}
export default Logout;
