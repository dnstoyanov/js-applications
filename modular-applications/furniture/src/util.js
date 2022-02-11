export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
} 

export function clearUserData() {
    sessionStorage.removeItem('userData');
}
 
export function parseQueryString(string) {
    'page=3&search=chair';
    const params = string
        .split('&')
        .map(p => p.spli('='))
        .reduce((a, [k, v]) => Object.assign(a, {[k]: v}), {});
    return params;
}