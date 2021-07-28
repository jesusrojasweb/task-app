import { useEffect } from "react"

export const useAuth = () => {
    useEffect(()=>{
        const unsubscrib = auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                navigation.replace('Home')
            }
        })
    
        return unsubscrib
    },[])    
}
