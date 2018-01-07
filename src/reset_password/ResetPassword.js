import React, {Component} from 'react';
import UtilService from "../UtilService";
import $ from 'jquery'
import './ResetPassword.css';
import CONFIGS from "../Configs";

class ResetPassword extends Component {

    validate() {
        let email    = this.refs.email.value;

        if (!email){
            UtilService.ShowSnackBar("Please enter email!");
            return false;
        }

        return true;
    }

    resetSubmit() {
        if (!this.validate())
            return;

        let url = CONFIGS.BACKEND_API_URL + '/api/send-reset-password-email';

        let data = {
            email: this.refs.email.value,
            redirect_url: UtilService.GetCurrentHostURL() + '/reset-password-redirect'
        };
        UtilService.ShowSnackBar("Sending email..");

        $.post(url, data, function (response) {
            UtilService.ShowSnackBar(response.message);
        });
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
                            <button type="button" className="btn btn-default" onClick={() => this.resetSubmit()}>SUBMIT</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResetPassword;
