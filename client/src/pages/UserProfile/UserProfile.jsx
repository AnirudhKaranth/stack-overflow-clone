import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import axios from 'axios'

import Avatar from '../../components/Avatar/Avatar'
import EditProfileForm from './EditProfileForm'
import ProfileBio from './ProfileBio'
import './UserProfile.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Navbar from '../../components/Navbar/Navbar'

const UserProfile = () => {

    const { id } = useParams()
    const users = useSelector((state) => state.usersReducer)
    const currentProfile = users.filter((user) => user._id === id)[0]
    const currentUser = useSelector((state) => state.currentUserReducer)

    const [Switch, setSwitch] = useState(false)
    const [location, setLocation] = useState("")
    const [mylocation, setmyLocation] = useState(false)
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

    const Location = async () => {
        
        try {
            axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=<YOUR_API_KEY>`)
            .then(response => {
                    setLocation(response.data.region)
                    setmyLocation(true)
                    setTimeout(() => {
                        setmyLocation(false)
                    }, 30000);
                    return response;
                })
                .catch(error => {
                    console.log(error); 
                });
            } catch (error) {
                console.log(error);
        }
    }
    

    return (
        <div>
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className='home-container-1'>
        {screenWidth >= 768 || isSidebarOpen ? (

          <LeftSidebar />
        ) : null

        }
            <div className="home-container-2">
                <section>
                    <div className="user-details-container">
                        <div className="user-details">
                            <Avatar backgroundColor="purple" color='white' fontSize='50px' px='40px' py='30px'>
                                {currentProfile?.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className="user-name">
                                <h1>{currentProfile?.name}</h1>
                                <p><FontAwesomeIcon icon={faBirthdayCake} /> joined {moment(currentProfile?.joinedOn).fromNow()}</p>
                            {
                                mylocation &&
                                <div>{location}</div>}
                            </div>
                        </div >
                        <div className='loc-btn'>

                            {
                                currentUser?.result._id === id && (
                                    <button type='button' onClick={() => setSwitch(true)} className='edit-profile-btn'>
                                        <FontAwesomeIcon icon={faPen} /> Edit Profile
                                    </button>
                                )
                            }

                            {
                                currentUser?.result._id === id && (
                                    <button type='button' onClick={Location} className='edit-profile-btn'>
                                        My Location
                                    </button>
                                )
                            }
                        </div>
                    </div>
                    <>
                        {
                            Switch ? (
                                <EditProfileForm currentUser={currentUser} setSwitch={setSwitch} />
                            ) : (
                                <ProfileBio currentProfile={currentProfile} />
                            )
                        }
                    </>
                </section>
            </div>
        </div>
        </div>
    )
}

export default UserProfile