import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Moment from 'moment';

import { handleErrors } from '../handle_errors'
import { API_URL } from '../../constants/index'
import '../../styles/admin/messages.scss'

const MessageDetails = () => {
    const token = localStorage.getItem("token");
    const params = useParams();

    const [message, setMessage] = useState({});

    Moment.locale('pl')
    
    const getMessage = () => {
        axios.get(`${API_URL}/messages/${params['message_id']}`,{
            headers: {
              'Authorization': 'Token ' + token,
            }
         }).then(res => {
            const data = res.data;
            setMessage(data);
        }).catch(function (error) {
            handleErrors(error);
        });
    }

    const deleteMessage = () => {
        axios.delete(`${API_URL}/messages/${params['message_id']}`, {
            headers: {
              'Authorization': 'Token ' + token
            }
        })
        .then(function (response) {
            window.location.href = '/admin/messages';
        })
        .catch(function (error) {
            handleErrors(error);
        });
    }

    useEffect(() => {
        getMessage();
    }, [])

    return(
        <>
            <header>
                <div className="container">
                    <h1>Wiadomość nr. {message.message_id}</h1>
                </div>
            </header>
            <section>
                <div className="container">
                    <div className="message-container row">
                        <div className="message-container__info col-12 col-md-6">
                            <h3>Informacje:</h3>
                            <p>Imię: {message.name}</p>
                            <p>E-mail: {message.email}</p>
                            <p>Telefon: {message.phone ? message.phone : 'Brak'}</p>
                            <p>Data dodania: {Moment(message.date).format('hh:mm DD/MM/YYYY')}</p>
                        </div>
                        <div className="message-container__message col-12 col-md-6 mt-5 mt-md-0">
                            <h3>Wiadomość:</h3>
                            <span>{message.message}</span>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-5">
                        <button className="delete-button" onClick={deleteMessage} >Usuń <i className="icon-cancel"/></button>
                    </div>
                </div>


            </section>
        </>
    )
}

export default MessageDetails;