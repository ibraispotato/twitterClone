import React, { useState, useEffect,createContext, useReducer } from "react";
export const TextContext = createContext()
export const textReduxer = (state, action) => {
    if (action.type === "SET") {
        return {texts:action.payload}
    }
    if (action.type === "CREATE") {
        return{texts:[action.payload,...state.texts]}
    }
     if (action.type=== "DELETE") {
         return {
            texts:state.texts.filter((e) => e._id !==action.payload._id)
        }
     }
    if (action.type === "UPDATE") {
        
        return {
            texts: state.texts.map((e) => e?._id === action.payload?._id ? {...state.texts, likes:state.texts.likes}:state.texts)
           
          
        }
        
        
    }
    else {
        return state
    }
}
export const TextContextProvider = ({ children }) => {
    const [state, dispatchs] = useReducer(textReduxer, {
        texts:null||[]
    })
    return (
        <TextContext.Provider value={{
            dispatchs, ...state
        }}>
            {children}
        </TextContext.Provider>
    )
}