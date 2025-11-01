import React, { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, updateDoc, collection, getDocs, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { calculateScore, formatTimeRemaining } from '../utils/score';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Component chính quiz
 * @param {object} player - Thông tin người chơi
 * @param {string} sessionId - ID của session quiz
 * @param {function} onQuizComplete - Callback khi quiz hoàn thành
 */
const Quiz = ({ player, sessionId, onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [session, setSession] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(20);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [answerStartTime, setAnswerStartTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentAnswerResult, setCurrentAnswerResult] = useState(null);

  // Listen to session changes
  useEffect(() => {
    let unsubscribe;
    const debounceTimer = setTimeout(() => {
      const sessionRef = doc(db, 'sessions', sessionId);
      unsubscribe = onSnapshot(sessionRef, (doc) => {
        if (doc.exists()) {
          const sessionData = doc.data();
          setSession(sessionData);
          
          if (sessionData.status === 'completed') {
            onQuizComplete?.();
          }
        }
      });
    }, 100);

    return () => {
      clearTimeout(debounceTimer);
      unsubscribe?.();
    };
  }, [sessionId, onQuizComplete]);

  // Listen to player score changes để cập nhật điểm realtime
  const [currentScore, setCurrentScore] = useState(player.score || 0);
  
  useEffect(() => {
    let unsubscribe;
    const playerRef = doc(db, 'sessions', sessionId, 'players', player.id);
    unsubscribe = onSnapshot(playerRef, (doc) => {
      if (doc.exists()) {
        const playerData = doc.data();
        setCurrentScore(playerData.score || 0);
      }
    });

    return () => {
      unsubscribe?.();
    };
  }, [sessionId, player.id]);

  // Load câu hỏi hiện tại khi session hoặc questions thay đổi
  useEffect(() => {
    if (session && questions.length > 0 && session.currentQuestionIndex !== undefined) {
      loadCurrentQuestion(session.currentQuestionIndex);
    }
  }, [session, questions]);

  // Load questions từ Firestore
  useEffect(() => {
    const loadQuestions = async () => {
      const questionsSnapshot = await getDocs(collection(db, 'questions'));
      const questionsData = questionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setQuestions(questionsData);
      setLoading(false);
    };

    loadQuestions();
  }, []);

  // Load câu hỏi hiện tại
  const loadCurrentQuestion = (questionIndex) => {
    if (questions.length > 0 && questionIndex < questions.length && questionIndex >= 0) {
      setCurrentQuestion(questions[questionIndex]);
      setTimeRemaining(20);
      setSelectedAnswer('');
      setHasAnswered(false);
      setShowResult(false);
      setAnswerStartTime(Date.now());
      setCurrentAnswerResult(null);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (!answerStartTime) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!hasAnswered) {
            submitAnswerAndShowResult('', 20);
          } else {
            awardScoreAndShowResult();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answerStartTime, hasAnswered]);

  // Submit câu trả lời và cộng điểm ngay lập tức
  const submitAnswer = useCallback(async (answer, timeTaken = null) => {
    if (hasAnswered) return;

    const actualTimeTaken = timeTaken || (20 - timeRemaining);
    const isCorrect = answer === currentQuestion.correctAnswer;
    const score = calculateScore(isCorrect, actualTimeTaken);

    setCurrentAnswerResult({
      answer: answer,
      isCorrect: isCorrect,
      score: score,
      timeTaken: actualTimeTaken
    });

    try {
      setHasAnswered(true);
      
      // Cộng điểm ngay khi submit (không đợi hết thời gian)
      const playerRef = doc(db, 'sessions', sessionId, 'players', player.id);
      await updateDoc(playerRef, {
        score: increment(score),
        [`answeredQuestions.${session.currentQuestionIndex}`]: true,
        answers: increment(0)
      });
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  }, [hasAnswered, timeRemaining, currentQuestion, session, sessionId, player.id]);

  // Submit và hiện kết quả cùng lúc (khi hết thời gian)
  const submitAnswerAndShowResult = useCallback(async (answer, timeTaken = null) => {
    if (hasAnswered && showResult) return;

    const actualTimeTaken = timeTaken || (20 - timeRemaining);
    const isCorrect = answer === currentQuestion.correctAnswer;
    const score = calculateScore(isCorrect, actualTimeTaken);

    setCurrentAnswerResult({
      answer: answer,
      isCorrect: isCorrect,
      score: score,
      timeTaken: actualTimeTaken
    });

    try {
      setHasAnswered(true);
      setShowResult(true);
      
      const playerRef = doc(db, 'sessions', sessionId, 'players', player.id);
      await updateDoc(playerRef, {
        score: increment(score),
        [`answeredQuestions.${session.currentQuestionIndex}`]: true,
        answers: increment(0)
      });
    } catch (error) {
      console.error('Error submitting answer and showing result:', error);
    }
  }, [hasAnswered, showResult, timeRemaining, currentQuestion, session, sessionId, player.id]);

  // Chỉ hiện kết quả (không cộng điểm nữa vì đã cộng khi submit)
  const awardScoreAndShowResult = useCallback(async () => {
    if (showResult) return;

    try {
      setShowResult(true);
      // Không cần cộng điểm nữa vì đã cộng ở submitAnswer
    } catch (error) {
      console.error('Error showing result:', error);
    }
  }, [showResult]);

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (selectedAnswer && !hasAnswered) {
      const timeTaken = 20 - timeRemaining;
      submitAnswer(selectedAnswer, timeTaken);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-purple-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-purple-300 text-lg">Đang tải câu hỏi...</p>
        </motion.div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2 className="text-2xl font-bold text-purple-100 mb-4">Chờ quiz bắt đầu...</h2>
          <p className="text-purple-300/80">Giáo viên sẽ khởi động quiz sớm thôi!</p>
        </motion.div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2 className="text-2xl font-bold text-purple-100 mb-4">Đang tải câu hỏi...</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        {/* Header */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center md:text-left mb-4 md:mb-0">
            <span className="text-purple-400/80 text-sm font-medium">
              Câu {session.currentQuestionIndex + 1}/{questions.length}
            </span>
            <h2 className="text-2xl font-bold text-purple-100">Chào {player.name}!</h2>
          </div>
          <div className="text-center md:text-right">
            <motion.div 
              className={`text-4xl font-bold mb-2 ${timeRemaining <= 5 ? 'text-red-400' : 'text-purple-300'}`}
              animate={timeRemaining <= 5 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: timeRemaining <= 5 ? Infinity : 0 }}
            >
              {formatTimeRemaining(timeRemaining)}
            </motion.div>
            <motion.div 
              className="text-purple-200 font-medium"
              key={currentScore}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
            >
              💰 Điểm: <span className="text-yellow-400 font-bold text-xl">{currentScore}</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Question Card */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold mb-8 text-purple-100 text-center leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {currentQuestion.question}
          </motion.h3>

          <AnimatePresence mode="wait">
            {!showResult ? (
              <>
                {!hasAnswered ? (
                  <motion.form 
                    onSubmit={handleAnswerSubmit} 
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {currentQuestion.options.map((option, index) => (
                      <motion.label
                        key={index}
                        className={`block p-4 border rounded-xl cursor-pointer transition-all text-lg ${
                          selectedAnswer === option
                            ? 'bg-purple-600/20 border-purple-400 text-purple-100 shadow-lg'
                            : 'bg-purple-50/10 border-purple-700/40 text-purple-200 hover:bg-purple-50/15 hover:border-purple-500/60'
                        } hover:scale-[1.02]`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          type="radio"
                          name="answer"
                          value={option}
                          checked={selectedAnswer === option}
                          onChange={(e) => setSelectedAnswer(e.target.value)}
                          className="mr-4 scale-125 text-purple-500"
                        />
                        <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                      </motion.label>
                    ))}

                    <motion.button
                      type="submit"
                      disabled={!selectedAnswer}
                      className="w-full py-4 px-6 bg-purple-600 text-purple-50 font-bold text-xl rounded-xl hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg mt-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      whileHover={selectedAnswer ? { scale: 1.02 } : {}}
                      whileTap={selectedAnswer ? { scale: 0.98 } : {}}
                    >
                      🚀 Gửi đáp án
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <motion.div
                      className="text-6xl mb-6"
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1, repeat: Infinity }
                      }}
                    >
                      ⏳
                    </motion.div>
                    <h3 className="text-2xl font-bold text-purple-100 mb-4">Đã gửi đáp án!</h3>
                    <p className="text-purple-300/80 text-lg mb-6">
                      Đang chờ hết thời gian để xem kết quả và được cộng điểm...
                    </p>
                    <div className="bg-purple-900/30 border border-purple-600/40 rounded-xl p-4 inline-block">
                      <p className="text-purple-200">
                        Đáp án bạn chọn: <span className="font-bold text-purple-100">{selectedAnswer}</span>
                      </p>
                    </div>
                    <div className="mt-4 text-purple-300/60">
                      <p>Thời gian còn lại: <span className="font-bold">{timeRemaining}s</span></p>
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <motion.div 
                  className="p-6 bg-green-900/30 border border-green-600/40 rounded-xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="font-bold text-green-300 mb-3 text-xl">✅ Đáp án đúng:</h4>
                  <p className="text-green-200 text-lg font-medium">{currentQuestion.correctAnswer}</p>
                </motion.div>

                {currentQuestion.explanation && (
                  <motion.div 
                    className="p-6 bg-blue-900/30 border border-blue-600/40 rounded-xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="font-bold text-blue-300 mb-3 text-xl">💡 Giải thích:</h4>
                    <p className="text-blue-200 leading-relaxed">{currentQuestion.explanation}</p>
                  </motion.div>
                )}

                <motion.div 
                  className="text-center py-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-2xl mb-4">
                    {currentAnswerResult ? 
                      (currentAnswerResult.isCorrect ? 
                        `🎉 Chính xác! +${currentAnswerResult.score} điểm` : 
                        '❌ Sai rồi!'
                      ) : 
                      '⏰ Hết thời gian!'
                    }
                  </p>
                </motion.div>

                <motion.div 
                  className="text-center text-purple-300/70 p-4 bg-purple-900/20 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex justify-center space-x-2 mb-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-3 h-3 bg-purple-400 rounded-full"
                        animate={{ 
                          y: [0, -8, 0],
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
                  Đang chờ câu hỏi tiếp theo...
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Quiz;
