import React, {Component} from 'react';
import {connect} from 'react-redux'
import $ from "jquery";
import CONFIGS from "../../Configs";
import {GetAccessToken} from "../../AuthService";
import UtilService from "../../UtilService";

class AdminUser extends Component {
    constructor() {
        super();

        this.state = {
            actual: 0,
            available: 0,
        }
    }

    componentDidMount() {
        $.ajaxSetup({
            headers:{
                'Authorization': GetAccessToken()
            }
        });

        let thisComponentObj = this;
        let url = CONFIGS.BACKEND_API_URL + `/api/admin/balances`;
        $.get(url, function (response) {
            if (response.status === 1) {
                thisComponentObj.setState({
                    actual: response.data.actual,
                    available: response.data.available
                });
            }
            else {
                UtilService.ShowSnackBar(response.message);
            }
        });
    }

    render() {

        return (
            <div className="col-md-12">
                <div className="Dashboard">
                    <div className="Balances">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-5 text-center balance-element pointer">
                            <div className="amount">{this.state.actual}</div>
                            <div className="description">TOTAL AVAILABLE BALANCE</div>
                        </div>

                        <div className="col-sm-5 text-center balance-element pull-right pointer">
                            <div className="amount">{this.state.available}</div>
                            <div className="description">TOTAL ACTUAL BALANCE</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AdminUser = connect(function (state) {
    return {...state}
})(AdminUser);

export default AdminUser;
