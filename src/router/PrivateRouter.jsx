import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRouter = () => {
    const {currentUser} = useAuthContext()
  return (
    currentUser? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRouter
