import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc,  serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "./firebase";


const membersCollectionRef=collection(db,"members");

function manualCreatedAt(date = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",   // "September 29, 2025"
    timeStyle: "medium", // "1:18:15 PM"
    timeZoneName: "short" // "UTC+5:30"
  }).format(date);
}



export async function addMemberDB(member){
 try {
    const memberData={
        ...member,
        memberships:[],
        createdAt: serverTimestamp(),
        keywords:[member.name,member.idNo,member.number]
     }
    const documentRef = await addDoc(membersCollectionRef, memberData);
    return {success:true,data:{id:documentRef.id,...memberData}};
 } catch (error) {
    return {success:false,error:error.message}
 }


    
}

export async function editMemberDB(id,memberData){
    //name, number, gender, address , memberships[]
    try {
        const documentRef= doc(membersCollectionRef,id)
        await updateDoc(documentRef,memberData)
        return {success:true}
    } catch (error) {
        return {success:false,error:`${error}`}
    }
}


export async function deleteMemberDB(id){
    try {
        const documentRef = doc(membersCollectionRef,id)
        await deleteDoc(documentRef)
        return {success:true}
    } catch (error) {   
        return {success:false,error:error.message}
    }
}



export async function addMembershipDB(id,membershipData){
    try {

        
        const newMembershipData={
            id:`mem_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,
            ...membershipData,
           
            
        }
        const docRef=doc(membersCollectionRef,id)
        await updateDoc(docRef,{
            memberships:arrayUnion(newMembershipData)
            
        })

        return {success:true,data:newMembershipData}
    } catch (error) {
        return {success:false,error:error.message}
    }
}

export async function editMembershipDB(memberid,info,updatedMembershipData){
    try {
        const membershipId=info.id
        const documentRef = doc(membersCollectionRef,memberid)
        const docSnap = await getDoc(documentRef)

        if (!docSnap.exists()) {
            return {success:false,error:"Member not found"}
        }

        const allMemberships = docSnap.data().memberships || [];

        const indexToUpdate = allMemberships.findIndex(mem=>mem.id===membershipId)

        if (indexToUpdate === -1) {
            return {success:false,error:"Membership not found to update"}
        }

        allMemberships[indexToUpdate]={
            ...updatedMembershipData,
            id:membershipId
        }

        await updateDoc(documentRef,{memberships:allMemberships})

        return {success:true}
          

    } catch (error) {
        return{success:false,error:error.message}
    }
}

export async function deleteMembershipDB(memberid,info){
    try {
        const membershipId = info.id
        const documentRef= doc(membersCollectionRef,memberid)
        const docSnap = await getDoc(documentRef)

        if (!docSnap.exists()) {
            return {success:false,error:"member not found"}
        }

        const allMemberships = docSnap.data().memberships || [];

        const indexToUpdate = allMemberships.findIndex(mem=>mem.id===membershipId)

        if (indexToUpdate === -1) {
            return {success:false, error : "member not found"}
        }

        allMemberships.splice(indexToUpdate,1)

        await updateDoc(documentRef,{memberships:allMemberships})

        return {success:true}

    } catch (error) {
        return {success:false,error:error.message}
    }
}


export function calculateDaysLeft(jDate,dDate){

    if (!jDate || !dDate) {
        return 0
    }

    const joiningDate = new Date(jDate)
    const dueDate = new Date(dDate)

    const diffTime = dueDate-joiningDate

    const diffdays = diffTime/(1000*60*60*24)

    const totalDays =diffdays + 1

    return totalDays

}

