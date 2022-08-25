import Carousel from 'react-bootstrap/Carousel';
import { useState } from "react";

import '../styles/frontpage.scss'
import '../styles/contact-form.scss'
import "../fontello/css/fontello.css"

import header_img from '../resources/images/header-portrait.png';
import about_me_img from '../resources/images/header-image.jpg';

import kot from '../resources/images/offer/kot.png';
import ludz from '../resources/images/offer/ludz.png';
import ludz_z_kotem from '../resources/images/offer/ludz-z-kotem.jpg';

const FrontpageHeader = () => {
    return(
        <>
            <header>
                <div className="container header-container">
                    <div className='header-image__container'>
                        <img className='header-image' src={header_img} />
                    </div>
                    <div className="header-text__container">
                        <div className='header-text'>
                            <h1>Witam na mojej foto{'\u00A0'}stronie</h1>
                            <p>Szukasz fotografa?</p>
                            <p>To świetnie trafiłeś</p>
                        </div>

                        <a href='#about-me' className='header-button'>
                            Dowiedz się więcej
                            <i className="icon-down" />
                        </a>
                    </div>
                </div>
            </header>
        </>
    )
}

const FrontpageAboutMe = () => {
    return(
        <>
            <section id='about-me' className='about_me'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 about_me-text__container'>
                            <h2 className='section-title'>Czym się zajmuję?</h2>

                            <p>Nazywam się Emilia i zajmuję się profesjonalnie fotografią kotów</p>
                            <p>Nazywam się Emilia i zajmuję się profesjonalnie fotografią kotów</p>
                            <p>Nazywam się Emilia i zajmuję się profesjonalnie fotografią kotów</p>
                            <p>Nazywam się Emilia i zajmuję się profesjonalnie fotografią kotów</p>
                            <p>Nazywam się Emilia i zajmuję się profesjonalnie fotografią kotów</p>
                            <p>Nazywam się Emilia i zajmuję się profesjonalnie fotografią kotów</p>
                            <p>Nazywam się Emilia i zajmuję się profesjonalnie fotografią kotów</p>
                            <p>Nazywam się Emilia i zajmuję się profesjonalnie fotografią kotów</p>
                            <p>Nazywam się Emilia i zajmuję się profesjonalnie fotografią kotów</p>
                            <p>Nazywam się Emilia i zajmuję się profesjonalnie fotografią kotów</p>
                            <p>Nazywam się Emilia i zajmuję się profesjonalnie fotografią kotów</p>
                            <p>Nazywam się Emilia i zajmuję się profesjonalnie fotografią kotów</p>
                            <p>Nazywam się Emilia i zajmuję się profesjonalnie fotografią kotów</p>
                            <p>Nazywam się Emilia i zajmuję się profesjonalnie fotografią kotów</p>
                            <p>Nazywam się Emilia i zajmuję się profesjonalnie fotografią kotów</p>
                        </div>
                        <div className='col-6 about_me-img__container'>
                            <img src={about_me_img} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

const FrontpageOffer = () => {
    return(
        <>
            <section className='offer my-3'>
                <div className='container'>
                    <div className='row justify-content-between'>
                        <h2 className='section-title'>Co oferuję?</h2>

                        <div className='col-4 offer-block px-0'>
                            <div className='offer-block__image'>
                                <img src={kot} />
                            </div>
                            <div className='offer-block__text'>
                                <h3>Fotografia kotów</h3>
                                <p>Stworzę idealne zdjęcie twojego kota.</p>
                                <p>Tak jak chcesz!</p>
                                <a href='' className='offer-block__text-portfolio'>Zobacz moje portfolio <i className="icon-right" /></a>
                            </div>
                        </div>

                        <div className='col-4 offer-block px-0'>
                            <div className='offer-block__image'>
                                <img src={ludz} />
                            </div>
                            <div className='offer-block__text'>
                                <h3>Kreatywny portret</h3>
                                <p>Stworzę idealne zdjęcie ciebie z twoim kotem.</p>
                                <p>Tak jak chcesz!</p>
                                <a href='' className='offer-block__text-portfolio'>Zobacz moje portfolio <i className="icon-right" /></a>
                            </div>
                        </div>

                        <div className='col-4 offer-block px-0'>
                            <div className='offer-block__image'>
                                <img src={ludz_z_kotem} />
                            </div>
                            <div className='offer-block__text'>
                                <div>
                                    <h3>Portret z kotem</h3>
                                    <p>Stworzę idealne zdjęcie twojego kota.</p>
                                    <p>Tak jak chcesz!</p>
                                </div>
                                <a href='' className='offer-block__text-portfolio'>Zobacz moje portfolio <i className="icon-right offer-block__text-portfolio-arrow" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

const FrontpagePortfolio = () => {
    return(
        <>
            <section className='portolio my-3'>
                <div className='container'>
                    <div className='row justify-content-between'>
                        <h2 className='section-title'>Moje portfolio</h2>

                        <Carousel>
                            <Carousel.Item>
                                <div className='row'>
                                    <div className='col-4 portfolio__carousel-img'>
                                        <img className={"d-block w-100"} src={ludz} alt="First slide" />
                                    </div>
                                    <div className='col-4 portfolio__carousel-img'>
                                        <img className={"d-block w-100"} src={kot} alt="First slide" />
                                    </div>
                                    <div className='col-4 portfolio__carousel-img'>
                                        <img className={"d-inline-block"} src={ludz_z_kotem} alt="First slide" />
                                        <img className={"d-inline-block"} src={ludz_z_kotem} alt="First slide" />
                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className='row'>
                                    <div className='col-4 portfolio__carousel-img'>
                                        <img className={"d-inline-block"} src={ludz_z_kotem} alt="First slide" />
                                        <img className={"d-inline-block"} src={ludz_z_kotem} alt="First slide" />
                                    </div>
                                    <div className='col-4 portfolio__carousel-img'>
                                        <img className={"d-block w-100"} src={ludz} alt="First slide" />
                                    </div>
                                    <div className='col-4 portfolio__carousel-img'>
                                        <img className={"d-block w-100"} src={kot} alt="First slide" />
                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className='row'>
                                    <div className='col-4 portfolio__carousel-img'>
                                        <img className={"d-block w-100"} src={kot} alt="First slide" />
                                    </div>
                                    <div className='col-4 portfolio__carousel-img'>
                                        <img className={"d-inline-block"} src={ludz_z_kotem} alt="First slide" />
                                        <img className={"d-inline-block"} src={ludz_z_kotem} alt="First slide" />
                                    </div>
                                    <div className='col-4 portfolio__carousel-img'>
                                        <img className={"d-block w-100"} src={ludz} alt="First slide" />
                                    </div>
                                </div>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </section>
        </>
    )
}

const ContactMe = () => {
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        termin: ""
    });

    const updateContactForm = (value, target) => {
        setContactForm(previousValue => {
            return {...previousValue, [target]: value }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The name you entered was: ${contactForm.name} ${contactForm.phone} ${contactForm.email} ${contactForm.message}`)
    }

    return(
        <>
            <section className='contact-me my-3'>
                <div className='container'>
                    <div className='row justify-content-between'>
                        <h2 className='section-title'>Skontaktuj się ze mną!</h2>

                        <form onSubmit={handleSubmit} className="contact-form">
                            <input
                                className='contact-form__input contact-form__input-name'
                                type="text"
                                placeholder='Imię*'
                                value={contactForm.name}
                                onChange={(e) => updateContactForm(e.target.value, "name") }
                                required
                            />
                            <input
                                className='contact-form__input contact-form__input-email'
                                type="email"
                                placeholder='E-mai*'
                                value={contactForm.email}
                                onChange={(e) => updateContactForm(e.target.value, "email") }
                                required
                            />
                            <input className='contact-form__input contact-form__input-phone'
                                type="number"
                                placeholder='Numer telefonu'
                                value={contactForm.phone}
                                onChange={(e) => updateContactForm(e.target.value, "phone") }
                            />

                            <textarea
                                className='contact-form__textarea'
                                placeholder='Treść wiadomości *'
                                value={contactForm.message}
                                onChange={(e) => updateContactForm(e.target.value, "message") }
                                required
                                rows="4" cols="50">
                            </textarea>

                            <button className='contact-form__submit' type="submit">Wyślij zapytanie <i className="icon-right" /></button>

                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

const Frontpage = () => {
    return(
        <>
            <FrontpageHeader />
            <FrontpageAboutMe />
            <FrontpageOffer />
            <FrontpagePortfolio />
            <ContactMe />
        </>
    )
}

export default Frontpage;