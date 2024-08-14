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
import Right from "./right"
const SearchPage = () => {
    const { searchName } = useParams()
    const [Urprofile, setProfile] = useState([])
    const [backAndFourth,setBackAndFourth] = useState(false)
    const [accountSearch, setAccountSearch] = useState(null)
    const [motheraccountSearch, setMotherAccountSearch] = useState(null)
    const {user} = Hooksregisters()
    const [dele,setDelete] = useState(null)
    const [update, setUpdate] = useState(null)
    const [unfollow, setUnfollow] = useState(false)
    const navigates = useNavigate()
    const photo = Urprofile && Urprofile.photo

const [names, setSearch] = useState("")
const searchFunction = async (e) => {
  const formdata = new FormData()
  formdata.append('names', names)
  const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getAllUsers2/${searchName}`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
  })
  const json = await response.json()
  if (response.ok) {
    setAccountSearch(json)
  }

}//serach for the Accounts
useEffect(() => {
  searchFunction()
},[names])//renders the search searchFunction

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
    setMotherAccountSearch(json)
  }

}//serach for the Accounts
useEffect(() => {
  searchMotherFunction()
}, [names])//renders the search searchFunction


const funLogin = async () => {
    const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getAllUsers`)
    const json = await response.json()
    setProfile(json)
    }//get all users
    useEffect(() => {
        return () => {
            funLogin()
        }
        
    }, [])//renders all the useres
    
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
        
        await followersResponse.json()
        if (followersResponse.ok) {
          searchFunction()
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
    
        await followingtResponse.json()
        if (followingtResponse.ok) {
          searchFunction()
            funLogin()
        }
       
    }//to follow the account
  
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
      
      await followersResponse.json()
      if (followersResponse.ok) {
        searchFunction()

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
  
      await followingtResponse.json()
      if (followingtResponse.ok) {
        searchFunction()

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
  {/* ///////////////// when we click an enter we the users that we serached////////////////////////////// */}
      <form>
        <input type='text' className='inputSearchPage'  onKeyDown={(e)=> {
           if (e.key === 'Enter') {
            navigates(`/search/${names}`)
          }
        
        }} value={names} name='name' onChange={(e) => setSearch(e.target.value)} placeholder='serach' />
        <div className='xRightMother searchPage'>
          {
            names !==""?<span onClick={() => setSearch("")} className='xRight'><FontAwesomeIcon icon={faX}/></span>:""
          }

      </div>
      </form>
      {names === "" ? "" :
        <div className='motherOfTheProfile searchPage'>
          <Link className='linkHomePageRetweet' onClick={() => window.location.href(`/search/${names}`)} to={`/search/${names}`}>
          <div className='searchForName'>
            <span>Search for "{names}"</span>
          
          </div>
          </Link>
          
          <div className='borderProfileSearch'></div>
          {motheraccountSearch?.map((res, index) => (
            <div className='ProfileSearch'>
              <Link className='linkSearchProfile' to={`/profile/${res._id}`}>
                <div className='allOfTheTextTweetProfileSearch'>
            
                  <div className='motherProfileo search' >
                   
                    <div className='userTweet profileSearch'>
                    <img loading='lazy' className='imgprofileSearch' src={res?.photo?.map((res)=> res.url)?.[0]||res?.photo} />


                      <div className='userNameProfileSearch'>
                        <div className='nameProfileFollow'>
                          <span className='nameProfileFollow'>{res?.name}</span>
                        </div>
                        <div className='userNameProfileFollow'>
                          <span className='UserNameProfile'>@{res?.userName}</span>
                        </div>
                      </div>
                   
                    </div>
                   
                  
                    
                  </div>
              
                  <div>
                    <span className='nameOfTheTweet'>{res?.Text}</span>
                  </div>
                </div>
              </Link>
            </div>
           
          ))}
      
        </div>
      }
    </div>
                    </div>
                    </div>
          
                </div>
       
          
      <div className='so'>
     
      <div>      </div>
                </div>
                <div className='randomePeople'>
                    <h2>People</h2>
                    <div>
                        {accountSearch?.map((res,index) => (
                            <div>
                            <div className='allOfTheTextTweet'>
                                <div className='motherProfileo' >
                                  <Link className='linkHomePageRetweet' to={`/profile/${res._id}`}>
                                  <div className='userTweet followin'>
                                                      <img loading='lazy' className='img' src={res?.photo?.map((res)=> res.url)?.[0]||res?.photo} />
                                    <div className='userNameProfileFollows'>
                                      <div className='nameProfileFollow'>
                                      <span className='nameProfileFollow'>{res?.name}</span>
                                    </div>
                                    <div className='userNameProfileFollow'>
                                  <span className='UserNameProfile'>@{res?.userName}</span>
                                      </div>
                                      <div>
                                        <span className='UserBioProfile'>{res.bio}</span>
                                      </div>
                                    </div>
                                  
                                  </div>
                                  </Link>
                                  {res?._id === user?._id ? 
                                        <span></span>
                                        :
                                        
                                            
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

export default SearchPage
