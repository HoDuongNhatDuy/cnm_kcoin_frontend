import React, {Component} from 'react';
import {connect} from 'react-redux'
import './AdminHeader.css';
import {Logout} from "../../AuthService";
import {NavLink} from "react-router-dom";

class AdminHeader extends Component {

    renderDashboardHeader() {
        return (
            <div className="header-bar clearfix">
                <div className="col-sm-offset-1 col-sm-4 pointer">Hello, <strong>{this.props.email}</strong></div>
                <div className="col-sm-2">
                    <NavLink className="navlink" to="/admin">Dashboard</NavLink>
                </div>
                <div className="header-col col-sm-2">
                    <NavLink className="navlink" to="/admin/users">Users</NavLink>
                </div>
                <div className="header-col col-sm-2">
                    <NavLink className="navlink" to="/admin/transactions">Transactions</NavLink>
                </div>
                <div className="header-col col-sm-2 text-right">
                    <div className="pointer button" onClick={() => this.logout()}> <span className="glyphicon glyphicon-log-out"></span> LOG OUT</div>
                </div>
            </div>
        )
    }

    logout() {
        Logout(this.props.history, "You have been logged out successfully.");
    }

    render() {
        return (
            <div className="Header">
                {this.renderDashboardHeader()}
            </div>
        );
    }
}

AdminHeader = connect(function (state) {
    return {...state}
})(AdminHeader);

export default AdminHeader;
