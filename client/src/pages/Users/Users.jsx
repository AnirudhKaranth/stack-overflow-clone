import React, { useEffect, useState } from 'react'
import './Users.css'
import UsersList from './UsersList'
import './Users.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Navbar from '../../components/Navbar/Navbar'

const Users = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])


  return (
    <>
    <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
    <div className='home-container-1'>
        {screenWidth >= 768 || isSidebarOpen ? (

            <LeftSidebar />
        ) : null

        }
      <div className="home-container-2">
        <h1 style={{fontWeight: "400"}}>Users</h1>
        <UsersList/>
      </div>
    </div>
    </>
  )
}

export default Users