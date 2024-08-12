import React,{useState,useEffect, useRef} from 'react'
import "./center.css"
import {Hooksregisters} from "../../hooks/hooksRegister/hooksregister"
import img from "../../defultPic.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { useTextContext } from "../../hooks/textContext"
import MotherHomeTexts from "./homeTexts/motherHomeTexts"
import ReactPlayer from 'react-player';
// require('dotenv').config();

const Center = () => {

  const { user, dispatch:dispatched } = Hooksregisters()
  const [Urprofile, setProfiles] = useState(null)
  const TextArRef = useRef(null)
    const playerRef = useRef(null);
    const idProfile  = localStorage.getItem("user")
    const [Text, setText] = useState("")
    const { dispatchs } = useTextContext()
    const [videoFile, setVideoFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
  useEffect(() => {
    if (videoPreview) {
      return () => {
        URL.revokeObjectURL(videoPreview);
      };
    }
  }, [videoPreview]);//it removes the old photo/video
  const SubmitPoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);

      // Create and set the object URL for the video preview
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
    }
  };//we transfer the input photo/video into a usestate
  const funLogin = async () => {
    if (!user) {
      return 
    }
    const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${JSON.parse(idProfile)?._id}`)
    const json = await response.json()
    if (response.ok) {
        dispatched({ type: "LOGIN", payload: json })
        setProfiles(json)
        
    }
    
  
  }//we get a user and transfer it on usestate
  useEffect(() => {
    if (user) {
      
      funLogin()

        }
    }, [dispatched])//render a profile
  const textPost = async (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('Text', Text)
    formdata.append('photo', videoFile)
    // const work = {Text}
    const res = await fetch(`/backend/photoRoute?filename=${videoFile}`)
    const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/texts`, {
      method: 'POST',
      body: formdata,
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      
    })
    const json = await response.json()
    // console.log(json)
    if (!response.ok) {
      
  }
  if (response.ok) {
    setText("")
    setVideoPreview(null)
    setVideoFile(null)
      dispatchs({ type: "CREATE", payload: json })
    }
    const rsponseUpdatePost = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/updateMyPosts/${json._id}`, {
      method:"POST",
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    })
      const jsonUpdatePost = await rsponseUpdatePost.json()

  }//Post a text
  useEffect(() => {
    TextArRef.current.style.height = "auto"
    TextArRef.current.style.height = TextArRef.current.scrollHeight + "px"

  },[Text])//when we write on the input it goes down

    
  return (
    <div className='containerCenter'>
      
        <div className='navCenter'>
        <div className='navCenterm'>
        <div>
              </div>
                <div className='allNav on'>
          <span>For You</span>
        <div className='borderHome'></div>
        </div>
                <div className='allNav'>
                <span>Following</span>
                </div>
      </div>
      </div>
          
      <div className='so'>
        {/* //////////////// form to submit the post///////////////////////// */}
      <form  onSubmit={textPost}>
      <div className='PostContainer'>
          <div className='imgAndTextAraPost'>
          <input title='da' id='inputField' accept='image/*,video/*' onChange={SubmitPoto}
              type='file' className='FileBtn' name='photo' />
             
          <img loading='lazy' className='img' src={user?.photo===""?img:`${process.env.REACT_APP_APi_LINK}/${Urprofile?.photo}`} />
          <textarea rows="2" value={Text} ref={TextArRef} onChange={(e) => setText(e.target.value)} placeholder='What is happening?' className='TheTextAreaPost' maxLength={280} />
          
          </div>
          <div className='photoer'>
            {/* //////////////if it's not video we got <img /> if it's not and img it's <video />//////////////////////////////////// */}
            {videoFile===null?"":videoFile?.type?.split("/")[0]?.includes("image")?
            <img loading='lazy' className='photoPost'
            src={videoPreview} />:
            <ReactPlayer ref={playerRef} type={videoFile?.type} url={videoPreview} controls={true} />}
            
          </div>
          
        <div className='btnAndImg'>
            <label for="inputField" class="imgIcon">{<FontAwesomeIcon icon={faImage} />}</label>
              <button disabled={Text === ""} className={Text==="" ? `PostBtn comments disable`:`PostBtn comments`}>Post</button>
        </div>
        </div>
      </form>
      <div>
        {<MotherHomeTexts />}
      </div>
      </div>
      </div>
    )
    }

export default Center
