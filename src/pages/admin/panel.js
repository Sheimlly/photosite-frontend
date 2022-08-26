import { removeAuthToken } from '../../constants/token'
import { useNavigate } from "react-router-dom";

const Panel = () => {
    const logout = () => {
        removeAuthToken();
        window.location.reload(false);
    }

    return(
        <>
            <header>
                <h1>panel</h1>
                <button onClick={logout}>Logout</button>
            </header>
        </>
    )
}

export default Panel;