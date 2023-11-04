import React from 'react'
import '../../App.css'
import HomeMainbar from '../../components/HomeMainbar/HomeMainbar'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import Navbar from '../../components/Navbar/Navbar'

const Home = () => {
  return (
    <>
    <Navbar/>
    <div className='home-container-1'>
      <LeftSidebar />
      <div className='home-container-2'>
        <HomeMainbar/>
        <RightSidebar/>
      </div>
    </div>
    </>
  )
}

export default Home