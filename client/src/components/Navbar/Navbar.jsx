import React, {useCallback, useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import decode from 'jwt-decode'

import logo from '../../assets/logo.png'
import  searchIcon  from '../../assets/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar'
import './Navbar.css'
import { setCurrentUser } from '../../actions/currentUser'
import {fetchAllQuestions} from '../../actions/question'

const Navbar = () => {
  const [search, setSearch] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    var User = useSelector((state) => (state.currentUserReducer));  

    const handleLogout =useCallback(()=>{
      dispatch({type: 'LOGOUT'})
      navigate('/')
      dispatch(setCurrentUser(null))
    },[dispatch, navigate])

    const handleSearch = (e) => {
      e.preventDefault()
      dispatch(fetchAllQuestions(search))
  }

    useEffect(() => {
      const token = User?.token
      if (token) {
        const decodedToken = decode(token)
        if(decodedToken.exp * 1000 < new Date().getTime()){
          handleLogout()
        }
      }
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    }, [dispatch, User?.token, handleLogout])
    
  return (
    <nav className='main-nav'>
        <div className='navbar'>
            <Link to='/' className='nav-item nav-logo'>
                <img src= {logo} alt='logo' />
            </Link>
            <Link to='/' className='nav-item nav-btn'>About</Link>
            <Link to='/' className='nav-item nav-btn'>Products</Link>
            <Link to='/' className='nav-item nav-btn'>For Teams</Link>
            <form onSubmit={handleSearch}>
                <input type="text"  value={search} placeholder='search...' onChange={(e) => setSearch(e.target.value)}/>
                <img src={searchIcon} alt="search" width="18" className='search-icon'/>
            </form>
            {User === null ? 
            <Link to='/Auth' className='nav-item nav-links'>Login</Link> :
            <>
                <Link to={`/Users/${User.result?._id}`} style={{textDecoration: "none"}} ><Avatar backgroundColor='#009dff' px='10px' py='7px' borderRadius='49%' color='white'>{User?.result?.name.charAt(0).toUpperCase()}</Avatar></Link>
                <button className='nav-item nav-links' onClick={handleLogout}>Log Out</button>
            </>
        }
        </div>
    </nav>
  )
}

export default Navbar