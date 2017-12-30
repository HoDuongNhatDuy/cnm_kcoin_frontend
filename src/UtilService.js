import Actions from './Actions';

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

export default {ShowSnackBar, UpdatePersonalData, GetCurrentHostURL}
