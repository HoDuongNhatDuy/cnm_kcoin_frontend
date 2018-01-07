import Actions from './Actions';
import $ from 'jquery'
import CONFIGS from "./Configs";
import {Logout} from "./AuthService";

const ShowSnackBar = function (text, type = "normal") {
    let x       = document.getElementById("snackbar");
    x.innerHTML = text;
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
        x.innerHTML = "";
    }, 5000);
};

const UpdatePersonalData = function (dispatch, email, address) {
    dispatch(Actions.UpdatePersonalData(email, address));
};

/**
 * @return {string}
 */
const GetCurrentHostURL = function () {
    let url = window.location.href;
    let arr = url.split("/");
    return arr[0] + "//" + arr[2];
};

function sendGetDashboardDataRequest(history) {
    return new Promise(resolve => {
        let url  = CONFIGS.BACKEND_API_URL + `/api/get-dashboard-info`;
        $.get(url, function (response) {
            if (response.status === 0) {
                ShowSnackBar(response.message);
                resolve(false);
                return;
            }
            else if (response.status === -1) {
                Logout(history, response.message);
                resolve(false);
                return;
            }
            resolve(response.data);
        }, 'json');
    });
}

const UpdateDashboardData = async function (dispatch, history) {
    let sendRequestResult = await sendGetDashboardDataRequest(history);
    if (!sendRequestResult)
        return;

    dispatch(Actions.UpdateDashboardData(sendRequestResult.available, sendRequestResult.actual, sendRequestResult.transactions));
};

const UpdateCreateTransactionState = async function (dispatch, createTransactionState) {
    dispatch(Actions.UpdateCreateTransactionState(createTransactionState));
};

const SendSendCreateTransactionConfirmationEmail = function(transactionId) {
    return new Promise(resolve => {
        let url  = CONFIGS.BACKEND_API_URL + `/api/send-create-transaction-confirmation-email/${transactionId}`;
        $.get(url, function (response) {
            if (response.status === 0) {
                ShowSnackBar(response.message);
                resolve(false);
                return;
            }
            resolve(true);
        }, 'json');
    });
};

const Send2FARequest = function(transactionId, code) {
    return new Promise(resolve => {
        let url  = CONFIGS.BACKEND_API_URL + `/api/confirm-transaction`;
        let data = {
            transaction_id: transactionId,
            code: code
        };
        $.post(url, data, function (response) {
            ShowSnackBar(response.message);

            if (response.status === 0) {
                resolve(false);
                return;
            }
            resolve(true);
        }, 'json');
    });
};

export default {
    ShowSnackBar,
    UpdatePersonalData,
    GetCurrentHostURL,
    UpdateDashboardData,
    UpdateCreateTransactionState,
    SendSendCreateTransactionConfirmationEmail,
    Send2FARequest
}
