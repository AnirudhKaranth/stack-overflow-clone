import React, { useEffect, useState } from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import QuestionsDetails from './QuestionsDetails'
import Navbar from '../../components/Navbar/Navbar'

const DisplayQuestion = () => {
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
    <div>
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className='home-container-1'>
        {screenWidth >= 768 || isSidebarOpen ? (

          <LeftSidebar />
        ) : null

        }
        <div className='home-container-2'>
          <QuestionsDetails/>
          {screenWidth >= 990 ? (

            <RightSidebar />
          ) : null
          }
        </div>
      </div>

    </div>
  )
}

export default DisplayQuestion