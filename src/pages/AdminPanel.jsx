import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSessionId, setNewSessionId] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  // Load sessions và questions
  useEffect(() => {
    loadData();
  }, []);

  // Listen to players khi chọn session
  useEffect(() => {
    if (!selectedSession) return;

    const unsubscribe = onSnapshot(
      collection(db, 'sessions', selectedSession.id, 'players'),
      (snapshot) => {
        const playersData = [];
        snapshot.forEach((doc) => {
          playersData.push({ id: doc.id, ...doc.data() });
        });
        playersData.sort((a, b) => (b.score || 0) - (a.score || 0));
        setPlayers(playersData);
      }
    );

    return () => unsubscribe();
  }, [selectedSession]);

  // Listen to selected session changes để cập nhật trạng thái countdown
  useEffect(() => {
    if (!selectedSession) return;

    const unsubscribe = onSnapshot(
      doc(db, 'sessions', selectedSession.id),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const sessionData = docSnapshot.data();
          setSelectedSession({ id: docSnapshot.id, ...sessionData });
          
          // Kiểm tra nếu session đang in-progress thì bật countdown
          if (sessionData.status === 'in-progress' && !isCountdownActive) {
            setCountdown(20);
            setIsCountdownActive(true);
          } else if (sessionData.status !== 'in-progress') {
            setIsCountdownActive(false);
          }
        }
      }
    );

    return () => unsubscribe();
  }, [selectedSession?.id]);

  // Countdown timer
  useEffect(() => {
    if (!isCountdownActive || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 20; // Auto reset về 20s
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCountdownActive, countdown]);

  const loadData = async () => {
    try {
      // Load sessions
      const sessionsSnapshot = await getDocs(collection(db, 'sessions'));
      const sessionsList = [];
      sessionsSnapshot.forEach((doc) => {
        sessionsList.push({ id: doc.id, ...doc.data() });
      });
      setSessions(sessionsList);

      // Load questions
      const questionsSnapshot = await getDocs(collection(db, 'questions'));
      const questionsList = [];
      questionsSnapshot.forEach((doc) => {
        questionsList.push({ id: doc.id, ...doc.data() });
      });
      setQuestions(questionsList);

      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Lỗi khi tải dữ liệu!');
    }
  };

  const createSession = async () => {
    if (!newSessionId.trim()) {
      alert('Vui lòng nhập mã session!');
      return;
    }

    try {
      const sessionRef = doc(db, 'sessions', newSessionId);
      await setDoc(sessionRef, {
        status: 'waiting',
        currentQuestionIndex: 0,
        createdAt: new Date().toISOString(),
        totalQuestions: questions.length
      });
      alert('✅ Tạo session thành công!');
      setNewSessionId('');
      loadData();
    } catch (error) {
      console.error('Error creating session:', error);
      alert('Lỗi khi tạo session!');
    }
  };

  const startQuiz = async (sessionId) => {
    try {
      const sessionRef = doc(db, 'sessions', sessionId);
      await updateDoc(sessionRef, {
        status: 'in-progress',
        currentQuestionIndex: 0
      });
      
      // Bắt đầu countdown
      setCountdown(20);
      setIsCountdownActive(true);
      
      alert('✅ Quiz đã bắt đầu!');
      loadData();
    } catch (error) {
      console.error('Error starting quiz:', error);
      alert('Lỗi khi bắt đầu quiz!');
    }
  };

  const nextQuestion = async (session) => {
    const nextIndex = session.currentQuestionIndex + 1;
    if (nextIndex >= questions.length) {
      alert('Đã hết câu hỏi! Bạn có thể kết thúc quiz.');
      return;
    }

    try {
      const sessionRef = doc(db, 'sessions', session.id);
      await updateDoc(sessionRef, {
        currentQuestionIndex: nextIndex
      });
      
      // Reset countdown về 20s
      setCountdown(20);
      
      alert(`✅ Chuyển sang câu ${nextIndex + 1}!`);
      loadData();
    } catch (error) {
      console.error('Error next question:', error);
      alert('Lỗi khi chuyển câu!');
    }
  };

  const endQuiz = async (sessionId) => {
    if (!confirm('Bạn chắc chắn muốn kết thúc quiz?')) return;

    try {
      const sessionRef = doc(db, 'sessions', sessionId);
      await updateDoc(sessionRef, {
        status: 'completed'
      });
      
      // Tắt countdown
      setIsCountdownActive(false);
      setCountdown(0);
      
      alert('✅ Quiz đã kết thúc!');
      loadData();
    } catch (error) {
      console.error('Error ending quiz:', error);
      alert('Lỗi khi kết thúc quiz!');
    }
  };

  const deleteSession = async (sessionId) => {
    if (!confirm('Bạn chắc chắn muốn xóa session này?')) return;

    try {
      await deleteDoc(doc(db, 'sessions', sessionId));
      alert('✅ Đã xóa session!');
      setSelectedSession(null);
      loadData();
    } catch (error) {
      console.error('Error deleting session:', error);
      alert('Lỗi khi xóa session!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-purple-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-purple-300 text-lg">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-white">👨‍💼 Admin Panel - Quiz Control</h1>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-purple-500/30 rounded-xl text-purple-100 transition-all"
            >
              ← Trang chủ
            </button>
          </div>
          <p className="text-purple-300">Quản lý sessions và điều khiển quiz realtime</p>
        </motion.div>

        {/* Create Session */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">🆕 Tạo Session Mới</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={newSessionId}
              onChange={(e) => setNewSessionId(e.target.value)}
              placeholder="Nhập mã session (vd: session_001)"
              className="flex-1 px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-purple-100 placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
            />
            <button
              onClick={createSession}
              className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all"
            >
              ✅ Tạo Session
            </button>
          </div>
          <p className="text-purple-300 text-sm mt-2">
            📊 Tổng câu hỏi hiện có: <span className="font-bold">{questions.length}</span>
          </p>
        </motion.div>

        {/* Sessions List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Sessions */}
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">📋 Danh sách Sessions ({sessions.length})</h2>
            
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {sessions.length === 0 ? (
                <p className="text-purple-300 text-center py-8">Chưa có session nào. Tạo mới ở trên!</p>
              ) : (
                sessions.map((session) => (
                  <motion.div
                    key={session.id}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer w-[98%] ${
                      selectedSession?.id === session.id
                        ? 'bg-purple-600/30 border-purple-400'
                        : 'bg-white/5 border-purple-700/40 hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedSession(session)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-white">{session.id}</h3>
                        <p className="text-sm text-purple-300">
                          Câu {session.currentQuestionIndex + 1}/{questions.length}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        session.status === 'completed' ? 'bg-green-600/30 text-green-300' :
                        session.status === 'in-progress' ? 'bg-blue-600/30 text-blue-300' :
                        'bg-gray-600/30 text-gray-300'
                      }`}>
                        {session.status === 'completed' ? '✅ Hoàn thành' :
                         session.status === 'in-progress' ? '⏳ Đang chơi' :
                         '⏸️ Chờ'}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-3">
                      {session.status === 'waiting' && (
                        <button
                          onClick={(e) => { e.stopPropagation(); startQuiz(session.id); }}
                          className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-lg transition-all"
                        >
                          🚀 Start Quiz
                        </button>
                      )}
                      
                      {session.status === 'in-progress' && (
                        <>
                          <button
                            onClick={(e) => { e.stopPropagation(); nextQuestion(session); }}
                            className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-all"
                          >
                            ➡️ Next
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); endQuiz(session.id); }}
                            className="flex-1 px-3 py-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-medium rounded-lg transition-all"
                          >
                            🏁 End
                          </button>
                        </>
                      )}

                      <button
                        onClick={(e) => { e.stopPropagation(); deleteSession(session.id); }}
                        className="px-3 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-lg transition-all"
                      >
                        🗑️
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Right: Selected Session Details */}
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              {selectedSession ? `📊 Session: ${selectedSession.id}` : '📊 Chọn Session'}
            </h2>

            {selectedSession ? (
              <div className="space-y-4">
                {/* Countdown Timer */}
                {isCountdownActive && selectedSession.status === 'in-progress' && (
                  <motion.div 
                    className="p-6 bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/50 rounded-xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <div className="text-center">
                      <p className="text-purple-300 text-sm mb-2">⏱️ Thời gian còn lại:</p>
                      <motion.div 
                        className={`text-6xl font-bold ${countdown <= 5 ? 'text-red-400' : 'text-white'}`}
                        animate={countdown <= 5 ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.5, repeat: countdown <= 5 ? Infinity : 0 }}
                      >
                        {countdown}s
                      </motion.div>
                      <div className="mt-4 w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className={`h-full ${countdown <= 5 ? 'bg-red-500' : 'bg-purple-500'}`}
                          initial={{ width: '100%' }}
                          animate={{ width: `${(countdown / 20) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Session Info */}
                <div className="p-4 bg-white/5 rounded-xl">
                  <h3 className="text-lg font-bold text-purple-300 mb-2">Thông tin:</h3>
                  <div className="space-y-1 text-sm">
                    <p className="text-purple-200">
                      Status: <span className="font-bold">{selectedSession.status}</span>
                    </p>
                    <p className="text-purple-200">
                      Câu hiện tại: <span className="font-bold">{selectedSession.currentQuestionIndex + 1}</span>
                    </p>
                    <p className="text-purple-200">
                      Tổng câu: <span className="font-bold">{questions.length}</span>
                    </p>
                  </div>
                </div>

                {/* Players Leaderboard */}
                <div className="p-4 bg-white/5 rounded-xl">
                  <h3 className="text-lg font-bold text-purple-300 mb-3">
                    👥 Người chơi ({players.length})
                  </h3>
                  {players.length === 0 ? (
                    <p className="text-purple-300/70 text-center py-4">Chưa có người chơi nào</p>
                  ) : (
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {players.map((player, index) => (
                        <div
                          key={player.id}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">
                              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
                            </span>
                            <span className="text-white font-medium">{player.name}</span>
                          </div>
                          <span className="text-purple-300 font-bold">{player.score || 0} điểm</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-purple-300 text-center py-8">← Chọn session để xem chi tiết</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
