import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {connect} from 'react-redux'
import Header from "../header/Header";
import Balance from "../balance/Balance";
import Transactions from "../transactions/Transactions";

class Dashboard extends Component {
    render() {
        return (
            <div className="Dashboard">
                <Header type="dashboard"></Header>
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
