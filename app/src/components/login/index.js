import axios from 'axios';
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

class GoogleLoginComponent extends Component {
 
  constructor(){
    super();
    this.state={
      isLoggedIn: 'false'
    };
  }
  responseGoogle(response){
    axios.post('http://localhost:8000/api/auth/google', {'tokenId':response.tokenId})
      .then(() => {
        localStorage.setItem('isAuthenticated', true);
        this.setState={
          isLoggedIn:'true'
        };
      })
      .catch(err => err);
  }
  render(){
    const isLoggedIn = this.state.isLoggedIn;
    return(
      <div>
        { isLoggedIn ? (
          <GoogleLogin
            clientId="78390524090-tp3ro7vea6p67eepqudcv0fcir97nabf.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle.bind(this)}
            onFailure={this.responseGoogle.bind(this)}
          />) :(
          <GoogleLogin
            clientId="78390524090-tp3ro7vea6p67eepqudcv0fcir97nabf.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle.bind(this)}
            onFailure={this.responseGoogle.bind(this)}
          /> )
        }
      </div>
    );
  }

}

export default GoogleLoginComponent;
