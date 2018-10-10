import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import urlConstants from '../../constants/urlConstants';
import routeConstants from '../../constants/routeConstants';
import bulletinLogo from '../../../public/images/bulletin-board-login-image.png';


class GoogleLoginComponent extends Component {
 
  constructor(){
    super();
    this.state={
      isLoggedIn: JSON.parse(localStorage.getItem('isAuthenticated')) ? true : false || false
    };
  }
  responseGoogle(response){
    axios.post(urlConstants.googleLoginUrl, {'tokenId':response.tokenId})
      .then(res => {
        localStorage.setItem('isAuthenticated', 1);
        localStorage.setItem('accessToken', res.data.data.tokens.accessToken);
        localStorage.setItem('refreshToken', res.data.data.tokens.refreshToken);
        localStorage.setItem('user', JSON.stringify(res.data.data.user));
      
        this.setState({
          isLoggedIn: true
        });
      })
      .catch(err => err);
  }
  render(){
    const isLoggedIn = this.state.isLoggedIn;
    
    return(
      <div className="login-wrapper">
        { 
          !isLoggedIn ? (
            <div className="login-dialog">
              <img src={bulletinLogo} alt="bulletin logo" className="bulletin-logo-big"/>
              <GoogleLogin
                clientId="78390524090-tp3ro7vea6p67eepqudcv0fcir97nabf.apps.googleusercontent.com"
                buttonText="Google Login"
                className="login-button-style"
                onSuccess={this.responseGoogle.bind(this)}
                onFailure={this.responseGoogle.bind(this)}
              />
            </div>
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
