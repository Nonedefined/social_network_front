import React, { useState, useEffect } from 'react'
import APIService from '../APIService'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'


function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [bio, setBio] = useState('')
    const [location, setLocation] = useState('')

    const [token, setToken] = useCookies(['mytoken'])
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')

    let navigate = useNavigate()
    useEffect(() => {
        if (token['mytoken'] && token['mytoken'] !== 'undefined') {
            APIService.GetMyProfile(token["mytoken"])
            .then(resp => {
                navigate(`/profile/${resp[0]['id']}`)
            })
        }
    }, [token['mytoken']])

    const registerBtn = () => {
        APIService.RegisterUser({
            'user_email': username,
            "user_password": password,
            'user_first_name': firstName,
            'user_last_name': lastName,
            'bio': bio,
            'location': location
        }, token["mytoken"])
            .then(resp => {
                if (resp['token']) {
                    setToken('mytoken', resp['token'])
                    return
                }
                setEmailError(resp['user_email'])
                setPasswordError(resp['user_password'])
                setFirstNameError(resp['user_first_name'])
                setLastNameError(resp['user_last_name'])
        })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='App'>
            <div className='container'>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5">
                        <br />
                        <br />
                        <center><h1>Registration</h1></center>
                        <br />
                        <br />

                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="username"
                                name="EmailInput"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <small id="passwordHelp" class="text-danger">
                                {emailError}
                            </small>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='password' className='form-label'>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <small id="passwordHelp" class="text-danger">
                                {passwordError}
                            </small>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='firstName' className='form-label'>First name</label>
                            <input
                                className="form-control"
                                id="firstName"
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <small id="passwordHelp" class="text-danger">
                                {firstNameError}
                            </small>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='lastName' className='form-label'>Last name</label>
                            <input
                                className="form-control"
                                id="lastName"
                                placeholder="Enter last name"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                            <small id="passwordHelp" class="text-danger">
                                {lastNameError}
                            </small>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='bio' className='form-label'>Bio</label>
                            <input
                                className="form-control"
                                id="bio"
                                placeholder="Enter bio"
                                value={bio}
                                onChange={e => setBio(e.target.value)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='location' className='form-label'>Location</label>
                            <input
                                className="form-control"
                                id="location"
                                placeholder="Enter location"
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                            />
                        </div>

                        <div class="row">
                            <div class="col-sm">
                                <button className='btn btn-primary' onClick={registerBtn}>Register</button>
                            </div>
                            <div class="col-sm">
                                Already have account? <a href="/login">Sign in</a>
                            </div>

                        </div>
                    </div>

                </div>
            </div>


        </div>

    )
}

export default Register