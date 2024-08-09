import { useContext } from "react"
import {contextRegister} from "../../backendcontexts/registercontext"

export const Hooksregisters = () => {
    const context = useContext(contextRegister)
    if (!context) {
        throw Error("nah")
        
    }
    return context

}