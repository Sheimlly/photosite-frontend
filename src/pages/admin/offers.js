import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { handleErrors } from '../handle_errors'
import { API_URL } from '../../constants/index'
import '../../styles/admin/offers.scss'

const OfferDescription = ({descriptions, addDescription, deleteDescription}) => {
    return (
        <>
            <div className="add-description" onClick={addDescription}>Dodaj podpunkt <i className="icon-right-small" /></div>
            <ul>
                {descriptions.map((description, index) => {
                    return <li key={index}>{description.description} <i className="icon-cancel delete-description" onClick={() => {deleteDescription(description)}} /></li>;
                })}
            </ul>
        </>
      );
    
}

const AdminOffers = () => {
    const token = localStorage.getItem("token");

    const [offers, setOffers] = useState({data: []});
    const [offer, setOffer] = useState({
        name: "",
        price: 0,
        active: false,
        frontpage: false,
        photo: null,
        description: ""
    });
    const [description, setDescription] = useState({
        description: ""
    })
    const [descriptions, setDescriptions] = useState([])

    const updateOfferState = (value, target) => {
        setOffer(previousValue => {
            return {...previousValue, [target]: value }
        })
    }

    const updateDescriptionState = (value, target) => {
        setDescription(previousValue => {
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
    }

    const getOffers = () => {
        axios.get(`${API_URL}/offers/`,{
            headers: {
              'Content-Type': 'multipart/form-data',
            }
         }).then(res => {
            const data = res.data
            console.log(data);
            setOffers({ data: data });
        }).catch(function (error) {
            handleErrors(error);
        });
    }

    const addOffer = (e) => {
        e.preventDefault();

        axios.post(`${API_URL}/offers/`, {
            name: offer.name,
            price: offer.price,
            active: document.getElementById("add_offer_checbox-active").checked ? true : false,
            frontpage: document.getElementById("add_offer_checbox-frontpage").checked ? true : false,
            descriptions: descriptions
        },{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            }
         })
        .then(function (response) {
            const offer_id = response.data.offer_id;
            axios.patch(`${API_URL}/offers/${offer_id}`, {
                photo: offer.photo,
            },{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Token ' + token
                }
            })
            .then(function (res) {
                console.log(res);
                getOffers();
            })
            .catch(function (error) {
                handleErrors(error);
            });
        })
        .catch(function (error) {
            handleErrors(error);
        });
    };

    const deleteOffer = (offer_id) => {
        axios.delete(`${API_URL}/offers/${offer_id}`, {
            headers: {
              'Authorization': 'Token ' + token
            }
        })
        .then(function (response) {
            console.log(response);
            getOffers();
        })
        .catch(function (error) {
            handleErrors(error);
        });
    }

    const addDescription = () => {
        if (description.description != "") {
            setDescriptions((d) => [...d, description])
        }
    }
    const deleteDescriptions = (value) => {
        setDescriptions(current =>
            current.filter(element => {
                return element !== value
            }),
        );
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

                                                <ul>
                                                    {offo.descriptions.map(description =>
                                                        <li>{description.description}</li>
                                                    )}
                                                </ul>
                                                <p>Cena: {offo.price}</p>

                                                <p><span className={offo.active ? 'green-dot' : 'red-dot'}></span> Aktywne: {offo.active ? 'Tak' : 'Nie'}</p>
                                                <p><span className={offo.frontpage ? 'green-dot' : 'red-dot'}></span> Na stronie głównej: {offo.frontpage ? 'Tak' : 'Nie'}</p>
                                                <div className="d-flex justify-content-between">
                                                    <button className="delete-button" onClick={() => deleteOffer(offo.offer_id)} >Usuń <i className="icon-cancel"/></button>
                                                    <Link to={`/admin/offers/${offo.offer_id}`} className='offer-block__text-portfolio'>Edytuj <i className="icon-right-small" /></Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-12 order-1 order-md-2 col-md-4 ps-md-5 mb-5 mb-md-0">
                            <h2>Dodaj Ofertę</h2>
                            
                            <form onSubmit={addOffer} className="add-form d-flex flex-column">
                                <label>
                                    <span className='add-form__input-description'>Nazwa*</span>
                                    <input
                                        className='add-form__input add_offer-form__input-name'
                                        type="text"
                                        placeholder='Nazwa*'
                                        value={offer.name}
                                        onChange={(e) => updateOfferState(e.target.value, "name") }
                                        required
                                    />
                                </label>
                                <label>
                                    <span className='add-form__input-description'>Cena*</span>
                                    <input
                                        className='add-form__input add_offer-form__input-price'
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
                                        <span className='add-form__input-description'>Czy aktywna?</span>
                                        <input
                                            id="add_offer_checbox-active"
                                            className='add-form__input add_offer-form__input-active'
                                            type="checkbox"
                                        />
                                    </label>
                                    <label className="ms-5">
                                        <span className='add-form__input-description'>Wyróżniona?</span>
                                        <input
                                            id="add_offer_checbox-frontpage"
                                            className='add-form__input add_offer-form__input-frontpage'
                                            type="checkbox"
                                        />
                                    </label>
                                </div>
                                <label>
                                    <span className='add-form__input-description'>Zdjęcie ofery*</span>
                                    <input
                                        id="add_offer_input-file"
                                        className='add-form__input add-form__input-upload'
                                        type="file"
                                        name="filename"
                                        accept="image/jpeg,image/png,image/gif"
                                        onChange={handleFileSelect}
                                        required
                                    />
                                </label>
                                <label>
                                    <span className='add-form__input-description'>Opis*</span>
                                    <input
                                        className='add-form__input'
                                        type="text"
                                        onChange={(e) => updateDescriptionState(e.target.value, "description") }
                                        required
                                    />
                                    <OfferDescription descriptions={descriptions} addDescription={addDescription} deleteDescription={deleteDescriptions} />
                                </label>

                                <button className='submit-button' type="submit">Dodaj oferte <i className="icon-right-small" /></button>

                            </form>
                        </div>
                    </div>
                </div>


            </section>
        </>
    )
}

export default AdminOffers;