import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialItems = [
  { id: 'i1', text: 'Chi phí cố định ban đầu RẤT LỚN', correct: 'tu-nhien' },
  { id: 'i2', text: 'Do LUẬT PHÁP, NGHỊ ĐỊNH cấm cạnh tranh', correct: 'chi-dinh' },
  { id: 'i3', text: 'Cạnh tranh sẽ gây LÃNG PHÍ (vd: 2 lưới điện)', correct: 'tu-nhien' },
  { id: 'i4', text: 'Ngành này VẪN CÓ THỂ cạnh tranh', correct: 'chi-dinh' },
  { id: 'i5', text: 'Bản chất do KINH TẾ/THỊ TRƯỜNG', correct: 'tu-nhien' },
  { id: 'i6', text: 'Lý do: An ninh, Quốc phòng, Xã hội', correct: 'chi-dinh' },
];

const DragDropSection = () => {
  const [items, setItems] = useState(initialItems);
  const [tuNhienItems, setTuNhienItems] = useState([]);
  const [chiDinhItems, setChiDinhItems] = useState([]);
  const [showCongrats, setShowCongrats] = useState(false);

  const onDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const onDragOver = (e) => { e.preventDefault(); };

  const onDrop = (e, zone) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const item = items.find((it) => it.id === id);
    if (!item) return;

    if (item.correct === zone) {
      // Đúng rồi!
      if (zone === 'tu-nhien') setTuNhienItems((s) => [...s, item]);
      else setChiDinhItems((s) => [...s, item]);
      setItems((s) => s.filter((it) => it.id !== id));
      
      // Phát âm thanh thành công
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(880, audioCtx.currentTime);
      g.gain.setValueAtTime(0.001, audioCtx.currentTime);
      o.connect(g); g.connect(audioCtx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.1, audioCtx.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      setTimeout(() => { o.stop(); }, 300);

      // Kiểm tra thắng
      checkWin(zone);
    } else {
      // Sai rồi - hiệu ứng lắc
      const el = document.getElementById(id);
      if (el) {
        el.classList.add('animate-shake');
        setTimeout(() => el.classList.remove('animate-shake'), 500);
      }
    }
  };

  const checkWin = (zone) => {
    setTimeout(() => {
      const tuNhienCount = zone === 'tu-nhien' ? tuNhienItems.length + 1 : tuNhienItems.length;
      const chiDinhCount = zone === 'chi-dinh' ? chiDinhItems.length + 1 : chiDinhItems.length;
      
      if (tuNhienCount === 3 && chiDinhCount === 3) {
        setShowCongrats(true);
      }
    }, 100);
  };

  const handleReset = () => {
    setItems(initialItems);
    setTuNhienItems([]);
    setChiDinhItems([]);
    setShowCongrats(false);
  };

  return (
    <section id="dragdrop" className="min-h-screen py-16 px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🎯 Phần 1: Hiểu đúng về Độc quyền
          </h2>
          <p className="text-xl text-purple-200">
            Hãy kéo các đặc điểm sau vào đúng ô của nó!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-start mb-8">
          {/* Cột trái: Độc quyền Tự nhiên */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-1"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, 'tu-nhien')}
          >
            <div className="bg-blue-900/40 backdrop-blur-sm border-2 border-blue-500/50 rounded-2xl p-6 min-h-[300px] hover:border-blue-400/70 transition-all">
              <h3 className="font-bold text-2xl text-blue-300 mb-4 text-center">
                💰 ĐỘC QUYỀN TỰ NHIÊN
              </h3>
              <p className="text-sm text-blue-200/70 mb-4 text-center italic">
                (Natural Monopoly)
              </p>
              <div className="space-y-3">
                <AnimatePresence>
                  {tuNhienItems.map((it) => (
                    <motion.div
                      key={it.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="p-3 bg-blue-700/60 rounded-lg text-sm text-white border border-blue-400/30"
                    >
                      ✓ {it.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Cột giữa: Thẻ chưa phân loại */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-1"
          >
            <div className="bg-slate-800/60 backdrop-blur-sm border-2 border-purple-500/30 rounded-2xl p-6 min-h-[300px]">
              <h4 className="mb-4 text-center text-purple-300 font-semibold">
                📋 Thẻ chưa phân loại ({items.length}/6)
              </h4>
              <div className="space-y-3">
                <AnimatePresence>
                  {items.map((it) => (
                    <motion.div
                      id={it.id}
                      key={it.id}
                      draggable
                      onDragStart={(e) => onDragStart(e, it.id)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="draggable-item p-4 bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-400/40 rounded-xl text-sm text-white cursor-grab active:cursor-grabbing hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                    >
                      {it.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Cột phải: Độc quyền Chỉ định */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-1"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, 'chi-dinh')}
          >
            <div className="bg-orange-900/40 backdrop-blur-sm border-2 border-orange-500/50 rounded-2xl p-6 min-h-[300px] hover:border-orange-400/70 transition-all">
              <h3 className="font-bold text-2xl text-orange-300 mb-4 text-center">
                �️ ĐỘC QUYỀN CHỈ ĐỊNH
              </h3>
              <p className="text-sm text-orange-200/70 mb-4 text-center italic">
                (State-Sanctioned Monopoly)
              </p>
              <div className="space-y-3">
                <AnimatePresence>
                  {chiDinhItems.map((it) => (
                    <motion.div
                      key={it.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="p-3 bg-orange-700/60 rounded-lg text-sm text-white border border-orange-400/30"
                    >
                      ✓ {it.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Nút Reset và Message Chúc mừng */}
        <div className="text-center space-y-4">
          <motion.button
            onClick={handleReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg transition-all"
          >
            🔄 Chơi lại
          </motion.button>

          <AnimatePresence>
            {showCongrats && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                className="mt-6 p-6 bg-green-600/20 border-2 border-green-400 rounded-2xl backdrop-blur-sm"
              >
                <h3 className="text-3xl font-bold text-green-300 mb-2">
                  🎉 Tuyệt vời! Bạn đã hiểu rõ bản chất!
                </h3>
                <p className="text-green-200">
                  Bạn đã phân loại đúng cả 2 loại độc quyền. Giờ hãy xem thực tế ở Việt Nam như thế nào nhé! 👇
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .animate-shake { animation: shake 0.45s; }
        @keyframes shake { 
          0% { transform: translateX(0) rotate(0deg); } 
          25% { transform: translateX(-8px) rotate(-2deg); } 
          50% { transform: translateX(8px) rotate(2deg); } 
          75% { transform: translateX(-6px) rotate(-1deg); } 
          100% { transform: translateX(0) rotate(0deg); } 
        }
      `}</style>
    </section>
  );
};

export default DragDropSection;
