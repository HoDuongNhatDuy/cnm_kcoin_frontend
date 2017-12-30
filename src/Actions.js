const UpdatePersonalData = (email, currentAddress) => ({
    type: 'UPDATE_PERSONAL_DATA',
    data: {email, currentAddress}
});

export default {UpdatePersonalData}
