
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../commonUtils/firebase";



const requestCollectionRef = collection(db, "requests");

function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}



export async function processRequest(request, decision) {
  const requestRef = doc(requestCollectionRef, request.id);

  if (decision === "decline") {
    await deleteDoc(requestRef);
    return { success: true };
  }

  try {
    await runTransaction(db, async (transaction) => {
      const today = getTodayDateString();

      if (request.requestType === "check-in") {
        const newLogRef = doc(collection(db, `dailyLogs/${today}/logs`));
        transaction.set(newLogRef, {
          documentNo: request.documentNo,
          idNo: request.idNo,
          checkinTime: serverTimestamp(),
          status: "checked-in",

          memberName: request.memberName,
          memberImageUrl: request.memberImageUrl || null,
          membershipDueDate: request.membershipDueDate || null,
          memberShipJoiningDate: request.memberShipJoiningDate || null,
          memberShipShift: request.memberShipShift || null,
          memberShipSeatType: request.memberShipSeatType || null,
        });
      } else if (request.requestType === "check-out") {
        const logRef = doc(db, `dailyLogs/${today}/logs`, request.logId);
        transaction.update(logRef, {
          checkOutTime: serverTimestamp(),
          status: "daycomplete",
        });
      }

      transaction.delete(requestRef);
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: `failed to process request ${error}` };
  }
}


