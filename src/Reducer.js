let default_state = {
    email: 'duyho@mailinator.com',
    currentAddress: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    available_balance: 15000,
    actual_balance: 10000,
    transactions: [
        {
            created_at: '2017-12-11',
            from: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            amount: 120,
            to: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
        },
        {
            created_at: '2017-11-11',
            from: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            amount: 180,
            to: 'ccccccccccccccccccccccccccc'
        },
        {
            created_at: '2017-11-10',
            from: 'fffffffffffffffffffffffffffff',
            amount: 180,
            to: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        },
    ]
};

export default (state = default_state, action) => {
    switch (action.type) {
        case 'UPDATE_TRANSACTIONS':
            return {...state};
        default:
            return {...state}
    }
}
