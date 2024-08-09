import React,{useState,useEffect,useRef} from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'



const NavComment = () => {
  return (
    <div>
      <div className='theNav com'>
                <div>
                    <Link className='linkUrProfile' to={"/"}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                    </div>
                    <div className='nameAndPostPro'>
                    <span className='nameProfile'>Post</span>
                    <span></span>
                    </div>
                </div>
    </div>
  )
}

export default NavComment
