import React,{useState} from 'react'
import {Hooksregisters} from "./hooksregister"
export const Logins = () => {
    const [error,setError] = useState(null)
    const [isLoading, setLoading] = useState(null)
    
    const {dispatch} = Hooksregisters()
    const funLogin = async (email,password) => {
        const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'content-Type':'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({email,password})
        })
        const json = await response.json()
        
        if (!response.ok) {
            
            email===""&&password==="" ? setError("Sorry, You should Provide Your Email"): setError(json.message)
            
        }
        if (response.ok) {
            setError(null)
            localStorage.setItem("user", JSON.stringify(json))
            dispatch({ type: "LOGIN", payload: json })
            
        }
    }
    return {funLogin,error,setError}
}

