import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faX } from '@fortawesome/free-solid-svg-icons'
// import {Hooksregisters} from "../../hooks/hooksRegister/hooksregister"
// import img from "../../images/defultPic.png"
import { Link } from 'react-router-dom'
import Left from "./left"
import {Hooksregisters} from "../../hooks/hooksRegister/hooksregister"
import { useNavigate } from 'react-router-dom';
import img from "../../defultPic.png"

import "./searchPage.css"
// import TextOfThePost from "./posts/textOfThePost"
// import { MoonLoader} from "react-spinners";
import Right from "./right"
const YourProfile = () => {
    const [Urprofile, setProfile] = useState([])
    const [backAndFourth,setBackAndFourth] = useState(false)
    const [motheraccountSearch, setMotherAccountSearch] = useState([])
    const {dispatch,user} = Hooksregisters()
    const [dele,setDelete] = useState(null)
    const [update, setUpdate] = useState(null)
    const [unfollow, setUnfollow] = useState(false)
    const navigates = useNavigate()
    const [names, setSearch] = useState("")


const searchMotherFunction = async (e) => {
  const formdata = new FormData()
  
  formdata.append('names', names)
  const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getUserByName`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({names})
  })
  const json = await response.json()
  if (!response.ok) {
    console.log(json)
  }
  if (response.ok) {
    // console.log(json)
    setMotherAccountSearch(json)
    // navigates(`/search/${names}`)
  }

}///serach for an accounts

useEffect(() => {
  return () => {
searchMotherFunction()
  }
  
}, [names])//renders the search input



const funLogin = async () => {
    const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getAllUsers`)
    const json = await response.json()
    setProfile(json)
    }//get all users
    useEffect(() => {
        return () => {
          funLogin()
        }
            
        
        
    }, [names])//renders all the useres
    
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
        searchMotherFunction()
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
        searchMotherFunction()
          funLogin()
      }
     
  }//to follow the account

  const followDelete = async (e,s) => {
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
      searchMotherFunction()
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
      searchMotherFunction()
        funLogin()
}
  }//to unFollow the account
return (
    <div className='AllComp'>
        <div className='TheLeft'>
            <Left Urprofile={Urprofile} setBackAndFourth={setBackAndFourth} backAndFourth={backAndFourth}/>
        </div>
        
        <div className='center'>
            <div className='containerCenter'>

                <div className='motherOfNavSearchPage'>
                     <div className='theNavOfSearch'>
                <div>
                    <Link className='linkUrProfile' to={"/"}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                        
                    </div>
                    <div className='nameAndPostPro'>
                    <div className='InputGetUser searchPage'>
      <form>
        {/* ///////////////// when we click an enter we the users that we serached////////////////////////////// */}
        <input type='text' className='inputSearchPage'  onKeyDown={(e)=> {
           if (e.key === 'Enter') {
            navigates(`/search/${names}`)
          }
        
        }} value={names} name='name' onChange={(e) => setSearch(e.target.value)} placeholder='serach' />
        <div className='xRightMother searchPage'>
          {
            
            ////////////////theres a X btn when we click the btn it reset the Text////////////////////////////
            names !==""?<span onClick={() => setSearch("")} className='xRight'><FontAwesomeIcon icon={faX}/></span>:""
          }

      </div>
      </form>
      
    </div>
                    </div>
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
                        {motheraccountSearch?.map((res,index) => (
                            <div>
                            <div className='allOfTheTextTweet'>
                                <div className='motherProfileo' >
                                  <Link className='linkHomePageRetweet' to={`/profile/${res._id}`}>
                                  <div className='userTweet followin'>
                                  {/* <img loading='lazy' key={index} className='img' src={imageList[0] === res?.photo ? imageList[0] : `${process.env.REACT_APP_APi_LINK}/${res.photo}`} /> */}
                                  <div className='photoExplore'>
                                  <img loading='lazy' className='img' src={img} />       
                                              </div>
                                    <div className='userNameProfileFollows'>
                                      <div className='nameProfileFollow'>
                                      <span className='nameProfileFollow'>{res?.name}</span>
                                    </div>
                                    <div className='userNameProfileFollow'>
                                  <span className='UserNameProfile'>@{res?.userName}</span>
                                      </div>
                                      <div className='bioProfileSearch'>
                                        <span className='UserBioProfile'>{res.bio}</span>
                                      </div>
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
        
        <div className='TheRight'>
            <div onClick={(()=>setBackAndFourth(false))} className='right'>
            <Right />
        </div>
        </div>
        
    </div>
)
}

export default YourProfile
