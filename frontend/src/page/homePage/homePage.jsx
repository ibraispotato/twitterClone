import React,{useState,useEffect} from 'react'
import Left from "./left"
import "./homepage.css"
import Center from "./center"
import Right from "./right"


const HomePage = ({ids}) => {
  const [backAndFourth,setBackAndFourth] = useState(false)
  const idProfile  = localStorage.getItem("user")
  const [Urprofile, setProfile] = useState(null)

  const funLogin = async () => {
    const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/getuser/${JSON.parse(idProfile)?._id}`)
    const json = await response.json()
  setProfile(json)
  // console.log(json)
    }//get ur user from the id paramas
    useEffect(() => {
      return () => {
                      funLogin()
        }
        
        
    }, [])
  return (
      <div className='homePageAll'>
        
      <Left ids={ids} setBackAndFourth={setBackAndFourth} Urprofile={Urprofile} backAndFourth={backAndFourth} />
          
          
          <div onClick={(()=>setBackAndFourth(false))} className='center'>
              <Center />
          </div>
          <div onClick={(()=>setBackAndFourth(false))} className='right'>
              <Right />
          </div>
    </div>
  )
}

export default HomePage
