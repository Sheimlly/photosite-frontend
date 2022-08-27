import axios from "axios";
import { useEffect, useState } from "react";

import { errorLogout } from './error_logout'
import { API_URL } from '../../constants/index'
import '../../styles/admin/offers.scss'

const AdminOffers = () => {
    const token = localStorage.getItem("token");

    const [offers, setOffers] = useState({data: []});
    const [offer, setOffer] = useState({
        name: "",
        price: 0,
        active: false,
        frontpage: false,
        photo: null,
        short_description: "",
        description: ""
    });

    const updateOfferState = (value, target) => {
        setOffer(previousValue => {
            return {...previousValue, [target]: value }
        })
    }

    const handleFileSelect = (event) => {
        if (event.target.files[0].size > 10e6) {
            document.getElementById('add_offer_input-file').value = "";
            window.alert("Please upload a file smaller than 10 MB");
            return false;
        }
        
        setOffer(previousValue => {
            return {...previousValue, photo: event.target.files[0] }
        })

        console.log(offer.photo);
    }

    const getOffers = () => {
        axios.get(`${API_URL}/offers/`,{
            headers: {
              'Content-Type': 'multipart/form-data',
            }
         }).then(res => {
            const data = res.data
            setOffers({ data: data });
        }).catch(function (error) {
            errorLogout(error);
        });
    }

    const addOffer = (e) => {
        e.preventDefault();

        axios.post(`${API_URL}/offers/add/`, {
            name: offer.name,
            price: offer.price,
            active: document.getElementById("add_offer_checbox-active").checked ? true : false,
            frontpage: document.getElementById("add_offer_checbox-frontpage").checked ? true : false,
            photo: offer.photo,
            short_description: offer.short_description,
            description: offer.description
        },{
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Token ' + token
            }
         })
        .then(function (response) {
            console.log(response);
            getOffers();
        })
        .catch(function (error) {
            // errorLogout(error);
            console.log(error);
        });
    };

    const deleteOffer = (offer_id) => {
        axios.delete(`${API_URL}/offers/delete/${offer_id}`, {
            headers: {
              'Authorization': 'Token ' + token
            }
        }).then(res => {
            console.log(res);
        })
        .then(function (response) {
            console.log(response);
            getOffers();
        })
        .catch(function (error) {
            errorLogout(error);
            // console.log(error);
        });
    }

    useEffect(() => {
        getOffers();
    }, [])

    return(
        <>
            <header>
                <div className="container">
                    <h1>Oferty</h1>
                </div>
            </header>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-12 order-2 order-md-1 col-md-8 mt-5 mt-md-0">
                            <h2>Oferty:</h2>
                            <div className="row justify-content-between pe-md-4">
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

                                                <p><span className={offo.active ? 'green-dot' : 'red-dot'}></span> Aktywne: {offo.active ? 'Tak' : 'Nie'}</p>
                                                <p><span className={offo.frontpage ? 'green-dot' : 'red-dot'}></span> Na stronie głównej: {offo.frontpage ? 'Tak' : 'Nie'}</p>
                                                <div className="d-flex justify-content-between">
                                                    <button className="delete-button" onClick={() => deleteOffer(offo.offer_id)} >Usuń</button>
                                                    <a href='' className='offer-block__text-portfolio'>Edytuj <i className="icon-right" /></a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-12 order-1 order-md-2 col-md-4 ps-md-5 mb-5 mb-md-0">
                            <h2>Dodaj Ofertę</h2>
                            
                            <form onSubmit={addOffer} className="add_offer-form d-flex flex-column">
                                <label>
                                    <span className='add_offer-form__input-description'>Nazwa*</span>
                                    <input
                                        className='add_offer-form__input add_offer-form__input-name'
                                        type="text"
                                        placeholder='Nazwa*'
                                        value={offer.name}
                                        onChange={(e) => updateOfferState(e.target.value, "name") }
                                        required
                                    />
                                </label>
                                <label>
                                    <span className='add_offer-form__input-description'>Cena*</span>
                                    <input
                                        className='add_offer-form__input add_offer-form__input-price'
                                        type="number"
                                        placeholder='Cena*'
                                        min="0"
                                        value={offer.price}
                                        onChange={(e) => updateOfferState(e.target.value, "price") }
                                        required
                                    />
                                </label>
                                <div className="d-flex">
                                    <label>
                                        <span className='add_offer-form__input-description'>Czy aktywna?</span>
                                        <input
                                            id="add_offer_checbox-active"
                                            className='add_offer-form__input add_offer-form__input-active'
                                            type="checkbox"
                                        />
                                    </label>
                                    <label className="ms-5">
                                        <span className='add_offer-form__input-description'>Wyróżniona?</span>
                                        <input
                                            id="add_offer_checbox-frontpage"
                                            className='add_offer-form__input add_offer-form__input-frontpage'
                                            type="checkbox"
                                        />
                                    </label>
                                </div>
                                <label>
                                    <span className='add_offer-form__input-description'>Zdjęcie ofery*</span>
                                    <input
                                        id="add_offer_input-file"
                                        className='add_offer-form__input add_offer-form__input-upload'
                                        type="file"
                                        name="filename"
                                        accept="image/jpeg,image/png,image/gif"
                                        onChange={handleFileSelect}
                                        required
                                    />
                                </label>

                                <label>
                                    <span className='add_offer-form__input-description'>Krótki opis*</span>
                                    <input
                                        className='add_offer-form__input add_offer-form__input-short_description'
                                        type="text"
                                        placeholder='Krótki opis*'
                                        value={offer.short_description}
                                        onChange={(e) => updateOfferState(e.target.value, "short_description") }
                                        required
                                    />
                                </label>

                                <label>
                                    <span className='add_offer-form__input-description'>Opis*</span>
                                    <textarea
                                        className='add_offer-form__textarea add_offer-form__textarea-description'
                                        type="text"
                                        placeholder='Opis*'
                                        value={offer.description}
                                        onChange={(e) => updateOfferState(e.target.value, "description") }
                                        rows="4" cols="40"
                                        required
                                    />
                                </label>

                                <button className='submit-button' type="submit">Dodaj kategorię <i className="icon-right" /></button>

                            </form>
                        </div>
                    </div>
                </div>


            </section>
        </>
    )
}

export default AdminOffers;