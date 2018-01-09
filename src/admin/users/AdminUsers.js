import React, {Component} from 'react';
import {connect} from 'react-redux'
import {DataTable} from 'react-data-components'
import {NavLink} from "react-router-dom";
import CONFIGS from "../../Configs";
import $ from 'jquery'
import {GetAccessToken} from "../../AuthService";

class AdminUsers extends Component {
    constructor() {
        super();

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        $.ajaxSetup({
            headers:{
                'Authorization': GetAccessToken()
            }
        });

        let thisComponentObj = this;
        let url = CONFIGS.BACKEND_API_URL + '/api/admin/users';
        $.get(url, function (response) {
            thisComponentObj.setState({
                users: response.data
            });
        });
    }

    render() {
        const renderEmail = (val, row) => {
            return (
              <NavLink to={'/admin/user/' + row.id }>{row.email}</NavLink>
            )
        };

        let columns = [
            {title: 'Email', prop: 'email', render: renderEmail},
            {title: 'Address', prop: 'address'},
            {title: 'Available', prop: 'actual'},
            {title: 'Actual', prop: 'available'}
        ];
        return (
            <div className="Dashboard">
                <DataTable
                    className="users-table"
                    keys="id"
                    columns={columns}
                    initialData={this.state.users}
                />
            </div>
        );
    }
}

AdminUsers = connect(function (state) {
    return {...state}
})(AdminUsers);

export default AdminUsers;
