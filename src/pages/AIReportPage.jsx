import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';

const AIReportPage = () => {
  const navigate = useNavigate();
  const [aiUsageData, setAiUsageData] = useState([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalPlayers: 0,
    averageScore: 0,
    topScore: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // overview, sessions, analytics

  useEffect(() => {
    loadAIUsageData();
  }, []);

  const loadAIUsageData = async () => {
    try {
      // Load sessions data
      const sessionsQuery = query(
        collection(db, 'sessions'),
        orderBy('createdAt', 'desc'),
        limit(20)
      );
      const sessionsSnapshot = await getDocs(sessionsQuery);
      
      let totalPlayers = 0;
      let totalScore = 0;
      let maxScore = 0;
      const sessionsData = [];

      for (const sessionDoc of sessionsSnapshot.docs) {
        const sessionData = { id: sessionDoc.id, ...sessionDoc.data() };
        
        // Load players for each session
        const playersSnapshot = await getDocs(
          collection(db, 'sessions', sessionDoc.id, 'players')
        );
        
        const players = [];
        playersSnapshot.forEach(playerDoc => {
          const playerData = playerDoc.data();
          players.push(playerData);
          totalPlayers++;
          totalScore += playerData.score || 0;
          if (playerData.score > maxScore) {
            maxScore = playerData.score;
          }
        });

        sessionData.players = players;
        sessionsData.push(sessionData);
      }

      setAiUsageData(sessionsData);
      setStats({
        totalSessions: sessionsSnapshot.size,
        totalPlayers,
        averageScore: totalPlayers > 0 ? Math.round(totalScore / totalPlayers) : 0,
        topScore: maxScore
      });
      setLoading(false);
    } catch (error) {
      console.error('Error loading AI usage data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-purple-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-purple-300 text-lg">Đang tải dữ liệu AI...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">🤖 AI Usage Report</h1>
              <p className="text-purple-300">Theo dõi và phân tích sử dụng hệ thống Quiz AI</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="mt-4 md:mt-0 px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-purple-500/30 rounded-xl text-purple-100 transition-all"
            >
              ← Quay lại
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-2 bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-xl p-2">
            {[
              { id: 'overview', label: '📊 Tổng quan', icon: '📊' },
              { id: 'sessions', label: '🎮 Sessions', icon: '🎮' },
              { id: 'analytics', label: '📈 Phân tích', icon: '📈' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-purple-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Tổng Sessions', value: stats.totalSessions, icon: '🎯', color: 'from-blue-600 to-cyan-600' },
                  { label: 'Tổng Người chơi', value: stats.totalPlayers, icon: '👥', color: 'from-purple-600 to-pink-600' },
                  { label: 'Điểm TB', value: stats.averageScore, icon: '📊', color: 'from-green-600 to-emerald-600' },
                  { label: 'Điểm cao nhất', value: stats.topScore, icon: '🏆', color: 'from-yellow-600 to-orange-600' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-xl`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-4xl mb-2">{stat.icon}</div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Activity */}
              <motion.div 
                className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-white mb-4">📋 Hoạt động gần đây</h2>
                <div className="space-y-3">
                  {aiUsageData.slice(0, 5).map((session, index) => (
                    <motion.div
                      key={session.id}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">
                          {session.status === 'completed' ? '✅' : session.status === 'in-progress' ? '⏳' : '⏸️'}
                        </div>
                        <div>
                          <div className="font-medium text-white">Session {session.id.slice(-8)}</div>
                          <div className="text-sm text-purple-300">
                            {session.players?.length || 0} người chơi
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-purple-300">
                          {session.status === 'completed' ? 'Hoàn thành' : 
                           session.status === 'in-progress' ? 'Đang chơi' : 'Đang chờ'}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Sessions Tab */}
          {activeTab === 'sessions' && (
            <motion.div
              key="sessions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <motion.div 
                className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold text-white mb-4">🎮 Danh sách Sessions</h2>
                <div className="space-y-4">
                  {aiUsageData.map((session, index) => (
                    <motion.div
                      key={session.id}
                      className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">
                            Session {session.id.slice(-8)}
                          </h3>
                          <p className="text-purple-300">
                            {session.players?.length || 0} người chơi • {session.status || 'N/A'}
                          </p>
                        </div>
                        <div className={`px-4 py-2 rounded-lg font-medium mt-2 md:mt-0 ${
                          session.status === 'completed' ? 'bg-green-600/30 text-green-300' :
                          session.status === 'in-progress' ? 'bg-blue-600/30 text-blue-300' :
                          'bg-gray-600/30 text-gray-300'
                        }`}>
                          {session.status === 'completed' ? '✅ Hoàn thành' :
                           session.status === 'in-progress' ? '⏳ Đang chơi' :
                           '⏸️ Đang chờ'}
                        </div>
                      </div>
                      
                      {/* Players list */}
                      {session.players && session.players.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <h4 className="text-sm font-medium text-purple-300">Người chơi:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {session.players.slice(0, 6).map((player, pidx) => (
                              <div key={pidx} className="flex items-center justify-between p-2 bg-white/5 rounded">
                                <span className="text-white">{player.name}</span>
                                <span className="text-purple-300 font-medium">{player.score || 0} điểm</span>
                              </div>
                            ))}
                          </div>
                          {session.players.length > 6 && (
                            <p className="text-sm text-purple-400">+ {session.players.length - 6} người khác...</p>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <motion.div 
                className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">📈 Phân tích chi tiết</h2>
                
                <div className="space-y-6">
                  {/* Performance Chart (Placeholder) */}
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Hiệu suất theo thời gian</h3>
                    <div className="h-64 bg-white/5 rounded-xl flex items-center justify-center">
                      <div className="text-center text-purple-300">
                        <div className="text-4xl mb-2">📊</div>
                        <p>Biểu đồ phân tích sẽ được hiển thị ở đây</p>
                        <p className="text-sm mt-2">Tích hợp Chart.js hoặc Recharts để hiển thị</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl">
                      <h4 className="text-purple-300 mb-2">Tỷ lệ hoàn thành</h4>
                      <div className="text-2xl font-bold text-white">
                        {stats.totalSessions > 0 
                          ? Math.round((aiUsageData.filter(s => s.status === 'completed').length / stats.totalSessions) * 100)
                          : 0}%
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <h4 className="text-purple-300 mb-2">Người chơi TB/Session</h4>
                      <div className="text-2xl font-bold text-white">
                        {stats.totalSessions > 0 
                          ? Math.round(stats.totalPlayers / stats.totalSessions)
                          : 0}
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <h4 className="text-purple-300 mb-2">Điểm trung bình cao nhất</h4>
                      <div className="text-2xl font-bold text-white">
                        {stats.topScore}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AIReportPage;
