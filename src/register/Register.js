import React, {Component} from 'react';
import {connect} from 'react-redux'
import {NavLink} from "react-router-dom";
import UtilService from "../UtilService";
import $ from 'jquery'
import CONFIGS from "../Configs";
import './Register.css';

class Register extends Component {

    validate() {
        let email    = this.refs.email.value;
        let password = this.refs.password.value;
        let confirm  = this.refs.password_confirm.value;

        if (!email || !password || !confirm){
            UtilService.ShowSnackBar("Invalid data");
            return false;
        }

        if (password !== confirm){
            UtilService.ShowSnackBar("Password confirm does not match");
            return false;
        }

        return true;
    }

    callRegisterAPI(email, password) {
        return new Promise(resolve => {
            let url = CONFIGS.BACKEND_API_URL + '/api/register';
            let data = {
                email: email,
                password: password
            };
            $.post(url, data, function (response) {
                if (response.status === 1) {
                    resolve(true);
                }
                else {
                    UtilService.ShowSnackBar(response.message);
                    resolve(false);
                }
            });
        });
    }

    callSendActivateEmailAPI(email) {
        return new Promise(resolve => {
            let url = CONFIGS.BACKEND_API_URL + '/api/send-activate-email';
            let data = {
                email: email,
                redirect_url: UtilService.GetCurrentHostURL() + '/account-activate-redirect'
            };
            $.post(url, data, function (response) {
                if (response.status === 1) {
                    resolve(true);
                }
                else {
                    UtilService.ShowSnackBar(response.message);
                    resolve(false);
                }
            });
        });
    }

    async register() {
        if (!this.validate())
            return;

        let email    = this.refs.email.value;
        let password = this.refs.password.value;

        let registerResult = await this.callRegisterAPI(email, password);
        if (!registerResult)
            return;

        UtilService.ShowSnackBar("Sending email");
        let sendEmailResult = await this.callSendActivateEmailAPI(email);
        if (!sendEmailResult)
            return;

        UtilService.ShowSnackBar("An email has been sent!");
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="Register">
                <div className="col-sm-3"></div>
                <div className="register-form form-horizontal col-sm-6">
                    <h2 className="text-center">Register</h2>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="email">Email</label>
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
                        <label className="control-label col-sm-3" htmlFor="confirm">Confirm</label>
                        <div className="col-sm-8">
                            <input type="password" className="form-control" ref="password_confirm" id="confirm" placeholder="Confirm password"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-offset-5 col-sm-1">
                            <NavLink to="/login">Login</NavLink>
                            <button type="button" onClick={() => this.register()} className="btn btn-default">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register = connect(function (state) {
    return {...state}
})(Register);

export default Register;
