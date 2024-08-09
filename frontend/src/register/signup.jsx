
import React, { useState,useEffect } from 'react'
import { Signup } from "../hooks/hooksRegister/signup"
import { Link } from 'react-router-dom'
import "./register.css"
import Registerpage from './registerpage'

import {  faXTwitter } from '@fortawesome/free-brands-svg-icons'
import {faX } from '@fortawesome/free-solid-svg-icons'
import {faUpload } from '@fortawesome/free-solid-svg-icons'
import img from "../images/defultPic.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./mobileResRegister.css"
const SSignup = () => {
  const { funSignup, error, setError } = Signup()
  const [Next,setNext] = useState(true)
    const [name,setName] = useState("")
    const [userName,setUserName] = useState("")
    const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const images = require.context('../images', true);
  const imageList = images.keys().map(image => images(image))
  // console.log(imageList)
    const [photo,setProfilePic] = useState(imageList[0])
    const submitSigUp = async (e) => {
        e.preventDefault()
      await funSignup(name, userName, photo, email, password,bio,Next,setNext)
      
  }//signup function
  const submitSigUps =  (e) => {
    e.preventDefault()
    setProfilePic(e.target.files[0])
  }
  // setInterval(() => {
  //   setError(null)
  // }, 4000);//after 4s the messege disappears
  // useEffect(() => {
  //   const time = setInterval(() => {
  //     setError(null)
      
  //   }, 4000);
  //   return ()=>clearTimeout(time)
  //   },[])//fix the glitche messege so it dont go fast
      return (
        <div>
          <div className='allLoginDiv'>
            <div className='loginDiv'>
              <div className='upRegister'>
                <div className='iconX signUp'>
                  <Link to={"/register"}>
                    <div className='divIconX signUp'>
                    <FontAwesomeIcon className='theIconX' icon={faX} />
                    </div>
                    </Link>
                </div>
                <div className='twitterIcon signUp'>
                  <FontAwesomeIcon icon={faXTwitter}/>
                </div>
              
              </div>
              <div>
              <h2 className='createAccTexts'>Create your account</h2>
              </div>
              <form className={`${Next?"inputsAndBtnSignUp" : "inputsAndBtnNpSignUp"}`}onSubmit={submitSigUp}>
                {Next? <>
                  <input placeholder='Email' className='EmailInputs login' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                  <input placeholder='Password' type='password' className='EmailInputs login' value={password} onChange={(e) => setPassword(e.target.value)}/>
                  <button className='BtnNext' onClick={() => setNext(email===""||password===""? true : false)}>Next</button>
                  
              
                </> : 
                  <>
                  <input placeholder='Email' readonly="readonly" className='EmailInputs login' autocorrect="on" type='email' value={email} />
                  <input placeholder='password' readonly="readonly" className='EmailInputs login' autocorrect="on" type='password' value={password} />
                    <input placeholder='Your Name'  className='EmailInputs login'  value={name} autocorrect="on" onChange={(e) => setName(e.target.value)}/>
                    <input placeholder='User Name' className='EmailInputs login' value={userName} autocorrect="on" onChange={(e) => setUserName(e.target.value)}/>
                    {/* <input placeholder='User Name' type='text' 
                    className='EmailInputs' value={bio} onChange={(e) => setBio(e.target.value)}/> */}
                    {/* <FontAwesomeIcon className='faUpload' icon={faUpload}/> */}
{/*                     
                    <input className="" name='photo'
                      data-multiple-caption="{count} files selected"  type="file" id="my_file_input"
                      onChange={submitSigUps} /> */}
                    {/* <img src={imageList[0]} /> */}
                    <button className='BtnNext'>Sign in</button>
                    
                  </>
                }
              </form>
         
              </div>
            
          </div>
          
            <div className={`${error === null ? "go" : "err"}`}>
              {error && <p>{error}</p>}
            </div>
          
          <div className='backGroundRegister'>
            
            <Registerpage />
            
             </div>
          
          
        </div>
      )
    }
export default SSignup
