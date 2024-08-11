import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {Hooksregisters} from "../../../../hooks/hooksRegister/hooksregister"
import img from "../../../../images/defultPic.png"
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
const images = require.context('../../../../images', true);
const imageList = images.keys().filter(im => im.includes(photo)).map(image => images(image))
    const [unfollow, setUnfollow] = useState(false)
    const [replycomments,setReplyComments] = useState(null)
    const [loding, setLoding] = useState(false)
    const [GetMyLikes, setGetMyLikes] = useState([])
    const [noText, setNoText] = useState(false)

const funLogin = async () => {
    const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${id}`)
    const json = await response.json()
    setProfile(json)
    }//get user from the id
    useEffect(() => {
        return () => {
            funLogin()
        }
        
    }, [user])
    
    const followUpdate = async (e) => {
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
        if (!user) {
          return 
        }
        const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${id}`)
        const json = await response.json()
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const oks = await json?.idOfThePost?.toReversed()?.map(ress =>`${process.env.REACT_APP_APi_LINK}/clone/texts/GetOneText/${ress}`)
        const fetchPromisesGetReply =  await oks?.map(url => fetch(url));
        const GetReplyPromis = await Promise?.all(fetchPromisesGetReply)
        const getReplyFetcPromis =  await Promise?.all(GetReplyPromis?.map(response => response.json())).catch(err => console.error(err));
        setReplyComments(getReplyFetcPromis.flat());
        setNoText(getReplyFetcPromis.length===0)
        setLoding(getReplyFetcPromis.flat().length > 0)
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
      }
      //we get the textS from the account
      useEffect(() => {
          if (user) {
            replyComments()
        }
      }, [Urprofile])
      const GetLikesFromUser = async (e) => {
        if (!user) {
          return 
        }
      const oks = await replycomments?.map(ress => `${process.env.REACT_APP_APi_LINK}/clone/getuserers/${ress?.idText}`)
      const fetchPromises = await oks?.map(url => fetch(url));
      await Promise.all(fetchPromises)
      .then(responses => Promise.all(responses?.map(response => response.json())))
      .then(data => {
        // Process the data
          setGetMyLikes(data.flat())
          setLoding(data.flat().length > 0)
          
      })
      }// we get the users from the replycomments
      useEffect(() => {
        if (user) {
            // setProfiles()
            GetLikesFromUser()
          
        }
      }, [replycomments])
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
                        <img loading='lazy' className='imgProfile' src={img === Urprofile?.photo ? photo : imageList[0]} />
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
                                    <button className='btnSetProfile follow'>Follow</button>
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
                            GetMyLikes={GetMyLikes}
                            funLogin={funLogin}
                            GetLikesFromUser={GetLikesFromUser}
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
