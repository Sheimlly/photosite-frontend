import axios from 'axios';

export const setAuthToken = token => {
    if (token) {
        console.log(token);
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
    }
    else
        delete axios.defaults.headers.common['Authorization'];
}

export const removeAuthToken = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common['Authorization'];
}