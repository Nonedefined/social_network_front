import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './components/Login';
import { CookiesProvider } from 'react-cookie'
import EditProfile from './components/EditProfile';
import Profile from './components/Profile';
import Register from './components/Register';
import Chat from './components/Chat';
import ProfileFollowers from './components/ProfileFollowers';
import ProfileFollowings from './components/ProfileFollowings';


function Router() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/edit-profile' element={<EditProfile/>}/>
          <Route path='/profile/:id' element={<Profile/>}/>
          <Route path='/followers/:id' element={<ProfileFollowers/>}/>
          <Route path='/followings/:id' element={<ProfileFollowings/>}/>
          <Route path='/chat/:id' element={<Chat/>}/>
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);


reportWebVitals();
