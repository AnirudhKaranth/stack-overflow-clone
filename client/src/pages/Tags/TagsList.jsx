import React from 'react'
import './Tags.css'

const TagsList = ({tag}) => {
  return (
    <div className='tag'>
        <h4>{tag.tagName}</h4>
        <h4>{tag.tagDesc}</h4>
    </div>
  )
}

export default TagsList