import React, { useEffect, useState } from 'react'
import '../../App.css'
import HomeMainbar from '../../components/HomeMainbar/HomeMainbar'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import Navbar from '../../components/Navbar/Navbar'

const Questions = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

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
    <div>
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className='home-container-1'>
        {screenWidth >= 768 || isSidebarOpen ? (

          <LeftSidebar />
        ) : null

        }
        <div className='home-container-2'>
          <HomeMainbar />
          {screenWidth >= 990 ? (

            <RightSidebar />
          ) : null
          }
        </div>
      </div>

    </div>
  )
}

export default Questions