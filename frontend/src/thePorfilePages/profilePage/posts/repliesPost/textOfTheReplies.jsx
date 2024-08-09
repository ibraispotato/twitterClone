/* eslint-disable jsx-a11y/alt-text */
import React, {useState,useEffect,useRef} from 'react'
import {useTextContext} from "../../../../hooks/textContext"
import { Hooksregisters } from "../../../../hooks/hooksRegister/hooksregister"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment,faRetweet,faHeart,faEllipsis,faQuoteLeft,faTrash,faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link } from 'react-router-dom'
import { getImageSize  } from 'react-image-size';
import { useNavigate } from 'react-router-dom';
import { MoonLoader} from "react-spinners";
import ReactPlayer from 'react-player';

const  TheshownTwitter = ({ res, idx, GetAllText, replycomments, maper, setGetCommentsFromComments,
  setGetCommentsFromPost, setGetProfileOfThePost, getCommentsFromComments, getCommentsFromPost, GetProfileOfThePost,
  GETREPLYFROMPOST,maps,resMap,indexMap,MYprofiles}) => {
  const { user, dispatch } = Hooksregisters()
  const navigates = useNavigate()
  // const [MYprofiles, setProfiles] = useState(null)
  const [clickRetweet, setClickRetweet] = useState(false)
  const [clickRetweets, setClickRetweets] = useState(false)
  const { dispatchs, texts } = useTextContext()
  const images = require.context('../../../../images', true);
  const imageList = images.keys().map(image => images(image))
  const [error, setError] = useState(null)
  const playerRef = useRef(null);
  const [threeDotsBtn, setThreeDotsBtn] = useState(false)
  const [messegeDelete,setMessegeDelete] = useState(null)
  const [MessegeLikes,setMessegeLiked] = useState(null)
    ////////////////////////////////////////////GET POST FROM REPLY///////////////////////////////////////////////////////////////
  
    const TextDelete = async (e) => {
    e.preventDefault()
    // setMessegeLiked("You UnLiked The Tweet :( ")
    const TextDeleteResponse = await fetch(`http://localhost:4000/clone/deleteMyLikes/${res?._id}`, {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'DELETE'
      
    })
    const TextDeleteJson = await TextDeleteResponse.json()
    if (!TextDeleteResponse.ok) {
      setError(TextDeleteJson.message)
      console.log(TextDeleteJson)
    }
    if (TextDeleteResponse.ok) {
      // setError(null)
      // replyComments()
      dispatchs({ type: "UPDATE", payload: TextDeleteJson })
      // setMessegeLiked("You UnLiked The Tweet :( ")
      // GETREPLYFROMPOST()
      // funLogins()
    }
    const MyTextDeleteResponse = await fetch(`http://localhost:4000/clone/replying/deleteLikesComment/${res?._id}`, {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'DELETE'
      
    })
    const MyTextDeleteJson = await MyTextDeleteResponse.json()
    if (!MyTextDeleteResponse.ok) {
      setError(MyTextDeleteJson.message)
      
    }
    if (MyTextDeleteResponse.ok) {
      dispatchs({ type: "UPDATE", payload: MyTextDeleteJson })
      setMessegeLiked("You UnLiked The Tweet :( ")
      
      GETREPLYFROMPOST()
    }
    // setMessegeLiked("You UnLiked The Tweet :( ")
    // funLogins()
  }//delete likes from the replies
  const textUpdate = async (e) => {
    e.preventDefault()
    // funLogins()
    ///////////////////////////////////TEXT LIKES//////////////////////////////////////////////////////////////////////////////
    const TextLikesResponse = await fetch((`http://localhost:4000/clone/updateMyLikes/${res?._id}`)
    , {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'POST'
      
    })
    const Textjson = await TextLikesResponse.json()
  
  if (TextLikesResponse.ok) {
    dispatchs({ type: "UPDATE", payload: Textjson })
    // setMessegeLiked("You Liked The Tweet :) ")

    }
    //////////////////////////////////////MY PROFILE LIKES TEXT/////////////////////////////////////////////////////////////////////////////
    const myLikesTextResponse = await fetch((`http://localhost:4000/clone/replying/updateLikesComment/${res?._id}`)
    , {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'POST'
      
    })

    const myLikesJson = await myLikesTextResponse.json()
    
  if (myLikesTextResponse.ok) {
    dispatchs({ type: "UPDATE", payload: myLikesJson })
    GETREPLYFROMPOST()
    setMessegeLiked("You Liked The Tweet :) ")

    }
    // funLogins()
  }//add likes from the replies
  const UpdateReTweet = async (e) => {
    e.preventDefault()
    ///////////////////////////////////TEXT ReTweet//////////////////////////////////////////////////////////////////////////////
    const TextLikesResponse = await fetch((`http://localhost:4000/clone/replying/updateReTweetComment/${res?._id}`)
      , {
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        method: 'POST'
      
      })
    const Textjson = await TextLikesResponse.json()
    if (!TextLikesResponse.ok) {
      setError(Textjson.message)
      // setMessegeLiked("You Reposted The Tweet :) ")
      
    }
    if (TextLikesResponse.ok) {
      setError(null)
      // GETREPLYFROMPOST()
      setClickRetweets(false)
      // funLogin()
    
    }
    //////////////////////////////////////MY PROFILE LIKES TEXT/////////////////////////////////////////////////////////////////////////////
    const myLikesTextResponse = await fetch((`http://localhost:4000/clone/updateMyTweet/${res?._id}`)
      , {
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        method: 'POST'
      
      })

    const myLikesJson = await myLikesTextResponse.json()
    if (!myLikesTextResponse.ok) {
      setError(myLikesJson.message)
      
    }
    if (myLikesTextResponse.ok) {
      setError(null)
      GETREPLYFROMPOST()
      setMessegeLiked("You Reposted The Tweet :) ")
      setClickRetweet(false)

      setClickRetweets(false)
      // funLogin()
    
    }
  }//add retweet from the replies
  const DeleteReTweet = async (e) => {
    e.preventDefault()
    const TextDeleteResponses = await fetch(`http://localhost:4000/clone/replying/deleteReplyReTweet/${res?._id}`, {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'DELETE'
      
    })
    const TextDeleteJsons = await TextDeleteResponses.json()
    if (!TextDeleteResponses.ok) {
      setError(TextDeleteJsons.message)
      
    }
    if (TextDeleteResponses.ok) {
      setError(null)
      // GETREPLYFROMPOST()
      setClickRetweets(false)
      // funLogin()
      // setMessegeLiked("You UnReposted The Tweet :( ")
    
    }
    
    const MyTextDeleteResponse = await fetch(`http://localhost:4000/clone/deleteMyTweet/${res?._id}`, {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'DELETE'
      
    })
    const MyTextDeleteJson = await MyTextDeleteResponse.json()
    if (!MyTextDeleteResponse.ok) {
      setError(MyTextDeleteJson.message)
      
    }
    if (MyTextDeleteResponse.ok) {
      setError(null)
      GETREPLYFROMPOST()
      setClickRetweets(false)
      setClickRetweet(false)

      setMessegeLiked("You UnReposted The Tweet :( ")
    
    }
    
  }//delete retweet from the replies
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const updateLikes = async (e) => {
    e.preventDefault()
    // funLogins()
    // console.log(res)
    ///////////////////////////////////TEXT LIKES//////////////////////////////////////////////////////////////////////////////
    const TextLikesResponse = await fetch((`http://localhost:4000/clone/updateMyLikes/${resMap._id}`)
    , {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'POST'
      
    })
    const Textjson = await TextLikesResponse.json()
  
  if (TextLikesResponse.ok) {
    // GETREPLYFROMPOST()
    }
    //////////////////////////////////////MY PROFILE LIKES TEXT/////////////////////////////////////////////////////////////////////////////
    const myLikesTextResponse = await fetch((getCommentsFromComments.map(((res) => res?._id?.includes(resMap?._id)?true:"")).filter((res) => res!=="")[0]?`http://localhost:4000/clone/replying/updateLikesComment/${resMap?._id}`:`http://localhost:4000/clone/texts/${resMap?._id}`)
    , {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'POST'
      
    })

    const myLikesJson = await myLikesTextResponse.json()
    
  if (myLikesTextResponse.ok) {
    // replyComments()
    setMessegeLiked("You Liked The Tweet :) ")
    
    GETREPLYFROMPOST()
    // funLogins()
    }
    // funLogins()
  }//add likes from the replies or from the post
  const deleteLikes = async (e) => {
    e.preventDefault()
    // funLogins()
    // console.log(getCommentsFromComments.map(((res) => res?._id?.includes(getId)?true:"")).filter((res) => res!=="")[0])
    ///////////////////////////////////TEXT LIKES//////////////////////////////////////////////////////////////////////////////
    const TextDeleteResponse = await fetch(`http://localhost:4000/clone/deleteMyLikes/${resMap?._id}`, {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'DELETE'
      
    })
    const TextDeleteJson = await TextDeleteResponse.json()
    if (!TextDeleteResponse.ok) {
      setError(TextDeleteJson.message)
      
    }
    if (TextDeleteResponse.ok) {
      // setError(null)
      // replyComments()
      
      // GETREPLYFROMPOST()
      // GETREPLYFROMPOST()
    }
    //////////////////////////////////////MY PROFILE LIKES TEXT/////////////////////////////////////////////////////////////////////////////
    const MyTextDeleteResponse = await fetch(getCommentsFromComments.map(((res) => res?._id?.includes(resMap?._id)?true:"")).filter((res) => res!=="")[0]?`http://localhost:4000/clone/replying/deleteLikesComment/${resMap?._id}`:`http://localhost:4000/clone/texts/delete/${resMap?._id}`, {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'DELETE'
      
    })
    const MyTextDeleteJson = await MyTextDeleteResponse.json()
    if (!TextDeleteResponse.ok) {
      setError(MyTextDeleteJson.message)
      
    }
    if (TextDeleteResponse.ok) {
      GETREPLYFROMPOST()
    setMessegeLiked("You UnLiked The Tweet :) ")

    }
    // funLogins()
  }//delete likes from the replies or from the post
  const UpdateTheReTweet = async (e) => {
    // console.log(getId)
    e.preventDefault()
    // console.log(getId)
    ///////////////////////////////////TEXT ReTweet//////////////////////////////////////////////////////////////////////////////
    const TextLikesResponse = await fetch((getCommentsFromComments.map(((res) => res?._id?.includes(resMap?._id) ? true : "")).filter((res) => res !== "")[0] ?
      `http://localhost:4000/clone/replying/updateReTweetComment/${resMap?._id}` :
      `http://localhost:4000/clone/texts/updateReTweet/${resMap?._id}`
    )
      , {
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        method: 'POST'
      
      })
    const Textjson = await TextLikesResponse.json()
    if (!TextLikesResponse.ok) {
      setError(Textjson.message)
      console.log(Textjson.message)
    }
    if (TextLikesResponse.ok) {
      setError(null)
      // GETREPLYFROMPOST()
    // setMessegeLiked("You Reposted The Tweet :) ")

    setClickRetweets(false)
    setClickRetweet(false)
      // funLogin()
    
    }
    ////////////////////////////////////MY PROFILE LIKES TEXT/////////////////////////////////////////////////////////////////////////////
    const myLikesTextResponse = await fetch((`http://localhost:4000/clone/updateMyTweet/${resMap?._id}`)
      , {
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        method: 'POST'
      
      })

    const myLikesJson = await myLikesTextResponse.json()
    if (!myLikesTextResponse.ok) {
      setError(myLikesJson.message)
      
    }
    if (myLikesTextResponse.ok) {
      setError(null)
      GETREPLYFROMPOST()
      setMessegeLiked("You Reposted The Tweet :) ")

      setClickRetweets(false)
      setClickRetweet(false)
      // funLogin()
    
    }
  }// add Retweet from the replies or from the post
  const DeleteTheReTweet = async (e) => {
    e.preventDefault()
    const TextDeleteResponses = await fetch(getCommentsFromComments.map(((res) => res?._id?.includes(resMap?._id) ? true : "")).filter((res) => res !== "")[0] ?
      `http://localhost:4000/clone/replying/deleteReplyReTweet/${resMap?._id}` :
      `http://localhost:4000/clone/texts/deleteReTweet/${resMap?._id}`, {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'DELETE'
      
    })
    const TextDeleteJsons = await TextDeleteResponses.json()
    if (!TextDeleteResponses.ok) {
      setError(TextDeleteJsons.message)
      console.log(TextDeleteJsons.message)
    }
    if (TextDeleteResponses.ok) {
      setError(null)
      // GETREPLYFROMPOST()
      setClickRetweets(false)
      setClickRetweet(false)
    // setMessegeLiked("You UnReposted The Tweet :) ")

      // funLogin()
    
    }
    
    const MyTextDeleteResponse = await fetch(`http://localhost:4000/clone/deleteMyTweet/${resMap?._id}`, {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'DELETE'
      
    })
    const MyTextDeleteJson = await MyTextDeleteResponse.json()
    if (!MyTextDeleteResponse.ok) {
      setError(MyTextDeleteJson.message)
      
    }
    if (MyTextDeleteResponse.ok) {
      setError(null)
      GETREPLYFROMPOST()
      setClickRetweets(false)
      setClickRetweet(false)
      setMessegeLiked("You UnReposted The Tweet :) ")
    
    }
    
  }// delete Retweet from the replies or from the post
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const deleteAcutalText = async (e) => {
    e.preventDefault()
  const response = await fetch(`http://localhost:4000/clone/replying/deleteText/${res?._id}`,{
    method: 'DELETE',
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
  })
  const json = await response.json()
  if (!response.ok) {
    setError(json.message)
    console.log(json.message)
}
if (response.ok) {
  setError(null)
  setThreeDotsBtn(false)
  dispatchs({ type: "DELETE", payload: json })
}
const MyTextDeleteResponse = await fetch(`http://localhost:4000/clone/deleteMyPost/${res?._id}`, {
  headers: {
    // 'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`
  },
  method: 'DELETE'
  
})
const MyTextDeleteJson = await MyTextDeleteResponse.json()
if (!MyTextDeleteResponse.ok) {
  setError(MyTextDeleteJson.message)
  
}
if (MyTextDeleteResponse.ok) {
  setError(null)
// 
setTimeout(() => {
  GETREPLYFROMPOST()
}, 3000);
setMessegeDelete("Post Has Been Deleted")

setThreeDotsBtn(false)
// funLogin()
}

}
setInterval(() => {
  setMessegeDelete(null)
}, 4000);
useEffect(() => {
const time = setInterval(() => {
  setMessegeLiked(null)
  
}, 4000);
return ()=>clearTimeout(time)
},[])

  return (
  <div>
      <div className='allPosts'>
      
      
        <>
<Link></Link>
          <div>
            {/* //////////////the replies or the comments////////////////////////////////////////// */}
            {resMap ===null?"":GetProfileOfThePost&&GetProfileOfThePost?.map((reses, index) => (
                <><><div className='accountNameTwitterPost'>
                  <div className='photoUser s'>
                    <Link key={idx} to={`/profile/${reses?._id}`}>
                        
                      <img loading='lazy' className='img' src={imageList[0] === reses?.photo ? imageList[0] :
                        `http://localhost:4000/${reses?.photo}`} />
                    </Link>
                  </div>
                  <Link className='linkUser' to={`/profile/${reses?._id}`}>
                    <div className='allOfTheTextTweet'>
                      <div className='motherTweets'>
                        <div className='userTweet'>
                          
                          <span className='nameOfTheTweet'>{reses?.name===undefined? "deleted":reses?.name}</span>
                          <span>@{reses?.userName}</span>
                        </div>
                        <span>•</span>
                        <span>{formatDistanceToNow(new Date(res?.createdAt))}</span>
                      </div>
                      <Link className='linkTweet' to={`/tweet/${resMap?._id}`}>
                        <div>
                          <span className='nameOfTheTweet'>{resMap?.retweetComments || resMap?.Text}</span>
                        </div>
                      </Link>
                    </div>
                  </Link>
                </div>
                  
                  <Link to={`/tweet/${resMap?._id}`}>
                  {!resMap?.photo ? "" : <div className='divOfTwitterPhoto photo'>
                    <div className='anotherdivOfTwitterPhoto photo'>
                      <div className='anothers'>
                        {/* {!resMap?.photo ? "" : <img key={idx} loading='lazy' className='twitterPhoto' src={`http://localhost:4000/${resMap?.photo}`} />} */}
                        {!resMap?.photo?"":resMap?.photo?.split("-")[2]?.includes(".mp4")?
                        <ReactPlayer ref={playerRef} url={`http://localhost:4000/${resMap?.photo}`} controls={true} />:
                        <img loading='lazy' key={idx} className='twitterPhoto' src={`http://localhost:4000/${resMap?.photo}`} />}
                      </div>
                    </div>
                    </div>}
                    </Link>
                </>
                <div className='bottomIcons'>
                <div className='iconsTweets'>
                    <div className='iconTweet comment'>
                      {/* {console.log(resMap)} */}
                      <Link to={`/replying/${resMap?._id}/${resMap?.idOfTheReplyer===undefined?resMap?.idText:resMap?.idOfTheReplyer}`}>
                        <button className='btnReTweet'>
                          <span className='SpanReTweet comment'>
                            <FontAwesomeIcon icon={faComment} />
                            {/* {console.log(resMap)} */}
                            <p>{resMap?.comments?.length}</p>
                          </span>
                        </button>
                      </Link>
                    </div>
                    {!resMap?.retweet?.includes(user?._id) ?
                      <>
                        <div className='ope'>
                          {clickRetweets ?
                            <div>
                              <div className='iconAndTextRepost'>
                                <form onClick={UpdateTheReTweet}>
                                  <button className='btnRetweets'>
                                    <FontAwesomeIcon icon={faRetweet} />
                                    <span>Repost</span>
                                  </button>
                                </form>
                              </div>
                              <Link to={`/post/${resMap?._id}/${resMap?.idOfTheReplyer===undefined?resMap?.idText:resMap?.idOfTheReplyer}`}>
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
                          <button onClick={() => setClickRetweets(prev => !prev)} className='btnReTweet'>
                            <span className='SpanReTweet myTweet'>
                              <FontAwesomeIcon icon={faRetweet} />
                              <p>{resMap?.retweet?.length + resMap?.QouteTweet?.length}</p>
                            </span>
                          </button>
                        </div>
                      </>
                      :
                      <div className='iconTweet ReTweet'>
                        <div className='ope'>
                          {clickRetweets ?
                            <div>
                              <div className='iconAndTextRepost'>
                                <form onClick={DeleteTheReTweet}>
                                  <button className='btnRetweets'>
                                    <FontAwesomeIcon icon={faRetweet} />
                                    <span>Undo Repost</span>
                                  </button>
                                </form>
                              </div>
                              <div className='iconAndTextRepost'>
                                <Link to={`/post/${resMap?._id}/${resMap?.idOfTheReplyer===undefined?resMap?.idText:resMap?.idOfTheReplyer}`}>
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

                          <button onClick={() => setClickRetweets(prev => !prev)} className='btnReTweet'>
                            <span className='SpanReTweet ActivemyTweet'>
                              <FontAwesomeIcon icon={faRetweet} />
                              <p>{resMap?.retweet?.length + resMap.QouteTweet.length}</p>
                            </span>
                          </button>
                        </div>

                      </div>}
                    {resMap?.likes?.includes(user?._id) ?
                      <form onSubmit={deleteLikes}>
                        <div className='iconTweet hearts'>
                          {/* <FontAwesomeIcon icon={faHeart} /> */}
                          {/* {console.log(reses)} */}
                          <button className='btnHeart'>
                            <span className='SpanHeart myHeart'>
                              <FontAwesomeIcon icon={faHeart} />
                              <span>{resMap?.likes?.length}</span>
                            </span>
                          </button>
                        </div>
                      </form>
                      :
                      
                      <form onSubmit={updateLikes}>
                        <div className='iconTweet heart'>
                          <button className='btnHeart'>
                            <span className='SpanHeart'>
                              <FontAwesomeIcon icon={faHeart} />
                              <span>{resMap?.likes?.length}</span>
                            </span>
                          </button>
                        </div>
                        </form>
                        }
                  </div>
                  <div className='copyBtn'>
          <div className='iconThreeDots'>
            <button onClick={() => navigator.clipboard.writeText(`http://localhost:3000/tweet/${resMap?._id}`)}
              className='threeDotsBtn'>
                      <span className='ThreeDots'>
                        <FontAwesomeIcon icon={faArrowUpFromBracket}/>
                      </span>
                      
                    </button>
              
            </div>
          
        </div>
                  </div>
                  
                  </>
            
            ))[idx]}

          </div>

          
{/* ////////////// the replies////////////////////////////////////////////// */}
          <div className='comments'>
            {MYprofiles && MYprofiles?.map((resProfiles, theIndex) => (
              <Link to={`/tweet/${res?._id}`}>
              <div key={idx} className='twitterPostAll'>
                <div className='motherOfAccountNameTwitterPost '>
                  <div className='accountNameTwitterPost'>
                    <div className='photoUser'>
                      <Link key={theIndex} to={`/profile/${resProfiles?._id}`}>
                        {/* {console.log(theIndex)} */}
                        <img loading='lazy' key={theIndex} className='img' src={imageList[0] === resProfiles?.photo ? imageList[0] :
                          `http://localhost:4000/${resProfiles?.photo}`} />
                      </Link>
                    </div>
                    <Link className='linkUser' to={`/profile/${user?._id}`}>
                      <div className='allOfTheTextTweet'>
                        <div className='motherTweets'>
                          <div key={theIndex} className='userTweet'>
                            <span key={theIndex} className='nameOfTheTweet'>{resProfiles?.name}</span>
                            <span key={theIndex}>@{resProfiles?.userName}</span>
                          </div>
                          <span>•</span>
                          <span>{formatDistanceToNow(new Date(res?.createdAt))}</span>
                          </div>
                        <Link className='linkTweet' to={`/tweet/${res?._id}`}>
                          <div>
                            <span key={idx} className='nameOfTheTweet'>{res?.retweetComments}</span>
                          </div>
                        </Link>
                      </div>
                    </Link>
                  </div>

                  <Link>
                  <div className='iconThreeDots'>
                    
                    <button onClick={() =>setThreeDotsBtn((prev) => !prev)} className='threeDotsBtn'>
                      <span className='ThreeDots'>
                        <FontAwesomeIcon icon={faEllipsis}/>
                      </span>
                      
                    </button>
              
            </div>
            <div>
              {threeDotsBtn? 
              <div className='iconAndTextRepost delete'>
              
                <button onClick={deleteAcutalText} className='btnRetweets delete'>
                  <FontAwesomeIcon icon={faTrash} />
                  <span>Delete</span>
                </button>
              
              </div>
              
              
              :""}
            </div>
                  </Link>

                </div>
                </div>
                </Link>
            ))[idx]}
            <div className='divOfTwitterPhoto photo'>
              <div className='anotherdivOfTwitterPhoto'>
                <div className='anothers'>
                {!res?.photo?"":res?.photo?.split("-")[2]?.includes(".mp4")?
                        <ReactPlayer ref={playerRef} url={`http://localhost:4000/${res?.photo}`} controls={true} />:
                        <img loading='lazy' key={idx} className='twitterPhoto' src={`http://localhost:4000/${res?.photo}`} />}                </div>
              </div>
            </div>
          </div>

          {/* </Link> */}
          <div className='bottomIcons'>
        <div className='iconsTweets'>
        <div className='iconTweet comment'>
          <Link to={`/replying/${res?._id}/${res?.idText}`}>
          <button className='btnReTweet'>
                <span className='SpanReTweet comment'>
                  <FontAwesomeIcon icon={faComment} />
                  <p>{res?.comments?.length}</p>
                </span>
              </button>
          </Link>
              
            </div>
        {!res?.retweet.includes(user?._id) ?
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
                  {/* <s */}
                  <Link to={`/post/${res?._id}/${res?.idOfTheReplyer}`}>
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
                  <p>{res?.retweet?.length+res.QouteTweet.length}</p>
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
                <Link to={`/post/${res?._id}/${res?.idOfTheReplyer}`}>
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
              
              <button onClick={() => setClickRetweet(prev => !prev)} className='btnReTweet'>
                <span className='SpanReTweet ActivemyTweet'>
                  <FontAwesomeIcon icon={faRetweet} />
                  <p>{res?.retweet?.length+res.QouteTweet.length}</p>
                </span>
              </button>
            </div>
            
            </div>
          
}
        {res?.likes?.includes(user?._id) ?
              <form  onSubmit={TextDelete}>
              <div className='iconTweet hearts'>
                {/* <FontAwesomeIcon icon={faHeart} /> */}
                <button className='btnHeart'>
                  <span className='SpanHeart myHeart'>
                    <FontAwesomeIcon icon={faHeart} />
                  <span>{res?.likes?.length}</span>
                  </span>
              
                </button>
                  
                
                </div>
              </form>
          :
         
          <form onSubmit={textUpdate}>
          <div className='iconTweet heart'>
            <button className='btnHeart'>
              <span className='SpanHeart'>
                <FontAwesomeIcon icon={faHeart} />
                
              <span>{res?.likes?.length}</span>
              </span>
         
            </button>
             
            
            </div>
            </form>
           
          }
          
          
        </div>
        <div className='copyBtn'>
          <div className='iconThreeDots'>
            <button onClick={() => navigator.clipboard.writeText(`http://localhost:3000/tweet/${res?._id}`)}
              className='threeDotsBtn'>
                      <span className='ThreeDots'>
                        <FontAwesomeIcon icon={faArrowUpFromBracket}/>
                      </span>
                      
                    </button>
              
            </div>
          
        </div>
      </div></>
            
        </div>
        <div className={`${messegeDelete===null ? "go":"err"}`}>
         {messegeDelete && <p>{messegeDelete}</p>}
      </div>
      <div className={`${MessegeLikes===null ? "go":"err"}`}>
         {MessegeLikes && <p>{MessegeLikes}</p>}
      </div>
        </div>

  )
  
}

export default TheshownTwitter
