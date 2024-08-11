/* eslint-disable jsx-a11y/alt-text */
import React, {useState,useEffect,useRef} from 'react'
import {useTextContext} from "../../..//../hooks/textContext"
import { Hooksregisters } from "../../../../hooks/hooksRegister/hooksregister"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment,faRetweet,faHeart,faEllipsis,faQuoteLeft,faTrash,faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player';
import img from "../../../../defultPic.png"
const TheshownTwitter = ({ res, idx, myLikes,
   GetMyLikes, GETREPLYFROMPOST,myLikes2,maps }) => {
    const { user, dispatch } = Hooksregisters()
    const [clickRetweet,setClickRetweet] = useState(false)
  const { dispatchs, texts } = useTextContext()
  const [error, setError] = useState(null)
  const playerRef = useRef(null);
  const [threeDotsBtn, setThreeDotsBtn] = useState(false)
  const [messegeDelete,setMessegeDelete] = useState(null)
  const [MessegeLikes,setMessegeLiked] = useState(null)
  const DeleteLikes = async (e) => {
    e.preventDefault()
    const TextDeleteResponse = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/texts/delete/${res?._id}`, {
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
      
    GETREPLYFROMPOST()
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const ResponseDeleteResponse = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/replying/deleteLikesComment/${res?._id}`, {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      method: 'DELETE'
      
    })
    const ResponseDeleteJson = await ResponseDeleteResponse.json()
    if (!TextDeleteResponse.ok) {
      setError(ResponseDeleteJson.message)
      
  }
  if (ResponseDeleteResponse.ok) {
      
    GETREPLYFROMPOST()
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const MyTextDeleteResponse = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/deleteMyLikes/${res?._id}`, {
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
    setMessegeLiked("You UnLiked The Tweet :( ")
    GETREPLYFROMPOST()
    }
    
  }
  const UpdateLikes = async (e) => {
    e.preventDefault()
    ///////////////////////////////////TEXT LIKES//////////////////////////////////////////////////////////////////////////////
    const TextLikesResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/texts/${res?._id}`)
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
      
  }
  if (TextLikesResponse.ok) {
      // setError(null)
       
      GETREPLYFROMPOST()
    }
        //////////////////////////////////////MY PROFILE LIKES TEXT/////////////////////////////////////////////////////////////////////////////
        const ReplyLikesResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/replying/updateLikesComment/${res?._id}`)
        , {
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          method: 'POST'
          
        })
        const Replyjson = await ReplyLikesResponse.json()
        if (!ReplyLikesResponse.ok) {
          setError(Replyjson.message)
          
      }
      if (ReplyLikesResponse.ok) {
          // setError(null)
           
          GETREPLYFROMPOST()
        }
    //////////////////////////////////////MY PROFILE LIKES TEXT/////////////////////////////////////////////////////////////////////////////
    const myLikesTextResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/updateMyLikes/${res?._id}`)
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
      // setError(null)
      setMessegeLiked("You Liked The Tweet :) ")
      GETREPLYFROMPOST()
      
    }
  }
  const UpdateReTweet = async (e) => {
    // console.log(getId)
    e.preventDefault()
    // console.log(getId)
    ///////////////////////////////////TEXT ReTweet//////////////////////////////////////////////////////////////////////////////
    const TextLikesResponse = await fetch((myLikes2.map(((resz) => resz?._id?.includes(res?._id) ? true : "")).filter((resd) => resd !== "")[0] ?
      `${process.env.REACT_APP_APi_LINK}/clone/replying/updateReTweetComment/${res?._id}` :
      `${process.env.REACT_APP_APi_LINK}/clone/texts/updateReTweet/${res?._id}`
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
      // GETREPLYFROMPOST()
      console.log(Textjson.message)
    }
    if (TextLikesResponse.ok) {
      setError(null)
      // funLogins()
      setClickRetweet(false)
      GETREPLYFROMPOST()

      // funLogin()
    
    }
    ////////////////////////////////////MY PROFILE LIKES TEXT/////////////////////////////////////////////////////////////////////////////
    const myLikesTextResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/updateMyTweet/${res?._id}`)
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
      // funLogins()
      GETREPLYFROMPOST()
      setMessegeLiked("You Reposted The Tweet :) ")
      setClickRetweet(false)
      // funLogin()
    
    }
  }
  const DeleteReTweet = async (e) => {
    e.preventDefault()
    const TextDeleteResponses = await fetch(myLikes2.map(((resz) => resz?._id?.includes(res?._id) ? true : "")).filter((resd) => resd !== "")[0] ?
      `${process.env.REACT_APP_APi_LINK}/clone/replying/deleteReplyReTweet/${res?._id}` :
      `${process.env.REACT_APP_APi_LINK}/clone/texts/deleteReTweet/${res?._id}`, {
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
      GETREPLYFROMPOST()
    
      setClickRetweet(false)
      // funLogin()
    
    }
    
    const MyTextDeleteResponse = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/deleteMyTweet/${res?._id}`, {
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
      setMessegeLiked("You UnReposted The Tweet :( ")
      setClickRetweet(false)
      // funLogin()
    
    }
    
  }
  const deleteAcutalText = async (e) => {
    e.preventDefault()
  const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/texts/deteText/${res?._id}`,{
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
const MyTextDeleteResponse = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/deleteMyPost/${res?._id}`, {
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
// GetAllText()
setTimeout(() => {
  GETREPLYFROMPOST()
}, 4000);
setMessegeDelete("Post Has Been Deleted")

setThreeDotsBtn(false)
// funLogin()
}

}

useEffect(() => {
  const time = setInterval(() => {
    setMessegeLiked(null)
    
  }, 4000);
  return ()=>clearTimeout(time)
  },[])
  
  return (
      <div key={idx} className='allPosts'>
    <Link className='linkTweet' to={`/tweet/${res?._id}`}>
      
        <div>
          {GetMyLikes&&GetMyLikes?.map((resProfiles,theIndex) => (
        <div key={idx} className='twitterPostAll'>
          <div className='motherOfAccountNameTwitterPost'>
                <div className='accountNameTwitterPost'>
                
            <div className='photoUser'>
            <Link key={theIndex} to={`/profile/${resProfiles?._id}`}>
              {/* {console.log(theIndex)} */}
                      <img loading='lazy' key={theIndex} className='img' src={resProfiles?.photo==="" ? img:
                        `${process.env.REACT_APP_APi_LINK}/${resProfiles?.photo}`} />
            </Link>
                  </div>
                  <Link className='linkUser' to={`profile/${resProfiles?._id}`}>
            <div className='allOfTheTextTweet'>
              <div className='motherTweets' >
                <div key={theIndex} className='userTweet'>
                  <span key={theIndex} className='nameOfTheTweet'>{resProfiles?.name}</span>
                <span key={theIndex}>@{resProfiles?.userName}</span>
                </div>
                <span>•</span>
                {maps===null?<span></span>:<span>{formatDistanceToNow(new Date(res?.createdAt))}</span>}
                      </div>
              <Link className='linkTweet' to={`/tweet/${res?._id}`}>
                      
              <div>
              <span key={idx} className='nameOfTheTweet'>{res?.Text||res?.retweetComments}</span>
                        </div>
            </Link>
                        
            </div>
            </Link>
                </div>
                
              <Link>
              <div className='iconThreeDots'>
                    
                    <button onClick={() =>user?._id===res?.idText[0]?setThreeDotsBtn((prev) => !prev):"s"} className='threeDotsBtn'>
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
      ))[idx]}
      <div className='divOfTwitterPhoto'>
              <div className='anotherdivOfTwitterPhoto'>
        <div className='anothers'>
        {!res?.photo?"":res?.photo?.split("-")[2]?.includes(".mp4")?<ReactPlayer ref={playerRef} url={`${process.env.REACT_APP_APi_LINK}/${res?.photo}`} controls={true} />:<img loading='lazy' key={idx} className='twitterPhoto' src={`${process.env.REACT_APP_APi_LINK}/${res?.photo}`} />}
        </div>
      </div>
      </div>
        </div>
        
      </Link>
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
                  <Link to={`/post/${res?._id}/${res?.idText}`}>
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
                  <p>{res?.retweet?.length+res?.QouteTweet?.length}</p>
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
                <Link to={`/post/${res?._id}/${res?.idText}`}>
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
              <form onSubmit={DeleteLikes}>
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
         
          <form onSubmit={UpdateLikes}>
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
