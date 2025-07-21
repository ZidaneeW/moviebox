import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// JANGAN import getAnalytics di sini
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCShJMGt_q90ziAGGlI5ibUtr6ksaFBJFI",
  authDomain: "finalprojectbootcamp-1b8e7.firebaseapp.com",
  projectId: "finalprojectbootcamp-1b8e7",
  storageBucket: "finalprojectbootcamp-1b8e7.appspot.com", // <--- PENTING!
  messagingSenderId: "230763117890",
  appId: "1:230763117890:web:281210a21fd4e4be445cdb",
  measurementId: "G-XX6BCPW2SX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Analytics hanya untuk browser, **jangan** dipakai global/server
// let analytics;
// if (typeof window !== "undefined") {
//   analytics = getAnalytics(app);
// }

export { auth, db };
