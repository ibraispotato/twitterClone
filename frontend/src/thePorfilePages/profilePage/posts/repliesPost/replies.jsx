import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {Hooksregisters} from "../../../../hooks/hooksRegister/hooksregister"
import img from "../../../../images/defultPic.png"
import { Link } from 'react-router-dom'
import Left from "../../../../page/homePage/left"
import TextOfTheReplies from './textOfTheReplies'
import { MoonLoader} from "react-spinners";
import Right from "../../../../page/homePage/right"
import "../../yourProfile.css"
const YourProfile = () => {
  const { id } = useParams()
  const [Urprofile, setProfile] = useState([])
  const [backAndFourth,setBackAndFourth] = useState(false)
  const {dispatch,user} = Hooksregisters()
  const photo = Urprofile && Urprofile.photo
  const images = require.context('../../../../images', true);
  const imageList = images.keys().filter(im => im.includes(photo)).map(image => images(image))
  const [replycomments, setReplyComments] = useState([])
  const [getCommentsFromComments, setGetCommentsFromComments] = useState([])
  const [getCommentsFromPost, setGetCommentsFromPost] = useState([])
  const [GetProfileOfThePost, setGetProfileOfThePost] = useState([])
  const [loding, setLoding] = useState(false)
  const [unfollow, setUnfollow] = useState(false)
  const maps = getCommentsFromPost?.map(((res, index) => res === null ? getCommentsFromComments?.[index] : res))
  const [MYprofiles, setProfiles] = useState(null)
const [noText, setNoText] = useState(false)

const funLogins = async () => {
    const response = await fetch(`http://localhost:4000/clone/getuser/${id}`)
    const json = await response.json()
    setProfile(json)

    }//we get the users
  useEffect(() => {
  
              funLogins()
            
            
    }, [])



    //////////////////////////////////////Get comments from COMMENTS OF THE POST//////////////////////////////////////////////////
  //   const replyComments = async (e) => {
  //       if (!user) {
  //         return 
  //       }
  //       const oks = await Urprofile?.myComments?.toReversed()?.map(ress =>`http://localhost:4000/clone/replying/getreplyingComments/${ress}`)
        
  //     const fetchTodo = async (url) => {
  //       const res = await fetch(url);
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`);
  //       }
  //       return res.json();
  //     };
      
  //     await Promise.all(oks &&oks.map((item) => fetchTodo(item)))
  //       .then((res) => {
  //           // setReplyComments(res);
          
  //       })
  //       .catch((err) => console.error(err));
      
  //     }
  // useEffect(() => {
  //   replyComments()
        
  //     }, [Urprofile])
      const GETREPLYFROMPOST = async () => {
        if (!user) {
          return
        }
        /////////////////////////we get the users from the id paramas//////////////////////////////////////////////////////////////////////
        const response = await fetch(`http://localhost:4000/clone/getuser/${id}`)
    const json = await response.json()
    setProfile(json)
    ///////////////////////////////we get the comment of the account from the user account////////////////////////////////////////////////////////////////////
        const okse = await json?.myComments?.toReversed()?.map(ress =>`http://localhost:4000/clone/replying/getreplyingComments/${ress}`)
        const promisidz = okse?.map(url => fetch(url).then(response => response.json()))
        const fetcPromisidz = await Promise?.all(promisidz).catch((err) => console.log(err))
        setReplyComments(fetcPromisidz)
        ////////////////////////////////////////GET COMMENTS FROM REPLY/////////////////////////////////////////////////////////////////
        const oks = await fetcPromisidz.map(ress => fetch(`http://localhost:4000/clone/texts/getReplies/${ress?.idText}`).then(response => response.json()));
        const GetReplyPromis = await Promise?.all(oks).catch((err) => console.log(err))
        const getReplyFetcPromis = await Promise.all(GetReplyPromis)
        setGetCommentsFromPost(getReplyFetcPromis)
        console.log(getReplyFetcPromis)
        ////////////////////////////////////////GET reply FROM comments/////////////////////////////////////////////////////////////////
        const oko = await fetcPromisidz.map(ress => fetch(`http://localhost:4000/clone/replying/getreplyingComments/${ress?.idText}`).then(response => response.json()));
        const fetchPromises = await Promise.all(oko).catch((err) => console.log(err))
        const promis = await Promise.all(fetchPromises);
        setGetCommentsFromComments(promis)
        console.log(promis)
        ////////////////////////////////////////GET users FROM comments/////////////////////////////////////////////////////////////////
        const oksz = await fetcPromisidz.map(ress => fetch(`http://localhost:4000/clone/getuserers/${ress?.idOfTheReplyer}`).then(response => response.json()));
        const fetchPromisesz = await Promise.all(oksz).catch((err) => console.log(err))
        const pro = await Promise.all(fetchPromisesz);
            // Process the data
            setProfiles(pro?.flat())        
        ///////////////////////////////////////get user from the comments//////////////////////////////////////////////////////////////////////////////
        const promisid = await getReplyFetcPromis?.map(((res, index) => res === null ? promis?.[index] : res))?.map(ress => `http://localhost:4000/clone/getuserers/${ress?.idOfTheReplyer || ress?.idText}`)
        const ah = promisid.map(ress => fetch(ress).then(response => response.json()));
        const fetcPromisid = await Promise.all(ah).catch((err) => console.log(err))
        const proz = await Promise.all(fetcPromisid);
        
        setGetProfileOfThePost(proz?.flat())
        setNoText(proz?.flat()?.length===0)
        setLoding(proz?.flat()?.length > 0)
      }
      useEffect(() => {
        
          GETREPLYFROMPOST()
        
          
        
          
      }, [])
      const followUpdate = async (e) => {
        e.preventDefault()
        const followersResponse = await fetch((`http://localhost:4000/clone/followersUpdate/${id}`)
        , {
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          method: 'POST'
          
            })
        
        const followerstjson = await followersResponse.json()
        if (followersResponse.ok) {
          funLogins()
    }
        const followingtResponse = await fetch((`http://localhost:4000/clone/followingUpdate/${id}`)
        , {
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          method: 'POST'
          
        })
    
        const followingJson = await followingtResponse.json()
        if (followingtResponse.ok) {
          funLogins()
    }
    }//follow user
    const followDelete = async (e) => {
        e.preventDefault()
        const followersResponse = await fetch((`http://localhost:4000/clone/followersDelete/${id}`)
        , {
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          method: 'DELETE'
          
            })
        
        const followerstjson = await followersResponse.json()
        if (followersResponse.ok) {
          funLogins()
    }
        const followingtResponse = await fetch((`http://localhost:4000/clone/followingDelete/${id}`)
        , {
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          method: 'DELETE'
          
        })
    
        const followingJson = await followingtResponse.json()
        if (followingtResponse.ok) {
          funLogins()
    }
    }//unFollow user
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
                    </div>
                        
                        
                    </Link>
                    <Link className='postsProfile' to={`/replies/${id}`}>
                        <div className='MainDivPost'>
                        <p className='btnProfile'>Replies</p>
                        <div className='borderlinePosts'></div>
                    </div>
                    </Link>
                    <Link className='postsProfile' to={`/likes/${id}`}>
                        <p className='btnProfile'>Likes</p>
                    </Link>
                
                
                
                </div>
                <div className='borderline profile'></div>
        <div>
          {noText?"" :!loding ?
            <div className='moonLoader'>
              <MoonLoader color="#01b3ff" size={30}/>
              </div>
            :
            replycomments?.map((res, idx) => (
              maps.map((resMap, indexMap) => (
                
            <TextOfTheReplies res={res} idx={idx}
              replycomments={replycomments}
              // replyComments={replyComments}
              setGetCommentsFromComments={setGetCommentsFromComments}
              setGetCommentsFromPost={setGetCommentsFromPost}
              setGetProfileOfThePost={setGetProfileOfThePost}
              getCommentsFromComments={getCommentsFromComments}
              getCommentsFromPost={getCommentsFromPost}
              GetProfileOfThePost={GetProfileOfThePost}
              GETREPLYFROMPOST={GETREPLYFROMPOST}
                  resMap={resMap}
                  indexMap={indexMap}
                  funLogins={funLogins}
                  MYprofiles={MYprofiles}
                  
            />
              ))
            )[idx])
                }
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
