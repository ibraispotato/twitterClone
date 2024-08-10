import React,{useEffect,useState} from 'react'
import {useTextContext} from "../../../hooks/textContext"
import {Hooksregisters} from "../../../hooks/hooksRegister/hooksregister"
import ChildrenHomeTexts from './childrenHomeTexts'
import { MoonLoader} from "react-spinners";
import process from 'process';
const MotherHomeTexts = () => {
const API = process.env.REACT_APP_APi_LINK
  const { user } = Hooksregisters()
  const { dispatchs, texts } = useTextContext()
    const [Urprofiles, setProfiles] = useState([])
    const [loding, setLoding] = useState(false)
    const [noText, setNoText] = useState(false)
    const GetAllText = async () => {
    if (!user) {
      return 
    }
      const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/texts`)
      const json = await response.json()
     
      if (response.ok) {
        dispatchs({ type: "SET", payload: json })

      }
    }//we get all texts
  useEffect(() => {
    if (user) {
      GetAllText()
    }
      }, [dispatchs])//render the function of the text
      const funLogin = async (e) => {

        if (!user) {
          return 
        }
      const oks = await texts?.map(ress => `${process.env.REACT_APP_APi_LINK}/clone/getuserers/${ress?.idText}`)
      
      const fetchPromises = await oks?.map(url => fetch(url));
      await Promise.all(fetchPromises)
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(data => {
        // Process the data
        setProfiles(data.flat())
        setLoding(data.flat().length > 0)//if theres a useres we get a loading screen
        setNoText(data?.length === 0)//if theres no useres we get nothin
      })
      }///we get a users 
      useEffect(() => {
        if (user) {
            funLogin()
        }
      }, [texts])//render the function of the users
    
  return (
    <div>
      {noText?"" :!loding ?
    
            <div className='moonLoader'>
              <MoonLoader color="#01b3ff" size={30}/>
              </div>
            :texts&&texts?.map((res,idx) => (
        
          <ChildrenHomeTexts res={res} GetAllText={GetAllText} idx={idx}
          funLogin={funLogin}
            setProfiles={setProfiles}
            Urprofiles={Urprofiles}
          />
          
        
  
))}
    </div>
    )
  
}

export default MotherHomeTexts
