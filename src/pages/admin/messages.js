import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Moment from 'moment';

import { handleErrors } from '../handle_errors'
import { API_URL } from '../../constants/index'
import '../../styles/admin/messages.scss'

const Messages = () => {
    const token = localStorage.getItem("token");

    const [messages, setMessages] = useState({data: []});
    const [showOnlyUnreaded, setShowOnlyUnreaded] = useState(false);
    const messagesBlocks = document.querySelectorAll('.message-block-readed');

    Moment.locale('pl')

    const handleMessagesVisibility = () => {
        if (!showOnlyUnreaded) {
            setShowOnlyUnreaded(true);
            for( let i in messagesBlocks) {
                messagesBlocks[i].style.display = 'none';
            }              
        }
        else {
            setShowOnlyUnreaded(false);
            for( let i in messagesBlocks) {
                messagesBlocks[i].style.display = 'grid';
            }        
        }
    }
    
    const getMessages = () => {
        axios.get(`${API_URL}/messages/`,{
            headers: {
              'Authorization': 'Token ' + token,
            }
         }).then(res => {
            const data = res.data;
            setMessages({ data: data });
        }).catch(function (error) {
            handleErrors(error);
        });
    }

    useEffect(() => {
        getMessages();
    }, [])

    return(
        <>
            <header>
                <div className="container">
                    <h1>Wiadomości</h1>
                </div>
            </header>
            <section>
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <h2 className="mb-4">Wiadomości:</h2>
                        <label>
                            <span className="me-2">Pokaż tylko nieprzeczytane:</span>
                            <input
                                type="checkbox"
                                onClick={() => handleMessagesVisibility()}
                                checked={showOnlyUnreaded ? true : false}
                            />
                        </label>
                    </div>
                    {
                    messages.data
                        .map(message =>
                            <div className={`message-block ${message.readed ? 'message-block-readed' : ''}`} style={{background: message.readed ? '#f7f7f7' : '#cfcfcf'}}>
                                <div className="message-block__number">
                                    <p>Numer wiadomości:</p>
                                    <span>{message.message_id}</span>
                                </div>
                                <div className="message-block__date">
                                    <div className="message-block__date-container">
                                        <p>Data dodania:</p>
                                        <span>{Moment(message.date).format('hh:mm DD/MM/YYYY')}</span>
                                    </div>
                                </div>
                                <Link to={`/admin/messages/${message.message_id}`} className='message-block__more'>Zobacz więcej <i className="icon-right-small" /></Link>
                            </div>
                        )
                    }
                </div>


            </section>
        </>
    )
}

export default Messages;