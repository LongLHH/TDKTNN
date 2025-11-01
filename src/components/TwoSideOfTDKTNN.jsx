import { useState } from 'react';
import { motion } from 'framer-motion';

const TwoSideOfTDKTNN = () => {
    const [flippedCards, setFlippedCards] = useState([false, false, false, false]);

    const handleFlipCard = (index) => {
        setFlippedCards(prev => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const handleFlipAll = () => {
        const allFlipped = flippedCards.every(card => card);
        setFlippedCards([!allFlipped, !allFlipped, !allFlipped, !allFlipped]);
    };

    return (
        <section
            id="flipcard"
            className="relative min-h-screen flex items-center justify-center px-6"
            style={{ background: 'linear-gradient(135deg, #23170f 0%, #2a2722 50%, #3d352f 100%)' }}
        >
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.25'/%3E%3C/svg%3E")`
            }} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center w-full max-w-7xl"
            >
                <div className="mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-vintage-accent">Hai mặt của Tập đoàn Kinh tế Nhà nước</h1>
                    <p className="text-vintage-light/80 mt-2 opacity-40 text-sm">(Click thẻ để lật)</p>
                </div>

                <div className="mb-6">
                    <button
                        onClick={handleFlipAll}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-md bg-vintage-accent text-black font-semibold hover:bg-vintage-accent/90 transition-colors"
                    >
                        {flippedCards.every(card => card) ? 'Lật lại tất cả' : 'Lật tất cả thẻ'}
                    </button>
                </div>

                <div className="flex space-x-4 flip-card h-[420px] w-full perspective-1000">
                    {/* thẻ 1 */}
                    <div
                        className={`flip-card-inner relative w-full h-full rounded-2xl transition-all duration-700 cursor-pointer ${flippedCards[0] ? 'transform rotate-y-180' : ''}`}
                        style={{ transformStyle: 'preserve-3d' }}
                        onClick={() => handleFlipCard(0)}
                        onKeyDown={(e) => e.key === 'Enter' && handleFlipCard(0)}
                        role="button"
                        tabIndex={0}
                    >
                        {/* Front */}
                        <div className="flip-card-front absolute inset-0 backface-hidden border-2 border-vintage-accent rounded-2xl flex flex-col items-center justify-center p-6 transition-colors duration-700" style={{ backgroundColor: '#129c6eff' }}>
                            <div className="text-7xl mb-6">📊</div>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">Ổn định Kinh tế Vĩ mô</h2>
                            <p className="mt-4 text-gray-800">Sử dụng quyền chi phối để giữ giá các mặt hàng thiết yếu (điện, viễn thông), kiểm soát lạm phát và hỗ trợ sản xuất kinh doanh, tạo sự ổn định xã hội.</p>
                        </div>

                        {/* Back */}
                        <div className="flip-card-back absolute inset-0 backface-hidden border-2 border-vintage-accent rounded-2xl flex flex-col items-center justify-center p-6 transition-colors duration-700" style={{ transform: 'rotateY(180deg)', backgroundColor: '#F08080' }}>
                            <div className="text-6xl mb-4">📉</div>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">Hay... Méo mó tín hiệu thị trường ?</h2>
                            <p className="mt-4 text-gray-800">Việc can thiệp "giữ giá" làm cho giá cả không phản ánh đúng chi phí thực và cung - cầu, dẫn đến phân bổ nguồn lực kém hiệu quả và thiếu động lực tiết kiệm/đổi mới.</p>
                        </div>
                    </div>
                    {/* thẻ 2 */}
                    <div
                        className={`flip-card-inner relative w-full h-full rounded-2xl transition-all duration-700 cursor-pointer ${flippedCards[1] ? 'transform rotate-y-180' : ''}`}
                        style={{ transformStyle: 'preserve-3d' }}
                        onClick={() => handleFlipCard(1)}
                        onKeyDown={(e) => e.key === 'Enter' && handleFlipCard(1)}
                        role="button"
                        tabIndex={0}
                    >
                        {/* Front */}
                        <div className="flip-card-front absolute inset-0 backface-hidden border-2 border-vintage-accent rounded-2xl flex flex-col items-center justify-center p-6 transition-colors duration-700" style={{ backgroundColor: '#129c6eff' }}>
                            <div className="text-7xl mb-6">🏘️</div>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">Cung cấp Hàng hóa/Dịch vụ Công ích</h2>
                            <p className="mt-4 text-gray-800">Đầu tư vào các dự án lỗ (kéo điện ra đảo, vùng sâu, vùng xa) vì mục tiêu an sinh xã hội và an ninh quốc phòng, việc mà tư nhân không bao giờ thực hiện.</p>
                        </div>

                        {/* Back */}
                        <div className="flip-card-back absolute inset-0 backface-hidden border-2 border-vintage-accent rounded-2xl flex flex-col items-center justify-center p-6 transition-colors duration-700" style={{ transform: 'rotateY(180deg)', backgroundColor: '#F08080' }}>
                            <div className="text-6xl mb-4">🔍</div>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">Thiếu Minh bạch trong Chi phí</h2>
                            <p className="mt-4 text-gray-800">Chi phí thực hiện nhiệm vụ công ích thường bị trộn lẫn với chi phí kinh doanh thuần túy. Việc bù đắp chéo này gây khó khăn cho việc đánh giá hiệu quả kinh doanh thực tế, tạo kẽ hở cho sự kém hiệu quả hoặc thất thoát.</p>
                        </div>
                    </div>
                     {/* thẻ 3 */}
                    <div
                        className={`flip-card-inner relative w-full h-full rounded-2xl transition-all duration-700 cursor-pointer ${flippedCards[2] ? 'transform rotate-y-180' : ''}`}
                        style={{ transformStyle: 'preserve-3d' }}
                        onClick={() => handleFlipCard(2)}
                        onKeyDown={(e) => e.key === 'Enter' && handleFlipCard(2)}
                        role="button"
                        tabIndex={0}
                    >
                        {/* Front */}
                        <div className="flip-card-front absolute inset-0 backface-hidden border-2 border-vintage-accent rounded-2xl flex flex-col items-center justify-center p-6 transition-colors duration-700" style={{ backgroundColor: '#129c6eff' }}>
                            <div className="text-7xl mb-6">🚀</div>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">Đầu tư Quy mô Lớn & Dẫn dắt Công nghệ</h2>
                            <p className="mt-4 text-gray-800">Có đủ tiềm lực vốn để thực hiện các dự án hạ tầng lớn (truyền tải điện, mạng 5G), làm chủ công nghệ cốt lõi, nâng cao năng lực cạnh tranh quốc gia.</p>
                        </div>

                        {/* Back */}
                        <div className="flip-card-back absolute inset-0 backface-hidden border-2 border-vintage-accent rounded-2xl flex flex-col items-center justify-center p-6 transition-colors duration-700" style={{ transform: 'rotateY(180deg)', backgroundColor: '#F08080' }}>
                            <div className="text-6xl mb-4">🚧</div>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">Hay... Kém Hiệu quả và Cản trở cạnh tranh?</h2>
                            <p className="mt-4 text-gray-800">Thiếu áp lực cạnh tranh dẫn đến quản trị kém hiệu quả (bộ máy cồng kềnh, chi phí cao). Vốn đầu tư khổng lồ tạo ra một sân chơi không bình đẳng, khiến các doanh nghiệp tư nhân khác khó có thể chen chân vào.</p>
                        </div>
                    </div>
                    {/* thẻ 4 */}
                    {/* <div
                        className={`flip-card-inner relative w-full h-full rounded-2xl transition-transform duration-700 cursor-pointer ${flippedCards[3] ? 'transform rotate-y-180' : ''}`}
                        style={{ transformStyle: 'preserve-3d' }}
                        onClick={() => handleFlipCard(3)}
                        onKeyDown={(e) => e.key === 'Enter' && handleFlipCard(3)}
                        role="button"
                        tabIndex={0}
                    >
                        <div className="flip-card-front absolute inset-0 backface-hidden bg-vintage-dark/80 border-2 border-vintage-accent rounded-2xl flex flex-col items-center justify-center p-6">
                            <div className="text-7xl mb-6">⚡️</div>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-vintage-accent">EVN: Gã khổng lồ ĐỘC QUYỀN?</h2>
                            <p className="mt-4 text-vintage-light/80">Nhấp hoặc rê để lật và xem góc nhìn khác</p>
                        </div>

                        <div className="flip-card-back absolute inset-0 backface-hidden bg-vintage-dark/90 border-2 border-vintage-accent rounded-2xl flex flex-col items-center justify-center p-6" style={{ transform: 'rotateY(180deg)' }}>
                            <div className="text-6xl mb-4">⚖️</div>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-vintage-accent">Hay... Cánh tay nối dài ĐIỀU TIẾT VĨ MÔ?</h2>
                            <p className="mt-4 text-vintage-light/80">Tập đoàn kinh tế nhà nước: Độc quyền tự nhiên hay Công cụ điều tiết vĩ mô?</p>
                        </div>
                    </div> */}
                </div>

                <div className="mt-8">
                    <button
                        onClick={() => {
                            const el = document.getElementById('scratchcards');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-amber-600 text-black font-semibold"
                    >
                        Giải pháp
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 10l5 6 5-5" /></svg>
                    </button>
                </div>
            </motion.div>

            <style>{`
        .perspective-1000 { perspective: 1000px; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { -webkit-backface-visibility: hidden; backface-visibility: hidden; }
        .flip-card-inner { transform-style: preserve-3d; }
      `}</style>
        </section>
    );
};

export default TwoSideOfTDKTNN;
