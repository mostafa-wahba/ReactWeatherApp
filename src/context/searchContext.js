import { createContext, useState } from "react";

let searchContext =createContext('')

export default function searchContextProvider({children}){
    const[search,setSearch]=useState('')
    function searchValue(){
        setSearch
    }
return <searchContext.Provider value={{search}}>
{children}
</searchContext.Provider>
}