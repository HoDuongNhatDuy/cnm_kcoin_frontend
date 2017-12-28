import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {connect} from 'react-redux'
import './Header.css';

class Header extends Component {

    renderDashboardHeader() {
        return (
            <div className="">
                <div className="col-sm-offset-1 col-sm-4 pointer">Hello, <strong>{this.props.email}</strong></div>
                <div className="col-sm-3 text-center pointer button">
                    <span className="glyphicon glyphicon-plus-sign"></span> New Transaction
                </div>
                <div className="col-sm-2 text-right pointer button"> <span className="glyphicon glyphicon-log-out"></span> Logout</div>
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
