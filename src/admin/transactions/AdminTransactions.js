import React, {Component} from 'react';
import {connect} from 'react-redux'
import {DataTable} from 'react-data-components'
import $ from "jquery";
import CONFIGS from "../../Configs";
import {GetAccessToken} from "../../AuthService";

class AdminTransactions extends Component {
    constructor() {
        super();

        this.state = {
            transactions: [],
        }
    }

    componentDidMount() {
        $.ajaxSetup({
            headers:{
                'Authorization': GetAccessToken()
            }
        });

        let thisComponentObj = this;
        let url = CONFIGS.BACKEND_API_URL + `/api/admin/transactions`;
        $.get(url, function (response) {
            thisComponentObj.setState({
                transactions: response.data,
            });
        });
    }



    render() {
        const renderHash = (value, row) => {
            return value.length > 10 ? (value.substr(0, 15) + '...' + value.substr(value.length - 15)): value;
        };

        let columns = [
            {title: 'Source', prop: 'hash', render: renderHash},
            {title: 'Index', prop: 'index'},
            {title: 'Destination Address', prop: 'dst_addr', render: renderHash},
            {title: 'Destination Email', prop: 'dst_email'},
            {title: 'Amount', prop: 'amount'},
            {title: 'Status', prop: 'status'},
        ];
        return (
            <div className="Dashboard">
                <DataTable
                    keys="id"
                    columns={columns}
                    initialData={this.state.transactions}
                />
            </div>
        );
    }
}

AdminTransactions = connect(function (state) {
    return {...state}
})(AdminTransactions);

export default AdminTransactions;
