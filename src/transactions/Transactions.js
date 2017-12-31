import React, {Component} from 'react';
import {connect} from 'react-redux'
import './Transactions.css';

class Transactions extends Component {
    renderTransactionList() {
        let currentArr = this.props.currentAddress;
        return this.props.transactions.map((transaction, index) => {
            let type = transaction.to === currentArr ? 'in' : 'out';
            return (
                <div key={'transaction-' + index} className="transaction-item">
                    <div className="col-sm-3">
                        <div className="date">{transaction.created_at}</div>
                        <div className="icon">
                            <span className={type === 'in' ? 'glyphicon glyphicon-circle-arrow-down' : 'glyphicon glyphicon-circle-arrow-up'}></span>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="amount">{transaction.amount}</div>
                        <div className="address">
                            {type === 'in' ? ('from ' + transaction.from) : ('to ' + transaction.to)}
                        </div>
                    </div>
                </div>
            )
        });
    }

    render() {
        return (
            <div className="Transactions col-sm-offset-1 col-sm-10">
                {this.renderTransactionList()}
            </div>
        );
    }
}

Transactions = connect(function (state) {
    return {...state}
})(Transactions);

export default Transactions;
