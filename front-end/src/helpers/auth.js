export const isLoggedIn = () => {
    return !!localStorage.getItem('token');
}

export const getUserAccessToken = () => {
    return (localStorage.getItem('token'));
}

export const getUserData = () => {
    return JSON.parse(localStorage.getItem('userData'));
}

export const logout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    window.location.replace("/");
}