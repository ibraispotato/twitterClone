import React,{useState,useEffect} from 'react'

import { Link } from 'react-router-dom'

import {faArrowRight,faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import img from "../../images/defultPic.png"
import { useParams } from 'react-router'
import { Hooksregisters } from "../../hooks/hooksRegister/hooksregister"
import Left from "../../page/homePage/left"
import "./settings.css"
import { useNavigate } from 'react-router-dom';
import { LogoutFun } from "../../hooks/hooksRegister/logout"
// import "../editProfileCss.css"
const DeleteProfile = () => {
    const navigates = useNavigate()
    const { Logout } = LogoutFun()
    const [Urprofile, setProfiles] = useState(null)
    const { id } = useParams()
    const { user,dispatch } = Hooksregisters()
    const [backAndFourth, setBackAndFourth] = useState(false)
    const [error,setError] = useState(null)
    const photo = user && user.photo
    const images = require.context('../../images', true);
    const idLocal  = localStorage.getItem("user")
    const imageList = images.keys().filter(im => im.includes(photo)).map(image => images(image))
    const funLogin = async () => {
        if (!user) {
          return 
        }
        const response = await fetch(`http://localhost:4000/clone/getuser/${JSON.parse(idLocal)?._id}`)
        const json = await response.json()
        if (response.ok) {
            dispatch({ type: "LOGIN", payload: json })
            
        }
        setProfiles(json)
      
      }//get profile from localhost
      useEffect(() => {
        if (user) {
        funLogin()
            }
        }, [dispatch])
        
    const deleteProfileBtn = async () => {
        ///////////////////////////delete a comments of the account////////////////////////////////////////////////////////////////////////////
        const MapComment = await Urprofile?.myComments.map((res) => `http://localhost:4000/clone/deleteComments/${res}`)
        const responseComment = await MapComment?.map(url => fetch(url,{
            method:"DELETE",
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
              },
        }).then(response => response.json()))
        await Promise?.all(responseComment).catch((err) => console.log(err))


        //////////////////////////delete likes////////////////////////////////////////////////////////////////////////////////////
        const MapLikes = await Urprofile?.myLikes?.map((res) => `http://localhost:4000/clone/deleteLikes/${res}`)
        const responseLikes = await MapLikes?.map(url => fetch(url,{
            method:"DELETE",
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
              },
        }).then(response => response.json()))
            await Promise?.all(responseLikes).catch((err) => console.log(err))


        ////////////////////////////////delte QoutRetweet//////////////////////////////////////////////////////////////////////////////
        const MapQouteRetweet = await Urprofile?.myComments?.map((res) => `http://localhost:4000/clone/deleteQouteTweet/${res}`)
        const responseQouteRetweet = await MapQouteRetweet?.map(url => fetch(url,{
            method:"DELETE",
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
              },
        }).then(response => response.json()))
        await Promise?.all(responseQouteRetweet).catch((err) => console.log(err))


        ////////////////////////////////delete tweet//////////////////////////////////////////////////////////////////////////////
        const MapdeleteTweet= await Urprofile?.deleteTweet?.map((res) => `http://localhost:4000/clone/deleteTweet/${res}`)
        const responsedeleteTweet= await MapdeleteTweet?.map(url => fetch(url,{
            method:"DELETE",
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
              },
        }).then(response => response.json()))
        await Promise?.all(responsedeleteTweet).catch((err) => console.log(err))


        
        ///////////////////////////// delete follow/////////////////////////////////////////////////////////////////////////////////
        const responseFollow = await fetch(`http://localhost:4000/clone/deleteFollow/${Urprofile?._id}`, {
            method:"DELETE",
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
              },
        })
        await responseFollow.json()


         ///////////////////////////////delete id of the post///////////////////////////////////////////////////////////////////////////////
         const Mapfollowers = await Urprofile?.idOfThePost?.map((res) => `http://localhost:4000/clone/deleteIdText/${res}`)

         const responsefollowers = await Mapfollowers?.map(url => fetch(url,{
             method:"DELETE",
             headers: {
                 // 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${user.token}`
               },
         }).then(response => response.json()))
        await Promise?.all(responsefollowers).catch((err) => console.log(err))

          ////////////////////////delete the user and every thing on the accounts that contains the if of the deleted account/////////////////////////////////////////////////////////////////////////////////
        const response = await fetch(`http://localhost:4000/clone/deleteuser/${Urprofile?._id}`, {
            method:"DELETE",
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
              },
        })
        const json = await response.json()
        if (!response.ok) {
            console.log(json.message)
        }
        if (response.ok) {
            console.log(json)
            dispatch({ type: "LOGOUT"})
            localStorage.removeItem("user")
            navigates("/")
            setError("Your Account has been deleted")
        }
        
    }//delete your account
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
                </div>
                </Link>
                <Link to={"/settings/delete-account"} className='settingDeleteAccA'>
                 <div className='allAccountBtn'>
                     <div className='yourAccountBtn delete'>
                     <span className='YourAccountText delete'>Delete Your account</span>
                            <FontAwesomeIcon className='iconArrow' icon={faArrowRight} />
                        </div>
                <div className='bordercolor dele'></div>
                        
                </div>
                </Link>
               
               
              
            </div>
        </div>
        <div className='alldivInfoAcc'>
            <div>
                <div className='YourAccNav'>
                    <Link className='settingsA' to={-1}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                    </Link>
                    
                    <span className='settingsText'>Delete Account</span>
                </div>
                <div>
              
                    <Link className='settingsA' to={`/profile/${user?._id}`}>
                     <div className='accountDele'>
                <div className='allimgandtext dele'>
                <img  loading='lazy' className='img' src={img === user?.photo ? photo : imageList[0]} />
                <div className='name dele'>
                  <span className='nameText'>{user?.name}</span>
                  <span>@{user?.userName}</span>
                  </div>
                </div>
          </div>
                    </Link>
             
                </div>
            </div>
            
            <div className='allDeleteDiv'>
                <div className='insideDiv'>
                    <span className='spanTitle'>This will <span className='deletRed'>DELETE</span> your account</span>
                    <p className=''>You about to start the process of deactivating your X account. Your display name,
                        @username, and public profile will no longer
                        be viewable on X.com, X for iOS, or X for Android.</p>
                </div>
                <div className='borderDele'></div>
                <div>
                    <p className='textDivDele'>Some account information may still be available in search engines, such as Google or Bing. Learn more</p>
                    <div className='borderDele'></div>
                    <p className='textDivDele'>If you just want to change your @username, you dont
                        need to deactivate your account — edit it in your <Link to={"/settings"}>settings.</Link></p>
                        <div className='borderDele'></div>
                <p className='textDivDele'>To use your current @username or email address with a different X account,<Link to={"/settings"}>change them</Link>  before you deactivate this 
                    account.</p>
                    <div className='borderDele'></div>
                    <div onClick={deleteProfileBtn} className='DeleBtn'>
                        <span  className='textDele FixBtn'>DELETE</span>
                    </div>
                    
                </div>
            </div>
        </div>

    
    
    </div>
)
}

export default DeleteProfile
