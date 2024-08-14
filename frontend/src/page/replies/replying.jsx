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
import "./replying.css"
import ReactPlayer from 'react-player';
import img from "../../defultPic.png"
const Replying = () => {
    const { user, dispatch:dispatched } = Hooksregisters()
    const [oneText,setOneText] = useState(null)
    const [oneText2,setOneText2] = useState(null)
    const [profileText,setProfileText] = useState([])
    const TextArRef = useRef(null)
    const { id } = useParams()
    const { idTextProfile } = useParams()
    const navigate = useNavigate();
    const { dispatchs, texts } = useTextContext()
    const [retweetComments, setRetweetText] = useState("")
    const idProfile  = localStorage.getItem("user")
  const [Urprofile, setProfiles] = useState(null)
  // const [photos, setProfilePics] = useState("")
  const playerRef = useRef(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  useEffect(() => {
    if (videoPreview) {
      return () => {
        URL.revokeObjectURL(videoPreview);
      };
    }
  }, [videoPreview]);//it removes the old photo/video

  const submitPhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
      // Create and set the object URL for the video preview
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
    }
  };
  const textRetweetQoute = async (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('retweetComments', retweetComments)
    formdata.append('photo', videoFile)
    // const work = {Text}
    const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/replying/replyingComments/${oneText?._id||oneText2?._id}`, {
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
    setVideoFile(null)
    navigate(-1)
    }
    // console.log(json._id)
    const mycommentsResponses = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/updateMyComments/${json._id}`)
      
    , {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'POST'
      
    })
    const myLikesJsons = await mycommentsResponses.json()
    console.log(myLikesJsons)
    const myLikesTextResponse = await fetch((oneText2===null?`${process.env.REACT_APP_APi_LINK}/clone/texts/updateComments/${oneText?._id}/${json._id}`:`${process.env.REACT_APP_APi_LINK}/clone/replying/updateReqplyinComments/${oneText2?._id}/${json._id}`)
    , {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'POST'
      
    })

    const myLikesJson = await myLikesTextResponse.json()
    // console.log(myLikesTextResponse.ok)
   
  }// 1:we create a reply comment , 2:we push an id of the post reply on the account on comment section, 3: if theres a post we push a id reply on the post or if theres no post we push id of the reply on the comment

    const funLogin = async () => {
        const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${JSON.parse(idProfile)?._id}`)
        const json = await response.json()
        if (response.ok) {
            // setError(null)
            // localStorage.setItem("user", JSON.stringify(json))
            // dispatched({ type: "LOGIN", payload: json })
            
        }
        setProfiles(json)
      
    }//we get a user
    useEffect(() => {
        return () => {
                funLogin()
            }
            
        }, [dispatched])
   const GetOneText = async () => {
     const response1 = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/texts/GetOneText/${id}`)
        const json1 = await response1.json()
    
        if (response1.ok) {
        setOneText(json1)
     }
     const response2 = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/replying/getreplyingComments/${id}`)
        const json2 = await response2.json()
    
        if (response2.ok) {
        setOneText2(json2)
     }
     const accountOfThePost = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${json1!==null?json1.idText:json2.idOfTheReplyer}`)
        const accountOfThePostJson = await accountOfThePost.json()
        setProfileText(accountOfThePostJson)
    }// 1: if the id includes the post we get the post, 2: if the id includes the comment we get the comment, 3: if the json1 is null we get the id of the replies of the comments if json1 is not null we get the id of the post 
useEffect(() => {
    return () => {
        GetOneText()
        
    }
      }, [dispatchs])

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
                      
                      <img loading='lazy' className='img profileComment' src={profileText?.photo?.map((res)=> res.url)?.[0]||profileText?.photo} />
                <div className='borderline'></div>
                    </div>
                  
                    
                  <div className='textsComments'>
                    <div className='profileComments'>
                      <span className='nameOfTheTweet'>{profileText?.name}</span>
                  <span className='userNameReetwetText'>@{profileText?.userName}</span>
                  <span>•</span>
                  {oneText2===null?<span>{oneText===null?<span></span>:formatDistanceToNow(new Date(oneText?.createdAt))}</span>:<span>{formatDistanceToNow(new Date(oneText2?.createdAt))}</span>}
                    </div>
                  <div className='commentReplyied'>
                    <span>{oneText?.Text||oneText2?.retweetComments}</span>
                      </div>
                      <div className='replyingTextWithUserName'>
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
                    <img loading='lazy' className='img retweet' src={Urprofile?.photo.map((res)=> res.url)?.[0]||Urprofile?.photo} />
                <textarea rows="2" value={retweetComments} ref={TextArRef} onChange={(e) => setRetweetText(e.target.value)}
                placeholder='Add a comment' className='TheTextAreaPost retweet' maxLength={280} />
                  </div>
                  <div className='textAreaRetweet'>
              <div className='photoComment'>
                <input title='da' id='inputFields' accept='image/*,video/*' onChange={submitPhoto}
              type='file' className='FileBtn' name='photo' />
                {/* {photos===""?"":<img loading='lazy' className='realPhotoComment'src={URL?.createObjectURL(photos)} />} */}
                {videoFile===null?"":videoFile?.type?.split("/")[0]?.includes("image")?<img loading='lazy' className='realPhotoComment'
            src={videoPreview} />:<div className='videoEdit'>
              <ReactPlayer width="96%" ref={playerRef} url={videoPreview} type={videoFile?.type} controls={true} /> </div>}
             
              </div>
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
