import Navbar from './Navbar'
import React, { useState, useEffect } from 'react'
import APIService from '../APIService'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'


function EditProfile() {
    const [token,] = useCookies(['mytoken'])
    const [myId, setMyId] = useState(0)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [bio, setBio] = useState('')
    const [location, setLocation] = useState('')
    const [image, setImage] = useState(null)
    const [newImage, setNewImage] = useState(null)

    const [isEdit, setIsEdit] = useState(false)
    const [isDeletingPhoto, setIsDeletingPhoto] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [oldPasswordError, setOldPasswordError] = useState('')
    const [newPasswordError, setNewPasswordError] = useState('')

    let navigate = useNavigate()
    useEffect(() => {
        APIService.GetMyProfile(token["mytoken"])
            .then(resp => {
                setMyId(resp[0]['id'])
                setBio(resp[0]['bio'])
                setLocation(resp[0]['location'])
                setFirstName(resp[0]['user_first_name'])
                setLastName(resp[0]['user_last_name'])
                setImage(resp[0]['image'])
            })

    }, [])

    const saveBtn = () => {
        APIService.EditMyProfile({
            'user_first_name': firstName,
            'user_last_name': lastName,
            'bio': bio,
            'location': location
        }, token["mytoken"])
            .then(() => navigate(`/profile/${myId}`))
    }

    const editPasswordBtn = () => {
        APIService.EditPassword({
            'old_password': oldPassword,
            'new_password': newPassword,
        }, token["mytoken"])
            .then(resp => {
                resp.old_password ? setOldPasswordError(resp.old_password) : setOldPasswordError(resp.password)
                resp.new_password ? setNewPasswordError(resp.new_password) : setNewPasswordError(resp.non_field_errors)

                if (resp.id) {
                    setOldPassword('')
                    setNewPassword('')
                }
                else {
                    return
                }

            })
    }

    const handleFile = (e) => {
        setNewImage(e.target.files[0])
        console.log(e.target.files[0])
        e.target.value = null
    }

    const deletePhotoBtn = () => {
        APIService.DeletePhoto(token["mytoken"])
            .then(resp => {
                setImage(null)
            })
            .then(
                () => navigate(`/profile/${myId}`)
            )
    }

    const savePhotoBtn = () => {
        let formData = new FormData()
        formData.append('image', newImage)
        setNewImage(null)
        APIService.ChangePhoto(formData, token["mytoken"])
        navigate(`/profile/${myId}`)
    }

    return (
        <div className='App'>
            <Navbar />
            <div class="container mt-5 d-flex justify-content-center">
                <div class="card-profile p-3 bg-dark" >
                    <div class="d-flex align-items-center">
                        <div class="ml-3 w-100">
                            <div class="p-3 py-5">
                                <button class="btn btn-outline-primary profile-button" type="button" onClick={() => navigate(`/profile/${myId}`)}><i class="fas fa-arrow-left fa-fw fa-xl"></i></button>


                                <div class="row mt-3 text-center">
                                    <div class="image m-3">
                                        {image ? <img src={image} class="rounded" width="200" /> :
                                            <img src='https://www.seekpng.com/png/detail/13-134135_question-mark-emblem-bo-question-mark-clip-art.png' class="rounded" width="200" />}
                                    </div>

                                    <div class="col-md-12">
                                        <button class="btn btn-danger profile-button" type="button" onClick={() => { setIsDeletingPhoto(true); setNewImage(null) }}>
                                            <label class="input-group-append">
                                                Delete image
                                            </label>

                                        </button>

                                        <button class="btn btn-primary profile-button" type="button">
                                            <label class="input-group-append" onChange={e => handleFile(e)}>
                                                Change image
                                                <input name="file" type="file" hidden />
                                            </label>
                                        </button>

                                    </div>

                                    {newImage && <div class="mt-3 text-center">
                                        <button class="btn btn-primary profile-button" type="button" onClick={() => savePhotoBtn()}>
                                            Save new image
                                        </button>
                                    </div>}

                                    {isDeletingPhoto && <div class="mt-3 text-center">
                                        <button class="btn btn-danger profile-button" type="button" onClick={() => deletePhotoBtn()}>
                                            Confirm deleting
                                        </button>
                                    </div>}

                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-6">
                                        <label class="profile-stats">First name</label>
                                        <input type="text" class="form-control" placeholder="first name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="profile-stats">Last name</label>
                                        <input type="text" class="form-control" placeholder="last name" value={lastName} onChange={e => setLastName(e.target.value)} />
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-md-12">
                                        <label class="profile-stats">Bio</label>
                                        <input type="text" class="form-control" placeholder="bio" value={bio} onChange={e => setBio(e.target.value)} />
                                    </div>
                                    <div class="col-md-12">
                                        <label class="profile-stats">Location</label>
                                        <input type="text" class="form-control" placeholder="location" value={location} onChange={e => setLocation(e.target.value)} />
                                    </div>
                                </div>
                                <div class="mt-3 text-center">
                                    <button class="btn btn-primary profile-button" type="button" onClick={saveBtn}>Save changes</button>
                                </div>
                                {isEdit ?
                                    <div class="row mt-2">
                                        <div class="col-md-6">
                                            <label class="profile-stats">Old password</label>
                                            <input type="password" class="form-control" placeholder="old password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                                            <small id="passwordHelp" class="text-danger">
                                                {oldPasswordError}
                                            </small>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="profile-stats">New password</label>
                                            <input type="password" class="form-control" placeholder="new password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                                            <small id="passwordHelp" class="text-danger">
                                                {newPasswordError}
                                            </small>
                                        </div>
                                        <div class="mt-3 text-center">
                                            <button class="btn btn-primary profile-button" type="button" onClick={editPasswordBtn}>Save password</button>
                                        </div>
                                    </div> :
                                    <div class="mt-3 text-center">
                                        <button class="btn btn-primary profile-button" type="button" onClick={() => setIsEdit(true)}>Edit password</button>
                                    </div>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile