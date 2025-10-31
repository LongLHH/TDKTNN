/**
 * Tính điểm dựa trên độ chính xác và thời gian trả lời
 * @param {boolean} isCorrect - Câu trả lời có đúng không
 * @param {number} timeTaken - Thời gian đã sử dụng (giây)
 * @param {number} maxTime - Thời gian tối đa cho câu hỏi (mặc định 20s)
 * @returns {number} - Điểm số
 */
export const calculateScore = (isCorrect, timeTaken, maxTime = 20) => {
  if (!isCorrect) return 0;
  
  // Điểm cơ bản cho câu trả lời đúng
  const baseScore = 100;
  
  // Bonus điểm dựa trên tốc độ (càng nhanh càng nhiều điểm)
  // Trả lời ngay lập tức (0-5s): +50 điểm
  // Trả lời nhanh (5-10s): +30 điểm
  // Trả lời bình thường (10-15s): +15 điểm
  // Trả lời chậm (15-20s): +5 điểm
  let timeBonus = 0;
  if (timeTaken <= 5) {
    timeBonus = 50;
  } else if (timeTaken <= 10) {
    timeBonus = 30;
  } else if (timeTaken <= 15) {
    timeBonus = 15;
  } else {
    timeBonus = 5;
  }
  
  return baseScore + timeBonus;
};

/**
 * Format thời gian còn lại thành MM:SS
 * @param {number} seconds - Số giây
 * @returns {string} - Thời gian được format
 */
export const formatTimeRemaining = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
