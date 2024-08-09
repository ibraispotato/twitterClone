import React,{useState,useEffect} from 'react'

import { Link } from 'react-router-dom'

import {faArrowRight,faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useParams } from 'react-router'
import { Hooksregisters } from "../../../hooks/hooksRegister/hooksregister"
import Left from "../../../page/homePage/left"
import "../settings.css"
import { useNavigate } from 'react-router-dom';
import  {AuthFun} from "../../../hooks/hooksRegister/checkPassword"
// import "../editProfileCss.css"
const DeleteProfile = () => {
const{Auth,errors,setError}  = AuthFun()
const { user } = Hooksregisters()
    const [backAndFourth, setBackAndFourth] = useState(false)
    const [password,setPassword] = useState("")
    const fun = async (e) => {
        e.preventDefault()
        setError(null)
        Auth(password)
    }//theres a component we auth from the password so we could change the info of the account
    
return (
    <div className='AllComps'>
      <div className='TheLeft settings'>
            <Left setBackAndFourth={setBackAndFourth} backAndFourth={backAndFourth}/>
        </div>
        <div className='allCenterDivSettings accountInfo'>
            <div className='se'>
                
                <span className='settingsText'>Settings</span>
            </div>
            <div>
                <Link className='settingsA' to={"/settings/account"}>
                 <div className='allAccountBtn'>
                     <div className='yourAccountBtn'>
                    <span className='YourAccountText'>Your account</span>
                            <FontAwesomeIcon icon={faArrowRight} />

                </div>
                <div className='bordercolor'></div>
                </div>
                </Link>
                <Link to={"/settings/delete-account"} className='settingDeleteAccA'>
                 <div className='allAccountBtn'>
                     <div className='yourAccountBtn delete'>
                     <span className='YourAccountText delete'>Delete Your account</span>
                            <FontAwesomeIcon className='iconArrow' icon={faArrowRight} />
                            {/* </div> */}
                        </div>
                {/* <div className='bordercolor dele'></div> */}
                        
                </div>
                </Link>
               
               
              
            </div>
        </div>
        <div className='alldivInfoAcc'>
            <div className='allCenterDivSettingss'>
                <div className='YourAccNav accountInfo'>
                <Link className='iconArrow' to={-1}>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                </Link>
                        <span className='settingsText'>Your Account</span>
                </div>
                <div className='confirmPassword'>
                    <span className='confirmText'>Confirm your password</span>
                    <span>Please enter your password in order to get this.</span>
                </div>
                <div className='borderWidth'></div>
                
                <form onSubmit={fun}>
                <div className='InputPassword'>
                        <input value={password} name='password'
                            onChange={(e) => setPassword(e.target.value)} type='password'
                            placeholder='Password' className={errors===null?"inputPassword":"inputPassworderr"} />
                        <Link>
                            <div className='fo'>
                                <span>Forgot Password?</span>
                            <span className='textErrAccInfo'>{errors}</span>
                            </div>
                            
                        </Link>
                        <div className='ConfirmPasswordCheck'>
                        <button className='btnConfirm'>Confirm</button>
                        </div>
                        
                </div>

                    </form>
                    
               
                
            
            </div>
            
        </div>

    
    
    </div>
)
}

export default DeleteProfile
