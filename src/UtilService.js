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

export default {ShowSnackBar, UpdatePersonalData}
