import React from 'react'
import './Users.css'
import Leftsidebar from '../../components/LeftSidebar/LeftSidebar'
import { useLocation } from 'react-router-dom'
import UsersList from './UsersList'
import './Users.css'

const Users = () => {

  const location = useLocation()

  return (
    <div className='home-container-1'>
      <Leftsidebar/>
      <div className="home-container-2" style={{marginTop: "50px"}}>
        <h1 style={{fontWeight: "400"}}>Users</h1>
        <UsersList/>
      </div>
    </div>
  )
}

export default Users