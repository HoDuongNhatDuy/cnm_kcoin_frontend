import UtilService from "./UtilService";

export function Logout(history, message = null) {
    ClearAccessToken();
    if (!message) {
        message = 'Your session has expired. Please login again!';
    }

    UtilService.ShowSnackBar(message);
    history.push('/login');
}

export function SetAuthInfo(accessToken, expiredAt, email, address, is_admin) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('expired_at', expiredAt);
    localStorage.setItem('email', email);
    localStorage.setItem('address', address);
    localStorage.setItem('is_admin', is_admin);
}

/**
 * @return {boolean}
 */
export function IsAdmin() {
    return localStorage.getItem('is_admin') === "1";

}

export function GetAccessToken() {
    return localStorage.getItem('access_token');
}

export function GetEmail() {
    return localStorage.getItem('email');
}

export function GetAddress() {
    return localStorage.getItem('address');
}

function ClearAccessToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expired_at');
}

/**
 * @return {boolean}
 */
export function IsLoggedIn() {
    let accessToken = GetAccessToken();
    return !!accessToken && !IsTokenExpired();
}

/**
 * @return {boolean}
 */
function IsTokenExpired() {
    const expirationDate = localStorage.getItem('expired_at');
    return expirationDate < Date.now();
}