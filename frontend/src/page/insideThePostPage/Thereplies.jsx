import React, {useState,useEffect,useRef} from 'react'
// import {useTextContext} from "../../hooks/textContext"
import { Hooksregisters } from "../../hooks/hooksRegister/hooksregister"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useTextContext} from "../../hooks/textContext"
import { useParams } from 'react-router'
import { faComment,faRetweet,faHeart,faEllipsis,faQuoteLeft,faTrash } from '@fortawesome/free-solid-svg-icons'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ReactPlayer from 'react-player';
import img from "../../defultPic.png"

const Thereplies = ({ res, Thecomments, index, indx, GetText,usersOfTheFollwoingFunction }) => {
  const navigate = useNavigate();
  const { id } = useParams()
  const playerRef = useRef(null);
  const [error, setError] = useState(null)
    const { user, dispatch } = Hooksregisters()
    const [clickRetweet,setClickRetweet] = useState(false)
    const [profileOfTheComments, setProfileOfTheComments] = useState(null)
    const [Urprofiles, setProfiles] = useState(null)
  const { dispatchs, texts } = useTextContext()
  const [threeDotsBtn, setThreeDotsBtn] = useState(false)
  const [messegeDelete,setMessegeDelete] = useState(null)
  const [MessegeLikes,setMessegeLiked] = useState(null)
  const GetAllText = async () => {
    if (!user) {
      return 
    }
      const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/texts`)
      const json = await response.json()
     
      if (response.ok) {
        dispatchs({type:"SET",payload:json})
      }
    }//get all posts

      
  useEffect(() => {
    if (user) {
      GetAllText()
    }
      }, [dispatchs])
    const ProfileOfTheFollwoingFunction = async (e) => {
        const oks = await Thecomments?.map(res=>`${process.env.REACT_APP_APi_LINK}/clone/getuserers/${res?.idOfTheReplyer}`)
        const fetchTodo = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
        };
        
        await Promise?.all(oks &&oks?.map((item) => fetchTodo(item)))
        .then((res) => {
            setProfileOfTheComments(res.flat());
          console.log(res.flat())
        })
        .catch((err) => console.error(err));
        
    }//we get an account post from the Thecomments
    useEffect(() => {
       
            ProfileOfTheFollwoingFunction()
        
    }, [])
    const deleteLikes = async (e) => {
      e.preventDefault()
      const TextDeleteResponse = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/deleteMyLikes/${res?._id}`, {
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        method: 'DELETE'
        
      })
      const TextDeleteJson = await TextDeleteResponse.json()
     
    
    if (TextDeleteResponse.ok) {
        // setError(null)
      GetAllText()
      GetText()
      }
      
      const MyTextDeleteResponse = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/replying/deleteLikesComment/${res?._id}`, {
        
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        method: 'DELETE'
        
      })
      const MyTextDeleteJson = await MyTextDeleteResponse.json()
   
    if (TextDeleteResponse.ok) {
        // setError(null)
      GetAllText()
      GetText()
    setMessegeLiked("You UnLiked The Tweet :( ")

      }
      
    }//deleteLikes
    const AddLikes = async (e) => {
      e.preventDefault()
      ///////////////////////////////////TEXT LIKES//////////////////////////////////////////////////////////////////////////////
      const TextLikesResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/updateMyLikes/${res?._id}`)
      , {
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        method: 'POST'
        
      })
      const Textjson = await TextLikesResponse.json()
    
    if (TextLikesResponse.ok) {
        // setError(null)
        GetAllText()
        GetText()
      }
      //////////////////////////////////////MY PROFILE LIKES TEXT/////////////////////////////////////////////////////////////////////////////
      const myLikesTextResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/replying/updateLikesComment/${res?._id}`)
      , {
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        method: 'POST'
        
      })
  
      const myLikesJson = await myLikesTextResponse.json()
      
    if (myLikesTextResponse.ok) {
      GetText()
        GetAllText()
    setMessegeLiked("You Liked The Tweet :) ")

      }
    }//addlikes
    const UpdateReTweet = async (e) => {
      e.preventDefault()
      ///////////////////////////////////TEXT ReTweet//////////////////////////////////////////////////////////////////////////////
      const TextLikesResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/updateMyTweet/${res?._id}`)
      , {
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        method: 'POST'
        
      })
      const Textjson = await TextLikesResponse.json()
   
    if (TextLikesResponse.ok) {
        // setError(null)
      GetAllText()
      GetText()
        setClickRetweet(false)
      }
      //////////////////////////////////////MY PROFILE LIKES TEXT/////////////////////////////////////////////////////////////////////////////
      const myLikesTextResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/replying/updateReTweetComment/${res?._id}`)
      , {
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        method: 'POST'
        
      })
  
      const myLikesJson = await myLikesTextResponse.json()
     
    if (myLikesTextResponse.ok) {
        // setError(null)
      GetAllText()
      GetText()
    setMessegeLiked("You Reposted The Tweet :) ")
      
      }
    }//updateRetweet
    const DeleteReTweet = async (e) => {
      e.preventDefault()
      const TextDeleteResponses = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/deleteMyTweet/${res?._id}`, {
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        method: 'DELETE'
        
      })
      const TextDeleteJsons = await TextDeleteResponses.json()
      
    if (TextDeleteResponses.ok) {
        // setError(null)
      GetAllText()
      setClickRetweet(false)
      GetText()
      }
      
      const MyTextDeleteResponse = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/replying/deleteReplyReTweet/${res?._id}`, {
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        method: 'DELETE'
        
      })
      const MyTextDeleteJson = await MyTextDeleteResponse.json()
    
    if (MyTextDeleteResponse.ok) {
        // setError(null)
      GetAllText()
      GetText()
    setMessegeLiked("You UnReposted The Tweet :( ")
      
      }
      
    }//deleteRetweet
    const deleteAcutalText = async (e) => {
      e.preventDefault()
    const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/replying/deleteText/${res?._id}`,{
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
  // 
  setMessegeDelete("Post Has Been Deleted")
  setTimeout(() => {
    // ProfileOfTheFollwoingFunction()
    // usersOfTheFollwoingFunction()
    GetText()
    GetAllText()

  }, 3000);
  setThreeDotsBtn(false)
  // funLogin()
  }
  
  }//delete The Text
  setInterval(() => {
    setMessegeDelete(null)
  }, 4000);
      // console.log(res?._id)
      useEffect(() => {
        const time = setInterval(() => {
          setMessegeLiked(null)
          
        }, 4000);
        return ()=>clearTimeout(time)
        },[])
  return (
    <div key={index}>
      <div className='allPosts'>
      
        <div>
          {profileOfTheComments && profileOfTheComments.map((reses,indexo) => (
        
        <div key={index} className='twitterPostAll'>
          <div className='motherOfAccountNameTwitterPost'>
                <div className='accountNameTwitterPost'>
                
            <div className='photoUser'>
            <Link key={indexo} to={`/profile/${reses?._id}`} preventScrollReset={true}>
              
                      <img key={indexo} loading='lazy' className='img' src={reses?.photo==="" ? img :
                        `${process.env.REACT_APP_APi_LINK}/${reses.photo}`} />
            </Link>
                  </div>
                  {/* <Link className='linkUser' to={`/profile/${reses?._id}`}> */}
            <div className='allOfTheTextTweet'>
              <div className='motherTweets' >
                <div key={indexo} className='userTweet'>
                  <span key={indexo} className='nameOfTheTweet'>{reses?.name}</span>
                <span key={indexo}>@{reses?.userName}</span>
                </div>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(res?.createdAt))}</span>
                    </div>
                      <div>
    <Link className='linkTweet' onClick={() => window.location.href(`/tweet/${res?._id}`)} to={`/tweet/${res?._id}`}>
                        
              <span key={index} className='nameOfTheTweet'>{res?.retweetComments}</span>
              </Link>
                        </div>
            </div>
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
      ))[index]}
      <div className='divOfTwitterPhoto'>
              <div className='anotherdivOfTwitterPhoto'>
        <div className='anothers'>
        {!res?.photo?"":res?.photo?.split("-")[2]?.includes(".mp4")?<ReactPlayer ref={playerRef} url={`${process.env.REACT_APP_APi_LINK}/${res?.photo}`} controls={true} />:<img loading='lazy' className='twitterPhoto' src={`${process.env.REACT_APP_APi_LINK}/${res?.photo}`} />}
        </div>
      </div>
      </div>
        </div>
        
      {/* </Link> */}
      <div className='iconsTweets'>
        <div className='iconTweet comment'>
          <Link to={`/replyingAtComment/${res?._id}/${res?.idOfTheReplyer}`}>
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
                  <Link to={`/postRetweetCommet/${res?._id}/${res?.idOfTheReplyer}`}>
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
              <form  onSubmit={deleteLikes}>
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
         
          <form onSubmit={AddLikes}>
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

export default Thereplies
