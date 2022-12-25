import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import { useCookies } from 'react-cookie'
import APIService from '../APIService'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import PopUp from './PopUp'


function Chat() {
    const { id } = useParams()
    const [myId, setMyId] = useState(0)
    const [token,] = useCookies(['mytoken'])

    const [messages, setMessages] = useState([])
    const [chats, setChats] = useState([])

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [isProfile, setIsProfile] = useState(false)

    const [image, setImage] = useState(null)
    const [text, setText] = useState('')
    const [file, setFile] = useState(null)

    const [buttonPopPp, setButtonPopUp] = useState(false)
    const [popUpImage, setPopUpImage] = useState('')

    const [searchText, setSearchText] = useState('')


    useEffect(() => {
        const interval = setInterval(() => {
            APIService.GetMessages(id, token["mytoken"])
                .then(resp => {
                    setMessages(resp[0]['Messages'])
                })
        }, 500);
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            APIService.GetChats(token["mytoken"])
                .then(resp => {
                    setChats(resp[0]['Chats'])
                })
        }, 500);
    }, [])

    useEffect(() => {
        APIService.GetProfile(id, token["mytoken"])
            .then(resp => {
                setIsProfile(resp['id'])
                setFirstName(resp[0]['user_first_name'])
                setLastName(resp[0]['user_last_name'])
                setImage(resp[0]['image'])
            })

    }, [])



    const sendMesBtn = () => {
        let formData = new FormData()

        file && formData.append('image', file)
        text && formData.append('text', text)
        setFile(null)
        setText('')
        axios({
            url: `http://127.0.0.1:8000/messages/${id}/`,
            method: 'POST',
            headers: {
                'Authorization': `Token ${token["mytoken"]}`
            },
            data: formData
        })

    }

    useEffect(() => {
        APIService.GetMyProfile(token["mytoken"])
            .then(resp => {
                setMyId(resp[0]['id'])
            })
    }, [])

    let navigate = useNavigate()
    const profileBtn = () => {
        navigate(`/profile/${id}`)
    }
    const chatBtn = (chatId) => {
        navigate(`/chat/${chatId}`)
        window.location.reload()
    }

    const handleFile = (e) => {
        setFile(e.target.files[0])
        e.target.value = null
    }

    return (
        <div className='App'>
            <Navbar />
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.min.css" />
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.min.js"></script>

            <div class="container-fluid h-100">
                <div class="row justify-content-center h-100">
                    <div class="col-md-4 col-xl-4 chat">
                        <div class="card mb-sm-3 mb-md-0 contacts_card">
                            <div class="card-header">
                                <div class="input-group">
                                    <input type="text" placeholder="Search..." onChange={e => setSearchText(e.target.value)} value={searchText} class="form-control search" />
                                </div>
                            </div>

                            <div class="card-body contacts_body">
                                <ui class="contacts">
                                    {chats.filter((val => {
                                        if (searchText == "") {
                                            return val
                                        }
                                        if (''.concat(val.user_first_name.toLowerCase(), ' ', val.user_last_name.toLowerCase()).includes(searchText.toLowerCase())) {
                                            return val
                                        }
                                    })).map(chat =>
                                        <div>
                                            <li class={chat.id == id && 'active'} >
                                                <div class="d-flex bd-highlight" >
                                                    <div class="img_cont">
                                                        {chat.image ? <input type="image" src={chat.image} class="rounded-circle user_img" onClick={() => chatBtn(chat.id)} /> :
                                                            <input type="image" src="https://www.seekpng.com/png/detail/13-134135_question-mark-emblem-bo-question-mark-clip-art.png" class="rounded-circle user_img" onClick={() => chatBtn(chat.id)} />}
                                                    </div>
                                                    <div class="user_info">
                                                        {chat.id === myId ?
                                                            <a href={`/chat/${chat.id}`} class="link-text"> <span>Saved messages</span></a> :
                                                            <a href={`/chat/${chat.id}`} class="link-text"> <span>{chat.user_first_name} {chat.user_last_name}</span></a>}
                                                    </div>
                                                </div>
                                            </li>
                                        </div>
                                    )}

                                </ui>
                            </div>

                        </div>
                    </div>

                    <div class="col-md-8 col-xl-7 chat">
                        {isProfile === undefined ?
                            <div class="card">
                                {id == myId ?
                                    <div class="card-header msg_head">
                                        <div class="d-flex bd-highlight">
                                            <center><h1>Saved messages</h1></center>
                                        </div>
                                    </div> :
                                    <div class="card-header msg_head">
                                        <div class="d-flex bd-highlight">
                                            <div class="img_cont">
                                                {image ? <input type="image" src={image} class="rounded-circle user_img" onClick={profileBtn} /> :
                                                    <input type="image" src="https://www.seekpng.com/png/detail/13-134135_question-mark-emblem-bo-question-mark-clip-art.png" class="rounded-circle user_img" onClick={profileBtn} />}
                                            </div>
                                            <div class="user_info">
                                                <a href={`/profile/${id}`} class="link-text"> <span>{firstName} {lastName}</span></a>
                                            </div>
                                        </div>
                                    </div>
                                }

                                <div class="card-body msg_card_body">
                                    {messages ?
                                        <div>{messages.map(message =>
                                            <div>
                                                {message.profile_from == myId ?
                                                    <div class="d-flex justify-content-end mb-4">
                                                        <div class="msg_cotainer_send">
                                                            {message.image &&
                                                                <div class="img_msg">
                                                                    <input type="image" src={message.image} class="img_msg" onClick={() => (setButtonPopUp(true), setPopUpImage(message.image))} />
                                                                </div>
                                                            }
                                                            {message.text}
                                                            <span class="msg_time_send">{message.created_at}</span>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div class="d-flex justify-content-start mb-4">
                                                        <div class="msg_cotainer">
                                                            {message.image &&
                                                                <div class="img_msg">
                                                                    <img src={message.image} class="img_msg" />
                                                                </div>
                                                            }
                                                            {message.text}
                                                            <span class="msg_time_send">{message.created_at}</span>
                                                        </div>
                                                    </div>

                                                }
                                            </div>
                                        )}
                                        </div> : null}
                                </div>
                                <div class="card-footer">
                                    <div class="input-group">
                                        <textarea name="" class="form-control type_msg" placeholder="Type your message..." value={text} onChange={e => setText(e.target.value)}></textarea>

                                        <label onChange={e => handleFile(e)} class="input-group-append">
                                            <input name="file" type="file" hidden />

                                            <div class="fonts send_btn"><i class="fas fa-paperclip"> {file && 1}</i></div>

                                        </label>
                                        <div class="input-group-append" onClick={sendMesBtn}>
                                            <span class="input-group-text send_btn"><i class="fas fa-location-arrow" ></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div> :
                            <div class="card-header msg_head">
                                <div class="d-flex bd-highlight">
                                    <div class="user_info">
                                        <h1>No such profile</h1>
                                    </div>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
            <PopUp trigger={buttonPopPp} setTrigger={setButtonPopUp} image={popUpImage} />
        </div >
    )
}

export default Chat