// Firebase configuration và initialization
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Firebase config - Fallback to hardcoded values if env vars not available
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCoMWlMKpxHKRPy3FNxQvMFAeKdmMCByzg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "tdktnn-adc05.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "tdktnn-adc05",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "tdktnn-adc05.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "735598298085",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:735598298085:web:7e28b8a7dae4b40b04e0c8",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-MPXWMZTTGZ"
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
