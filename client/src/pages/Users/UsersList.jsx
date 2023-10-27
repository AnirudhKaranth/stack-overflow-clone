import React from 'react'
import {useSelector} from 'react-redux'
import './Users.css'
import User from './User'

const UsersList = () => {

    const users = useSelector((state)=> state.usersReducer)
  return (
    <div className='userList-container'>
        {
          users.map((user)=>(
            <User user={user} key={user?.id}/>
          ))
        }
    </div>
  )
}

export default UsersList