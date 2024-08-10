import React,{useState} from 'react'
import { Hooksregisters } from "./hooksregister"
import { useNavigate } from 'react-router-dom';

export const UserFun = () => {
    const [errors,setError] = useState(null)
    const [isLoading, setLoading] = useState(null)
    const navigates = useNavigate()
    
    const { dispatch, user } = Hooksregisters()
    console.log(user)
    const UserName = async (userName) => {
         
         const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/userName/${user?.token}`, {
             method: "POST",
             headers: {
                "Content-Type": "application/json"
            },
             body: JSON.stringify({userName})
         })
         
         const json = await response.json()
         console.log(json)
        
         if (!response.ok) {
              console.log(json)
            
                 setError(json.message)
    
            
             
         }
         if (response.ok) {
             setError(null)
            //  localStorage.setItem("user", JSON.stringify(json))
              dispatch({ type: "LOGIN", payload: json })
            navigates("/your-account-information/account")
             
            //  console.log("ah")
         }
    }
    return {UserName,errors,setError}
}