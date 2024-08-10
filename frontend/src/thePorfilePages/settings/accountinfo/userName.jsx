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
import  {UserFun} from "../../../hooks/hooksRegister/UpdateUserName"
// import "../editProfileCss.css"
const DeleteProfile = () => {    
    const { UserName, errors, setError } = UserFun()
    const { token } = useParams()
    const localhost = localStorage.getItem("user")
    const { user, dispatch } = Hooksregisters()
    const [backAndFourth, setBackAndFourth] = useState(false)
    const [Urprofiles, setProfiles] = useState(null)
    const [userName, SetName] = useState(user.userName)
    const funLogin = async () => {
        const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${JSON.parse(localhost)?._id}`)
        const json = await response.json()
        if (response.ok) {
            setError(null)
            // localStorage.setItem("user", JSON.stringify(json))
            dispatch({ type: "LOGIN", payload: json })
        }
        setProfiles(json)
      
    }//get user
    useEffect(() => {
        return () => {
                funLogin()
            }
                
            
            
        }, [dispatch])

    const nameFun = async (e) => {
        e.preventDefault()
        setError(null)
        UserName(userName)
    }//change the userName
    
return (
    <div className='AllComps'>
      <div className='TheLeft settings'>
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
                <div className='YourAccNav'>
                <Link className='iconArrow' to={-1}>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                </Link>
                        <span className='settingsText'>Your Account</span>
                </div>
              
                
                
                <form onSubmit={nameFun}>
                <div className='InputPassword'>
                        <input value={userName} name='userName'
                            onChange={(e) => SetName(e.target.value)} type='text'
                            placeholder='Username' className={errors===null?"inputPassword":"inputPassworderr"} />
                        <span className='textErrAccInfo'>{errors}</span>
                        <div className='ConfirmPasswordCheck'>
                            <button disabled={userName === "" || user?.userName === userName}
                                className={`${userName === "" || Urprofiles?.userName ===
                                    userName ? "btnConfirm disable" : "btnConfirm"}`}>Save</button>
                            
                            
                        </div>
                        
                </div>

                    </form>
                    
               
                
            
            </div>
            
        </div>

    
    
    </div>
)
}

export default DeleteProfile
