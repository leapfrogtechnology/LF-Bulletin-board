import axios from 'axios';
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';

import routeConstants from '../../constants/routeConstants';

class GoogleLoginComponent extends Component {
 
  constructor(){
    super();
    this.state={
      isLoggedIn: JSON.parse(localStorage.getItem('isAuthenticated')) ? true : false || false
    };
  }
  responseGoogle(response){
    axios.post('http://localhost:8848/api/auth/google', {'tokenId':response.tokenId})
      .then(res => {
        localStorage.setItem('isAuthenticated', 1);
        localStorage.setItem('accessToken', res.data.data.tokens.accessToken);
        localStorage.setItem('refreshToken', res.data.data.tokens.refreshToken);
      
        this.setState({
          isLoggedIn: true
        });
      })
      .catch(err => err);
  }
  render(){
    const isLoggedIn = this.state.isLoggedIn;
    
    return(
      <div>
        { 
          !isLoggedIn ? (
            <GoogleLogin
              clientId="78390524090-tp3ro7vea6p67eepqudcv0fcir97nabf.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.responseGoogle.bind(this)}
              onFailure={this.responseGoogle.bind(this)}
            />
          ) :(
            <Redirect
              to={{
                pathname: routeConstants.DASHBOARD
              }}
            />
          )
        }
      </div>
    );
  }

}

export default GoogleLoginComponent;
