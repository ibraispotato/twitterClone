    import React,{useState,useEffect} from 'react'
    import Profile from "../posts/profilePost/profile"
    import { Link } from 'react-router-dom'
    import {  faXTwitter } from '@fortawesome/free-brands-svg-icons'
    import {faX ,faCamera} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import img from "../../../defultPic.png"
import { useParams } from 'react-router'
import { Hooksregisters } from "../../../hooks/hooksRegister/hooksregister"
import {UpdateProfile} from "../../../hooks/hooksRegister/updateProfile"
import "./editProfileCss.css"
        const EditProfile = () => {
        // const [errors,Seterrors] = useState(null)
        const [Urprofile, setProfile] = useState([])
        const {dispatch,user} = Hooksregisters()
        const [photo,setProfilePic] = useState()
        const maxlengthName = useState(50)
        const maxLengthBio = useState(160)
        const { id } = useParams()
        // theres a file for the update user
        const { epdateProfile,error,setError } = UpdateProfile()
        const funLogin = async () => {
            const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${id}`)
            const json = await response.json()
            if (response.ok) {
                setError(null)
                // localStorage.setItem("user", JSON.stringify(json))
                dispatch({ type: "LOGIN", payload: json })
                
            }
            setProfile(json)
          
        }//get a user from the id paramas
        const [bio, setBio] = useState(user.bio)
        const [name,setName] = useState(user?.name)
        const updateSubmit = async (e) => {
            e.preventDefault()
                await epdateProfile(name, photo,bio)
            }//we update a name bio photo
            
        const uploadPhoto =  (e) => {
            e.preventDefault()
            setProfilePic(e.target.files?.[0])
            
          }
          console.log(photo)
        useEffect(() => {
            return () => {
                    funLogin()
                }
                
            }, [dispatch])
        
    return (
        <div>
            <div className='parentProfileEdit'>
            <form onSubmit={updateSubmit} className='formDivProfileEdit'>
                <div className='childrenProdileEditDiv'>
                    <div className='allIcons'>
                        <div className='iconX'>
                <Link to={-1}>
                    <div className='divIconX'>
                    <FontAwesomeIcon className='theIconX' icon={faX} />
                    </div>
                    </Link>
                    </div>
                    
                <div className='twitterIcon'>
                <FontAwesomeIcon icon={faXTwitter}/>
                        </div>
                        <div>
                            <button className='saveBtn'>Save</button>
                        </div>
                    </div>
                
                    
                        <div>
                            {
                                <h2 className='editProfileText'>Edit Profile</h2>
                            }
                        
                        </div>
                        <div className='allTheImgAndInputs'>
                        <div className='imgAndInputDiv'>
                                <label for="inputField" class="btnCamera">{<FontAwesomeIcon icon={faCamera}/>}</label>
                                <input title='da' id='inputField' onChange={uploadPhoto}
                                    type='file' className='FileBtn' name='photo'/>

                                                {/* <img loading='lazy' className='img' src={Urprofile?.photo?.map((res) => res.url)[0]===undefined?Urprofile?.photo:`${Urprofile?.photo?.map((res) => res.url)[0]}`} /> */}
                                <img loading='lazy' className='profileImgEdit'
                                src={photo===undefined?Urprofile?.photo?.map((res) => res.url)[0]===undefined?Urprofile?.photo:`${Urprofile?.photo?.map((res) => res.url)[0]}`:URL?.createObjectURL(photo)} />
                                {/* URL?.createObjectURL(photo) */}
                            </div>
                    <div className='formDivProfileEdit'>
                            <div className='NameDiv'>
                                <input maxLength={50} name='name' value={name}
                                    onChange={(e) => setName(e.target.value)} placeholder='Name'
                                    className='inputProfileName' />
                                <span className='length'>{name===undefined?user?.name?.length:name?.length}/{maxlengthName}</span>
                            </div>
                            <div className='NameDiv'>
                                <textarea maxLength={160} type='text' name='bio'
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)} placeholder='Bio'
                                    className='inputProfilEditBio' />
                            <span className='length'>{bio===undefined?user?.bio?.length:bio?.length}/{maxLengthBio}</span>
                            </div>

                            </div>
                            </div>
                    </div>
                    </form>
                    
            </div>
            <div className={`${error === null ? "go" : "err"}`}>
              {error && <p>{error}</p>}
            </div>
          
            <div className='ote'>
                <Profile />
            </div>
        
        </div>
    )
    }

    export default EditProfile
