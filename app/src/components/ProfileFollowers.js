import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import APIService from '../APIService'
import ShowFollowersFollowings from './ShowFollowersFollowings'


function ProfileFollowers() {
    const { id } = useParams()
    const [token,] = useCookies(['mytoken'])
    const [followers, setFollowers] = useState([])


    useEffect(() => {
        APIService.GetProfileFollowers(id, token["mytoken"])
            .then(resp => {
                setFollowers(resp[0])
            })

    }, [])
    return (
        <div className='App'>
            <Navbar />
            <div class="container mt-5 d-flex justify-content-center">
                <div class="card-profile p-3 bg-dark" >
                    <div class="d-flex align-items-center">
                        <ShowFollowersFollowings profiles={followers} name="Followers"/>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProfileFollowers