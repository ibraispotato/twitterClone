import React,{useState,useEffect} from 'react'

import { Link } from 'react-router-dom'

import {faArrowRight,faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import img from "../../images/defultPic.png"
import { useParams } from 'react-router'
import { Hooksregisters } from "../../../hooks/hooksRegister/hooksregister"
import Left from "../../../page/homePage/left"
import "../settings.css"
import { useNavigate } from 'react-router-dom';
import  {EmailFun} from "../../../hooks/hooksRegister/updateEmail"
// import "../editProfileCss.css"
const DeleteProfile = () => {
const localhost  = localStorage.getItem("user")

const{userEmail,errors,setError}  = EmailFun()
const { user,dispatch } = Hooksregisters()
    const [backAndFourth, setBackAndFourth] = useState(false)
    const [email, setEmail] = useState(user?.email)
    const [Urprofiles, setProfiles] = useState(null)
    
    const [password,setPassword] = useState("")
    const fun = async (e) => {
        e.preventDefault()
        setError(null)
        userEmail(email,password)
    }//theres a component we post an email to update the email
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
      <div className='TheLeft settings delete'>
            <Left setBackAndFourth={setBackAndFourth} backAndFourth={backAndFourth}/>
        </div>
        <div className='allCenterDivSettings urnameSettings'>
            <div className='se'>
                
                <span className='settingsText'>Settings</span>
            </div>
            <div>
                <Link className='settingsA' to={"/settings/account"}>
                 <div className='allAccountBtn'>
                     <div className='yourAccountBtn'>
                    <span className='YourAccountText'>Your account</span>
                    {/* <div className='iconAndBorder'> */}
                            <FontAwesomeIcon icon={faArrowRight} />
                            {/* </div> */}
                    {/* <div className='bordercolor'></div> */}
                  
                   
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
                <div className='YourAccNav'>
                <Link className='iconArrow' to={"/settings/account"}>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                </Link>
                        <span className='settingsText'>Your Account</span>
                </div>
              
                
                
                <form onSubmit={fun}>
                    <div className='InputPasswords'>
                    <input value={password} name='password'
                            onChange={(e) => setPassword(e.target.value)} type='password'
                            placeholder='Current Password' className={errors===null?"inputPassword email":"inputPassworderr email"} />
                    <div className='borderDele'></div>
                        
                        <input value={email} name='email'
                            onChange={(e) => setEmail(e.target.value)} type='email'
                            placeholder='Email' className={errors===null?"inputPassword email":"inputPassworderr email"} />
                        <span className='textErrAccInfo email'>{errors}</span>
                        {/* <span>{user.userName}</span> */}
                        <div className='ConfirmPasswordCheck'>
                            <button disabled={password===""||email === "" || user?.email === email}
                                className={`${password===""||email === "" || user?.email === email ? "btnConfirm disable" : "btnConfirm"}`} >Save</button>
                            
                            
                        </div>
                        
                </div>

                    </form>
                    
               
                
            
            </div>
            
        </div>


    
    
    </div>
)
}

export default DeleteProfile
