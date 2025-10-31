import { useEffect, useRef, useState } from 'react';

const problems = [
  { id: 'p1', label: 'Kém hiệu quả, lãng phí' },
  { id: 'p2', label: "Lẫn lộn nhiệm vụ (kinh doanh vs. công ích)" },
  { id: 'p3', label: 'Thiếu minh bạch giá' },
  { id: 'p4', label: 'Thiếu cạnh tranh' },
];

const solutions = [
  { id: 's1', label: 'Áp dụng quản trị hiện đại (KPIs, cổ phần hóa)' },
  { id: 's2', label: 'Cho phép tư nhân tham gia (cạnh tranh bán lẻ)' },
  { id: 's3', label: "Tách bạch: Nhà nước 'đặt hàng' và trả tiền" },
  { id: 's4', label: 'Công khai 100% chi phí & cách tính giá' },
];

const ConnectingDotsSection = () => {
  const [startEl, setStartEl] = useState(null);
  const linesRef = useRef([]);

  useEffect(() => {
    // cleanup on unmount
    return () => {
      linesRef.current.forEach((ln) => { try { ln.remove(); } catch (e) {} });
      linesRef.current = [];
    };
  }, []);

  const handleClick = async (e) => {
    const el = e.currentTarget;
    if (!startEl) {
      setStartEl(el);
      el.classList.add('ring-2', 'ring-amber-500');
      return;
    }

    // connect startEl -> el
    try {
      const LeaderLine = (await import('leader-line')).default || (await import('leader-line'));
      const line = new LeaderLine(startEl, el, { color: 'green', size: 4, path: 'straight' });
      linesRef.current.push(line);
      // visual feedback
      startEl.classList.remove('ring-2', 'ring-amber-500');
      setStartEl(null);
    } catch (err) {
      console.error('LeaderLine import failed', err);
      setStartEl(null);
      startEl.classList.remove('ring-2', 'ring-amber-500');
    }
  };

  const resetLines = () => {
    linesRef.current.forEach((ln) => { try { ln.remove(); } catch (e) {} });
    linesRef.current = [];
  };

  return (
    <section id="connecting" className="min-h-screen py-16 px-6 bg-vintage-darker">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-vintage-accent">Đề xuất Giải pháp — Vẽ đường nối</h2>
        <p className="text-vintage-light/80">Nhấn vào một vấn đề bên trái, sau đó nhấn vào giải pháp phù hợp bên phải để nối</p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-6">
          {problems.map((p) => (
            <div key={p.id} id={p.id} onClick={handleClick} className="cursor-pointer p-4 bg-red-900/30 rounded-md text-left text-vintage-light">
              <strong className="text-lg">{p.label}</strong>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {solutions.map((s) => (
            <div key={s.id} id={s.id} onClick={handleClick} className="cursor-pointer p-4 bg-green-900/30 rounded-md text-left text-vintage-light">
              <strong className="text-lg">{s.label}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto text-right mt-8">
        <button onClick={resetLines} className="px-4 py-2 bg-amber-600 text-black rounded-md font-semibold">Reset nối</button>
      </div>
    </section>
  );
};

export default ConnectingDotsSection;
