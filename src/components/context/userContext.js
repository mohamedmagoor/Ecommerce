import { createContext, useEffect, useState } from "react";


 export let UserContext =   createContext()

 export default function UserContextProvider({children}){

    const [userToken, setUserToken] = useState(null)

    useEffect(()=>{

        if(localStorage.getItem('token'))
        setUserToken(localStorage.getItem('token'))

    },[])

    return <UserContext.Provider value={{userToken,setUserToken}}>
        {children}
    </UserContext.Provider>



 }