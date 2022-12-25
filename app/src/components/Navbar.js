import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import APIService from '../APIService'

function Navbar() {
    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [myId, setMyId] = useState(0)

    let navigate = useNavigate()
    useEffect(() => {
        if (!token['mytoken'] || token['mytoken'] === 'undefined') {
            navigate('/login')
        }
    }, [])

    const logoutBtn = () => {
        removeToken(['mytoken'])
        navigate('/login')
    }

    useEffect(() => {
        APIService.GetMyProfile(token["mytoken"])
            .then(resp => {
                setMyId(resp[0]['id'])
            })
    }, [])


    return (
        <div class="sticky-top">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous" />
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>


            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="navbar-collapse collapse w-100 dual-collapse2 order-1 order-md-1">
                </div>

                <div class="navbar-collapse collapse w-40 dual-collapse2 order-2 order-md-2">
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarColor01">
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item">
                                    <a class="nav-link" href={`/chat/${myId}`}>Messages</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href={`/profile/${myId}`}>Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" onClick={logoutBtn} href="/login">Logout</a>
                                </li>

                            </ul>

                        </div>
                    </nav>
                </div>
            </nav>


        </div>
    )
}

export default Navbar