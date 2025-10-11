import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../commonUtils/firebase";

function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const today = getTodayDateString();
const logsCollectionRef = collection(db, `dailyLogs/${today}/logs`);
export const fetchMoreLogs = async (lastVisible) => {
  try {
    const q = query(
      logsCollectionRef,
      orderBy("checkinTime", "desc"),
      startAfter(lastVisible),
      limit(5)
    );
    const documentSnapShots = await getDocs(q);
    const newLogs = [];
    documentSnapShots.forEach((doc) => {
      newLogs.push({ id: doc.id, ...doc.data() });
    });

    const newLastVisible =
      documentSnapShots.docs[documentSnapShots.docs.length - 1];

    return { logs: newLogs, lastVisible: newLastVisible };
  } catch (error) {
    console.error("Error fetching more logs", error);

    return { logs: [], lastVisible: null };
  }
};

export const deleteLogDB = async (member) => {
  try {
    const refDocument = doc(logsCollectionRef, member.id);
    await deleteDoc(refDocument);

    return { success: true };
  } catch (error) {
    return { success: false, error: `${error}` };
  }
};
