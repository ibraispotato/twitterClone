import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {  faXTwitter } from '@fortawesome/free-brands-svg-icons'
import {faX ,faArrowRight,faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import img from "../../images/defultPic.png"
import { useParams } from 'react-router'
import { Hooksregisters } from "../../../hooks/hooksRegister/hooksregister"
import Left from "../../../page/homePage/left"

import "../settings.css"
import { useNavigate } from 'react-router-dom';
import  {UserFun} from "../../../hooks/hooksRegister/updatepassword"
// import "../editProfileCss.css"
const DeleteProfile = () => {
    const navigates = useNavigate()
const localhost  = localStorage.getItem("user")

const {UserPass,errors,setError}  = UserFun()
    const { id } = useParams()
const { user,dispatch } = Hooksregisters()
    const [backAndFourth, setBackAndFourth] = useState(false)
    const [checkPassword,setCheckPassword] = useState("")
    const [secPassword,setSecPassword] = useState("")
    const [password, setPassword] = useState("")
    const [Urprofiles, setProfiles] = useState(null)
    
    const fun = async (e) => {
        e.preventDefault()
        setError(null)
        UserPass(checkPassword,password,secPassword)
    }//theres a compunenet we update the password and check the password
    const funLogin = async () => {
        const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${JSON.parse(localhost)?._id}`)
        const json = await response.json()
        if (response.ok) {
            setError(null)
            // localStorage.setItem("user", JSON.stringify(json))
            dispatch({ type: "LOGIN", payload: json })
            console.log(json)
        }
        setProfiles(json)
      
    }//get a user from the localhost
    useEffect(() => {
        return () => {
                funLogin()
            }
        }, [dispatch])
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
                        </div>

                        
                </div>
                </Link>
               
               
              
            </div>
        </div>
        <div className='alldivInfoAcc'>
        <div className='allCenterDivSettingss'>
                <div className='YourAccNav changePassword'>
                <Link className='iconArrow' to={"/settings/account"}>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                </Link>
                        <span className='settingsText'>Your Account</span>
                </div>
              
                
                
                <form onSubmit={fun}>
                    <div className='InputPasswords changePassword'>
                    <input value={checkPassword} name='password'
                            onChange={(e) => setCheckPassword(e.target.value)} type='password'
                            placeholder='Current Password' className={errors===null?"inputPassword email":"inputPassworderr email"} />
                        <Link to={"/forgotpassword"}>
                        <span className='textMargin'>Forgot password?</span>
                        </Link>
                        
                        <div className='borderDele'></div>
                        
                        <input value={password} name='email'
                            onChange={(e) => setPassword(e.target.value)} type='password'
                            placeholder='New Password' className={errors === null ? "inputPassword email" : "inputPassworderr email"} />
                        <input value={secPassword} name='email'
                            onChange={(e) => setSecPassword(e.target.value)} type='password'
                            placeholder='Confirm Password' className={errors===null?"inputPassword email":"inputPassworderr email"} />
                        <span className='textErrAccInfo email'>{errors}</span>
                        {/* <span>{user.userName}</span> */}
                        <div className='ConfirmPasswordCheck'>
                            <button disabled={password===""||checkPassword === ""||secPassword===""}
                                className={`${password===""||checkPassword === ""||secPassword===""  ? "btnConfirm disable" : "btnConfirm"}`} >Save</button>
                            
                            
                        </div>
                        
                </div>

                    </form>
                    
               
                
            
            </div>
            
        </div>


    
    
    </div>
)
}

export default DeleteProfile
