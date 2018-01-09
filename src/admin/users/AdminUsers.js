import React, {Component} from 'react';
import {connect} from 'react-redux'
import {DataTable} from 'react-data-components'
import {NavLink} from "react-router-dom";
class AdminUsers extends Component {



    render() {
        const renderEmail = (val, row) => {
            return (
              <NavLink to={'/admin/user/' + row.id }>{row.email}</NavLink>
            )
        };

        let data = [
            {id: 1, email: 'abc@mailinator.com', available_balance: 123, actual_balance: 123 },
            {id: 2, email: 'abc@mailinator.com', available_balance: 123, actual_balance: 123 },
            {id: 3, email: 'abc@mailinator.com', available_balance: 123, actual_balance: 123 },
            {id: 4, email: 'abc@mailinator.com', available_balance: 123, actual_balance: 123 },
            {id: 5, email: 'abc@mailinator.com', available_balance: 123, actual_balance: 123 },
            {id: 6, email: 'abc@mailinator.com', available_balance: 123, actual_balance: 123 },
            {id: 7, email: 'abc@mailinator.com', available_balance: 123, actual_balance: 123 },
            {id: 8, email: 'abc@mailinator.com', available_balance: 123, actual_balance: 123 },
            {id: 9, email: 'abc@mailinator.com', available_balance: 123, actual_balance: 123 },
            {id: 10, email: 'abc@mailinator.com', available_balance: 123, actual_balance: 123 },
            {id: 12, email: 'abc@mailinator.com', available_balance: 123, actual_balance: 123 },
            {id: 13, email: 'abc@mailinator.com', available_balance: 123, actual_balance: 123 },
            {id: 14, email: 'abc@mailinator.com', available_balance: 123, actual_balance: 123 },
            {id: 15, email: 'abc@mailinator.com', available_balance: 123, actual_balance: 123 },
            {id: 16, email: 'abc@mailinator.com', available_balance: 123, actual_balance: 123 },
            {id: 17, email: 'abc@mailinator.com', available_balance: 123, actual_balance: 123 },
        ];
        let columns = [
            {title: 'Email address', prop: 'email', render: renderEmail},
            {title: 'Available balance', prop: 'available_balance'},
            {title: 'Actual balance', prop: 'actual_balance'}
        ];
        return (
            <div className="Dashboard">
                <DataTable
                    className="users-table"
                    keys="id"
                    columns={columns}
                    initialData={data}
                />
            </div>
        );
    }
}

AdminUsers = connect(function (state) {
    return {...state}
})(AdminUsers);

export default AdminUsers;
