import Carousel from 'react-bootstrap/Carousel';
import { React } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from '../constants/index'

import '../styles/frontpage.scss'
import "../fontello/css/fontello.css"

import ContactForm from './partials/contact-form';

import header_img from '../resources/images/header-portrait.png';
import about_me_img__desktop from '../resources/images/header-image.jpg';
import about_me_img from '../resources/images/DSC_2249.jpg';

import kot from '../resources/images/offer/kot.png';
import ludz from '../resources/images/offer/ludz.png';
import ludz_z_kotem from '../resources/images/offer/ludz-z-kotem.jpg';

const FrontpageHeader = () => {
    return(
        <>
            <header className='frontpage-header'>
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
                        <div className='col-12 col-lg-6 about_me-text__container'>
                            <h2 className='section-title'>Czym się zajmuję?</h2>

                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique sollicitudin accumsan. Sed nisi mi, accumsan vel tempus vitae, ullamcorper a mi.
                                Donec sed justo scelerisque, venenatis elit ac, maximus purus. Sed eu varius sem. Etiam mollis arcu at nulla molestie, eu ornare magna mollis. Integer pretium mattis lectus id auctor.
                                Aliquam volutpat interdum fermentum. Integer pretium dui ac ante tristique consectetur. Duis vel pharetra leo. Cras at mattis risus, vitae ultrices magna. Ut egestas luctus rutrum.
                                Praesent aliquet a urna ac tristique. Cras maximus gravida mauris, eu dapibus nibh ultrices ac. Donec turpis leo, euismod ut finibus vehicula, ultrices quis lorem.
                                Praesent vitae dolor ac leo pharetra hendrerit ac quis metus. Proin vel quam vel leo rhoncus eleifend. Integer sollicitudin ligula id mauris eleifend posuere.
                                Phasellus risus elit, ultricies a augue sed, tempor interdum lacus. Vivamus id laoreet lacus, aliquet euismod velit. Duis scelerisque rutrum arcu, ac pellentesque neque rhoncus nec.
                                Nulla blandit justo et massa dignissim scelerisque.
                            </p>
                        </div>
                        <div className='col-12 col-lg-6 about_me-img__container'>
                            <img className='d-none d-lg-block' src={about_me_img__desktop} />
                            <img className='d-lg-none' src={about_me_img} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

const FrontpageOffer = () => {
    const token = localStorage.getItem("token");
    const [offers, setOffers] = useState({data: []});

    const getOffers = () => {
        axios.get(`${API_URL}/offers/`,{
            headers: {
              'Content-Type': 'multipart/form-data',
            }
         }).then(res => {
            var data = []
            
            res.data.forEach(offer => {
                if (offer.active && offer.frontpage) {
                    data.push(offer);
                }
            });
            setOffers({ data: data });
        }).catch(function (error) {
            // errorLogout(error);
            console.log(error);
        });
    }

    useEffect(() => {
        getOffers();
    }, [])

    return(
        <>
            <section className='offer my-3'>
                <div className='container'>
                    <h2 className='section-title'>Co oferuję?</h2>
                    <div className='row justify-content-center justify-content-md-around justify-content-xl-between'>

                    {
                    offers.data
                        .map(offo =>
                            <div className='col-12 col-md-6 col-lg-3 col-xl-4 offer-block px-0'>
                                <div className='offer-block__image'>
                                    <img src={offo.photo} />
                                </div>
                                <div className='offer-block__text'>
                                    <h3>{offo.name}</h3>
                                    <p>{offo.short_description}</p>
                                    <p>Cena: {offo.price}</p>
                                    <div className="d-flex justify-content-end">
                                        <a href='' className='offer-block__text-portfolio'>Zobacz szczegóły <i className="icon-right" /></a>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    </div>
                    <div className='d-flex justify-content-end'>
                        <a className='offer__see-all'>Zobacz wszystkie oferty <i className="icon-right" /></a>
                    </div>
                </div>
            </section>
        </>
    )
}

const FrontpagePortfolio = () => {
    return(
        <>
            <section className='portfolio my-3'>
                <div className='container'>
                    <div className='row justify-content-between'>
                        <h2 className='section-title'>Moje portfolio</h2>

                        <Carousel>
                            <Carousel.Item>
                                <div className='portfolio__carousel-item'>
                                    <img src={ludz} alt="First slide" />
                                    <img className='d-none d-sm-block' src={kot} alt="First slide" />
                                    <img className='d-none d-md-block' src={ludz_z_kotem} alt="First slide" />
                                    <img className='d-none d-md-block' src={ludz_z_kotem} alt="First slide" />
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className='portfolio__carousel-item'>
                                    <img src={ludz_z_kotem} alt="First slide" />
                                    <img src={ludz_z_kotem} alt="First slide" />
                                    <img className='d-none d-sm-block' src={ludz} alt="First slide" />
                                    <img className='d-none d-md-block' src={kot} alt="First slide" />
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className='portfolio__carousel-item'>
                                    <img src={kot} alt="First slide" />
                                    <img className='d-none d-sm-block' src={ludz_z_kotem} alt="First slide" />
                                    <img className='d-none d-sm-block' src={ludz_z_kotem} alt="First slide" />
                                    <img className='d-none d-md-block' src={ludz} alt="First slide" />
                                </div>
                            </Carousel.Item>
                        </Carousel>

                        {/* <a>Zobacz całe porfolio</a> */}
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
            <ContactForm />
        </>
    )
}

export default Frontpage;