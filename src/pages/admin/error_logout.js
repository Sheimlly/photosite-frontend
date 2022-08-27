import { removeAuthToken } from '../../constants/token'

//          TODO
//      Remove it later
//     Make errors hanler
const errorLogout = (error) => {
    console.log(error);
    alert("Twoja sesja wygasła");
    removeAuthToken();
    window.location.reload(false);
}

export { errorLogout };