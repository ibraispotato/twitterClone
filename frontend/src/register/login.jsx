import React, { useState,useEffect } from 'react'
import { Logins } from "../hooks/hooksRegister/login"
import {  faXTwitter } from '@fortawesome/free-brands-svg-icons'
import {faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Registerpage from './registerpage'
import { Link } from 'react-router-dom'
const Login = () => {
    const { funLogin, error,setError } = Logins()
    // const [errors,Seterrors] = useState(null)
    const [email,setEmail] = useState("")
    const [Next,setNext] = useState(true)
    const [password,setPassword] = useState("")
    // name,userName,profilePic,email,password
    const submitLogin = async (e) => {
        e.preventDefault()
      await funLogin(email, password)
      
  } //login function
  
  setInterval(() => {
    setError(null)
  }, 4000);//after 4s the messege disappears
  useEffect(() => {
    const time = setInterval(() => {
      setError(null)
      
    }, 4000);
    return ()=>clearTimeout(time)
    },[])//fix the glitche messege so it dont go fast
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
          <h2 className='createAccText'>Sign in to X</h2>
          </div>
          <form className={`${Next?"inputsAndBtn" : "inputsAndBtnNp"}`} onSubmit={submitLogin}>
          
            {Next? <>
              <input placeholder='Email' className='EmailInputs login' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className='BtnNext' onClick={() => setNext(email === "" ? true : false)}>Next</button>
              <Link to={"/forgotpassword"}>
                <button className='forgotPasswordBtn'>Forgot password?</button>
              </Link>
              <p className='dontHaveAccText'>Don't have an account? <span className='signUpText'>
                <Link to={"/signup"}>
                Sign up
                </Link>
              </span>
              </p>
            </> : 
              <>
                <input placeholder='Email' readonly="readonly" className='EmailInputs login' autocorrect="on" type='email' value={email} />
                <input placeholder='Password' type='password' className='EmailInputs login' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className='BtnNext'>Sign in</button>
                <p className='dontHaveAccText'>Don't have an account? <span className='signUpText'>
                <Link to={"/signup"}>
                Sign up
                </Link>
              </span>
              </p>
                
              </>
            }
          </form>
     
          </div>
        
      </div>
      <div className={`${error===null ? "go":"err"}`}>
         {error && <p>{error}</p>}
      </div>
  
      <div className='backGroundRegister'>
        
        <Registerpage />
        
         </div>
      
      
    </div>
  )
}

export default Login
