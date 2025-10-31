import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import Quiz from '../components/Quiz';
import Leaderboard from '../components/Leaderboard';
import { motion } from 'framer-motion';

const QuizPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [player, setPlayer] = useState(null);
  const [session, setSession] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Lấy sessionId từ URL params
    const sid = searchParams.get('session');
    if (sid) {
      setSessionId(sid);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!sessionId) return;

    // Listen to session status
    const sessionRef = doc(db, 'sessions', sessionId);
    const unsubscribe = onSnapshot(sessionRef, (doc) => {
      if (doc.exists()) {
        const sessionData = doc.data();
        setSession(sessionData);
        
        if (sessionData.status === 'in-progress' && player) {
          setShowQuiz(true);
        } else if (sessionData.status === 'completed') {
          setShowResults(true);
        }
      }
    });

    return () => unsubscribe();
  }, [sessionId, player]);

  const handleJoinSession = async (e) => {
    e.preventDefault();
    
    if (!playerName.trim() || !sessionId.trim()) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    try {
      // Kiểm tra session có tồn tại không
      const sessionRef = doc(db, 'sessions', sessionId);
      const sessionSnap = await getDoc(sessionRef);
      
      if (!sessionSnap.exists()) {
        alert('Session không tồn tại!');
        return;
      }

      // Tạo hoặc cập nhật player
      const playerId = `player_${Date.now()}`;
      const playerRef = doc(db, 'sessions', sessionId, 'players', playerId);
      
      const playerData = {
        id: playerId,
        name: playerName,
        score: 0,
        answers: [],
        joinedAt: new Date().toISOString()
      };

      await setDoc(playerRef, playerData);
      setPlayer(playerData);
      
    } catch (error) {
      console.error('Error joining session:', error);
      alert('Có lỗi xảy ra khi tham gia session!');
    }
  };

  const handleQuizComplete = () => {
    setShowQuiz(false);
    setShowResults(true);
  };

  // Trang nhập tên và session ID
  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 w-full max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-3xl font-bold text-center mb-8 text-purple-100"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            🎯 Tham gia Quiz
          </motion.h1>

          <form onSubmit={handleJoinSession} className="space-y-6">
            <div>
              <label className="block text-purple-200 mb-2 font-medium">Tên của bạn</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-purple-100 placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                placeholder="Nhập tên của bạn"
                required
              />
            </div>

            <div>
              <label className="block text-purple-200 mb-2 font-medium">Mã Session</label>
              <input
                type="text"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-purple-100 placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                placeholder="Nhập mã session"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="w-full py-4 px-6 bg-purple-600 text-purple-50 font-bold text-xl rounded-xl hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🚀 Tham gia ngay
            </motion.button>
          </form>

          <motion.button
            onClick={() => navigate('/')}
            className="w-full mt-4 py-2 px-4 text-purple-300 hover:text-purple-100 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            ← Quay lại trang chủ
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Trang chờ quiz bắt đầu
  if (!showQuiz && !showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="w-full max-w-4xl space-y-8">
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="text-6xl mb-6"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            >
              🎮
            </motion.div>
            <h2 className="text-3xl font-bold text-purple-100 mb-4">Chào {player.name}!</h2>
            <p className="text-purple-300/80 text-lg mb-6">
              {session?.status === 'waiting' ? 
                'Đang chờ giáo viên khởi động quiz...' : 
                'Quiz sắp bắt đầu!'}
            </p>
            <div className="flex justify-center space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-purple-400 rounded-full"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: i * 0.2 
                  }}
                />
              ))}
            </div>
          </motion.div>

          <Leaderboard sessionId={sessionId} />
        </div>
      </div>
    );
  }

  // Trang làm quiz
  if (showQuiz && !showResults) {
    return (
      <Quiz 
        player={player} 
        sessionId={sessionId} 
        onQuizComplete={handleQuizComplete}
      />
    );
  }

  // Trang kết quả cuối cùng
  if (showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="w-full max-w-4xl space-y-8">
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="text-6xl mb-6"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            >
              🎉
            </motion.div>
            <h2 className="text-3xl font-bold text-purple-100 mb-4">Quiz đã kết thúc!</h2>
            <p className="text-purple-300/80 text-lg mb-6">
              Cảm ơn {player.name} đã tham gia. Điểm của bạn: <span className="font-bold text-yellow-300">{player.score}</span>
            </p>
          </motion.div>

          <Leaderboard sessionId={sessionId} isFinal={true} />

          <motion.button
            onClick={() => navigate('/')}
            className="w-full py-4 px-6 bg-purple-600 text-purple-50 font-bold text-xl rounded-xl hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ← Quay lại trang chủ
          </motion.button>
        </div>
      </div>
    );
  }
};

export default QuizPage;
