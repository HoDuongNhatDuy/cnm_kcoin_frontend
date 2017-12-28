import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux'
import './Login.css';

class Login extends Component {

    login() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="Login">
                <div className="col-sm-3"></div>
                <div className="login-form form-horizontal col-sm-6">
                    <h2 className="text-center">Login</h2>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="email">Email</label>
                        <div className="col-sm-8">
                            <input type="email" className="form-control" id="email" placeholder="Enter email"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="pwd">Password</label>
                        <div className="col-sm-8">
                            <input type="password" className="form-control" id="pwd" placeholder="Enter password"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-offset-5 col-sm-1">
                            <NavLink to="/register">Register</NavLink>
                            <button type="button" onClick={() => this.login()} className="btn btn-default">Login</button>
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
