import React, {Component} from 'react';
import {connect} from 'react-redux'
import Header from "../header/Header";
import Balance from "../balance/Balance";
import Transactions from "../transactions/Transactions";
import UtilService from "../UtilService";
import $ from 'jquery'
import {IsLoggedIn, Logout, GetEmail, GetAddress, GetAccessToken} from "../AuthService";

class Dashboard extends Component {
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
        UtilService.UpdateDashboardData(this.props.dispatch, this.props.history);
    }
    render() {

        return (
            <div className="Dashboard">
                <Header type="dashboard" history={this.props.history}></Header>
                <Balance></Balance>
                <Transactions></Transactions>
            </div>
        );
    }
}

Dashboard = connect(function (state) {
    return {...state}
})(Dashboard);

export default Dashboard;
