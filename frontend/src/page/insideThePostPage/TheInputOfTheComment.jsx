import React,{useState,useRef,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'react-router'
import {Hooksregisters} from "../../hooks/hooksRegister/hooksregister"
import { useNavigate } from "react-router-dom";
import { faImage } from '@fortawesome/free-solid-svg-icons'
import ReactPlayer from 'react-player';

const TheInputOfTheComment = ({Urprofile,usersOfTheFollwoingFunction,GetText,thePost,theProfilePostReply}) => {
    const images = require.context('../../images', true);
    const imageList = images.keys().map(image => images(image))
    const { id } = useParams()
    const { user, dispatch:dispatched } = Hooksregisters()
    const playerRef = useRef(null);
    const TextArRef = useRef(null)
    const [retweetComments, setRetweetText] = useState("")
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
    };//submit a photo in a state
    const textRetweetQoute = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('retweetComments', retweetComments)
        formdata.append('photo', videoFile)
        const response = await fetch(`http://localhost:4000/clone/replying/replyingComments/${id}`, {
          method: 'POST',
          body: formdata,
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          
        })
        const json = await response.json()
      
        // console.log(response.ok)
      
      if (response.ok) {
        setRetweetText("")
        setVideoFile(null)
        setVideoPreview(null)
        usersOfTheFollwoingFunction()
        GetText()
        }
        // console.log(json._id)
        const mycommentsResponses = await fetch((theProfilePostReply===null?`http://localhost:4000/clone/texts/updateComments/${id}/${json._id}`:`http://localhost:4000/clone/replying/updateReqplyinComments/${id}/${json._id}`)
        , {
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          method: 'POST'
          
        })
      const myLikesJsons = await mycommentsResponses.json()
      if (mycommentsResponses.ok) {
        usersOfTheFollwoingFunction()
        GetText()
      }
        // console.log(myLikesJsons)
        const myCommentTextResponse = await fetch((`http://localhost:4000/clone/updateMyComments/${json?._id}`)
        , {
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          method: 'POST'
          
        })
        const myCommentsJson = await myCommentTextResponse.json()
        // console.log(myCommentTextResponse)
        if (mycommentsResponses.ok) {
          usersOfTheFollwoingFunction()
          GetText()
        }
      }//this api post an comment for the post , if there's not a theProfilePostReply we push id a comment in the post, if theres a atheProfilePostReply we push id a comment in the reply + we push an id on the account
  return (
      <div>
          <form onSubmit={textRetweetQoute}>
          <div className='imgComment'>
                        
              <div className='imgProfileAndText'>
                  
                                <img loading='lazy' className='img retweet' src={imageList[0] === Urprofile?.photo ? imageList[0] :`http://localhost:4000/${Urprofile?.photo}`} />
                                    <textarea rows="2" value={retweetComments} ref={TextArRef} onChange={(e) => setRetweetText(e.target.value)}
                                        placeholder='Post your reply' className='TheTextAreaPost retweet' maxLength={280} />
                                            </div>
                                                <div className='textAreaRetweet'>
                                                    <div className='photoComment'>
                                                        <input title='da' id='inputFields' onChange={submitPhoto}
                                                            type='file' className='FileBtn' accept='image/*,video/*' name='photo' />
                                                                {videoFile===null?"":videoFile?.type?.split("/")[0]?.includes("image")?<img loading='lazy' className='photoPost'
                                                                  src={videoPreview} />:
                                                                  <ReactPlayer ref={playerRef} url={videoPreview} type={videoFile?.type} controls={true} />}
                                                                    </div>
                                                                        </div>
                                                                            </div>
                                                                                <div className='btnAndImg'>
                                                                                    <label for="inputFields" class="imgIcon">{<FontAwesomeIcon icon={faImage} />}</label>
                        <button disabled={retweetComments.length !== 0 ? false : true}
                            className={retweetComments.length=== 0 ? `PostBtn comments disable` : `PostBtn comments`}>Reply</button>
          </div>
          </form>
    </div>
  )
}

export default TheInputOfTheComment
