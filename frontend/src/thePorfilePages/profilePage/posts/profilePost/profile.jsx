import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {Hooksregisters} from "../../../../hooks/hooksRegister/hooksregister"
import img from "../../../../defultPic.png"
import { Link } from 'react-router-dom'
import Left from "../../../../page/homePage/left"
import "../../yourProfile.css"
import TextOfThePost from "./textOfThePost"
import { MoonLoader} from "react-spinners";
import Right from "../../../../page/homePage/right"

const YourProfile = () => {
    const { id } = useParams()
    // console.log(id)
    const [Urprofile, setProfile] = useState([])
const [backAndFourth,setBackAndFourth] = useState(false)
const {dispatch,user} = Hooksregisters()
const photo = Urprofile && Urprofile.photo
    const [unfollow, setUnfollow] = useState(false)
    const [replycomments,setReplyComments] = useState([])
    const [loding, setLoding] = useState(false)
    const [GetMyLikes, setGetMyLikes] = useState([])
    const [noText, setNoText] = useState(false)
    const [trues,setTrue] = useState(false)
    const funLogin = async () => {
      const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${id}`)
      const json = await response.json()
    setProfile(json)
    // console.log(json)
      }//get ur user from the id paramas
      useEffect(() => {
        return () => {
                        funLogin()
          }
          
          
      }, [user])
    
    const followUpdate = async (e) => {
      setTrue(true)
        e.preventDefault()
        const followersResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/followersUpdate/${id}`)
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
    }
        const followingtResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/followingUpdate/${id}`)
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
    }
    }//follow the users
    const followDelete = async (e) => {
      setTrue(false)

        e.preventDefault()
        const followersResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/followersDelete/${id}`)
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
    }
        const followingtResponse = await fetch((`${process.env.REACT_APP_APi_LINK}/clone/followingDelete/${id}`)
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
    }
    }//unfollow the users
    const replyComments = async (e) => {
        const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${id}`)
        const json = await response.json()

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const oks = await json?.idOfThePost?.toReversed()?.map(ress =>`${process.env.REACT_APP_APi_LINK}/clone/texts/getReplies/${ress}`)
        const promisidz = oks?.map(url => fetch(url).then(response => response.json()))
        const fetcPromisidz = await Promise?.all(promisidz).catch((err) => console.log(err))
        setReplyComments(fetcPromisidz);
        console.log(fetcPromisidz)
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const oksz = await fetcPromisidz?.map(ress => `${process.env.REACT_APP_APi_LINK}/clone/getuserers/${ress?.idText}`)
      const fetchPromises = await oksz?.map(url => fetch(url));
      await Promise.all(fetchPromises)
      .then(responses => Promise.all(responses?.map(response => response.json())))
      .then(data => {
        // Process the data
          setGetMyLikes(data.flat())
          setNoText(data.length===0)
        setLoding(data.flat().length > 0)
      })
      }
      //we get the textS from the account
      useEffect(() => {
          if (user) {
            replyComments()
        }
      }, [user])
return (
    <div className='homePageAll'>
        {/* <div className='TheLeft'> */}
            <Left Urprofile={Urprofile} setBackAndFourth={setBackAndFourth} backAndFourth={backAndFourth}/>
        {/* </div> */}
        
            <div className='center'>
              <div className='containerCenter'>
                <div className='theNav'>
                <div>
                    <Link className='linkUrProfile' to={"/"}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                    </div>
                    <div className='nameAndPostPro'>
                        <span className='nameProfile'>{Urprofile?.name}</span>
                    <span>{Urprofile?.idOfThePost?.length+Urprofile?.myComments?.length} posts</span>
                    </div>
                </div>
                <div className='afterTheNav'>
                    <div className='backgroundPhoto'></div>
                    <div className='profilPicAndBtn'>
                    <img loading='lazy' className='imgProfile' src={Urprofile?.photo?.map((res)=> res.url)?.[0]||Urprofile?.photo} />
                    {Urprofile?._id === user?._id ? 
                          <Link to={`/editProfile/${id}`}>
                          <button className='btnSetProfile'>Edit Profile</button>
                      </Link>
                        :
                        
                            
                        Urprofile?.follwoing?.includes(user?._id) ?
                                    <form onSubmit={followDelete}>
                                        <button onMouseLeave={() => setUnfollow(false)} onMouseEnter={() => setUnfollow(true)} 
                                        className={unfollow?`btnSetProfile unfollow`:`btnSetProfile following`}>{unfollow?"Unfollow":"following"}</button>
                                    </form>
                                    
                                    :
                                        <form onSubmit={followUpdate}>
                                    <button disabled={trues} className='btnSetProfile follow'>Follow</button>
                                </form>
                            
                           
                    
                        
                    }
                    
                    
                    </div>
                    <div className='profileNames'>
                        <span className='nameProfile'>{Urprofile?.name}</span>
                    <span className='userNameProfile'>@{Urprofile?.userName}</span>
                    <span className='bioProfile'>{Urprofile?.bio}</span>
                    </div>
                    <div className='profileNames'>
                        {/* <p>{"Joined "+formatDistanceToNow(new Date(user?.createdAt), { addSuffix: true })}</p> */}
                    </div>
                <div className='followers'>
                    <Link to={`/following/${Urprofile?._id}`}>
                        <p className='textOfFollow'><span className='numberOfFollow'>{Urprofile?.follwoing?.length}</span> follwoing</p>
                    </Link>
                    
                    <Link to={`/followers/${Urprofile?._id}`}>
                        <p className='textOfFollow'><span className='numberOfFollow'>{Urprofile?.followers?.length}</span> followers</p>
                    </Link>
                    
                        
                    </div>
                    <div className='gengersTwit'>
                    <Link className='postsProfile' to={`/profile/${id}`}>
                        <div className='MainDivPost'>
                            <p className='btnProfile'>Posts</p>
                            <div className='borderlinePosts'></div>
                        </div>
                            
                            
                        </Link>
                        <Link className='postsProfile' to={`/replies/${id}`}>
                            <p className='btnProfile'>Replies</p>
                        </Link>
                        <Link className='postsProfile' to={`/likes/${id}`}>
                            <p className='btnProfile'>Likes</p>
                        </Link>
                    
                    
                    
                    </div>
                    <div className='borderline profile'></div>
                    <div>
                    <div>
                    {noText?"" :!loding ?
                            <div className='moonLoader'>
                              <MoonLoader color="#01b3ff" size={30}/>
                              </div>
                            :replycomments?.map((res,idx) => (
                        <TextOfThePost res={res} idx={idx}
                            replycomments={replycomments}
                            replyComments={replyComments}
                            GetMyLikes={GetMyLikes}
                            funLogin={funLogin}
                            
                        />
                        
                    ))}
                    
                </div>
                    
                </div>
                </div>
            </div>
          
        
       
        </div>
        <div className='right'>
            <div onClick={(()=>setBackAndFourth(false))} className='right'>
            <Right />
        </div>
        </div>
    </div>
)
}

export default YourProfile
