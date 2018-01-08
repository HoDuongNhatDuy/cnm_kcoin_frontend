import React, {Component} from 'react';
import {connect} from 'react-redux'
import {DataTable} from 'react-data-components'

class AdminUserTransactions extends Component {
    render() {
        let data = [
            {id: 1, from: 'abc', to: 'me', amount: 123, status: 'free'},
            {id: 2, from: 'abc', to: 'me', amount: 123, status: 'free'},
            {id: 3, from: 'abc', to: 'me', amount: 123, status: 'free'},
            {id: 4, from: 'abc', to: 'me', amount: 123, status: 'free'},
            {id: 5, from: 'abc', to: 'me', amount: 123, status: 'free'},
            {id: 6, from: 'abc', to: 'me', amount: 123, status: 'free'},
            {id: 7, from: 'abc', to: 'me', amount: 123, status: 'free'},
            {id: 8, from: 'abc', to: 'me', amount: 123, status: 'free'},
            {id: 9, from: 'abc', to: 'me', amount: 123, status: 'free'},
            {id: 10, from: 'abc', to: 'me', amount: 123, status: 'free'},
            {id: 11, from: 'abc', to: 'me', amount: 123, status: 'free'},
            {id: 12, from: 'abc', to: 'me', amount: 123, status: 'free'},
            {id: 13, from: 'abc', to: 'me', amount: 123, status: 'free'},
            {id: 14, from: 'abc', to: 'me', amount: 123, status: 'free'},
            {id: 16, from: 'abc', to: 'me', amount: 123, status: 'free'},
            {id: 17, from: 'abc', to: 'me', amount: 123, status: 'free'},
            {id: 18, from: 'abc', to: 'me', amount: 123, status: 'free'},
            {id: 19, from: 'abc', to: 'me', amount: 123, status: 'free'},
            {id: 20, from: 'abc', to: 'me', amount: 123, status: 'free'},
        ];
        let columns = [
            {title: 'From', prop: 'from'},
            {title: 'To', prop: 'to'},
            {title: 'Amount', prop: 'amount'},
            {title: 'Status', prop: 'status'},
        ];
        return (
            <div className="Dashboard">
                <h1>User email</h1>
                <DataTable
                    keys="id"
                    columns={columns}
                    initialData={data}
                />
            </div>
        );
    }
}

AdminUserTransactions = connect(function (state) {
    return {...state}
})(AdminUserTransactions);

export default AdminUserTransactions;
