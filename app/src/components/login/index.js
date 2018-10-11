import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import urlConstants from '../../constants/urlConstants';
import textConstants from '../../constants/textConstants';
import routeConstants from '../../constants/routeConstants';
import bulletinLogo from '../../../public/images/bulletin-board-login-image.png';


class GoogleLoginComponent extends Component {
 
  constructor(){
    super();
    this.state={
      isLoggedIn: JSON.parse(localStorage.getItem('user')) ? true : false
    };
  }
  responseGoogle(response){
    axios.post(urlConstants.googleLoginUrl, {'tokenId':response.tokenId})
      .then(res => {
        const {tokens, user} = res.data.data;
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
      
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
                clientId={textConstants.googleClientId}
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
