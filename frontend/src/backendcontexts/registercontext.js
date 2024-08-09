import React,{useState,useEffect,createContext,useReducer} from 'react'

export const contextRegister = createContext()
export const funregister = (state, action) => {
    // if (action.type === "CREATE_LOGIN") {
    //     return{user:[action.payload,...state.user]}
    // }
    if (action.type === "SET_USER") {
        return {user:action.payload}
    }
    if (action.type === "LOGIN") {
        return {user:action.payload}
    }
    if (action.type === "LOGOUT") {
        return {user:null}
    }
    // if (action.type === "DELETE") {
    //     return {
    //         user: state.user.filter(user => user._id !==action.payload._id)
    //     }
    // }
    if (action.type === "UPDATE") {
        return {
            // user: 
            user: console.log(action.payload)
       
        }
        
    }
    else {
        return state
    }
}
export const ContextRegisterProvider = ({children}) => {
    const [state, dispatch] = useReducer(funregister, {
        user:null
    })
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            dispatch({type: "LOGIN", payload: user})
        }
    },[])
    return (
        <contextRegister.Provider value={{
            dispatch,...state
        }}>
            {children}
        </contextRegister.Provider>
    )
}
