import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import authContext from '../context/authContext'
export default function ProtectedRoute(props) {
    const location = useLocation()

  return (
    props.authenticated
        ? <Outlet />
        : <Navigate to="/login" state={{from: location}} replace />
  )
}
