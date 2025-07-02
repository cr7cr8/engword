import React, { useState, useRef, useEffect, useContext, createContext, } from 'react';
import defaultwordsArr from "./defaultwords"
import { useAudioPlayer } from 'expo-audio';

export const Context = createContext()


export default function ContextProvider(props) {

    const [sourceWordArr, setSouceWordArr] = useState(defaultwordsArr)
    const soundPlayer = useAudioPlayer("")


    return (
        <Context.Provider value={{
            sourceWordArr, setSouceWordArr,
            soundPlayer,

        }}>{props.children}</Context.Provider>
    )

}