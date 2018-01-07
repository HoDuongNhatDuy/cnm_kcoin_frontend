import React, {Component} from 'react';
import UtilService from "../UtilService";
import $ from 'jquery'
import './ResetPassword.css';
import CONFIGS from "../Configs";

class ConfirmReset extends Component {

    validate() {
        let password = this.refs.password.value;
        let confirm  = this.refs.password_confirm.value;

        if (!password || !confirm){
            UtilService.ShowSnackBar("Please fill out all the fields!");
            return false;
        }

        if (password !== confirm){
            UtilService.ShowSnackBar("Password and confirmation do not match!");
            return false;
        }

        return true;
    }

    callResetAPI(userId) {
        return new Promise(resolve => {
            let url = CONFIGS.BACKEND_API_URL + '/api/reset-password';
            let data = {
                user_id: userId,
                password: this.refs.password.value
            };
            $.post(url, data, function (response) {
                resolve(response);
            });
        })
    }

    async resetSubmit() {
        let url = window.location.href;
        let arr = url.split("/");
        let userId =  arr[arr.length - 1];

        if (!this.validate())
            return;

        let resetResult = await this.callResetAPI(userId);

        UtilService.ShowSnackBar(resetResult.message);

        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="ResetPassword">
                <div className="col-sm-3"></div>
                <div className="reset-form form-horizontal col-sm-6">
                    <h2 className="text-center">Confirm password reset</h2>
                    <hr className="separator"/>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="pwd">New password</label>
                        <div className="col-sm-8">
                            <input type="password" className="form-control textbox" ref="password" id="pwd" placeholder="Enter new password"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="confirm">Confirm</label>
                        <div className="col-sm-8">
                            <input type="password" className="form-control textbox" ref="password_confirm" id="confirm" placeholder="Confirm new password"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-3 col-sm-8">
                            <button type="button" className="btn btn-default" onClick={() => this.resetSubmit()}>RESET PASSWORD</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfirmReset;
