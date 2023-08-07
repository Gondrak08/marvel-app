'use client'
import React,{ createContext, useState, useEffect } from "react";

interface defaultValue { 
    agentId: string,
    setAgentId:React.Dispatch<React.SetStateAction<string>>, 
    search:string,
    setSearch:React.Dispatch<React.SetStateAction<string>>
};

const defaultValue:defaultValue = {
    agentId:'',
    setAgentId:():string => '',
    search:'',
    setSearch:():string => ''
}

 const UtilsContext = createContext(defaultValue);

export  function UtilsProvider({children}:{children:React.ReactNode}){
    const [agentId, setAgentId]=useState<string>('');
    const [search, setSearch] = useState<string>('');

    return(
        <UtilsContext.Provider value={{agentId, setAgentId, search, setSearch}}>
            {children}
        </UtilsContext.Provider>
    )
}

export default UtilsContext