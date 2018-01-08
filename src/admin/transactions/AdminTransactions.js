import React, {Component} from 'react';
import {connect} from 'react-redux'
import {DataTable} from 'react-data-components'

class AdminTransactions extends Component {
    render() {
        let data = [
            {id: 1, source: 'xxx', index: 1, amount: 123, status: 'free'},
            {id: 2, source: 'xxx', index: 1, amount: 123, status: 'free'},
            {id: 3, source: 'xxx', index: 1, amount: 123, status: 'free'},
            {id: 4, source: 'xxx', index: 1, amount: 123, status: 'free'},
            {id: 5, source: 'xxx', index: 1, amount: 123, status: 'free'},
            {id: 6, source: 'xxx', index: 1, amount: 123, status: 'free'},
            {id: 7, source: 'xxx', index: 1, amount: 123, status: 'free'},
            {id: 8, source: 'xxx', index: 1, amount: 123, status: 'free'},
            {id: 9, source: 'xxx', index: 1, amount: 123, status: 'free'},
            {id: 10, source: 'xxx', index: 1, amount: 123, status: 'free'},
            {id: 11, source: 'xxx', index: 1, amount: 123, status: 'free'},
            {id: 12, source: 'xxx', index: 1, amount: 123, status: 'free'},
            {id: 13, source: 'xxx', index: 1, amount: 123, status: 'free'},
            {id: 14, source: 'xxx', index: 1, amount: 123, status: 'free'},
            {id: 15, source: 'xxx', index: 1, amount: 123, status: 'free'},
            {id: 16, source: 'xxx', index: 1, amount: 123, status: 'free'},
            {id: 17, source: 'xxx', index: 1, amount: 123, status: 'free'},
            {id: 18, source: 'xxx', index: 1, amount: 123, status: 'free'},
            {id: 19, source: 'xxx', index: 1, amount: 123, status: 'free'},
            {id: 20, source: 'xxx', index: 1, amount: 123, status: 'free'},
        ];
        let columns = [
            {title: 'Source', prop: 'source'},
            {title: 'Index', prop: 'index'},
            {title: 'Amount', prop: 'amount'},
            {title: 'Status', prop: 'status'},
        ];
        return (
            <div className="Dashboard">
                <DataTable
                    keys="id"
                    columns={columns}
                    initialData={data}
                />
            </div>
        );
    }
}

AdminTransactions = connect(function (state) {
    return {...state}
})(AdminTransactions);

export default AdminTransactions;
