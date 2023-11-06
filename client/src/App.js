import { BrowserRouter as Router } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import AllRoutes from './AllRoutes'
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';
import { fetchAllChats } from './actions/chat';
// import Navbar from './components/Navbar/Navbar';

function App() {
  const dispatch =useDispatch();
  const User = useSelector((state) => (state.currentUserReducer))
  const userId= User?.result?._id;
  
  useEffect(()=>{
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
    dispatch(fetchAllChats({userId}))
  },[dispatch, userId])

  return (
    <div className="App">
      <Router>
        {/* <Navbar/> */}
        <AllRoutes/>
      </Router>

    </div>
  );
}

export default App;
