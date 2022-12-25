import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import APIService from '../APIService'
import Post from './Post'
import PopUp from './PopUp'
import ShowFollowersFollowings from './ShowFollowersFollowings'
import { useNavigate } from 'react-router-dom'


function Profile() {
    const { id } = useParams()
    const [myId, setMyId] = useState(0)
    const [token,] = useCookies(['mytoken'])

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [bio, setBio] = useState('')
    const [location, setLocation] = useState('')
    const [dateJoined, setDateJoined] = useState('')
    const [image, setImage] = useState(null)
    const [followers, setFollowers] = useState('')
    const [followings, setFollowings] = useState('')
    const [isProfile, setIsProfile] = useState(false)
    const [isFollowed, setIsFollowed] = useState(false)

    const [buttonPopPp, setButtonPopUp] = useState(false)
    const [popUpImage, setPopUpImage] = useState('')

    const [profiles, setProfiles] = useState([])
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        APIService.GetProfile(id, token["mytoken"])
            .then(resp => {
                setIsProfile(resp['id'])
                setBio(resp[0]['bio'])
                setLocation(resp[0]['location'])
                setFirstName(resp[0]['user_first_name'])
                setLastName(resp[0]['user_last_name'])
                setDateJoined(resp[0]['user_date_joined'])
                setImage(resp[0]['image'])
                setFollowings(resp[0]['followings_amount'])
                setFollowers(resp[0]['followers_amount'])
            })

    }, [isFollowed])

    useEffect(() => {
        APIService.IsFollowed(id, token["mytoken"])
            .then(resp => {
                setIsFollowed(resp[0]['is_followed'])
            })

    }, [])


    useEffect(() => {
        APIService.GetMyProfile(token["mytoken"])
            .then(resp => {
                setMyId(resp[0]['id'])
            })
    }, [])

    useEffect(() => {
        APIService.GetAllProfiles()
            .then(resp => {
                setProfiles(resp[0])
            })

    }, [])

    const followBtn = () => {
        APIService.FollowUnfollow(id, token["mytoken"])
            .then(() => setIsFollowed(!isFollowed))
    }

    let navigate = useNavigate()
    const profileBtn = (profile_id) => {
        navigate(`/profile/${profile_id}`)
        window.location.reload()
    }


    return (
        <div className='App'>
            <Navbar />
            <div class="mt-5">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-3">
                            <div class="card mb-sm-2 mb-md-1 contacts_card">
                                <div class="card-header">
                                    <h2><center>People you may know</center></h2>
                                    <div class="input-group">
                                        <input type="text" placeholder="Search..." onChange={e => setSearchText(e.target.value)} value={searchText} class="form-control search" />
                                    </div>
                                </div>
                                <div class="card-body contacts_body">
                                    <ui class="contacts">
                                        {profiles.filter((val => {
                                            if (searchText == "") {
                                                return val
                                            }
                                            if (''.concat(val.user_first_name.toLowerCase(), ' ', val.user_last_name.toLowerCase()).includes(searchText.toLowerCase())) {
                                                return val
                                            }
                                        })).map(profile =>
                                            <div>
                                                <li>
                                                    <div class="d-flex bd-highlight" >
                                                        <div class="img_cont">
                                                            {profile.image ? <input type="image" src={profile.image} class="rounded-circle user_img" onClick={() => profileBtn(profile.id)} /> :
                                                                <input type="image" src="https://www.seekpng.com/png/detail/13-134135_question-mark-emblem-bo-question-mark-clip-art.png" 
                                                                class="rounded-circle user_img" onClick={() => profileBtn(profile.id)} />}
                                                        </div>
                                                        <div class="user_info">
                                                            <a href={`/profile/${profile.id}`} class="link-text"> <span>{profile.user_first_name} {profile.user_last_name}</span></a>
                                                        </div>
                                                    </div>
                                                </li>
                                            </div>
                                        )}
                                    </ui>
                                </div>
                            </div>
                        </div>

                        <div class="col-7">
                            <div class="container">
                                <div class="card-profile p-3 bg-dark" >
                                    <div class="d-flex align-items-center">
                                        <div class="image m-3">
                                            {image ? <input type="image" src={image} class="rounded-circle profile_img" onClick={() => (setButtonPopUp(true), setPopUpImage(image))} /> :
                                                <input type="image" src='https://www.seekpng.com/png/detail/13-134135_question-mark-emblem-bo-question-mark-clip-art.png'
                                                    class="rounded-circle profile_img" onClick={() => (setButtonPopUp(true), setPopUpImage("https://www.seekpng.com/png/detail/13-134135_question-mark-emblem-bo-question-mark-clip-art.png"))} />
                                            }
                                        </div>
                                        <div class="ml-3 w-100">
                                            {isProfile === undefined ?
                                                <div>
                                                    <center><h4 class="mb-0 mt-0">{firstName} {lastName}</h4></center>
                                                    <span class="profile-stats"><h6>Joined: {dateJoined}</h6></span>

                                                    <div class="p-2 mt-2 bg-dark d-flex justify-content-between rounded text-white stats">

                                                        <div class="d-flex flex-column">
                                                            <span class="profile-stats"><h6>{bio}</h6></span>
                                                            <span class="profile-stats"><h6>{location}</h6></span>
                                                        </div>

                                                        <div class="d-flex flex-column">
                                                            <a href={`/followers/${id}/`}> <span class="profile-stats">Followers</span></a>
                                                            <span class="number">{followers}</span>
                                                        </div>
                                                        <div class="d-flex flex-column">
                                                            <a href={`/followings/${id}/`}> <span class="profile-stats">Followings</span></a>
                                                            <span class="number">{followings}</span>
                                                        </div>
                                                    </div>
                                                    {id == myId ?
                                                        <div class="button mt-2 d-flex flex-row align-items-center">
                                                            <a href="/edit-profile" class="btn btn-sm btn-primary w-100 ml-2" role="button">Edit profile</a>
                                                        </div> :
                                                        <div class="button mt-2 d-flex flex-row align-items-center">
                                                            <a href={`/chat/${id}`} class="btn btn-sm btn-outline-primary w-100" role="button">Chat</a>
                                                            {isFollowed ? <button class="btn btn-sm btn-primary w-100 ml-2" onClick={followBtn}>Unfollow</button> :
                                                                <button class="btn btn-sm btn-primary w-100 ml-2" onClick={followBtn}>Follow</button>}
                                                        </div>}

                                                </div>
                                                : <center><h1>No such profile</h1></center>}
                                        </div>
                                    </div>
                                    <Post />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <PopUp trigger={buttonPopPp} setTrigger={setButtonPopUp} image={popUpImage} />
        </div>
    )
}

export default Profile