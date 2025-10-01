import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import  { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../utils/firebase';

const AuthContext = createContext();


export function useAuth(){
    return useContext(AuthContext)
}
export default function AuthProvider({children}) {
    const [currentUser,setCurrentUser]=useState(null)
    const [loading,setLoading]=useState(true)


    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,async(user)=>{
            if (user) {
                //if user is logged in fetch there details

                const userDocRef=doc(db,"users",user.uid)
                const userDocSnap = await getDoc(userDocRef)

                if (userDocSnap.exists()) {
                    setCurrentUser({...user,...userDocSnap.data()})
                }else{
                    setCurrentUser(user)
                }
            }else{
                setCurrentUser(null)
            }
            setLoading(false)
        })

        return unsubscribe;
    },[])

    const value={
        currentUser
    }
  return (
    <AuthContext.Provider value={value}>{!loading&&children}</AuthContext.Provider>
  )
}
