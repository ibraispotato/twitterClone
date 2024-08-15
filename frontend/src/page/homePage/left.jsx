import React, { useEffect, useState,useRef } from 'react'
import NavLeft from "../../nav/navLefdt"
import { faHouse,faSearch,faUser,faCircleInfo,faSignIn,faEllipsis, } from '@fortawesome/free-solid-svg-icons'
import {faXTwitter } from '@fortawesome/free-brands-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {LogoutFun} from "../../hooks/hooksRegister/logout"
import {Hooksregisters} from "../../hooks/hooksRegister/hooksregister"
import "./left.css"
import img from "../..//defultPic.png"
import { Link } from 'react-router-dom'
const Left = ({setBackAndFourth,backAndFourth,}) => {
  const { user, dispatch } = Hooksregisters()
  const [more,setMore] = useState(false)
  const [Urprofile, setProfile] = useState([])
  const idLocal = localStorage.getItem("user")
  const { Logout } = LogoutFun()
  const logoutFunction=() =>{
    Logout()
  }//// logout function to logout from the account
  const [showIcon, setShowIcon] = useState(false);
  const lastScrollTop = useRef(0); // Ref to track the last scroll position
  const funLogin = async () => {
    const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${JSON.parse(idLocal)?._id}`)
    const json = await response.json()
    setProfile(json)
    }///get your account from the localhost
    useEffect(() => {
        return() => {
          funLogin()
        }
    }, [user])
    
  const handleScroll = () => {
    const currentScrollTop = window.scrollY;
    if (currentScrollTop > lastScrollTop.current) {
      // Scrolling down
      setShowIcon(true);
    } else {
      // Scrolling up
      setShowIcon(false);
    }
    lastScrollTop.current = currentScrollTop; // Update last scroll position
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='allLeft z' id='container'>
         
      <div className='sk'>
      {/* <div className='sd'>
          <NavLeft />
      </div> */}
    <div className={`${!showIcon?"now app":"now diss"}`}>
        <div onClick={() => setBackAndFourth(false)} className='up'>
              <Link className='settingsA' to={"/"}>
      <div className='iconAndText more'>
            <FontAwesomeIcon icon={faXTwitter} className='font'/>
              
          </div>
      </Link>
        <Link className='settingsA' to={"/"}>
      <div className='iconAndText more'>
              <FontAwesomeIcon icon={faHouse} className='font' />
              <h3>Home</h3>
          </div>
      </Link>
      <Link className='settingsA' to={"/explore"}>
          <div className='iconAndText more'>
              <FontAwesomeIcon icon={faSearch} className='font'/>
              <h3>Explore</h3>
              </div>
      </Link>
              
          {more&&user ?
           <div className='settingsBtn'>
           <Link to={`/settings/account`}>
           <button className='btnLogout'>
           
           settings account @{user?.userName}
              
             </button>
           </Link>
           
         </div>
            : 
            ""
          }

          <div onClick={() => setMore(prev=>!prev)} className='iconAndText more'>
              <FontAwesomeIcon icon={faCircleInfo} className='font'/>
              <h3 className='moreBtn'>More</h3>
          </div>
          <div className='postBtn'>
              <h1>Post</h1>
        </div>
      </div>
        {/* <div> */}
          {backAndFourth&&user ?
            <div className='logoutBtn'>
              <Link to={`/profile/${user._id}`}>
              <button className='btnLogout'>
              
                  profile account @{user?.userName}
                  
                </button>
              </Link>
              
              <button onClick={logoutFunction} className='btnLogout'>Log out @{user?.userName}</button>
            </div>
            : 
            ""
          }
      {user ? 
        <>
              <div onClick={() => setBackAndFourth(prev => !prev)} className='down'>
                <div className='allimgandtext'>
                  
                <img loading='lazy' className='img' src={user?.photo?.map((res)=> res.url)?.[0]||user?.photo} />
                <div className='names'>
                  <span className='nameText'>{user?.name}</span>
                  <span>@{user?.userName}</span>
                  </div>
                </div>
                <div className='leftBtn'>{<FontAwesomeIcon icon={faEllipsis}/>}</div>
          </div>
          
        </>
        :
        <Link to={'/register'}>
          <div className='iconAndText'>
            <FontAwesomeIcon icon={faSignIn} className='font' />
            <h3 className='TextLeft'>Login</h3>
          </div>
        </Link>
        }
        {/* </div> */}
        </div>
        </div>
    </div>
  )
}

export default Left
