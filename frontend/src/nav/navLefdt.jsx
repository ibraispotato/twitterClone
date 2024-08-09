import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXTwitter } from '@fortawesome/free-brands-svg-icons'
import "./nav.css"


const navBar = () => {
  return (
    <div>
          <div className='all'>
              <div className='left'>
              <FontAwesomeIcon icon={faXTwitter} className='font'/>
              </div>
              </div>
            
    </div>
  )
}

export default navBar
