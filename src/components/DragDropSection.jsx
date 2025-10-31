import { useState } from 'react';

const initialItems = [
  { id: 'i1', text: 'Bình ổn giá xăng khi thế giới biến động', correct: 'left' },
  { id: 'i2', text: 'Bộ máy cồng kềnh, nợ công lớn', correct: 'right' },
  { id: 'i3', text: 'Mang điện ra đảo Trường Sa dù biết lỗ', correct: 'left' },
  { id: 'i4', text: 'Chậm cải thiện dịch vụ khách hàng', correct: 'right' },
  { id: 'i5', text: 'Đầu tư ngoài ngành (bất động sản, tài chính) kém hiệu quả', correct: 'right' },
  { id: 'i6', text: 'Giữ an ninh năng lượng quốc gia', correct: 'left' },
];

const DragDropSection = () => {
  const [items, setItems] = useState(initialItems);
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);

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
      // correct
      if (zone === 'left') setLeftItems((s) => [...s, item]);
      else setRightItems((s) => [...s, item]);
      setItems((s) => s.filter((it) => it.id !== id));
      // small visual feedback
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
    } else {
      // wrong - brief shake animation
      const el = document.getElementById(id);
      if (el) {
        el.classList.add('animate-shake');
        setTimeout(() => el.classList.remove('animate-shake'), 500);
      }
    }
  };

  return (
    <section id="dragdrop" className="min-h-screen py-16 px-6 bg-vintage-dark">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-vintage-accent text-center mb-6">Phân loại: Vai trò ↔ Nguy cơ</h2>
        <p className="text-center text-vintage-light/80 mb-8">Kéo từng thẻ vào cột phù hợp (trái: Vai trò — xanh, phải: Nguy cơ — đỏ)</p>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          <div 
            className="col-span-1"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, 'left')}
          >
            <div className="bg-green-900/40 border-2 border-green-800 rounded-lg p-4 min-h-[240px]">
              <h3 className="font-bold text-lg text-green-300 mb-2">🌳 VAI TRÒ</h3>
              <div className="space-y-2">
                {leftItems.map((it) => (
                  <div key={it.id} className="p-2 bg-green-800/40 rounded text-sm text-vintage-light">{it.text}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <div className="bg-vintage-dark/80 border-2 border-vintage-accent rounded-lg p-4 min-h-[240px]">
              <h4 className="mb-4 text-sm text-vintage-light/70">Thẻ chưa phân loại</h4>
              <div className="space-y-3">
                {items.map((it) => (
                  <div
                    id={it.id}
                    key={it.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, it.id)}
                    className="draggable-item p-3 bg-vintage-accent/10 border border-vintage-accent/20 rounded-md text-sm cursor-grab active:cursor-grabbing"
                  >
                    {it.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div 
            className="col-span-1"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, 'right')}
          >
            <div className="bg-red-900/40 border-2 border-red-800 rounded-lg p-4 min-h-[240px]">
              <h3 className="font-bold text-lg text-red-300 mb-2">🚧 NGUY CƠ</h3>
              <div className="space-y-2">
                {rightItems.map((it) => (
                  <div key={it.id} className="p-2 bg-red-800/40 rounded text-sm text-vintage-light">{it.text}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animate-shake { animation: shake 0.45s; }
        @keyframes shake { 0% { transform: translateX(0) } 25% { transform: translateX(-6px) } 50% { transform: translateX(6px) } 75% { transform: translateX(-4px) } 100% { transform: translateX(0) } }
      `}</style>
    </section>
  );
};

export default DragDropSection;
