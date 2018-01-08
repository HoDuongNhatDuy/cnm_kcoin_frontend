import React, {Component} from 'react';
import {connect} from 'react-redux'
import {BrowserRouter, Route} from "react-router-dom";
import AdminHeader from "./header/AdminHeader";
import AdminDashboard from "./dashboard/AdminDashboard";
import AdminUsers from "./users/AdminUsers";
import AdminUserTransaction from "./user_transactions/AdminUserTransactions";
import AdminTransactions from "./transactions/AdminTransactions";
import UtilService from "../UtilService";
import $ from 'jquery'
import {IsLoggedIn, Logout, GetEmail, GetAddress, GetAccessToken} from "../AuthService";

class AdminIndex extends Component {
    componentDidMount() {
        if (!IsLoggedIn()) {
            Logout(this.props.history);
            return;
        }

        $.ajaxSetup({
            headers:{
                'Authorization': GetAccessToken()
            }
        });

        UtilService.UpdatePersonalData(this.props.dispatch, GetEmail(), GetAddress());
        // UtilService.UpdateDashboardData(this.props.dispatch, this.props.history);
        //
        // let thisComponent = this;
        // setInterval(function () {
        //     UtilService.UpdateDashboardData(thisComponent.props.dispatch, thisComponent.props.history);
        // }, 10000);

    }
    render() {

        return (
            <div className="Dashboard">
                <AdminHeader type="dashboard" history={this.props.history}></AdminHeader>
                <div>
                    <Route exact path="/admin" component={AdminDashboard}></Route>
                    <Route exact path="/admin/users" component={AdminUsers}></Route>
                    <Route exact path="/admin/user/:id" component={AdminUserTransaction}></Route>
                    <Route exact path="/admin/transactions" component={AdminTransactions}></Route>
                </div>
            </div>
        );
    }
}

AdminIndex = connect(function (state) {
    return {...state}
})(AdminIndex);

export default AdminIndex;
