import React from 'react'
import { useNavigate } from 'react-router-dom'


function ShowFollowersFollowings(props) {

    let navigate = useNavigate()
    return (
        <div class="container mt-5">
            <div class="d-flex justify-content-center row">
                <div class="p-3 text-center">
                    <h1>{props.name}</h1>
                    {props.profiles.map(profile =>
                        <div class="d-flex flex-row justify-content-between align-items-center mb-3">
                            <div class="d-flex flex-row align-items-center">
                                {profile.image ? <input type="image" src={profile.image} class="rounded-circle user_img" onClick={() => navigate(`/profile/${profile.id}`)} /> :
                                    <input type="image" src="https://www.seekpng.com/png/detail/13-134135_question-mark-emblem-bo-question-mark-clip-art.png"
                                        class="rounded-circle user_img" onClick={() => navigate(`/profile/${profile.id}`)} />}

                                <div class="d-flex flex-column align-items-start ml-2">
                                    <a href={`/profile/${profile.id}`} class="link-text">{profile.user_first_name} {profile.user_last_name}</a>
                                    <span class="followers">{profile.followers_amount} Followers</span>
                                </div>
                            </div>
                            <div class="d-flex flex-row align-items-center mt-2">
                                <button class="btn btn-outline-primary" type="button" onClick={() => navigate(`/chat/${profile.id}`)}>Chat</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}


export default ShowFollowersFollowings