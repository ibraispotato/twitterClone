import React,{useState,useEffect,useRef} from 'react'
import {Hooksregisters} from "../../hooks/hooksRegister/hooksregister"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'react-router'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import ReactPlayer from 'react-player';
import { faComment, faRetweet, faHeart, faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
const TextOfThePost = () => {
    const [Urprofile, setProfile] = useState([])
    const { dispatch, user } = Hooksregisters()
    const idLocal = localStorage.getItem("user")
    const [thePost, setThePost] = useState(null)
    const [theProfilePost, setTheProfile] = useState(null)
    const { id } = useParams()
    const [theProfilePostReply, setThePostReply] = useState(null)
    const [clickRetweet, setClickRetweet] = useState(false)
    const playerRef = useRef(null);
    const [MessegeLikes,setMessegeLiked] = useState(null)
    const funLogin = async () => {
        const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${JSON.parse(idLocal)?._id}`)
        const json = await response.json()
        setProfile(json)
        }///get your account
        useEffect(() => {
            return () => {
                funLogin()
            }
            
        }, [])
    const GetText = async () => {
        const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/texts/GetOneText/${id}`)
        const json = await response.json()
        if (response.ok) {
            setThePost(json)
            
        }
        
        const responseReply = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/replying/getreplyingComments/${id}`)
        const jsonReply = await responseReply.json()
        if (responseReply.ok) {
            setThePostReply(jsonReply)
        }
        
        const accountOfThePost = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${json!==null?json.idText:jsonReply.idOfTheReplyer}`)
        const accountOfThePostJson = await accountOfThePost.json()
        if (accountOfThePost.ok) {
            setTheProfile(accountOfThePostJson)
        }
    
        
    }//we make a responses function with three apis 1:get a post from text 2:get a post from a comment 3:it recives an account of the post or a comment, if theres a comment it recives a account of the comment if it's not it recives an account of the post
    useEffect(() => {
        // return () => {
            GetText()
            
        // }
        
    }, [])

    const DeleteLikes = async (e) => {
        e.preventDefault()
        const TextDeleteResponse = await fetch(theProfilePostReply===null?`${process.env.REACT_APP_APi_LINK}/clone/texts/delete/${id}`:`${process.env.REACT_APP_APi_LINK}/clone/replying/deleteLikesComment/${id}`, {
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          method: 'DELETE'
          
        })
        const TextDeleteJson = await TextDeleteResponse.json()

      if (TextDeleteResponse.ok) {
        GetText()
        
        funLogin()
        }
        
        const MyTextDeleteResponse = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/deleteMyLikes/${id}`, {
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          method: 'DELETE'
          
        })
        const MyTextDeleteJson = await MyTextDeleteResponse.json()

      if (TextDeleteResponse.ok) {
        GetText()
    setMessegeLiked("You UnLiked The Tweet :( ")
          
        funLogin()
        }
        
    }///delete a likes
    const AddLikes = async (e) => {
        e.preventDefault()
        ///////////////////////////////////TEXT LIKES//////////////////////////////////////////////////////////////////////////////
        const TextLikesResponse = await fetch((theProfilePostReply===null?`${process.env.REACT_APP_APi_LINK}/clone/texts/${id}`:`${process.env.REACT_APP_APi_LINK}/clone/replying/updateLikesComment/${id}`)
        , {
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          method: 'POST'
          
        })
        await TextLikesResponse.json()
      if (TextLikesResponse.ok) {
          // setError(null)
          GetText()
          funLogin()
        }
        //////////////////////////////////////MY PROFILE LIKES TEXT/////////////////////////////////////////////////////////////////////////////
        const myLikesTextResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/updateMyLikes/${id}`)
        , {
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          method: 'POST'
          
        })
    
        await myLikesTextResponse.json()
      if (myLikesTextResponse.ok) {
        setMessegeLiked("You Liked The Tweet :) ")
          GetText()
        funLogin()
        }
    }//add a likes
    const UpdateReTweet = async (e) => {
        e.preventDefault()
        ///////////////////////////////////TEXT ReTweet//////////////////////////////////////////////////////////////////////////////
        const TextLikesResponse = await fetch((theProfilePostReply===null?`${process.env.REACT_APP_APi_LINK}/clone/texts/updateReTweet/${id}`:`${process.env.REACT_APP_APi_LINK}/clone/replying/updateReTweetComment/${id}`)
        , {
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
        method: 'POST'
        
        })
        await TextLikesResponse.json()
    
    if (TextLikesResponse.ok) {
        GetText()
        
        funLogin()
        setClickRetweet(false)
        }
        //////////////////////////////////////MY PROFILE LIKES TEXT/////////////////////////////////////////////////////////////////////////////
        const myLikesTextResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/updateMyTweet/${id}`)
        , {
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
        method: 'POST'
        
        })
    
        await myLikesTextResponse.json()
        
    if (myLikesTextResponse.ok) {
    setMessegeLiked("You Reposted The Tweet :) ")
        
        funLogin()
        // setClickRetweet(false)
        GetText()
        
        }
    }// add Retweet
    const DeleteReTweet = async (e) => {
        e.preventDefault()
        const TextDeleteResponses = await fetch(theProfilePostReply===null?`${process.env.REACT_APP_APi_LINK}/clone/texts/deleteReTweet/${id}`:`${process.env.REACT_APP_APi_LINK}/clone/replying/deleteReplyReTweet/${id}`, {
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
        method: 'DELETE'
        
        })
        await TextDeleteResponses.json()
    
    if (TextDeleteResponses.ok) {
        
        funLogin()
        setClickRetweet(false)
        GetText()
        
        }
        
        const MyTextDeleteResponse = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/deleteMyTweet/${id}`, {
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
        method: 'DELETE'
        
        })
        const MyTextDeleteJson = await MyTextDeleteResponse.json()
        
    if (MyTextDeleteResponse.ok) {
        
        funLogin()
        GetText()
        setMessegeLiked("You UnReposted The Tweet :( ")
        
        }
        
    }//delete Retweet
    useEffect(() => {
        const time = setInterval(() => {
        setMessegeLiked(null)
        
        }, 4000);
        return ()=>clearTimeout(time)
        },[])
return (
    <div>
        <div className='TextOfThePost'>
                                <span className='nameOfTheTweet'>{thePost?.Text||theProfilePostReply?.retweetComments}</span>
                                    </div>
                                    <div className='PhotoTweetPost'>
                                        {!thePost?.photo&&!theProfilePostReply?.photo ? '' :
                                        thePost?.photo?.split("-")[2]?.includes(".mp4")?<ReactPlayer ref={playerRef} url={`${process.env.REACT_APP_APi_LINK}/${thePost?.photo||theProfilePostReply?.photo}`} controls={true} />:
                                        theProfilePostReply?.photo?.split("-")[2]?.includes(".mp4")?<ReactPlayer ref={playerRef} url={`${process.env.REACT_APP_APi_LINK}/${thePost?.photo||theProfilePostReply?.photo}`} controls={true} />: 
                                        <img loading='lazy' className='twitterPhoto PostPhoto'src={`${process.env.REACT_APP_APi_LINK}/${thePost?.photo||theProfilePostReply?.photo}`} />}
                                    </div>
                                    <div className='dateOfTextOfThePost'>
                {(thePost === null ?theProfilePostReply === null ? <span></span> : <span>Posted {formatDistanceToNow(new Date(theProfilePostReply?.createdAt))}</span>:
                thePost === null ? <span></span> : <span>Posted {formatDistanceToNow(new Date(thePost?.createdAt))}</span>)}
                                    </div>
                                        <div className='borderInsidePost'></div>
                                    <div className='iconsTweets'>
                                            <div className='iconTweet comment'>
                                                
                                            <Link Link to={`/replying/${thePost?._id||theProfilePostReply?._id}/${thePost?.idText||theProfilePostReply?.idOfTheReplyer}`}>
                                                <button className='btnReTweet'>
                                                    <span className='SpanReTweet comment'>
                                                        <FontAwesomeIcon icon={faComment} />
                                                            <p>{thePost !== null ?thePost?.comments?.length:theProfilePostReply?.comments?.length}</p>
                                                                </span>
                                                                        </button>
                                                                            </Link>
                                                                                </div>
                                        
            {/* //////////////////////THE REPOST&COMMENT&LIKE////////////////////////////////////////////////////////////////////////// */}
            {!thePost?.retweet.includes(user?._id)&&!theProfilePostReply?.retweet.includes(user?._id) ?
            <>
                <div className='ope'>
                    {clickRetweet ?
                    <div>
                        <div className='iconAndTextRepost'>
                            <form onClick={UpdateReTweet}>
                                <button className='btnRetweets'>
                                    <FontAwesomeIcon icon={faRetweet} />
                                        <span>Repost</span>
                                            </button>
                                                </form>
                                                    </div>
                                                        <Link to={`/post/${thePost?._id||theProfilePostReply?._id}/${thePost?.idText||theProfilePostReply?.idOfTheReplyer}`}>
                                                            <div className='iconAndTextRepost'>
                                                                    <button className='btnRetweets'>
                                                                        <FontAwesomeIcon icon={faQuoteLeft} />
                                                        <span>Qoute</span>
                                                            </button>
                                                        </div>
                                                    </Link>
                                                </div>
                                                :
                    <div className='dis'></div>}
                                                </div>
                                                    <div className='iconTweet reTweet'>
                                                        <button onClick={() => setClickRetweet(prev => !prev)} className='btnReTweet'>
                                                            <span className='SpanReTweet myTweet'>
                                                                <FontAwesomeIcon icon={faRetweet} />
                                    <p>{thePost === null ? theProfilePostReply?.retweet?.length+theProfilePostReply?.QouteTweet?.length :
                                                                        thePost?.retweet?.length+thePost?.QouteTweet?.length}</p>
                                                                        </span>
                                                                            </button>
                                                                                    </div>
                                                                                </>
                                                                                :
                                            <div className='iconTweet ReTweet'>
                                                        <div className='ope'>
                                                    {clickRetweet ?
                                                    <div>
                    <div className='iconAndTextRepost'>
                        <form onClick={DeleteReTweet}>
                            <button className='btnRetweets'>
                                <FontAwesomeIcon icon={faRetweet} />
                                    <span>Undo Repost</span>
                                        </button>
                                            </form>
                                                </div>
                                                    <div className='iconAndTextRepost'>
                                                        <Link to={`/post/${thePost?._id||theProfilePostReply?._id}/${thePost?.idText||theProfilePostReply?.idOfTheReplyer}`}>
                                                            <div className='iconAndTextRepost'>
                                                                <button className='btnRetweets'>
                                                                    <FontAwesomeIcon icon={faQuoteLeft} />
                                                                        <span>Qoute</span>
                                                                            </button>
                                                                                </div>
                                                                                    </Link>
                                                                                        </div>
                                                                                            </div>
                                                                                                    :
                                                                                                    <div className='dis'></div>}
                                                                                                </div>
                                                                                                    <div className='iconTweet reTweet'>
                                                                                                    <button onClick={() => setClickRetweet(prev => !prev)}
                                                                                                            className='btnReTweet'>
                                                            <span className='SpanReTweet ActivemyTweet'>
                                                                <FontAwesomeIcon icon={faRetweet} />
                                                                <p>{thePost === null ? theProfilePostReply?.retweet?.length+theProfilePostReply?.QouteTweet?.length :
                                                                        thePost?.retweet?.length+thePost?.QouteTweet?.length}</p>
                                                                </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
    }
            {thePost?.likes.includes(user?._id)||theProfilePostReply?.likes.includes(user?._id)  ?
                                                <form onSubmit={DeleteLikes}>
                                                    <div className='iconTweet hearts'>
                                                            <button className='btnHeart'>
                                                                <span className='SpanHeart myHeart'>
                                                                    <FontAwesomeIcon icon={faHeart} />
                                                                        <span>{thePost==null?theProfilePostReply?.likes?.length:thePost?.likes?.length}</span>
                                                                            </span>
                                                                                </button>
                                                                                    </div>
                                                                                        </form>
            :
            <form onSubmit={AddLikes}>
                <div className='iconTweet heart'>
                    <button className='btnHeart'>
                        <span className='SpanHeart'>
                            <FontAwesomeIcon icon={faHeart} />
                            <span>{thePost==null?theProfilePostReply?.likes?.length:thePost?.likes?.length}</span>
                                    </span>
                                        </button>
                                            </div>
                                                </form>
            }
                </div>
                <div className={`${MessegeLikes===null ? "go":"err"}`}>
         {MessegeLikes && <p>{MessegeLikes}</p>}
      </div>
    </div>
  )
}

export default TextOfThePost
