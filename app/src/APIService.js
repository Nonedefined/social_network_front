import axios from 'axios'


export default class APIService {
    static GetMessages(id, token) {
        return fetch(`http://127.0.0.1:8000/messages/${id}/`,
            {
                'method': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Token ${token}`
                },
            }).then(resp => resp.json())

    }

    static SendMessage(formData, id, token) {
        return axios({
            url: `http://127.0.0.1:8000/messages/${id}/`,
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`
            },
            data: formData
        })
    }

    static GetChats(token) {
        return fetch('http://127.0.0.1:8000/chats/',
            {
                'method': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Token ${token}`
                },
            }).then(resp => resp.json())

    }

    static GetPosts(id, token) {
        return fetch(`http://127.0.0.1:8000/post/${id}/`,
            {
                'method': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Token ${token}`
                },
            }).then(resp => resp.json())

    }


    static LikeUnlike(id, token) {
        return fetch(`http://127.0.0.1:8000/post_like_unlike/${id}/`,
            {
                'method': 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Token ${token}`
                },
            }).then(resp => resp.json())

    }

    static CommentLikeUnlike(id, token) {
        return fetch(`http://127.0.0.1:8000/comment_like_unlike/${id}/`,
            {
                'method': 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Token ${token}`
                },
            }).then(resp => resp.json())

    }

    static GetProfile(id, token) {
        return fetch(`http://127.0.0.1:8000/profile/${id}/`,
            {
                'method': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Token ${token}`
                },
            }).then(resp => resp.json())

    }

    static GetAllProfiles() {
        return fetch(`http://127.0.0.1:8000/profiles/`,
            {
                'method': 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(resp => resp.json())

    }

    static GetProfileFollowers(id, token) {
        return fetch(`http://127.0.0.1:8000/profile_followers/${id}/`,
            {
                'method': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Token ${token}`
                },
            }).then(resp => resp.json())

    }

    static GetProfileFollowings(id, token) {
        return fetch(`http://127.0.0.1:8000/profile_followings/${id}/`,
            {
                'method': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Token ${token}`
                },
            }).then(resp => resp.json())

    }


    static GetMyProfile(token) {
        return fetch('http://127.0.0.1:8000/profile_edit/',
            {
                'method': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Token ${token}`
                },
            }).then(resp => resp.json())

    }

    static EditMyProfile(body, token) {
        return fetch('http://127.0.0.1:8000/profile_edit/',
            {
                'method': 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Token ${token}`
                },
                body: JSON.stringify(body)
            }).then(resp => resp.json())

    }

    static EditPassword(body, token) {
        return fetch('http://127.0.0.1:8000/profile_change_password/',
            {
                'method': 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Token ${token}`
                },
                body: JSON.stringify(body)
            }).then(resp => resp.json())

    }


    static DeletePhoto(token) {
        return axios({
            url: `http://127.0.0.1:8000/profile_change_image/`,
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`
            },
        })

    }

    static ChangePhoto(formData, token) {
        return axios({
            url: `http://127.0.0.1:8000/profile_change_image/`,
            method: 'PUT',
            headers: {
                'Authorization': `Token ${token}`
            },
            data: formData
        })

    }

    static IsFollowed(id, token) {
        return fetch(`http://127.0.0.1:8000/profile_is_followed/${id}/`,
            {
                'method': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Token ${token}`
                },
            }).then(resp => resp.json())

    }


    static FollowUnfollow(id, token) {
        return fetch(`http://127.0.0.1:8000/profile_follow_unfollow/${id}/`,
            {
                'method': 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Token ${token}`
                },
            }).then(resp => resp.json())

    }

    static LoginUser(body) {
        return fetch('http://127.0.0.1:8000/auth/',
            {
                'method': 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(resp => resp.json())

    }


    static RegisterUser(body) {
        return fetch('http://127.0.0.1:8000/profiles/',
            {
                'method': 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(resp => resp.json())

    }
}
