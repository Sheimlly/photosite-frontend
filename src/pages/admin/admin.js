import { React, useState } from "react";
import axios from "axios";
import { setAuthToken } from '../../constants/token'

import '../../styles/admin.scss'

const Admin = () => {
    const [contactForm, setContactForm] = useState({
        username: "",
        password: "",
    });

    const updateContactForm = (value, target) => {
        setContactForm(previousValue => {
            return {...previousValue, [target]: value }
        })
    }

    const handleSubmit = (e) => {
        
        e.preventDefault();
        axios.post('http://localhost:8000/api-token-auth/', {
            username: contactForm.username,
            password: contactForm.password
        })
        .then(function (response) {
            const token = response.data.token;
 
            //set JWT token to local
            localStorage.setItem("token", token);
 
            //set token to axios common header
            setAuthToken(token);

            window.location.reload(false);
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    return(
        <>
            <section className='admin-login'>
                <div className='container'>
                    <form onSubmit={handleSubmit} className="login-form">
                        <label>
                            <span className='login-form__input-description'>Login*</span>
                            <input
                                className='login-form__input login-form__input-login'
                                type="text"
                                placeholder='Login*'
                                value={contactForm.username}
                                onChange={(e) => updateContactForm(e.target.value, "username") }
                                required
                            />
                        </label>
                        <label>
                            <span className='login-form__input-description'>Hasło*</span>
                            <input
                                className='login-form__input login-form__input-email'
                                type="password"
                                placeholder='Hasło*'
                                onChange={(e) => updateContactForm(e.target.value, "password") }
                                required
                            />
                        </label>

                        <button className='submit-button' type="submit">Zaloguj się <i className="icon-right" /></button>

                    </form>
                </div>
            </section>
        </>
    )
}

export default Admin;