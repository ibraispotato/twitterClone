import React,{useState} from 'react'
import { Hooksregisters } from "./hooksregister"
import { useNavigate } from 'react-router-dom';

export const AuthFun = () => {
    const [errors,setError] = useState(null)
    const navigates = useNavigate()
    
    const { dispatch } = Hooksregisters()
    const Auth = async (password) => {
         
         const response = await fetch("http://localhost:4000/clone/Auth", {
             method: "POST",
             headers: {
                "Content-Type": "application/json"
            },
             body: JSON.stringify({password})
         })
         
         const json = await response.json()
        //  console.log(password)
        
         if (!response.ok) {
            
                setError(json.message)
         }
         if (response.ok) {
             setError(null)
            navigates("/your-account-information/account")
             
             console.log("ah")
         }
    }
    return {Auth,errors,setError}
}