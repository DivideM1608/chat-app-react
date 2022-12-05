import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './page/Login';
import Register from './page/Register';
import Home from './page/Home';
import Chat from "./page/Chat"
import Layout from './components/Layout';
import Profile from './page/Profile';
import React, { useState, useEffect } from "react";
import authContext from './context/authContext';
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import {io} from 'socket.io-client'


const ProtectedRoute = ({ user, redirectPath = '/login' }) => {
  const location = useLocation()
  return user 
    ? <Outlet /> 
    : <Navigate to={redirectPath} state={{ from: location }} replace /> 
};
const URL = "http://localhost:8080"
const socket = io(URL)


function App() {
  const a = localStorage.getItem('session')
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(()=> {
      setAuthenticated(a)
  },[a])
  console.log(authenticated)
  return (
    <div className="App">
      <BrowserRouter>
        <authContext.Provider value={{ authenticated, setAuthenticated }}>

          <Routes>
            <Route path="/" element={<Layout/>}>
              {/*Public route*/}
              <Route index element={<Home socket={socket}/>} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="chat" element={<Chat socket={socket}/>} />
                          {/*Protected route*/}
              <Route element={<ProtectedRoute user={authenticated}/>}>
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>
          </Routes>
        </authContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
