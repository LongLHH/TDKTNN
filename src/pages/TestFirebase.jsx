import { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const TestFirebase = () => {
  const [status, setStatus] = useState('Testing...');
  const [sessions, setSessions] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    testFirebase();
  }, []);

  const testFirebase = async () => {
    try {
      // Test 1: Get all sessions
      console.log('🔥 Testing Firebase connection...');
      const sessionsSnapshot = await getDocs(collection(db, 'sessions'));
      const sessionsList = [];
      sessionsSnapshot.forEach((doc) => {
        sessionsList.push({ id: doc.id, ...doc.data() });
      });
      setSessions(sessionsList);
      console.log('✅ Sessions found:', sessionsList);

      // Test 2: Get all questions
      const questionsSnapshot = await getDocs(collection(db, 'questions'));
      const questionsList = [];
      questionsSnapshot.forEach((doc) => {
        questionsList.push({ id: doc.id, ...doc.data() });
      });
      setQuestions(questionsList);
      console.log('✅ Questions found:', questionsList);

      // Test 3: Try to get specific session
      const sessionRef = doc(db, 'sessions', 'demo_session');
      const sessionSnap = await getDoc(sessionRef);
      console.log('✅ demo_session exists:', sessionSnap.exists());
      if (sessionSnap.exists()) {
        console.log('✅ demo_session data:', sessionSnap.data());
      }

      setStatus('✅ Firebase Connected!');
    } catch (error) {
      console.error('❌ Firebase Error:', error);
      setStatus(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">🔥 Firebase Connection Test</h1>
      
      <div className="mb-8 p-4 bg-gray-800 rounded">
        <h2 className="text-xl font-bold mb-2">Status:</h2>
        <p className="text-lg">{status}</p>
      </div>

      <div className="mb-8 p-4 bg-gray-800 rounded">
        <h2 className="text-xl font-bold mb-2">Environment Variables:</h2>
        <pre className="text-sm overflow-auto">
          {JSON.stringify({
            apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.substring(0, 10) + '...',
            projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
            hasApiKey: !!import.meta.env.VITE_FIREBASE_API_KEY,
            hasProjectId: !!import.meta.env.VITE_FIREBASE_PROJECT_ID,
          }, null, 2)}
        </pre>
      </div>

      <div className="mb-8 p-4 bg-gray-800 rounded">
        <h2 className="text-xl font-bold mb-2">Sessions ({sessions.length}):</h2>
        {sessions.length > 0 ? (
          <pre className="text-sm overflow-auto">
            {JSON.stringify(sessions, null, 2)}
          </pre>
        ) : (
          <p className="text-red-400">No sessions found!</p>
        )}
      </div>

      <div className="mb-8 p-4 bg-gray-800 rounded">
        <h2 className="text-xl font-bold mb-2">Questions ({questions.length}):</h2>
        {questions.length > 0 ? (
          <pre className="text-sm overflow-auto">
            {JSON.stringify(questions, null, 2)}
          </pre>
        ) : (
          <p className="text-red-400">No questions found!</p>
        )}
      </div>

      <button
        onClick={testFirebase}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded text-white font-bold"
      >
        🔄 Test Again
      </button>

      <div className="mt-4">
        <a href="/" className="text-blue-400 hover:underline">← Back to Home</a>
      </div>
    </div>
  );
};

export default TestFirebase;
