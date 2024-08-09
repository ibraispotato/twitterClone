import React,{useState} from 'react'
import Left from "./left"
import "./homepage.css"
import Center from "./center"
import Right from "./right"


const HomePage = ({ids}) => {
  const [backAndFourth,setBackAndFourth] = useState(false)
  return (
      <div className='homePageAll'>
        
      <Left ids={ids} setBackAndFourth={setBackAndFourth} backAndFourth={backAndFourth} />
          
          
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
