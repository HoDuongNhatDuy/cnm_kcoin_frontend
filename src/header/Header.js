import React, {Component} from 'react';
import {connect} from 'react-redux'
import './Header.css';
import {Logout} from "../AuthService";
import AddTransactionModal from '../add_transaction_modal/AddTransactionModel';

class Header extends Component {

    renderDashboardHeader() {
        return (
            <div className="header-bar clearfix">
                <div className="col-sm-offset-1 col-sm-4 pointer">Hello, <strong>{this.props.email}</strong></div>
                <div className="col-sm-2"></div>
                <div className="header-col col-sm-2 text-right">
                    <AddTransactionModal></AddTransactionModal>
                </div>
                <div className="header-col col-sm-2 text-right">
                    <div className="pointer button" onClick={() => this.logout()}> <span className="glyphicon glyphicon-log-out"></span> LOG OUT</div>
                </div>
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
