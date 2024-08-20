import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {Hooksregisters} from "../../../../hooks/hooksRegister/hooksregister"
// import {useTextContext} from "../../../hooks/textContext"
import img from "../../../../defultPic.png"
import { Link } from 'react-router-dom'
import Left from "../../../../page/homePage/left"
import LikesPage from './likesPage'
import { MoonLoader} from "react-spinners";
import Right from "../../../../page/homePage/right"
import "../../yourProfile.css"
const YourProfile = () => {
    const { id } = useParams()
    const [Urprofile, setProfile] = useState([])
    const [backAndFourth,setBackAndFourth] = useState(false)
    const {  user } = Hooksregisters()
    const photo = Urprofile && Urprofile.photo
    const [myLikes,setMyLikes] = useState([])
    const [myLikes2,setMyLikes2] = useState([])
    const [unfollow, setUnfollow] = useState(false)
    const [loding, setLoding] = useState(false)
    const [noText, setNoText] = useState(false)
    const [GetMyLikes, setGetMyLikes] = useState([])
  const [trues,setTrue] = useState(false)
    const maps = myLikes?.map(((res, index) => res === null ? myLikes2?.[index] : res))
const funLogins = async () => {
    const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${id}`)
    const json = await response.json()
  setProfile(json)
  // console.log(json)
    }//get ur user from the id paramas
    useEffect(() => {
      return () => {
                      funLogins()
        }
        
        
    }, [user])
    ////////////////////////////////////Get Likes from profile//////////////////////////////////////////////////
    
  const GETREPLYFROMPOST = async () => {
        ///////////////////////////////////////get account///////////////////////////////////////////////
        const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${id}`)
        const json = await response.json()
      setProfile(json)
      if (!user) {
        return
      }
      
      ////////////////////////////////////////GET COMMENTS FROM REPLY/////////////////////////////////////////////////////////////////
      const oks = json?.myLikes?.map(ress =>`${process.env.REACT_APP_APi_LINK}/clone/texts/getReplies/${ress}`)
      const fetchPromisesGetReply =  await oks?.map(url => fetch(url));
      const GetReplyPromis = await Promise?.all(fetchPromisesGetReply)
      const getReplyFetcPromis =  await Promise?.all(GetReplyPromis?.map(response => response.json())).catch(err => console.error(err));
      setMyLikes(getReplyFetcPromis.flat().reverse())
  
  
      ////////////////////////////////////////GET reply FROM comments/////////////////////////////////////////////////////////////////

      const oko = await json?.myLikes?.toReversed()?.map(ress =>`${process.env.REACT_APP_APi_LINK}/clone/replying/getreplyingComments/${ress}`)
        const fetchPromises = await oko?.map(url => fetch(url));
      const promis = await Promise.all(fetchPromises)
      const fetcPromis = await Promise.all(promis.map(response =>
        response.json(),
        // console.log(true)
      )).catch(err => console.error(err));
      setMyLikes2(fetcPromis.flat().reverse())
      console.log(fetcPromis)
      // console.log(fetcPromis)
  
      /////////////////////if the getReplyFetcPromis array gets null we replace it with fetcPromis arfray////////////////////////////////////////////////////////////////////////////
      const mapso = getReplyFetcPromis.flat()?.map(((res, index) => res === null ? fetcPromis.flat()?.[index] : res))
      console.log(mapso.filter((res) => res!==null))
      
      ////////////////////////////////////////GET users FROM comments/////////////////////////////////////////////////////////////////
      const promisid = await Promise.all(mapso?.filter((res) => res!==null)?.map(ress => `${process.env.REACT_APP_APi_LINK}/clone/getuserers/${ress?.idOfTheReplyer || ress?.idText}`)?.map(url => fetch(url)))
      const fetcPromisid = await Promise.all(promisid.map(response => response.json())).catch(err => console.error(err));
      setGetMyLikes(fetcPromisid?.flat().reverse())
      setNoText(fetcPromisid.flat().length===0)
      setLoding(fetcPromisid.flat().length > 0)
    }
    useEffect(() => {
    
        GETREPLYFROMPOST()
      
        
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
            GETREPLYFROMPOST()
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
            GETREPLYFROMPOST()
    }
    }//follow an account
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
            // funLogins()
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
            GETREPLYFROMPOST()
    }
    }//unfollow an account

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
              </div>
                  
                  
              </Link>
              <Link className='postsProfile' to={`/likes/${id}`}>
                  <div className='MainDivPost'>
                  <p className='btnProfile'>Likes</p>
                  <div className='borderlinePosts'></div>
              </div>
              </Link>
          
          
          </div>
          <div className='borderline profile'></div>
  <div>
  {noText?"" :!loding ?
            <div className='moonLoader'>
              <MoonLoader color="#01b3ff" size={30}/>
              </div>
            :maps?.filter((res) => res!==null)?.map((res, idx) => (
                                <LikesPage res={res} idx={idx} myLikes={myLikes} GetMyLikes={GetMyLikes}
                                GETREPLYFROMPOST={GETREPLYFROMPOST} myLikes2={myLikes2} maps={maps}
                                    /> 
                    ))}
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
