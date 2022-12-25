import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import APIService from '../APIService'
import ShowFollowersFollowings from './ShowFollowersFollowings'


function ProfileFollowings() {
    const { id } = useParams()
    const [token,] = useCookies(['mytoken'])
    const [followings, setFollowings] = useState([])


    useEffect(() => {
        APIService.GetProfileFollowings(id, token["mytoken"])
            .then(resp => {
                setFollowings(resp[0])
            })

    }, [])
    return (
        <div className='App'>
            <Navbar />
            <div class="container mt-5 d-flex justify-content-center">
                <div class="card-profile p-3 bg-dark" >
                    <div class="d-flex align-items-center">
                        <ShowFollowersFollowings profiles={followings} name="Followings" />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProfileFollowings