import React, {Component} from 'react';
import {connect} from 'react-redux'
import {browserHistory} from 'react-router-dom'
import {Modal, Button} from 'react-bootstrap'
import UtilService from "../UtilService";
import $ from 'jquery'
import CONFIGS from "../Configs";
import {GetAddress} from "../AuthService";

class AddTransactionModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNewTransactionModal: false,
            show2FAModal: false,
            transactionId: null
        };
    }

    openNewTransactionModal() {
        this.setState({showNewTransactionModal: true});
    }

    closeNewTransactionModal() {
        this.setState({showNewTransactionModal: false});
    }

    createTransactionValidation() {
        let dstAddress = this.refs.dst_address.value;
        let amount     = this.refs.amount.value;

        if (!dstAddress || !amount) {
            UtilService.ShowSnackBar("Invalid data");
            return false;
        }
        return true;
    }

    sendCreateTransactionRequest() {
        return new Promise(resolve => {
            let dstAddress = this.refs.dst_address.value;
            let amount     = this.refs.amount.value;

            let url  = CONFIGS.BACKEND_API_URL + '/api/create-transaction';
            let data = {
                src_addr: GetAddress(),
                dst_arrd: dstAddress,
                amount
            };
            $.post(url, data, function (response) {
                if (response.status === 0) {
                    UtilService.ShowSnackBar(response.message);
                    resolve(null);
                    return;
                }
                resolve(response.data.transaction_id);
            }, 'json');
        });
    }

    sendSendCreateTransactionConfirmationEmail(transactionId) {
        return new Promise(resolve => {
            let url  = CONFIGS.BACKEND_API_URL + `/api/send-create-transaction-confirmation-email/${transactionId}`;
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

    async createNewTransactionSubmit() {
        if (!this.createTransactionValidation()) {
            return;
        }

        let transactionId = await this.sendCreateTransactionRequest();
        if (!transactionId)
            return;

        this.setState({transactionId});

        UtilService.ShowSnackBar('Sending confirmation email');
        let sendEmailResult = await this.sendSendCreateTransactionConfirmationEmail(transactionId);
        if (!sendEmailResult){
            return;
        }
        UtilService.ShowSnackBar('An confirmation email has been sent');
        this.open2FAModal();
    }

    open2FAModal() {
        this.closeNewTransactionModal();
        this.setState({show2FAModal: true});
    }

    close2FAModal() {
        this.setState({show2FAModal: false});
    }

    send2FARequest() {
        let thisComponent = this;
        return new Promise(resolve => {
            let url  = CONFIGS.BACKEND_API_URL + `/api/confirm-transaction`;
            let data = {
                transaction_id: thisComponent.state.transactionId,
                code: thisComponent.refs.code.value
            };
            $.post(url, data, function (response) {
                UtilService.ShowSnackBar(response.message);

                if (response.status === 0) {
                    resolve(false);
                    return;
                }
                resolve(true);
            }, 'json');
        });
    }
    async twoFAModalSubmit() {
        let sendRequestResult = await this.send2FARequest();
        if (!sendRequestResult)
            return;

        this.close2FAModal();
        UtilService.UpdateDashboardData(this.props.dispatch, GetAddress());
    }

    render() {
        return (
            <div>
                <div className="pointer button" onClick={() => this.openNewTransactionModal()}>
                    <span className="glyphicon glyphicon-plus-sign"></span> NEW TRANSACTION
                </div>
                <Modal show={this.state.showNewTransactionModal} onHide={() => this.closeNewTransactionModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>New transaction</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <form className="form-horizontal">
                                <div className="form-group row">
                                    <label className="control-label col-sm-1" htmlFor="dst-address">Destination</label>
                                    <div className="col-sm-5">
                                        <input type="text" className="form-control" ref="dst_address" id="dst-address" placeholder="Destination address"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-1" htmlFor="amount">Amount</label>
                                    <div className="col-sm-5">
                                        <input type="number" className="form-control" ref="amount" id="amount" placeholder="Amount"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.closeNewTransactionModal()}>Close</Button>
                        <button type="button" className="btn btn-default" onClick={() => this.createNewTransactionSubmit()}>
                            Submit
                        </button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.show2FAModal} onHide={() => this.close2FAModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>2FA</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <form className="form-horizontal">
                                <div className="form-group row">
                                    <label className="control-label col-sm-1" htmlFor="code">Code</label>
                                    <div className="col-sm-5">
                                        <input type="text" className="form-control" ref="code" id="code" placeholder="Code"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-default" onClick={() => this.twoFAModalSubmit()}>
                            Submit
                        </button>
                        <Button onClick={() => this.close2FAModal()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

AddTransactionModel = connect(function (state) {
    return {...state}
})(AddTransactionModel);

export default AddTransactionModel;
