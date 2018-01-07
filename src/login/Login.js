import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux'
import './Login.css';
import $ from 'jquery'
import CONFIGS from "../Configs";
import UtilService from "../UtilService";
import { SetAuthInfo, IsLoggedIn } from "../AuthService";

class Login extends Component {
    login() {
        let thisComponentObj = this;
        let url = CONFIGS.BACKEND_API_URL + '/api/login';
        // Will implement validation here later
        let data = {
            email: this.refs.email.value,
            password: this.refs.password.value
        };
        $.post(url, data, function (response) {
            if (response.status === 1) {
                SetAuthInfo(response.data.access_token, response.data.expired_at, response.data.email, response.data.address);
                thisComponentObj.props.history.push('/');
            }
            else {
                UtilService.ShowSnackBar(response.message);
            }
        });
    }

    componentDidMount() {
        if (IsLoggedIn()) {
            UtilService.ShowSnackBar("Please log out first!");
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="Login">
                <div className="col-sm-3"></div>
                <div className="login-form form-horizontal col-sm-6">
                    <h2 className="text-center">Login</h2>
                    <hr className="separator"/>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="email">Email address</label>
                        <div className="col-sm-8">
                            <input type="email" className="form-control textbox" ref="email" id="email" placeholder="Enter email"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="pwd">Password</label>
                        <div className="col-sm-8">
                            <input type="password" className="form-control textbox" ref="password" id="pwd" placeholder="Enter password"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-offset-3 col-sm-8">
                            <NavLink className="navlink" to="/reset-password">Forgot your password?</NavLink>
                            <NavLink className="navlink" to="/register">Register new account</NavLink>
                            <button type="button" onClick={() => this.login()} className="btn btn-default">
                                LOG IN
                            </button>
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
