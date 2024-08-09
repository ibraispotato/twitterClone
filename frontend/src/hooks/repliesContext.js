import { RepliesContext } from "../backendcontexts/replies"
import { useContext } from "react";

export const useTextContext = () => {
    const context = useContext(RepliesContext)
    if (!context) {
        throw Error("nmoooooooo")
    }
    return context
}