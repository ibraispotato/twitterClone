import React,{useState} from 'react'
import { Hooksregisters } from "./hooksregister"
import { useNavigate } from 'react-router-dom';

export const EmailFun = () => {
    const [errors,setError] = useState(null)
    const [isLoading, setLoading] = useState(null)
    const navigates = useNavigate()
    
    const { dispatch,user } = Hooksregisters()
    const userEmail = async (email,password) => {
         
         const response = await fetch(`http://localhost:4000/clone/email/${user?.token}`, {
             method: "POST",
             headers: {
                "Content-Type": "application/json"
            },
             body: JSON.stringify({email,password})
         })
         
         const json = await response.json()
        //  console.log(password)
        
         if (!response.ok) {
              console.log(json)
            
                 setError(json.message)
    
            
             
         }
         if (response.ok) {
             setError(null)
            //  localStorage.setItem("user", JSON.stringify(json))
            dispatch({ type: "LOGIN", payload: json })

            navigates("/your-account-information/account")
             
             console.log("ah")
         }
    }
    return {userEmail,errors,setError}
}