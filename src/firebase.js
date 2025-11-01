// Firebase configuration và initialization
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Firebase config - Fallback to hardcoded values if env vars not available
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDaOe_Omd0XU4xAJHX8VA4h5Yc00lxR5vo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "tdktnn-cf2c0.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "tdktnn-cf2c0",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "tdktnn-cf2c0.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "676619324951",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:676619324951:web:7cfe67132a04ea4cc45652",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-CZP0WD90ND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Kết nối với Firestore Emulator nếu được cấu hình cho development
if (import.meta.env.VITE_USE_EMULATOR === 'true' && import.meta.env.DEV) {
  const emulatorHost = import.meta.env.VITE_EMULATOR_HOST || 'localhost';
  const emulatorPort = parseInt(import.meta.env.VITE_EMULATOR_PORT) || 8080;
  connectFirestoreEmulator(db, emulatorHost, emulatorPort);
}

export default app;
