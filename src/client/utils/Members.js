import {
  addDoc,
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

import CryptoJS from "crypto-js";



//firestore document ref
const membersCollectionRef = collection(db, "members");
const requestCollectionRef = collection(db, "requests");

//localstorage key
const localKey = import.meta.env.VITE_LOCAL_KEY;

//admin login key very dumb
const adminKey = import.meta.env.VITE_ADMIN_KEY;

// library lat and lng 23.050344791491824, 72.67361176729297

//domninos 23.044845174361086, 72.66932530896422
// Library location
const LIBRARY_LAT = 23.044845174361086;
const LIBRARY_LNG = 72.66932530896422;

// Allowed distance (in meters)
const ALLOWED_RADIUS = 705555;

function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

export async function validateUserLocation() {
  try {
    if (!navigator.geolocation) {
      return {
        success: false,
        error: `Geolocation not supported by your browser`,
      };
    }

    const position = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );

    const userlat = position.coords.latitude;
    const userLng = position.coords.longitude;

    const distance = getDistanceFromLatLonInMeters(
      userlat,
      userLng,
      LIBRARY_LAT,
      LIBRARY_LNG
    );

    console.log("distance", distance);
    console.log("allowed radius", ALLOWED_RADIUS);
    console.log("User location:", userlat, userLng);
    console.log("Library location:", LIBRARY_LAT, LIBRARY_LNG);

    if (distance > ALLOWED_RADIUS) {
      return {
        success: false,
        error: `Access denied`,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: `Failed to get location: ${error.message}`,
    };
  }
}

export async function LogInDB(code) {
  try {
    if (code === adminKey) {
      return { success: true, data: "admin" };
    }

    const locationCheck = await validateUserLocation();

    if (!locationCheck.success) {
      return { success: false, error: locationCheck.error };
    }

    const q = query(membersCollectionRef, where("code", "==", code));
    const querySnapshot = await getDocs(q);

    const memberDoc = querySnapshot.docs.at(0);
    if (!memberDoc) {
      return { sucess: false, error: "Invalid code no member found" };
    }

    if (memberDoc.data().loginStatus) {
      return { success: false, error: `Already logged in other device` };
    }

    const memberRef = doc(membersCollectionRef, memberDoc.id);

    await updateDoc(memberRef, {
      code: "",
      loginStatus: true,
    });

    const memberData = { id: memberDoc.id, ...memberDoc.data() };

    const existingMember = localStorage.getItem("member");
    if (existingMember) {
      localStorage.removeItem("member");
    }

    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(memberData),
      localKey
    ).toString();

    localStorage.setItem("member", encryptedData);

    return { success: true, data: memberData };
  } catch (error) {
    return { success: false, error: `failed to query the code ${error}` };
  }
}

export async function readMemberDetails() {
  try {
    const encrypted = localStorage.getItem("member");

    if (!encrypted) {
      return { sucess: false, error: `Error No Member Found In Storage` };
    }

    const bytes = CryptoJS.AES.decrypt(encrypted, localKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
      return { success: false, error: `Failed to decrypt member data` };
    }

    const member = JSON.parse(decrypted);

    return { success: true, data: member };
  } catch (error) {
    return { success: false, error: `Failed to read member ${error}` };
  }
}

export async function reqAdminDB(memberInfo) {
  if (!memberInfo || !memberInfo.id) {
    return { success: false, error: "Member information is missing" };
  }

  try {
    const q = query(
      requestCollectionRef,
      where("memberId", "==", memberInfo.id)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return {
        success: false,
        error: "You already have a request waiting for approval",
      };
    }

    const memberRef = doc(membersCollectionRef, memberInfo.id);
    const memberSnap = await getDoc(memberRef);
    if (!memberSnap.exists()) {
      return { success: false, error: "Could Not Find Memmber Details" };
    }

    const memberData = memberSnap.data();

    console.log("memberid", memberInfo.idNo);

    const requestData = {
      documentNo: memberInfo.id,
      idNo: memberInfo.idNo,
      memberName: memberInfo.name,
      requestType: "check-in",
      requestTime: serverTimestamp(),

      memberImageUrl: memberData.image || null,
      membershipDueDate:
        memberData.memberships[memberData.memberships.length - 1].dueDate ||
        null,
      memberShipJoiningDate:
        memberData.memberships[memberData.memberships.length - 1].joiningDate ||
        null,
      memberShipShift:
        memberData.memberships[memberData.memberships.length - 1].shift || null,
      memberShipSeatType:
        memberData.memberships[memberData.memberships.length - 1].reserved ||
        null,
    };

    await addDoc(requestCollectionRef, requestData);

    return { success: true };
  } catch (error) {
    return { success: false, error: `${error}` };
  }
}

