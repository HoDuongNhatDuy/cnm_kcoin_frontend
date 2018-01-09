import React, {Component} from 'react';
import {connect} from 'react-redux'

class AdminUser extends Component {

    render() {

        return (
            <div className="col-md-12">
                <div className="Dashboard">
                    <div className="Balances">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-5 text-center balance-element pointer">
                            <div className="amount">{this.props.total_available_balance}</div>
                            <div className="description">TOTAL AVAILABLE BALANCE</div>
                        </div>

                        <div className="col-sm-5 text-center balance-element pull-right pointer">
                            <div className="amount">{this.props.total_actual_balance}</div>
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
