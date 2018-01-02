import React, {Component} from 'react';
import {connect} from 'react-redux'
import {NavLink} from "react-router-dom";
import UtilService from "../UtilService";
import $ from 'jquery'
import './ResetPassword.css';

class ResetPassword extends Component {

    validate() {
        let email    = this.refs.email.value;
        let password = this.refs.password.value;
        let confirm  = this.refs.password_confirm.value;

        if (!email || !password || !confirm){
            UtilService.ShowSnackBar("Please fill out all the fields!");
            return false;
        }

        if (password !== confirm){
            UtilService.ShowSnackBar("Password and confirmation do not match!");
            return false;
        }

        return true;
    }

    render() {
        return (
            <div className="ResetPassword">
                <div className="col-sm-3"></div>
                <div className="reset-form form-horizontal col-sm-6">
                    <h2 className="text-center">Reset password</h2>
                    <hr className="separator"/>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="email">Email address</label>
                        <div className="col-sm-8">
                            <input type="email" className="form-control textbox" ref="email" id="email" placeholder="Enter your email address"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-3 col-sm-8">
                            <button type="button" className="btn btn-default">SUBMIT</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResetPassword;
