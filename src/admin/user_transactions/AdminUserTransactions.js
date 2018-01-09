import React, {Component} from 'react';
import {connect} from 'react-redux'
import {DataTable} from 'react-data-components'
import CONFIGS from "../../Configs";
import $ from "jquery";
import {GetAccessToken} from "../../AuthService";
import  "./AdminUserTransactions.css";

class AdminUserTransactions extends Component {
    constructor() {
        super();

        this.state = {
            transactions: [],
            user: {}
        }
    }

    componentDidMount() {
        $.ajaxSetup({
            headers:{
                'Authorization': GetAccessToken()
            }
        });

        let userId = this.props.match.params.id;
        let thisComponentObj = this;
        let url = CONFIGS.BACKEND_API_URL + `/api/admin/users/${userId}/`;
        $.get(url, function (response) {
            thisComponentObj.setState({
                transactions: response.data.transactions,
                user: response.data.user
            });
        });
    }

    render() {
        const renderAddress = (value, row) => {
            return (
                <div title={value} className={value === this.state.user.address ? 'current-address' : ''}>
                    {(value.length > 10) ? (value.substr(0, 15) + '...' + value.substr(value.length - 15)): value}
                </div>
            );
        };

        let columns = [
            {title: 'From', prop: 'src_addr', render: renderAddress},
            {title: 'To', prop: 'dst_addr', render: renderAddress},
            {title: 'Amount', prop: 'amount'},
            {title: 'Status', prop: 'status'},
        ];
        return (
            <div className="Dashboard">
                <h4>{this.state.user.email}</h4>
                <h5>{this.state.user.address}</h5>
                <DataTable
                    keys="_id"
                    columns={columns}
                    initialData={this.state.transactions}
                />
            </div>
        );
    }
}

AdminUserTransactions = connect(function (state) {
    return {...state}
})(AdminUserTransactions);

export default AdminUserTransactions;
