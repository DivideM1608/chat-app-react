import { Outlet, Link } from "react-router-dom";
import React from 'react'

export default function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/register">register</Link>
          </li>
          <li>
            <Link to="/profile">profile</Link>
          </li>
          <li>
            <Link to="/chat">chat</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}
