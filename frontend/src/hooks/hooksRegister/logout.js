import { useContext } from "react"
import {Hooksregisters} from "./hooksregister"


export const LogoutFun = () => {
    const { user, dispatch } = Hooksregisters()
    const Logout = () => {
      
              dispatch({ type: "LOGOUT"})
            localStorage.removeItem("user")
        
      
        }
    return {Logout}
}