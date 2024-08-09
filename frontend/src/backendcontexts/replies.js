import React, { useState, useEffect,createContext, useReducer } from "react";
export const RepliesContext = createContext()
export const RepliesReduxer = (state, action) => {
    if (action.type === "SET") {
        return {replies:action.payload}
    }
    if (action.type === "CREATE") {
        return{replies:[action.payload,...state.replies]}
    }
     if (action.type=== "DELETE") {
         return {
            replies:state.replies.filter((e) => e._id !==action.payload._id)
        }
     }
    if (action.type === "UPDATE") {
        
        return {
            replies: [...state.replies]
           
          
        }
        
        
    }
    else {
        return state
    }
}
export const RepliesContextProvider = ({ children }) => {
    const [state, dispatchs] = useReducer(RepliesReduxer, {
        replies:null
    })
    return (
        <RepliesContext.Provider value={{
            dispatchs, ...state
        }}>
            {children}
        </RepliesContext.Provider>
    )
}