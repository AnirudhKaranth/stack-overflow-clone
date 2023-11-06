import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './HomeMainbar.css'
import QuestionList from './QuestionList'

const HomeMainbar = () => {

    const questionsList = useSelector(state=>state.questionsReducer)
    // console.log(questionsList)
    const location = useLocation();
    const navigate = useNavigate();

    const user = useSelector((state) => (state.currentUserReducer))

    const checkAuth = ()=>{
      if (user === null) {
        alert("login or signup to ask question")
        navigate("/Auth")
      }
      else{
        navigate('/AskQuestion')
      }
    }
    const checkAuthb = ()=>{
      if (user === null) {
        alert("login or signup to ask question")
        navigate("/Auth")
      }
      else{
        navigate('/chatBot')
      }
    }

  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
          {
            location.pathname === '/' ? <h1 className='main-bar-header-h1'>Top Questions</h1> : <h1 className='main-bar-header-h1'>All Questions</h1>
          }
          <div className='main-bar-header-btn-div'>

          <button onClick={checkAuth} className='ask-btn'>Ask Question</button>
          <button onClick={checkAuthb} className='ask-btn'>Ask a bot</button>
          </div>
      </div>
      <div>
        {
          questionsList.data === null ? 
          <h1>Loading...</h1> : 
          <>
            <p>{questionsList.data.length} questions</p>
            <QuestionList key={questionsList?.data?._id} questionList={questionsList.data}/>
          </>
        }
      </div>
      
    </div>
  )
}

export default HomeMainbar