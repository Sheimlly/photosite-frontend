import axios from "axios";
import { API_URL } from "../../constants";
import { React, useState } from "react";

import '../../styles/forms.scss'

const ContactForm = () => {
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const updateContactForm = (value, target) => {
        setContactForm(previousValue => {
            return {...previousValue, [target]: value }
        })
    }

    const handleSubmit = (e) => {
        var current = new Date();
        var date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
        console.log(date);

        e.preventDefault();
        axios.post(`${API_URL}/messages/add/`, {
            name: contactForm.name,
            email: contactForm.email,
            phone: contactForm.phone ? contactForm.phone : 0,
            message: contactForm.message
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    return(
        <>
            <section className='contact-me my-3'>
                <div className='container'>
                    <div className='row justify-content-between'>
                        <h2 className='section-title'>Skontaktuj się ze mną!</h2>

                        <form onSubmit={handleSubmit} className="contact-form">
                            <label>
                                <span className='contact-form__input-description'>Imię*</span>
                                <input
                                    className='contact-form__input contact-form__input-name'
                                    type="text"
                                    placeholder='Imię*'
                                    value={contactForm.name}
                                    onChange={(e) => updateContactForm(e.target.value, "name") }
                                    required
                                />
                            </label>
                            <label>
                                <span className='contact-form__input-description'>Email*</span>
                                <input
                                    className='contact-form__input contact-form__input-email'
                                    type="email"
                                    placeholder='E-mai*'
                                    value={contactForm.email}
                                    onChange={(e) => updateContactForm(e.target.value, "email") }
                                    required
                                />
                            </label>
                            <label>
                                <span className='contact-form__input-description'>Numer telefonu</span>
                                <input className='contact-form__input contact-form__input-phone'
                                    type="number"
                                    placeholder='Numer telefonu'
                                    value={contactForm.phone}
                                    onChange={(e) => updateContactForm(e.target.value, "phone") }
                                />
                            </label>

                            <label>
                                <span className='contact-form__textarea-description'>Wiadomość*</span>
                                <textarea
                                    className='contact-form__textarea'
                                    placeholder='Treść wiadomości *'
                                    value={contactForm.message}
                                    onChange={(e) => updateContactForm(e.target.value, "message") }
                                    required
                                    rows="4" cols="50">
                                </textarea>
                            </label>

                            <button className='submit-button' type="submit">Wyślij zapytanie <i className="icon-right" /></button>

                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactForm;