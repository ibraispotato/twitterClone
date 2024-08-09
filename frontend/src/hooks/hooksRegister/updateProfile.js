import React,{useState} from 'react'
import { Hooksregisters } from "./hooksregister"
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom';

export const UpdateProfile = () => {
    const { id } = useParams()
    const [error,setError] = useState(null)
    const {dispatch} = Hooksregisters()
    const navigates = useNavigate()
// console.log(id)
    const epdateProfile = async (name, photo, bio) => {
        const formdata = new FormData()
        formdata.append('name', name)
        formdata.append('photo', photo)
        formdata.append('bio', bio)
        // console.log(photo)
        const response = await fetch(`http://localhost:4000/clone/updateprofile/${id}`, {
            
        method: "PATCH",
            // headers: {"content-Type": "application/json",
            //     "Content-Type": "multipart/form-data"
            // }, 
            // body: JSON.stringify({name, bio, photo})
            body: formdata
    })
    const json = await response.json()

    // console.log(json)
        
            // console.log()
          
        if (!response.ok) {
            
            setError(json.message)
            
        }
        if (response.ok) {
            setError(null)
            // localStorage.removeItem("user")
            navigates(`/profile/${id}`)
            // window.location.reload();
            dispatch({ type: "LOGIN", payload: json })

            
        }
    }
    return {epdateProfile,error,setError}
}