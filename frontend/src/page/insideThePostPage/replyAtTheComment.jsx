import React,{useState,useEffect,useRef} from 'react'
import HomePage from '../homePage/homePage'
import {faX ,faCamera} from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router'
import {useTextContext} from "../../hooks/textContext"
import {Hooksregisters} from "../../hooks/hooksRegister/hooksregister"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import "../replies/replying.css"
import ReactPlayer from 'react-player';

const Replying = () => {
    const { user, dispatch:dispatched } = Hooksregisters()
    const [oneText,setOneText] = useState(null)
    const [profileText,setProfileText] = useState(null)
    const TextArRef = useRef(null)
    const { id } = useParams()
    const { idTextProfile } = useParams()
    const navigate = useNavigate();
    const playerRef = useRef(null);
    const { dispatchs, texts } = useTextContext()
    const [retweetComments, setRetweetText] = useState("")
    const idProfile  = localStorage.getItem("user")
    const images = require.context('../../images', true);
    const imageList = images.keys().map(image => images(image))
    const [Urprofile, setProfiles] = useState(null)
    const [videoFile, setVideoFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    useEffect(() => {
      if (videoPreview) {
        return () => {
          URL.revokeObjectURL(videoPreview);
        };
      }
    }, [videoPreview]);//delete the perv photo/video
  
    const submitPhoto = (event) => {
      const file = event.target.files[0];
      if (file) {
        setVideoFile(file);
  
        // Create and set the object URL for the video preview
        const previewUrl = URL.createObjectURL(file);
        setVideoPreview(previewUrl);
      }
    };//submit the photo/video and push it in State
    const GetOneText = async () => {
        const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/replying/getreplyingComments/${id}`)
           const json = await response.json()
    
           if (response.ok) {
           setOneText(json)
         }
       }
    useEffect(() => {
       return () => {
           GetOneText()
    
       }
         }, [dispatchs])

  const textRetweetQoute = async (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('retweetComments', retweetComments)
    formdata.append('photo', videoFile)
    const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/replying/replyingComments/${oneText._id}`, {
      method: 'POST',
      body: formdata,
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      
    })
    const json = await response.json()
  
  if (response.ok) {
    setRetweetText("")
    setVideoPreview(null)
    setVideoPreview(null)
    navigate(-1)
    }
    const myCommentTextResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/updateMyComments/${json?._id}`)
    , {
      method: 'POST',
    headers: {
      // 'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    }
  })
    await myCommentTextResponse.json()

    const mycommentsResponses = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/replying/updateReqplyinComments/${oneText?._id}/${json._id}`)
      , {
        method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
      
      
    })
    await mycommentsResponses.json()
 
   
  }//create a reply post and put the id in the account and the reply comment that created the comment

    const funLogin = async () => {
        const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${JSON.parse(idProfile)?._id}`)
        const json = await response.json()
        if (response.ok) {
            setProfiles(json)
        }
        
      
    }//get the user
    useEffect(() => {
        return () => {
                funLogin()
            }
            
        }, [dispatched])

    const textProfile = async () => {
        const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${idTextProfile}`)
        const json = await response.json()
        if (response.ok) {
        setProfileText(json)
        }
      
    }//get the user from the id of the post/ comment
   
  
      useEffect(() => {
        return () => {
            textProfile()
                
            }
          }, [])
          useEffect(() => {
            TextArRef.current.style.height = "auto"
            TextArRef.current.style.height = TextArRef.current.scrollHeight + "px"
          },[retweetComments])
  return (
    <div>
      <form onSubmit={textRetweetQoute}>
        <div className='motherOfPostPage'>
          
          <div className='postPage comments'>
            
          <div className='topRetweet'>
            <Link to={-1}>
                <FontAwesomeIcon className='iconRetweet' icon={faX} />
            </Link>
                  <span className='drafts'>Drafts</span>
              </div>
            <div className='yourCommentRetweet'>
              <div className='allOfTheTextTweet'>
              <div className='motherTweets comments' >
                  <div className='RetweetText comments'>
                    <div className='ProfilephotoComment'>
                      <img loading='lazy' className='img profileComment' src={imageList[0] === profileText?.photo ? imageList[0]
                      : `${process.env.REACT_APP_APi_LINK}/${profileText?.photo}`} />
                <div className='borderline'></div>
                    </div>
                  
                    
                  <div className='textsComments'>
                    <div className='profileComments'>
                      <span className='nameOfTheTweet'>{profileText?.name}</span>
                  <span className='userNameReetwetText'>@{profileText?.userName}</span>
                  <span>•</span>
                  {oneText===null?<span></span>:<span>{formatDistanceToNow(new Date(oneText?.createdAt))}</span>}
                    </div>
                  <div className='commentReplyied'>
                    <span>{oneText?.retweetComments}</span>
                      </div>
                      <div>
                        <span>Replying to <span className='userNameComments'>@{profileText?.userName}</span></span>
                      </div>
                      
                  </div>
                  
                  </div>
                  
                </div>
                
              </div>
              <div>
            </div>
            <div>
                <div className='imgComment'>
                  <div className='imgProfileAndText'>
                    <img loading='lazy' className='img retweet' src={imageList[0] === Urprofile?.photo ? imageList[0] :`${process.env.REACT_APP_APi_LINK}/${Urprofile?.photo}`} />
                <textarea rows="2" value={retweetComments} ref={TextArRef} onChange={(e) => setRetweetText(e.target.value)}
                placeholder='Add a comment' className='TheTextAreaPost retweet' maxLength={280} />
                  </div>
                  <div className='textAreaRetweet'>
              <div className='photoComment'>
                <input title='da' id='inputFields' accept='image/*,video/*' onChange={submitPhoto}
              type='file' className='FileBtn' name='photo' />
            {videoFile===null?"":videoFile?.type?.split("/")[0]?.includes("image")?<img loading='lazy' className='photoPost'
            src={videoPreview} />:<ReactPlayer ref={playerRef} width={"96%"} height={"100%"} url={videoPreview} controls={true} />}               </div>
            </div>
                </div>
          
                  
              </div>
              </div>
          <div>
          <div className='btnAndImg'>
            <label for="inputFields" class="imgIcon">{<FontAwesomeIcon icon={faImage} />}</label>
            
                  <button disabled={retweetComments.length !== 0 ? false : true}
                    className={retweetComments.length=== 0 ? `PostBtn comments disable` : `PostBtn comments`}>Reply</button>
              </div>
              
            </div>
            
          
          
          </div>
          </div>
      </form>
      <Link className='linkHomePageRetweet' to={"/"}>
      <div className='homepage'>
        
        <HomePage />
       
          </div>
     </Link>
    </div>
  )
}

export default Replying
