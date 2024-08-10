import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import "./homepage.css"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Right = () => {
  const [names, setSearch] = useState("")
  const [accountSearch, setAccountSearch] = useState(null)
  const images = require.context('../../images', true);
  const imageList = images.keys().map(image => images(image))
  const navigates = useNavigate()

  const searchFunction = async (e) => {
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
      setAccountSearch(json)
    }

  }// when we type on the text we get the accounts that we searched

  useEffect(() => {
    searchFunction()
  }, [names])////render the searchFunction
  
  
  return (
    <div className='InputGetUser'>
        {/* ///////////////// when we click an enter we the users that we serached////////////////////////////// */}
      <form onSubmit={searchFunction}>
        <input type='text' className='input' value={names} name='name' onKeyDown={(e)=> {
           if (e.key === 'Enter') {
            navigates(`/search/${names}`)
          }
        
        }} onChange={(e) => setSearch(e.target.value)} placeholder='serach' />
        <div className='xRightMother'>
          {
            names !==""?<span onClick={() => setSearch("")} className='xRight'><FontAwesomeIcon icon={faX}/></span>:""
          }

      </div>
      </form>
      {/* ////////////if the names State is "" we got nothin if theres a user name we get the accounts///////////////////////////////// */}
      {names === "" ? "" :
        <div className='motherOfTheProfile'>
          <Link className='linkHomePageRetweet' to={`/search/${names}`}>
          <div className='searchForName'>
            <span>Search for "{names}"</span>
          
          </div>
          </Link>
          
          <div className='borderProfileSearch'></div>
          {/* /////////////accountSearch state that we typed in we map it over to get the accounts///////////////////////////////////////////// */}
          {accountSearch?.map((res, index) => (
            <div className='ProfileSearch'>
              <Link className='linkSearchProfile' to={`/profile/${res._id}`}>
                <div className='allOfTheTextTweetProfileSearch'>
            
                  <div className='motherProfileo search' >
                   
                    <div className='userTweet profileSearch'>
                      <img loading='lazy' key={index} className='imgprofileSearch' src={imageList[0] === res?.photo ? imageList[0] : `${process.env.REACT_APP_APi_LINK}/${res.photo}`} />
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
  )
}

export default Right
