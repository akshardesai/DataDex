
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "../../commonUtils/firebase"

import CryptoJS from "crypto-js"


const membersCollectionRef = collection(db, "members")
const localKey = import.meta.env.VITE_LOCAL_KEY
const adminKey = import.meta.env.VITE_ADMIN_KEY

export async function LogInDB(code){
        
    try {


        if (code===adminKey) {
            return {success:true,data:"admin"}
        }

        
        const q = query(membersCollectionRef, where("code", "==", code));
        const querySnapshot = await getDocs(q);

        const memberDoc = querySnapshot.docs.at(0);
        if (!memberDoc) {
          return { sucess: false, error: "Invalid code no member found" };
        }

        const memberRef = doc(membersCollectionRef, memberDoc.id);

        await updateDoc(memberRef, {
          code: "",
          loginStatus: true,
        });

      const memberData = { id: memberDoc.id, ...memberDoc.data() };
      

      const existingMember = localStorage.getItem("member")
      if (existingMember) {
          localStorage.removeItem("member")
      }

      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(memberData),
        localKey

      ).toString()

      localStorage.setItem("member",encryptedData)

        return { success: true, data: memberData };
        
        



    } catch (error) {
        return { success: false, error:`failed to query the code ${error}`}
    }   
}

export async function readMemberDetails(){
    try {
      const encrypted = localStorage.getItem("member")
      
      if (!encrypted) {
        return {sucess:false,error:`Error No Member Found In Storage`}
      }

      const bytes = CryptoJS.AES.decrypt(encrypted, localKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8)

      if (!decrypted) {
          return {success:false,error:`Failed to decrypt member data`}
      }

      const member = JSON.parse(decrypted)

      return {success:true,data:member}
    } catch (error) {
        return {success:false,error:`Failed to read member ${error}`}
    }
}