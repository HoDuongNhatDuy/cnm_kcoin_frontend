import { Component } from 'react';
import $ from 'jquery'
import CONFIGS from "../Configs";
import UtilService from "../UtilService";

class AccountActiveRedirect extends Component {
    constructor() {
        super()
    }

    callActivateAPI(userId) {
        return new Promise(resolve => {
            let url = CONFIGS.BACKEND_API_URL + `/api/activate/${userId}`;
            $.get(url, function (response) {
                UtilService.ShowSnackBar(response.message);

                if (response.status === 1) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    }

    async componentDidMount() {
        let url = window.location.href;
        let arr = url.split("/");
        let userId =  arr[arr.length - 1];

        let activateResult = await this.callActivateAPI(userId);

        if (activateResult) {
            UtilService.ShowSnackBar('Your account has been activated.');
        }

        this.props.history.push('/login');
    }

    render() {
        return null;
    }
}

export default AccountActiveRedirect;