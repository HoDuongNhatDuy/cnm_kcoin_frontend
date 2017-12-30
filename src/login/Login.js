import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux'
import './Login.css';
import $ from 'jquery'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Login extends Component {

    login() {
        let url = "login API URL here";
        // Will implement validation here later
        let data = {
            email: this.refs.email.value,
            password: this.refs.password.value
        };
        $.post(url, data, function (response) {
            if (response.status === 200) {
                cookies.set(
                    'access_token', 
                    response.data.access_token, 
                    {path: '/', expires: response.data.expired_at}
                );
                
                this.props.history.push('/');
            }
            else {
                // API didn't respond. Error message goes here
            }
})
    }

    render() {
        return (
            <div className="Login">
                <div className="col-sm-3"></div>
                <div className="login-form form-horizontal col-sm-6">
                    <h2 className="text-center">Login</h2>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="email">Email address</label>
                        <div className="col-sm-8">
                            <input type="email" className="form-control" ref="email" id="email" placeholder="Enter email"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="pwd">Password</label>
                        <div className="col-sm-8">
                            <input type="password" className="form-control" ref="password" id="pwd" placeholder="Enter password"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-offset-5 col-sm-1">
                            <NavLink to="/register">Register</NavLink>
                            <button type="button" onClick={() => this.login()} className="btn btn-default">Log in</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login = connect(function (state) {
    return {...state}
})(Login);

export default Login;
