import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {faArrowRight,faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Hooksregisters } from "../../../hooks/hooksRegister/hooksregister"
import Left from "../../../page/homePage/left"
import img from "../../../defultPic.png"
import "../settings.css"
import { useNavigate } from 'react-router-dom';
import  {AuthFun} from "../../../hooks/hooksRegister/checkPassword"
// import "../editProfileCss.css"
const DeleteProfile = () => {
    const { user, dispatch } = Hooksregisters()
    const [backAndFourth, setBackAndFourth] = useState(false)
  const photo = user && user.photo
    const ah  = localStorage.getItem("user")
  const [Urprofiles, setProfiles] = useState(null)
  const funLogin = async () => {
    const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${JSON.parse(ah)?._id}`)
    const json = await response.json()
    
    setProfiles(json)
  
}//get a user
useEffect(() => {
    return () => {
        funLogin()
    }

}, [])

return (
    <div className='AllComps'>
      <div className='TheLeft settings delete'>
            <Left setBackAndFourth={setBackAndFourth} backAndFourth={backAndFourth}/>
        </div>
        <div className='allCenterDivSettings youracc'>
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
                            {/* </div> */}
                        </div>
                {/* <div className='bordercolor dele'></div> */}
                        
                </div>
                </Link>
               
               
              
            </div>
        </div>
        <div className='alldivInfoAcc'>
            <div className='allRightDivSettingss'>
                <div className='YourAccNav'>
                <Link className='iconArrow' to={-1}>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                </Link>
                        <span className='settingsText'>Your Account</span>
                </div>
                <Link className='settingsA' to={`/settings/user_name`}>
                <div className='allAccountBtn'>
                    <div className='yourAccountBtn'>
                        <div className='userNameDiv'>
                            <span className='YourAccountText'>Username</span>
                        <span className='userName'>@{Urprofiles?.userName}</span>
                        </div>
                        
                    {/* <div className='iconAndBorder'> */}
                            <FontAwesomeIcon icon={faArrowRight} />
                            {/* </div> */}
                    {/* <div className='bordercolor'></div> */}
                  
                   
                </div>
                {/* <div className='bordercolor'></div> */}
                </div>
                </Link>
                <Link className='settingsA' to={`/settings/email_user`}>
                <div className='allAccountBtn'>
                     <div className='yourAccountBtn'>
                     <div className='userNameDiv'>
                            <span className='YourAccountText'>Email</span>
                        <span className='userName'>@{Urprofiles?.email}</span>
                        </div>
                    {/* <div className='iconAndBorder'> */}
                            <FontAwesomeIcon icon={faArrowRight} />
                            {/* </div> */}
                  
                   
                </div>
                </div>
                </Link>
                
            </div>
            
        </div>

    
    
    </div>
)
}

export default DeleteProfile
