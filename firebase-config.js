// Import Firebase SDKs (อัปเดตเวอร์ชันให้ตรงกัน)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, setPersistence, browserLocalPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase Configuration ของคุณ
const firebaseConfig = {
    apiKey: "AIzaSyAtWkncm9cTY7DrwSJqDJd_y81csH9aEgw",
    authDomain: "northstar-bank-b4135.firebaseapp.com",
    projectId: "northstar-bank-b4135",
    storageBucket: "northstar-bank-b4135.firebasestorage.app",
    messagingSenderId: "128504588200",
    appId: "1:128504588200:web:1bb2b4db1e5d54ae54df9d",
    measurementId: "G-D9EMX15HTY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ฟังก์ชันตั้งค่าการจดจำฉัน (Remember Me)
export async function setAuthPersistence(rememberMe) {
    const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
    try {
        await setPersistence(auth, persistence);
    } catch (error) {
        console.error("Auth persistence error:", error);
    }
}
