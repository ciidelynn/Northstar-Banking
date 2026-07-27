import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth, setAuthPersistence } from "./firebase-config.js";

let isLoginMode = true; // สถานะปัจจุบัน (true = เข้าสู่ระบบ, false = สมัครสมาชิก)

// ฟังก์ชันสลับโหมดระหว่าง เข้าสู่ระบบ และ สร้างบัญชี
window.toggleAuthMode = function() {
    isLoginMode = !isLoginMode;
    const formTitle = document.getElementById("form-title");
    const submitBtn = document.getElementById("submit-btn");
    const toggleModeText = document.getElementById("toggle-mode");
    const rememberContainer = document.querySelector(".remember-container");

    if (isLoginMode) {
        formTitle.innerText = "เข้าสู่ระบบ";
        submitBtn.innerText = "เข้าสู่ระบบ";
        toggleModeText.innerText = "สร้างบัญชี";
        rememberContainer.style.display = "flex";
    } else {
        formTitle.innerText = "สร้างบัญชีผู้ใช้";
        submitBtn.innerText = "สมัครสมาชิก";
        toggleModeText.innerText = "เข้าสู่ระบบ";
        rememberContainer.style.display = "none"; 
    }
}

// ฟังก์ชันจัดการอีเมลและรหัสผ่าน (ทั้ง Login และ Register)
window.handleEmailAuth = async function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("rememberMe").checked;

    if (!email || !password) {
        alert("กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน");
        return;
    }

    try {
        if (isLoginMode) {
            await setAuthPersistence(rememberMe);
            await signInWithEmailAndPassword(auth, email, password);
            alert("เข้าสู่ระบบสำเร็จ! กำลังไปหน้ายืนยัน PIN");
            window.location.href = "pin.html"; // เปลี่ยนเส้นทางไปหน้า PIN
        } else {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("สร้างบัญชีสำเร็จ! ยินดีต้อนรับสู่ Northstar Bank");
            window.location.href = "pin.html"; // เปลี่ยนเส้นทางไปหน้า PIN เพื่อสร้างรหัสใหม่
        }
    } catch (error) {
        alert("เกิดข้อผิดพลาด: " + error.message);
    }
}

// ฟังก์ชันเข้าสู่ระบบด้วย Google
window.handleGoogleLogin = async function() {
    const provider = new GoogleAuthProvider();
    try {
        await setAuthPersistence(true); 
        await signInWithPopup(auth, provider);
        alert("เข้าสู่ระบบด้วย Google สำเร็จ! กำลังไปหน้ายืนยัน PIN");
        window.location.href = "pin.html"; // เปลี่ยนเส้นทางไปหน้า PIN
    } catch (error) {
        alert("Google Login Error: " + error.message);
    }
}
