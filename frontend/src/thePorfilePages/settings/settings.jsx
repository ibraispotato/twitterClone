    import React,{useState,useEffect} from 'react'
    import { Link } from 'react-router-dom'
    import {faArrowRight,faUser,faKey} from '@fortawesome/free-solid-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    import Left from "../../page/homePage/left"
    import "./settings.css"
    const EditProfile = () => {

        const [backAndFourth,setBackAndFourth] = useState(false)

    return (
        <div className='AllComps'>
          <div className='TheLeft settings'>
                <Left setBackAndFourth={setBackAndFourth} backAndFourth={backAndFourth}/>
            </div>
            <div className='allCenterDivSettings mainSettings'>
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
                    </div>
                    </Link>
                   
                   
                  
                </div>
            </div>
            <div className='alldivInfoAcc mainSettings'>
                <div>
                    <div className='YourAccNav settings'>
                        <span className='settingsText'>Your Account</span>
                    </div>
                    <p className='paratext'>See information about your account, download an archive of your data, or learn about your account deactivation options</p>
                </div>
                <Link to={"/settings/account-information"} className='settingsA'>
              
                    <div className='allAccountBtn'>
                        <div className='yourAccountBtn'>
                            <div className='ag'>

                           
                            <FontAwesomeIcon icon={faUser} />
                            <div className='accinfo'>
                                <span className='YourAccountText'>Account information</span>
                                <span className='paraInfoAcc'>
                                See your account information like your email and password</span>
                            </div>
                            </div>
                                <FontAwesomeIcon icon={faArrowRight} />
                        
                    </div>
                    </div>
               
                </Link>
                <Link to={`/settings/Change-password`} className='settingsA'>
              
                    <div className='allAccountBtn'>
                        <div className='yourAccountBtn'>
                            <div className='ag'>

                           
                            <FontAwesomeIcon icon={faKey} />
                            <div className='accinfo'>
                                <span className='YourAccountText'>Change Your passwordn</span>
                                <span className='paraInfoAcc'>
                                Change your password at any time</span>
                            </div>
                            </div>
                                <FontAwesomeIcon icon={faArrowRight} />
                        
                    </div>
                    </div>
               
                </Link>
               
            </div>

        
        
        </div>
    )
    }

    export default EditProfile
