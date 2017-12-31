let default_state = {
    email: '',
    available_balance: 0,
    actual_balance: 0,
    transactions: [],
    createTransactionState: {
        showNewTransactionModal: false,
        show2FAModal: false,
        transactionId: null,

    }
};

export default (state = default_state, action) => {
    let data = action.data;

    switch (action.type) {
        case 'UPDATE_PERSONAL_DATA':
            let email = data.email;
            let currentAddress = data.address;
            return {...state, email, currentAddress};
        case 'UPDATE_DASHBOARD_DATA':
            let available_balance = data.available_balance;
            let actual_balance = data.actual_balance;
            let transactions = data.transactions;
            return {...state, available_balance, actual_balance, transactions};
        case 'UPDATE_CREATE_TRANSACTION_STATE':
            let createTransactionState = data.createTransactionState;
            return {...state, createTransactionState};
        default:
            return {...state}
    }
}
