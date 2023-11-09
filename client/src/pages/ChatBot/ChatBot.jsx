import React, {useState, useEffect} from 'react'
import Chats from './Chats'
import './ChatBot.css'
import { useSelector, useDispatch } from 'react-redux'
import { askBot } from '../../actions/chat'
import { fetchAllChats } from '../../actions/chat'
import Navbar from '../../components/Navbar/Navbar'


const ChatBot = () => {
  const [chatQuestion, setChatQuestion] = useState("")
  const dispatch = useDispatch();
  const User = useSelector((state) => (state.currentUserReducer))
  const userId= User?.result?._id || null;
  const chats = useSelector(state=> state.chatReducer)
  
  const chatList = chats?.data?.data|| [];
  
  const handleSubmit =(e)=>{
    e.preventDefault();
    dispatch(askBot({chatQuestion, userPosted: User.result.name, userId: User?.result?._id}))
    dispatch(fetchAllChats({userId}))
    
  }
  dispatch(fetchAllChats({userId}))

  useEffect(()=>{
    dispatch(fetchAllChats({userId}))
  },[dispatch, userId])
  
   
  return (
    <div className='chat-box-1'>
      <Navbar/>
      <div className='chat-box-2'>
      <h3>CHAT-BOT</h3>
        <div className='chat-box-3a'>
          {
            chatList.map((chat)=>{
              const {chatQuestion, chatAnswer} = chat;
              return <Chats chatQuestion={chatQuestion} chatAnswer={chatAnswer}/> 
            })
}
            
        </div>
        <form className='chat-box-3b' onSubmit={handleSubmit}>
          <input type="text" className='send-input' onChange={(e)=> {setChatQuestion(e.target.value)}}/>
          <button type="submit" className='send-btn'>send</button>
        </form>
      </div>
    </div>
  )
}

export default ChatBot