import React, {Component} from 'react';
import {connect} from 'react-redux'
import {browserHistory} from 'react-router-dom'
import {Modal, Button} from 'react-bootstrap'
import UtilService from "../UtilService";
import './AddTransactionModel.css';
import $ from 'jquery'
import CONFIGS from "../Configs";
import {GetAddress} from "../AuthService";

class AddTransactionModel extends Component {
    openNewTransactionModal() {
        UtilService.UpdateCreateTransactionState(this.props.dispatch, {...this.props.createTransactionState, showNewTransactionModal: true})
    }

    closeNewTransactionModal() {
        UtilService.UpdateCreateTransactionState(this.props.dispatch, {...this.props.createTransactionState, showNewTransactionModal: false})
        UtilService.UpdateDashboardData(this.props.dispatch, GetAddress());

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

    async createNewTransactionSubmit() {
        if (!this.createTransactionValidation()) {
            return;
        }

        let transactionId = await this.sendCreateTransactionRequest();
        if (!transactionId)
            return;

        UtilService.UpdateCreateTransactionState(this.props.dispatch, {...this.props.createTransactionState, transactionId})

        UtilService.ShowSnackBar('Sending confirmation email');
        let sendEmailResult = await UtilService.SendSendCreateTransactionConfirmationEmail(transactionId);
        if (!sendEmailResult){
            return;
        }
        UtilService.ShowSnackBar('A verification code has been sent to your email address.');
        this.open2FAModal();
    }

    open2FAModal() {
        this.closeNewTransactionModal();
        UtilService.UpdateCreateTransactionState(this.props.dispatch, {...this.props.createTransactionState, show2FAModal: true})
    }

    close2FAModal() {
        UtilService.UpdateCreateTransactionState(this.props.dispatch, {...this.props.createTransactionState, show2FAModal: false})
    }

    async twoFAModalSubmit() {
        let transactionId = this.props.createTransactionState.transactionId;
        let code = this.refs.code.value;
        let sendRequestResult = await UtilService.Send2FARequest(transactionId, code);
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
                <Modal show={this.props.createTransactionState.showNewTransactionModal} onHide={() => this.closeNewTransactionModal()}
                dialogClassName="modalbox" >
                    <Modal.Header closeButton>
                        <Modal.Title className="title">New transaction</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <form className="form-horizontal">
                                <div className="form-group row">
                                    <label className="control-label col-sm-1" htmlFor="dst-address">Destination</label>
                                    <div className="col-sm-5">
                                        <input type="text" className="form-control modaltextbox" ref="dst_address" id="dst-address" placeholder="Destination address"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-1" htmlFor="amount">Amount</label>
                                    <div className="col-sm-5">
                                        <input type="number" className="form-control modaltextbox" ref="amount" id="amount" placeholder="Amount"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.closeNewTransactionModal()}>CANCEL</Button>
                        <button type="button" className="btn btn-default" onClick={() => this.createNewTransactionSubmit()}>
                            SUBMIT
                        </button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.props.createTransactionState.show2FAModal} onHide={() => this.close2FAModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title className="title">Enter your verification code to confirm the transaction</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <form className="form-horizontal">
                                <div className="form-group row">
                                    <label className="control-label col-sm-2" htmlFor="code">Verification code</label>
                                    <div className="col-sm-4">
                                        <input type="text" className="form-control modaltextbox" ref="code" id="code" placeholder="Code"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-default" onClick={() => this.twoFAModalSubmit()}>
                            CONFIRM
                        </button>
                        <Button onClick={() => this.close2FAModal()}>CLOSE</Button>
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
