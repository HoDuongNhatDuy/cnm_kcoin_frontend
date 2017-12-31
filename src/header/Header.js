import React, {Component} from 'react';
import {connect} from 'react-redux'
import { browserHistory } from 'react-router-dom'
import './Header.css';
import {Logout} from "../AuthService";

class Header extends Component {

    renderDashboardHeader() {
        return (
            <div className="clearfix">
                <div className="col-sm-offset-1 col-sm-4 pointer">Hello, <strong>{this.props.email}</strong></div>
                <div className="col-sm-1"></div>
                <div className="col-sm-3 text-right pointer button">
                    <span className="glyphicon glyphicon-plus-sign"></span> NEW TRANSACTION
                </div>
                <div className="col-sm-2 text-right pointer button" onClick={() => this.logout()}> <span className="glyphicon glyphicon-log-out"></span> LOG OUT</div>
            </div>
        )
    }

    renderByType() {
        let type = this.props.type;
        switch (type) {
            case 'login':
                return '';
            case 'register':
                return '';
            default:
                return this.renderDashboardHeader();
        }
    }

    logout() {
        Logout(this.props.history, "You have been logged out successfully.");
    }

    render() {
        return (
            <div className="Header">
                {this.renderByType()}
            </div>
        );
    }
}

Header = connect(function (state) {
    return {...state}
})(Header);

export default Header;
