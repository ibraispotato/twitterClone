import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {Hooksregisters} from "../../../hooks/hooksRegister/hooksregister"
import img from "../../../images/defultPic.png"
import { Link } from 'react-router-dom'
import Left from "../../../page/homePage/left"
import Right from "../../../page/homePage/right"
import "../yourProfile.css"
import "./follows.css"
const Followers = () => {
  const { id } = useParams()
const {dispatch,user} = Hooksregisters()
const [unfollow, setUnfollow] = useState(false)
const [dele,setDelete] = useState(null)
const [update,setUpdate] = useState(null)
  const [backAndFourth,setBackAndFourth] = useState(false)
  const [Urprofile, setProfile] = useState([])
  const [FollowersUsers, setFollowersUsers] = useState([])
  const images = require.context('../../../images', true);
  const imageList = images.keys().map(image => images(image))

  const funLogin = async () => {
    const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${id}`)
    const json = await response.json()
    setProfile(json)
    }//get a user from the id paramas
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
      }
     
  }// we follow the user

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
}
  }// we unfollow the user
    const usersOfTheFollwoingFunction = async (e) => {
      const oks = await Urprofile.followers?.map(res => `${process.env.REACT_APP_APi_LINK}/clone/getuserers/${res}`)
      
      const fetchTodo = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      };
      
      await Promise.all(oks &&oks.map((item) => fetchTodo(item)))
        .then((res) => {
          setFollowersUsers(res.flat());
          // console.log(res.flat());
        
        })
        .catch((err) => console.error(err));
      
    }// we get the users from the Urprofile followers
    useEffect(() => {
    
      usersOfTheFollwoingFunction()
       
      
    }, [Urprofile])

  return (
    <div className='homePageAll'>
        {/* <div className='TheLeft'> */}
            <Left Urprofile={Urprofile} setBackAndFourth={setBackAndFourth} backAndFourth={backAndFourth}/>
        {/* </div> */}
        
        <div className='center'>
            <div className='containerCenter'>
            <div className='theNav follow'>
                <div>
                    <Link className='linkUrProfile' to={-1}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                    </div>
                    <div className='nameAndPostPro'>
                        <span className='nameProfile'>{Urprofile?.name}</span>
                    <span>{Urprofile?.userName}</span>
                    </div>
                </div>
        <div className='navCenter'>
        <div className='navCenterm'>
        <div>
              </div>

                <Link className='allNav' to={`/following/${id}`}>
                  <span>Following</span>


        <div className='borderHome'></div>
        </Link>
        <Link className='allNav on' to={`/followers/${id}`}>
                <span>Followers</span>
                </Link>
      </div>
      </div>
       
          
      <div className='so'>
     
      <div>
      </div>
                </div>
                <div className='randomePeople'>
                    <h2>People</h2>
                    <div>
                      {/* /////////the accounts includes in usestate and we map it so we can see the users that we searched///////////////////// */}
                        {FollowersUsers?.map((res,index) => (
                            <div>
                            <div className='allOfTheTextTweet'>
                                <div className='motherProfileo' >
                                  <Link className='linkHomePageRetweet' to={`/profile/${res._id}`}>
                                  <div className='userTweet followin'>
                                  {/* <img loading='lazy' key={index} className='img' src={imageList[0] === res?.photo ? imageList[0] : `${process.env.REACT_APP_APi_LINK}/${res.photo}`} /> */}
                                  <div className='photoExplore'>
                                  <img loading='lazy' className='img' src={imageList[0] === res?.photo ? imageList[0] :
                        `${process.env.REACT_APP_APi_LINK}/${res?.photo}`} />       
                                              </div>
                                    <div className='userNameProfileFollows'>
                                      <div className='nameProfileFollow'>
                                      <span className='nameProfileFollow'>{res?.name}</span>
                                    </div>
                                    <div className='userNameProfileFollow'>
                                  <span className='UserNameProfile'>@{res?.userName}</span>
                                      </div>
                                      {/* <div className='bioProfileSearch'>
                                        <span className='UserBioProfile'>{res.bio}</span>
                                      </div> */}
                                    </div>
                                  
                                  </div>
                                  </Link>
                                  {res?._id === user?._id ? 
                        <span></span>
                        :
                        
                            /////////if we follow the accound it appears the unfollow btn so we get two forms one for follow btn and unfollow btn///////////////////////////////////
                                res?.follwoing?.includes(user?._id) ?
                                    <form key={index} onSubmit={followDelete}>
                      <button key={index} onClick={() => setDelete(res._id)}
                        onMouseLeave={() => setUnfollow(null)}
                              onMouseEnter={() => setUnfollow(index)}
                              className={unfollow===index ? `btnSetProfile unfollow` : `btnSetProfile following`}>
                              {unfollow===index ? "Unfollow" : "following"}</button>
                                    </form>
                                    :
                                        <form onSubmit={followUpdate}>
                                    <button onClick={() => setUpdate(res._id)} className='btnSetProfile follow'>Follow</button>
                                </form>
                                
                           
                    
                        
                    }
                   
                                   
                              </div>
                              <div>
                              <span className='nameOfTheTweet'>{res?.Text}</span>
                </div>
                            </div>
                          
                            </div>
                        ))}
                    </div>
                    
            </div>
            </div>
           
          </div>
        
        {/* <div className='TheRight'> */}
            <div onClick={(()=>setBackAndFourth(false))} className='right'>
            <Right />
        {/* </div> */}
        </div>
        
    </div>
  )
}

export default Followers
