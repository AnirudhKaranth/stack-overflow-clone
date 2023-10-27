import React from 'react'
import comment from '../../assets/comment-alt-solid.svg'
import pen from '../../assets/pen-solid.svg'
import blacklogo from '../../assets/blacklogo.svg'

const Widget = () => {
  return (
    <div className='widget'>
      <h4>The Overflow Blog</h4>
      <div className='right-sidebar-div-1'>
        <div className='right-sidebar-div-2'>
          <img src={pen} alt="pen" width="18px" />
          <p>Observability is key to the future of software (and your devops career)</p>
        </div>
        <div className='right-sidebar-div-2'>
          <img src={pen} alt="pen" width="18px" />
          <p>Podcast 374: How valuable is your screen name?</p>
        </div>
      </div>

      <h4>Featured on Meta</h4>
      <div className='right-sidebar-div-1'>
        <div className='right-sidebar-div-2'>
          <img src={comment} alt="pen" width="18px" />
          <p>Review Queue workflows - Final release</p>
        </div>
        <div className='right-sidebar-div-2'>
          <img src={comment} alt="pen" width="18px" />
          <p>Please welcome Valued Associates: 958-V2Blast 950 - superG</p>
        </div>
        <div className='right-sidebar-div-2'>
          <img src={blacklogo} alt="pen" width="18px" />
          <p>Outdated Answers: accepted answer is now unpinned on stack overflow</p>
        </div>
      </div>

      <h4>Hot Meta Posts</h4>
      <div className='right-sidebar-div-1'>
        <div className='right-sidebar-div-2'>
          <p>23</p>
          <p>Why was the spam flag declinned. yet it is present</p>
        </div>
        <div className='right-sidebar-div-2'>
          <p>24</p>
          <p>What is the best course of action when a user has it?</p>
        </div>
        <div className='right-sidebar-div-2'>
          <p>25</p>
          <p>is the link to how to ask page help them?</p>
        </div>
      </div>
    </div>
  )
}

export default Widget