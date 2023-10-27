import React from 'react'
import './ChatBot.css'

const Chats = ({chatQuestion, chatAnswer}) => {
  return (
    <>
    <div className='chats chats-client'>
      {chatQuestion}
      {/* what is coding */}
    </div>
    <div className='chats chats-bot'>
      {chatAnswer}
      {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae fuga quam maiores numquam ea quaerat eaque repudiandae quibusdam inventore quo? */}
    </div>
    
    </>
  )
}

export default Chats