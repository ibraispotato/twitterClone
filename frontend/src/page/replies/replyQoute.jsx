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
import ReactPlayer from 'react-player';

import "./postPage.css"
const PostPage = () => {
    const { user, dispatch:dispatched } = Hooksregisters()
    const [oneText,setOneText] = useState(null)
    const [profileText,setProfileText] = useState(null)
    const TextArRef = useRef(null)
    const { id } = useParams()
    const { idTextProfile } = useParams()
    const navigate = useNavigate();
    const [oneText2,setOneText2] = useState(null)
    const playerRef = useRef(null);
    const { dispatchs, texts } = useTextContext()
    const [retweetQouteText, setRetweetText] = useState("")
    const idProfile  = localStorage.getItem("user")
    const images = require.context('../../images', true);
    const imageList = images.keys().map(image => images(image))
  const [Urprofile, setProfiles] = useState(null)
  // const [photos,setProfilePics] = useState("")
  const [commentText,setCommentText] = useState(null)
  const operators = commentText?.photo || oneText?.photo
  
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
    
   }//  we get a text from the post or from the comment
  useEffect(() => {
   return () => {
       GetOneText()
       
   }
    }, [dispatchs])

  const textRetweetQoute = async (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('retweetComments', retweetQouteText)
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
    // console.log(myLikesJsons)
    const myLikesTextResponse = await fetch((oneText2===null?`${process.env.REACT_APP_APi_LINK}/clone/texts/updateQouteReTweet/${oneText?._id}/${json._id}`:`${process.env.REACT_APP_APi_LINK}/clone/replying/updateQouteReTweetComment/${oneText2?._id}/${json._id}`)
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
        // console.log(json)
      
    }// we get an account
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
      
    }//we get a user from the id paramas
   
  
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
          <div className='motherOfPostPage post'>
            <div className='postPage'>
          <div className='topRetweet'>
            <Link to={-1}>
                <FontAwesomeIcon className='iconRetweet' icon={faX} />
            </Link>
                  <span className='drafts'>Drafts</span>
              </div>
                
            <div className={`${operators===undefined&&videoFile===null?"yourCommentRetweet noPhoto":"yourCommentRetweet"}`}>
            <div className='imgRetweet'>
                <img loading='lazy' className='img retweet' src={imageList[0] === Urprofile?.photo ? imageList[0] :`${process.env.REACT_APP_APi_LINK}/${Urprofile?.photo}`} />

            </div>
            <div className='textAreaRetweet'>
              <textarea rows="2" value={retweetQouteText} ref={TextArRef} onChange={(e) => setRetweetText(e.target.value)}
                placeholder='Add a comment' className='TheTextAreaPost retweet' maxLength={280} />
              <div className='photoRetweet'>
                 <input title='da' id='inputFields' accept='image/*,video/*' onChange={submitPhoto}
              type='file' className='FileBtn' name='photo' />
            
            {videoFile===null?"":videoFile?.type?.split("/")[0]?.includes("image")?<img loading='lazy' className='photoPost'
            src={videoPreview} />:<ReactPlayer ref={playerRef} width={"96%"} type={videoFile?.type} height={"100%"} url={videoPreview} controls={true} />}
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
                {oneText2===null?<span>{oneText===null?<span></span>:formatDistanceToNow(new Date(oneText?.createdAt))}</span>:<span>{formatDistanceToNow(new Date(oneText2?.createdAt))}</span>}
                {/* <span>{formatDistanceToNow(a)}</span> */}
                </div>
            <div>
              <span>{oneText?.Text||oneText2?.retweetComments}</span>
                  </div>
                  <div>
                    {/* if there's nothin in the oneText and OneText2 we get nothin if theres a photo we make sure it is "mp4" and make VIDEO compounent if it's not a "mp4" we make a PHOTO  compounent*/}
                      {!oneText2?.photo&&!oneText?.photo ? '' :
                          oneText2?.photo?.split("-")[2]?.includes(".mp4")?<ReactPlayer ref={playerRef} width={"96%"} url={`${process.env.REACT_APP_APi_LINK}/${oneText?.photo||oneText2?.photo}`} controls={true} />:
                          oneText?.photo?.split("-")[2]?.includes(".mp4")?<ReactPlayer ref={playerRef} width={"96%"} url={`${process.env.REACT_APP_APi_LINK}/${oneText?.photo||oneText2?.photo}`} controls={true} />: 
                          <img loading='lazy' className='twitterPhoto'src={`${process.env.REACT_APP_APi_LINK}/${oneText?.photo||oneText2?.photo}`} />}
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
            {/* <FontAwesomeIcon className='imgIcon' icon={faImage} /> */}
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
        
        <HomePage />
       
          </div>
     </Link>
    </div>
  )
}

export default PostPage
