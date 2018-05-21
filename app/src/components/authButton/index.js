import React, { Component } from 'react';
import Login from '../login';
import Logout from '../logout';

class AuthButton extends Component{
    constructor()
    {
        super();
    }
    render(){
        return(
            <div>
            { isLoggedIn ?
            (<Logout/>):
            (<Login/>)
            }
            </div>
        )
    }
}
