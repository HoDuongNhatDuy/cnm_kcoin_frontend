import React, {Component} from 'react';
import {connect} from 'react-redux'

class AdminUser extends Component {

    render() {

        return (
            <div className="Dashboard">
                Dashboard
            </div>
        );
    }
}

AdminUser = connect(function (state) {
    return {...state}
})(AdminUser);

export default AdminUser;
