const UpdatePersonalData = (email, currentAddress) => ({
    type: 'UPDATE_PERSONAL_DATA',
    data: {email, currentAddress}
});

const UpdateDashboardData = (available_balance, actual_balance, transactions) => ({
    type: 'UPDATE_DASHBOARD_DATA',
    data: {available_balance, actual_balance, transactions}
});

const UpdateCreateTransactionState = (createTransactionState) => ({
    type: 'UPDATE_CREATE_TRANSACTION_STATE',
    data: {createTransactionState}
});


export default {UpdatePersonalData, UpdateDashboardData, UpdateCreateTransactionState}
