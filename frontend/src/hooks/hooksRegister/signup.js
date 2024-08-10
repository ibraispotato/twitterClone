import React,{useState} from 'react'
import {Hooksregisters} from "./hooksregister"
export const Signup = () => {
    const [error,setError] = useState(null)
    const [isLoading,setLoading] = useState(null)
    const {dispatch} = Hooksregisters()
    const funSignup = async (name, userName, photo, email, password,bio,Next,setNext) => {
        const formdata = new FormData()
        formdata.append('name', name)
        formdata.append('userName', userName)
        formdata.append('email', email)
        formdata.append('password', password)
        formdata.append('photo', photo)
        formdata.append('bio', bio)
        const response = await fetch(`${process.env.REACT_APP_APi_LINK}/clone/signup`, {
            
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, userName, photo, email, password,bio})
        })
        const json = await response.json()
        
        if (!response.ok) {
            setError(null)
            console.log(json)
            email===""&&password==="" ? setError("Sorry, You should Provide Your Email & password"): setError(json.message)
        }
        if (response.ok) {
            setError(null)
            localStorage.setItem("user",JSON.stringify(json))
            dispatch({ type: "LOGIN", payload: json })
        
        }
    }
    return {funSignup,error,setError}
}

