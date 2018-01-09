import React, {Component} from 'react';
import {connect} from 'react-redux'

class AdminUser extends Component {

    render() {

        return (
            <div className="col-md-12">
                <div className="Dashboard">
                    Dashboard
                </div>
            </div>
        );
    }
}

AdminUser = connect(function (state) {
    return {...state}
})(AdminUser);

export default AdminUser;
