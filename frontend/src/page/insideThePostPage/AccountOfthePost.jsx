import React,{useState,useEffect,useRef} from 'react'
import {Hooksregisters} from "../../hooks/hooksRegister/hooksregister"
import { Link } from 'react-router-dom'
import img from "../../defultPic.png"
import "./insidePost.css"
const AccountOfthePost = ({id}) => {
    const [Urprofile, setProfile] = useState([])
    const { dispatch, user } = Hooksregisters()
    const idLocal = localStorage.getItem("user")
    const [dele,setDelete] = useState(null)
    const [update,setUpdate] = useState(null)
    const [thePost, setThePost] = useState(null)
    const [theProfilePostReply, setThePostReply] = useState(null)
    const [theProfilePost, setTheProfile] = useState(null)
    const [unfollow, setUnfollow] = useState(false)
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
        
            GetText()
            
        
        
    }, [])
    const funLogin = async () => {
        const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${JSON.parse(idLocal)?._id}`)
        const json = await response.json()
        setProfile(json)
        }//egt an account
        useEffect(() => {
            return () => {
                funLogin()
            }
            
        }, [])
    const followUpdate = async (e) => {
        e.preventDefault()
        const followersResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/followersUpdate/${update}`)
        , {
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
        method: 'POST'
        
            })
        
        const followerstjson = await followersResponse.json()
        if (followersResponse.ok) {
            funLogin()
            GetText()
    }
        const followingtResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/followingUpdate/${update}`)
        , {
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
        method: 'POST'
        
        })
    
        const followingJson = await followingtResponse.json()
        if (followingtResponse.ok) {
            funLogin()
            GetText()
        }
    
    }///follow an account

    const followDelete = async (e) => {
    e.preventDefault()
    const followersResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/followersDelete/${dele}`)
    , {
        headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
        },
        method: 'DELETE'
        
        })
    
    const followerstjson = await followersResponse.json()
    if (followersResponse.ok) {
        funLogin()
        GetText()
}
    const followingtResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/followingDelete/${dele}`)
    , {
        headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
        },
        method: 'DELETE'
        
    })

    const followingJson = await followingtResponse.json()
    if (followingtResponse.ok) {
        funLogin()
        GetText()
}
    }//unfollow an account

    return (
      
    <div>
      <div className='ProfilePost'>
                    <div className='allOfTheTextTweet'>
                        <div className='motherProfileo' >
                        <Link to={`/profile/${theProfilePost?._id}`}>
                        <div className='userTweet followin'>
                            
                        <img loading='lazy' className='img' src={`${theProfilePost?.photo.map((res)=> res.url)?.[0]||theProfilePost?.photo}`} />
                            <div className='userNameProfileFollows'>
                            <div className='nameProfileFollow'>
                            <span className='nameProfileFollow'>{theProfilePost?.name}</span>
                            </div>
                            <div className='userNameProfileFollow'>
                        <span className='UserNameProfile'>@{theProfilePost?.userName}</span>
                                                        </div>
                            </div>
                        </div>
                        </Link>
                        {/* ///////////////if the  id profile of the post same of your account the follows btn disappears/////////////////////////////// */}
                        {theProfilePost?._id === user?._id ? 
                                <span></span>
                                :
                                theProfilePost?.follwoing?.includes(user?._id) ?
                                <form onSubmit={followDelete}>
                                                        <button onClick={() => setDelete(theProfilePost._id)} onMouseLeave={() => setUnfollow(false)}
                                                        onMouseEnter={() => setUnfollow(true)}
                                    className={unfollow ? `btnSetProfile unfollow` : `btnSetProfile following`}>
                                        {unfollow ? "Unfollow" : "following"}</button>
                            </form>
                                            :
                                                <form onSubmit={followUpdate}>
                                            <button onClick={() => setUpdate(theProfilePost._id)}
                                                    className='btnSetProfile follow'>Follow</button>
                                        </form>
                            }
                        
                    </div>
                    <div>
                    </div>
                    </div>
                                </div>
    </div>
  )
}

export default AccountOfthePost
