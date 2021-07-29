import { useEffect } from "react"
import { auth } from "../firebase"

export const useAuth = (navigation) => {
    useEffect(()=>{
        const unsubscrib = auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                navigation.replace('Home')
            }
        })
    
        return unsubscrib
    },[[navigation]])    
}
