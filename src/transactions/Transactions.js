import React, {Component} from 'react';
import {connect} from 'react-redux'
import {ButtonGroup, Button} from 'react-bootstrap'
import './Transactions.css';
import {GetAddress} from "../AuthService";
import CONFIGS from "../Configs";
import $ from 'jquery'
import UtilService from "../UtilService";

class Transactions extends Component {

    sendDeleteTransactionRequest(transactionId) {
        return new Promise(resolve => {
            let url  = CONFIGS.BACKEND_API_URL + `/api/delete-transaction/${transactionId}`;
            $.get(url, function (response) {
                if (response.status === 0) {
                    UtilService.ShowSnackBar(response.message);
                    resolve(false);
                    return;
                }
                resolve(true);
            }, 'json');
        });
    }

    async deleteTransaction(transactionId) {
        if (!this.sendDeleteTransactionRequest(transactionId))
            return;

        UtilService.UpdateDashboardData(this.props.dispatch, GetAddress());
    }

    async resendConfirmationEmail(transactionId) {
        alert('this function has not implemented yet');
    }

    async reConfirm(transactionId) {
        alert('this function has not implemented yet');
    }

    renderActions(transactionId) {
        return (
            <div>
                <ButtonGroup className="actions">
                    <button className="actionbtn" title="Re-send confirmation email" onClick={() => this.resendConfirmationEmail(transactionId)}><span className="glyphicon glyphicon-envelope"></span></button>
                    <button className="actionbtn" title="Confirm again" onClick={() => this.reConfirm(transactionId)}><span className="glyphicon glyphicon-repeat"></span></button>
                    <button className="actionbtn" title="Delete transaction" onClick={() => this.deleteTransaction(transactionId)}><span className="glyphicon glyphicon glyphicon-trash"></span></button>
                </ButtonGroup>
            </div>
        );
    }

    renderTransactionList() {
        let currentArr = GetAddress();

        return this.props.transactions.map((transaction, index) => {
            let type = transaction.dst_addr === currentArr ? 'in' : 'out';
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
                            {type === 'in' ? ('from ' + (transaction.src_addr ? transaction.src_addr : 'Blockchain')) : ('to ' + transaction.dst_addr)}
                        </div>
                    </div>
                    <div className="col-sm-2 text-right">
                        <div className="status">{transaction.status}</div>
                        {transaction.status === 'init' ? this.renderActions(transaction._id) : null}
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
