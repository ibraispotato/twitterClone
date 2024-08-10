import React,{useState,useEffect,useRef} from 'react'
import InsideThePost from '../homePage/homePage'
import {faX} from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router'
import {useTextContext} from "../../hooks/textContext"
import {Hooksregisters} from "../../hooks/hooksRegister/hooksregister"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player';

import "../replies/postPage.css"
const PostPage = () => {
    const { user, dispatch:dispatched } = Hooksregisters()
    const [oneText,setOneText] = useState(null)
    const [profileText,setProfileText] = useState(null)
    const TextArRef = useRef(null)
    const { id } = useParams()
    const { idTextProfile } = useParams()
    const navigate = useNavigate();
    const playerRef = useRef(null);

    const { dispatchs, texts } = useTextContext()
    const [retweetQouteText, setRetweetText] = useState("")
    const idProfile  = localStorage.getItem("user")
    const images = require.context('../../images', true);
    const imageList = images.keys().map(image => images(image))
  const [Urprofile, setProfiles] = useState(null)
  // const [photos,setProfilePics] = useState("")
    const [commentText, setCommentText] = useState(null)
    const operators = commentText?.photo || oneText?.photo
    const [videoFile, setVideoFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    useEffect(() => {
      if (videoPreview) {
        return () => {
          URL.revokeObjectURL(videoPreview);
        };
      }
    }, [videoPreview]);
  
    const submitPhoto = (event) => {
      const file = event.target.files[0];
      if (file) {
        setVideoFile(file);
  
        // Create and set the object URL for the video preview
        const previewUrl = URL.createObjectURL(file);
        setVideoPreview(previewUrl);
      }
    };//transfer a photo in a state
  const textRetweetQoute = async (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('retweetQouteText', retweetQouteText)
    formdata.append('photo', videoFile)
    // const work = {Text}
    const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/updateMyQouteTweet/${id}`, {
      method: 'POST',
    
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      
    })
    const json = await response.json()
    
  
  if (response.ok) {
    setRetweetText("")
    setVideoFile(null)
    setVideoPreview(null)
    navigate(`/tweet/${commentText?.idText}`)
    }
    const myLikesTextResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/replying/updateQouteReTweetComment/${id}`)
        , {
            method: 'POST',
        body: formdata,
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      
      
    })

    const myLikesJson = await myLikesTextResponse.json()
  
  }// we push the id on the account and on the reply
    const funLogin = async () => {
        const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${JSON.parse(idProfile)?._id}`)
        const json = await response.json()
        if (response.ok) {
            // setError(null)
            // localStorage.setItem("user", JSON.stringify(json))
            // dispatched({ type: "LOGIN", payload: json })
            
        }
        setProfiles(json)
      
    }//get your user
    useEffect(() => {
        return () => {
                funLogin()
            }
            
        }, [dispatched])
      const GetCommentText = async () => {
        const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/replying/getreplyingComments/${id}`)
        const json = await response.json()
    
        if (response.ok) {
          setCommentText(json)
      }
    }//get the reply from the id
    useEffect(() => {
    return () => {
      GetCommentText()
        
    }
      }, [])

    const textProfile = async () => {
        const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${idTextProfile}`)
        const json = await response.json()
        if (response.ok) {
        setProfileText(json)
        }
      
    }//we get user from the id paramas
      useEffect(() => {
        return () => {
            textProfile()
                
            }
          }, [])
          useEffect(() => {
            TextArRef.current.style.height = "auto"
            TextArRef.current.style.height = TextArRef.current.scrollHeight + "px"
          },[retweetQouteText])
  return (
    <div>
      <form onSubmit={textRetweetQoute}>
          <div className='motherOfPostPage'>
            <div className='postPage'>
          <div className='topRetweet'>
            <Link to={-1}>
                <FontAwesomeIcon className='iconRetweet' icon={faX} />
            </Link>
                  <span className='drafts'>Drafts</span>
              </div>
                
            <div className={`${operators===undefined&&videoFile===""?"yourCommentRetweet noPhoto":"yourCommentRetweet"}`}>
            <div className='imgRetweet'>
                <img loading='lazy' className='img retweet' src={imageList[0] === Urprofile?.photo ? imageList[0] :`${process.env.REACT_APP_APi_LINK}/${Urprofile?.photo}`} />

            </div>
            <div className='textAreaRetweet'>
              <textarea rows="2" value={retweetQouteText} ref={TextArRef} onChange={(e) => setRetweetText(e.target.value)}
                placeholder='Add a comment' className='TheTextAreaPost retweet' maxLength={280} />
              <div className='photoRetweet'>
                 <input title='da' id='inputFields' onChange={submitPhoto}
              type='file' className='FileBtn' accept='image/*,video/*' name='photo' />
             
             {videoFile===null?"":videoFile?.type?.split("/")[0]?.includes("image")?<img loading='lazy' className='photoPost'
            src={videoPreview} />:<ReactPlayer ref={playerRef} width={"96%"} height={"100%"} url={videoPreview} controls={true} />} 
              </div>
             
              
          
            </div>
            <div className='textsRetweet'>
              <div className='allOfTheTextTweet retweet'>
              <div className='motherTweets' >
                  <div className='RetweetText'>
                      <img loading='lazy' className='img profileRetweet' src={imageList[0] === profileText?.photo ? imageList[0]
                        : `${process.env.REACT_APP_APi_LINK}/${profileText?.photo}`} />
                  <span className='nameOfTheTweet'>{profileText?.name}</span>
                <span className='userNameReetwetText'>@{profileText?.userName}</span>
                </div>
                <span>•</span>
                  {oneText===null?<span></span>:<span>{formatDistanceToNow(new Date(oneText?.createdAt))}</span>}
              </div>
            <div>
              <span>{oneText?.Text||commentText?.retweetComments}</span>
                  </div>
                  <div>
{/* /////////////////////if theres no photo comment or photo post we get nothin if the photo comment includes "mp4" we get a video if theres no "mp4" we get a photo//////////////////////////////////////////////////////////// */}
                      {!commentText?.photo&&!oneText?.photo ? '' :
                          commentText?.photo?.split("-")[2]?.includes(".mp4")?<ReactPlayer ref={playerRef} width={"96%"} url={`${process.env.REACT_APP_APi_LINK}/${oneText?.photo||commentText?.photo}`} controls={true} />:
                          oneText?.photo?.split("-")[2]?.includes(".mp4")?<ReactPlayer ref={playerRef} width={"96%"} url={`${process.env.REACT_APP_APi_LINK}/${oneText?.photo||commentText?.photo}`} controls={true} />: 
                          <img loading='lazy' className='twitterPhoto'src={`${process.env.REACT_APP_APi_LINK}/${oneText?.photo||commentText?.photo}`} />}
                  </div>
            </div>
            </div>
              </div>
          <div>
           
                <div>
                  <div className='borderWhiteRetweet'></div>
          </div>
          <div>
          <div className='btnAndImg'>
            <label for="inputFields" class="imgIcon">{<FontAwesomeIcon icon={faImage} />}</label>
            
                  <button disabled={retweetQouteText.length !== 0 ? false : true}
                    className={retweetQouteText.length=== 0 ? `PostBtn disable` : `PostBtn`}>Post</button>
              </div>
              
            </div>
            
          </div>
          
          </div>
          </div>
      </form>
      <Link className='linkHomePageRetweet' to={"/"}>
      <div className='homepage'>
                  
                    <InsideThePost />
       
          </div>
     </Link>
    </div>
  )
}

export default PostPage
