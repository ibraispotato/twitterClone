import React from 'react'
import {  faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import "./register.css"
const registerpage = () => {
  return (
        <div className='allRegister'>
            <div>
                <FontAwesomeIcon icon={faXTwitter} className='registerIcon'/>
            </div>
            <div>
                
                <div>
                    <h1 className='regtext'>Happening now</h1>
                </div>
                <div>
                    
                        <div>
                      <h2 className='reganothertext'>Join today.</h2>
                      <button className='googleBtn'>google</button>
                    </div>
                    
                    <div className='borderAndText'>
                        <div className='border'></div>
                        <p className='orText'>or</p>
                        <div className='border'></div>
                        
                    </div>
                </div>
                
              <div>
                  <Link to={"/signup"}>
                <button className='AccBtn'>Create account</button>
                </Link>
                </div>

            <div>
                  <h4 className='alreadyHaveAcc'>Already have an account?</h4>
                  <Link to={"/login"}>
                  <button className='signinBtn'>Sign in</button>
                  </Link>
                
              </div>
            </div>
    </div>
  )
}

export default registerpage
