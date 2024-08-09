import React,{useState} from 'react'
import { Hooksregisters } from "./hooksregister"
import { useNavigate } from 'react-router-dom';

export const UserFun = () => {
    const [errors,setError] = useState(null)
    const [isLoading, setLoading] = useState(null)
    const navigates = useNavigate()
    
    const { dispatch, user } = Hooksregisters()
    console.log(user?.token)
    const UserPass = async (checkPassword, password, secPassword) => {
         
         const response = await fetch(`http://localhost:4000/clone/passwordmanually/${user?.token}`, {
             method: "POST",
             headers: {
                "Content-Type": "application/json"
            },
             body: JSON.stringify({checkPassword, password, secPassword})
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
            navigates("/settings/account")
             
            //  console.log("ah")
         }
    }
    return {UserPass,errors,setError}
}