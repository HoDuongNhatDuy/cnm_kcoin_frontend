import React, {Component} from 'react';
import {connect} from 'react-redux'
import './Balance.css';
import {GetAddress} from "../AuthService";

class Balance extends Component {

    render() {
        return (
            <div className="Balance">
                <div className="">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-5 text-center balance-element pointer">
                        <div className="amount">{this.props.available_balance}</div>
                        <div className="description">AVAILABLE BALANCE</div>
                    </div>

                    <div className="col-sm-5 text-center balance-element pull-right pointer">
                        <div className="amount">{this.props.actual_balance}</div>
                        <div className="description">ACTUAL BALANCE</div>
                    </div>
                </div>
            
                <div className="">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-5 text-center pointer">
                        <div className="address">Your KCoin address: {GetAddress()}</div>
                    </div>
                </div>
            </div>
        );
    }
}

Balance = connect(function (state) {
    return {...state}
})(Balance);

export default Balance;
