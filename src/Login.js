import React, { Component } from 'react';
import {login} from './Services/AuthService';

class Login extends Component {
    login(){
        // login();

    }
    constructor() {
        super()
    }

    render() {
        return(
            <button onClick={() => this.login()}>Login</button>
        )
    }
}

export default Login;