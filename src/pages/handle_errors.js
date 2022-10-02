import { removeAuthToken } from '../constants/token'

//          TODO
//     Make errors hanler
const handleErrors = (error, link) => {
    const error_code = error.response.status;
    console.log(error);

    if(error_code === 401)  {
        removeAuthToken();
        window.location.reload(false);
    }

    if(error_code === 404 && link) {
        window.location.href = link;
    }
}

export { handleErrors };