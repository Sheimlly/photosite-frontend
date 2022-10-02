import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

const AdminOfferDetails = () => {
    const token = localStorage.getItem("token");
    const params = useParams();

    // fields = ('offer_id', 'name', 'short_description', 'description', 'price', 'active', 'photo', 'frontpage')
    const [offer, setOffer] = useState({});
    const [updatedOffer, setUpdatedOffer] = useState({});

    const [description, setDescription] = useState({
        description: ""
    })

    const [updatedDescriptions, setUpdatedDescriptions] = useState([])

    const updateOfferState = (value, target) => {
        setUpdatedOffer(previousValue => {
            return {...previousValue, [target]: value }
        })
    }

    const updateDescriptionState = (value, target) => {
        setDescription(previousValue => {
            return {...previousValue, [target]: value }
        })
    }

    const updateCheckbox = (target, value) => {
        setUpdatedOffer(previousValue => {
            return {...previousValue, [target]: !value }
        })
    } 
    
    const handleFileSelect = (event) => {
        if (event.target.files[0].size > 10e6) {
            document.getElementById('add_offer_input-file').value = "";
            window.alert("Please upload a file smaller than 10 MB");
            return false;
        }
        
        setUpdatedOffer(previousValue => {
            return {...previousValue, photo: event.target.files[0] }
        })

        console.log(offer.photo);
    }

    const getOffer = () => {
        axios.get(`${API_URL}/offers/${params['offer_id']}`)
        .then(res => {
            const data = res.data
            setOffer(data);
            setUpdatedOffer(data);
            setUpdatedDescriptions(data.descriptions);
        }).catch(function (error) {
            handleErrors(error, '/admin/offers');
        });
    }

    const updateOffer = (e) => {
        e.preventDefault();
        axios.put(`${API_URL}/offers/${params['offer_id']}`, {
            name: updatedOffer.name,
            price: updatedOffer.price,
            active: updatedOffer.active,
            frontpage: updatedOffer.frontpage,
            descriptions: updatedDescriptions,
        },{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token ' + token
            }
         })
        .then(function (response) {
            if (updatedOffer.photo instanceof File) {
                axios.patch(`${API_URL}/offers/${params['offer_id']}`, {
                    photo: updatedOffer.photo,
                },{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Token ' + token
                    }
                })
                .then(function (res) {
                    console.log(res);
                    getOffer();
                })
                .catch(function (error) {
                    handleErrors(error);
                });
            }
            else {
                getOffer();
            }
        })
        .catch(function (error) {
            handleErrors(error);
        });
    };

    const deleteOffer = () => {
        axios.delete(`${API_URL}/offers/${offer.offer_id}`, {
            headers: {
              'Authorization': 'Token ' + token
            }
        })
        .then(function (response) {
            window.location.href = '/admin/offers';
        })
        .catch(function (error) {
            handleErrors(error);
        });
    }

    const addDescription = () => {
        if (description.description != "") {
            setUpdatedDescriptions((d) => [...d, description])
        }
    }
    const deleteDescription = (value) => {
        setUpdatedDescriptions(current =>
            current.filter(element => {
                return element !== value
            }),
        );
    }

    useEffect(() => {
        getOffer();
    }, [])

    return(
        <>
            <header>
                <div className="container">
                    <h1>{offer.name}</h1>
                </div>
            </header>

            <section>
                <div className="container">
                    <div className="row">
                        <div className="offer-block col-6">
                            <div className='offer-block__image'>
                                <img src={offer.photo} />
                            </div>
                            <div className='offer-block__text'>
                                <h3>{offer.name}</h3>

                                <ul>
                                    {offer.descriptions?.map(description =>
                                        <li key={description.offer_description_id}>{description.description}</li>
                                    )}
                                </ul>
                                <p>Cena: {offer.price}</p>

                                <p><span className={offer.active ? 'green-dot' : 'red-dot'}></span> Aktywne: {offer.active ? 'Tak' : 'Nie'}</p>
                                <p><span className={offer.frontpage ? 'green-dot' : 'red-dot'}></span> Na stronie głównej: {offer.frontpage ? 'Tak' : 'Nie'}</p>
                                <div className="d-flex justify-content-between">
                                    <button className="delete-button" onClick={deleteOffer} >Usuń</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 order-1 order-md-2 col-md-4 ps-md-5 mb-5 mb-md-0">
                                <h2>Dodaj Ofertę</h2>
                                
                                <form onSubmit={updateOffer} className="add_offer-form d-flex flex-column">
                                    <label>
                                        <span className='add_offer-form__input-description'>Nazwa*</span>
                                        <input
                                            className='add_offer-form__input add_offer-form__input-name'
                                            type="text"
                                            placeholder='Nazwa*'
                                            value={updatedOffer.name}
                                            onChange={(e) => updateOfferState(e.target.value, "name") }
                                        />
                                    </label>
                                    <label>
                                        <span className='add_offer-form__input-description'>Cena*</span>
                                        <input
                                            className='add_offer-form__input add_offer-form__input-price'
                                            type="number"
                                            placeholder='Cena*'
                                            min="0"
                                            value={updatedOffer.price}
                                            onChange={(e) => updateOfferState(e.target.value, "price") }
                                        />
                                    </label>
                                    <div className="d-flex">
                                        <label>
                                            <span className='add_offer-form__input-description'>Czy aktywna?</span>
                                            <input
                                                id="add_offer_checbox-active"
                                                className='add_offer-form__input add_offer-form__input-active'
                                                type="checkbox"
                                                value={updatedOffer.active}
                                                onChange={() => updateCheckbox('active', updatedOffer.active)}
                                                checked={updatedOffer.active ? true : false}
                                            />
                                        </label>
                                        <label className="ms-5">
                                            <span className='add_offer-form__input-description'>Wyróżniona?</span>
                                            <input
                                                id="add_offer_checbox-frontpage"
                                                className='add_offer-form__input add_offer-form__input-frontpage'
                                                type="checkbox"
                                                value={updatedOffer.frontpage}
                                                onChange={() => updateCheckbox('frontpage', updatedOffer.frontpage)}
                                                checked={updatedOffer.frontpage ? true : false}
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
                                        />
                                    </label>
                                    <label>
                                        <span className='add_offer-form__input-description'>Opis*</span>
                                        <input
                                            className='add_offer-form__input'
                                            type="text"
                                            onChange={(e) => updateDescriptionState(e.target.value, "description") }
                                        />
                                        <OfferDescription descriptions={updatedDescriptions} addDescription={addDescription} deleteDescription={deleteDescription} />
                                    </label>

                                    <button className='submit-button' type="submit">Zmień oferte <i className="icon-right-small" /></button>

                                </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminOfferDetails;