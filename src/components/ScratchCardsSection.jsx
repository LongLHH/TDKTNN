import { useEffect, useRef } from 'react';

const ScratchCard = ({ id, width = 320, height = 220, frontText, backContent }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const DPR = window.devicePixelRatio || 1;
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(DPR, DPR);

    // Draw silver overlay
    ctx.fillStyle = 'silver';
    ctx.fillRect(0, 0, width, height);

    // Write overlay text
    ctx.fillStyle = '#444';
    ctx.font = '18px serif';
    ctx.textAlign = 'center';
    ctx.fillText(frontText || 'CÀO ĐỂ XEM!', width / 2, height / 2 + 6);

    let isDrawing = false;

    const erase = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    };

    const getPointer = (e) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (e.clientX || e.touches?.[0]?.clientX) - rect.left,
        y: (e.clientY || e.touches?.[0]?.clientY) - rect.top,
      };
    };

    const onDown = (e) => { isDrawing = true; const p = getPointer(e); erase(p.x, p.y); };
    const onMove = (e) => { if (!isDrawing) return; e.preventDefault(); const p = getPointer(e); erase(p.x, p.y); };
    const onUp = () => { isDrawing = false; };

    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    canvas.addEventListener('touchstart', onDown, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);

    return () => {
      canvas.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('touchstart', onDown);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [width, height, frontText]);

  return (
    <div className="relative w-full max-w-xs md:max-w-md bg-vintage-dark/80 border-2 border-vintage-accent rounded-2xl overflow-hidden">
      <div className="p-6 min-h-[140px] flex flex-col justify-center" style={{backgroundImage:'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.05))'}}>
        <div className="text-lg font-serif font-bold text-vintage-accent mb-2">{backContent.title}</div>
        <p className="text-sm text-vintage-light/80">{backContent.desc}</p>
      </div>
      <canvas ref={canvasRef} id={id} className="absolute inset-0" style={{ touchAction: 'none' }} />
    </div>
  );
};

const ScratchCardsSection = () => {
  const cards = [
    {
      id: 'scratch-card-1',
      frontText: 'CÀO ĐỂ XEM!',
      backContent: {
        title: 'EVN — Điện lực',
        desc: "Lý thuyết: 'Độc quyền tự nhiên' tại truyền tải. Thực tế: EVN đang nắm nhiều khâu, bao gồm cả bán lẻ."
      }
    },
    {
      id: 'scratch-card-2',
      frontText: 'CÀO ĐỂ XEM!',
      backContent: {
        title: 'VNPT — Viễn thông',
        desc: 'Lý thuyết: Độc quyền làm giá cao. Thực tế: Sự xuất hiện của Viettel, FPT đã thúc đẩy cạnh tranh, giảm giá.'
      }
    },
    {
      id: 'scratch-card-3',
      frontText: 'CÀO ĐỂ XEM!',
      backContent: {
        title: 'PVN — Dầu khí',
        desc: 'Trường hợp PVN: nhiệm vụ an ninh năng lượng, nhưng cũng có đầu tư ngoài ngành gây tranh luận.'
      }
    }
  ];

  return (
    <section id="scratchcards" className="min-h-screen py-16 px-6 bg-gradient-to-b from-vintage-darker to-vintage-dark">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-vintage-accent mb-3">So sánh Lý thuyết & Thực tiễn</h2>
        <p className="text-vintage-light/80">Cào lớp phủ để khám phá sự khác biệt giữa lý thuyết và thực tế trong từng case study</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {cards.map((c) => (
          <div key={c.id} className="flex justify-center">
            <ScratchCard id={c.id} width={360} height={220} frontText={c.frontText} backContent={c.backContent} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScratchCardsSection;
