import React, {Component} from 'react';
import {connect} from 'react-redux'
import './Balance.css';

class Balance extends Component {

    render() {
        return (
            <div className="Balance">
                <div className="col-sm-6 text-center available-balance pointer">
                    <div className="amount">{this.props.available_balance}</div>
                    <div className="description">AVAILABLE BALANCE</div>
                </div>

                <div className="col-sm-6 text-center available-balance pointer">
                    <div className="amount">{this.props.actual_balance}</div>
                    <div className="description">ACTUAL BALANCE</div>
                </div>
            </div>
        );
    }
}

Balance = connect(function (state) {
    return {...state}
})(Balance);

export default Balance;
