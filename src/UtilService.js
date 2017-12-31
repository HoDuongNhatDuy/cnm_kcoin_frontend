import Actions from './Actions';
import $ from 'jquery'
import CONFIGS from "./Configs";

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

function sendGetDashboardDataRequest(address) {
    return new Promise(resolve => {
        let url  = CONFIGS.BACKEND_API_URL + `/api/get-dashboard-info/${address}`;
        $.get(url, function (response) {
            if (response.status === 0) {
                ShowSnackBar(response.message);
                resolve(false);
                return;
            }
            resolve(response.data);
        }, 'json');
    });
}

const UpdateDashboardData = async function (dispatch, address) {
    let sendRequestResult = await sendGetDashboardDataRequest(address);
    if (!sendRequestResult)
        return;

    dispatch(Actions.UpdateDashboardData(sendRequestResult.available, sendRequestResult.actual, sendRequestResult.transactions));
};

const UpdateCreateTransactionState = async function (dispatch, createTransactionState) {
    dispatch(Actions.UpdateCreateTransactionState(createTransactionState));
};

export default {ShowSnackBar, UpdatePersonalData, GetCurrentHostURL, UpdateDashboardData, UpdateCreateTransactionState}
