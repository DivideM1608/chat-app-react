import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";



export default function Home({ socket }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    //sends the username and socket ID to the Node.js server
    socket.emit('newUser', { userName, socketID: socket.id });
    navigate('/chat');
    console.log(socket.id)
  };
  return (
    <>
      <div>Home</div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}   
        />
        <button className="sendBtn">SEND</button>
      </form>
    </>
  )
}
