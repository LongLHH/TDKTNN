import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { timelineData } from '../data/content';

const TimelineSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative"
      style={{ 
        minHeight: `${timelineData.length * 100}vh`,
        background: `linear-gradient(to bottom, #312e81 0%, #1e3a8a 50%, #0f766e 100%)`
      }}
    >
      {/* Timeline Title */}
      <div className="sticky top-0 z-20 py-12" style={{
        background: `linear-gradient(to bottom, rgba(49, 46, 129, 1) 0%, rgba(49, 46, 129, 0.8) 50%, rgba(49, 46, 129, 0) 100%)`
      }}>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-2"
        >
          📚 Phần 2: Lý thuyết và Thực tiễn
        </motion.h2>
        <p className="text-center text-blue-200 text-lg">
          Case Studies: EVN, PVN, VNPT
        </p>
      </div>

      {/* Timeline Items */}
      <div className="relative">
        {timelineData.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            index={index}
            totalItems={timelineData.length}
          />
        ))}
      </div>
    </section>
  );
};

const TimelineItem = ({ item, index, totalItems }) => {
  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  return (
    <div
      ref={itemRef}
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      {/* Timeline Line on the left */}
      <div className="absolute left-8 md:left-20 top-0 bottom-0 w-1 bg-gradient-to-b from-vintage-accent/50 via-vintage-accent to-vintage-accent/50">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="w-full h-full bg-vintage-accent origin-top"
        />
      </div>

      {/* Timeline Marker */}
      <motion.div
        style={{ scale }}
        className="absolute left-5 md:left-[4.5rem] w-8 h-8 bg-vintage-accent rounded-full border-4 border-vintage-darker shadow-lg"
        whileInView={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5 }}
      />

      {/* Content Card */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative w-full max-w-6xl ml-0 md:ml-32"
      >
        {/* Header với Logo */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-white/20">
          <div>
            <span className="text-blue-300 font-bold text-lg block mb-2">
              {item.period}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              {item.title}
            </h3>
          </div>
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={item.imageUrl}
            alt={item.title}
            className="w-24 h-24 object-contain opacity-90"
          />
        </div>

        {/* 3 thẻ ngang */}
        {index === 0 && ( // EVN
          <>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {/* Thẻ 1: Truyền tải */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-blue-700/40 backdrop-blur-sm border border-blue-400/30 rounded-xl p-5 hover:bg-blue-700/60 transition-all"
              >
                <h4 className="text-2xl font-bold text-yellow-300 mb-3">🔌 TRUYỀN TẢI</h4>
                <p className="text-base text-blue-100 font-semibold mb-3">ĐỘC QUYỀN TỰ NHIÊN</p>
                <p className="text-base text-white/90 mb-3 leading-relaxed">
                  Đây là phần lõi "tự nhiên" của EVN. Chi phí xây dựng lưới cao thế 500kV là khổng lồ.
                </p>
                <p className="text-sm text-blue-200/80 leading-relaxed">
                  <strong>Vì sao?</strong> Sẽ cực kỳ lãng phí nếu có 2 công ty cùng xây 2 hệ thống lưới điện song song.
                </p>
              </motion.div>

              {/* Thẻ 2: Bán lẻ */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-orange-700/40 backdrop-blur-sm border border-orange-400/30 rounded-xl p-5 hover:bg-orange-700/60 transition-all"
              >
                <h4 className="text-2xl font-bold text-yellow-300 mb-3">🏠 BÁN LẺ</h4>
                <p className="text-base text-orange-100 font-semibold mb-3">ĐỘC QUYỀN CHỈ ĐỊNH</p>
                <p className="text-base text-white/90 mb-3 leading-relaxed">
                  Đây là phần "chỉ định" của Nhà nước, không phải "tự nhiên".
                </p>
                <p className="text-sm text-orange-200/80 leading-relaxed">
                  <strong>Vì sao?</strong> Nhà nước chỉ định EVN là nhà cung cấp duy nhất để điều tiết và bình ổn giá.
                </p>
              </motion.div>

              {/* Thẻ 3: Phát điện */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-green-700/40 backdrop-blur-sm border border-green-400/30 rounded-xl p-5 hover:bg-green-700/60 transition-all"
              >
                <h4 className="text-2xl font-bold text-yellow-300 mb-3">⚡ PHÁT ĐIỆN</h4>
                <p className="text-base text-green-100 font-semibold mb-3">CẠNH TRANH</p>
                <p className="text-base text-white/90 mb-3 leading-relaxed">
                  Đây là khâu có tính thị trường nhất trong 3 khâu.
                </p>
                <p className="text-sm text-green-200/80 leading-relaxed">
                  <strong>Vì sao?</strong> Nhiều nhà máy điện tư nhân, điện mặt trời (BOT)... cùng "bán buôn" điện lên lưới.
                </p>
              </motion.div>
            </div>

            {/* Kết luận EVN */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-400/30 rounded-xl p-5"
            >
              <h4 className="text-lg font-bold text-purple-200 mb-2">⚖️ KẾT LUẬN: MÔ HÌNH 'LAI'</h4>
              <p className="text-white/90 text-sm">
                Từ 3 phân tích trên, ta thấy mô hình của EVN là một mô hình <strong>'LAI'</strong> (pha trộn): 
                Vừa <span className="text-blue-300 font-semibold">Tự nhiên</span> (ở khâu hạ tầng), 
                vừa <span className="text-orange-300 font-semibold">Chỉ định</span> (để điều tiết giá), 
                vừa <span className="text-green-300 font-semibold">Cạnh tranh</span> (ở khâu sản xuất).
              </p>
            </motion.div>
          </>
        )}

        {index === 1 && ( // PVN
          <>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Thẻ 1: Thượng nguồn */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-orange-700/40 backdrop-blur-sm border border-orange-400/30 rounded-xl p-6 hover:bg-orange-700/60 transition-all"
              >
                <h4 className="text-2xl font-bold text-yellow-300 mb-3">🛢️ THƯỢNG NGUỒN</h4>
                <p className="text-base text-orange-100 font-semibold mb-3">ĐỘC QUYỀN CHỈ ĐỊNH</p>
                <p className="text-base text-white/90 mb-3 leading-relaxed">
                  PVN nắm độc quyền thăm dò, khai thác dầu khí (tài nguyên thiên nhiên).
                </p>
                <p className="text-sm text-orange-200/80 leading-relaxed">
                  <strong>Vì sao?</strong> An ninh năng lượng quốc gia. Tài nguyên chiến lược không thể để tư nhân/nước ngoài tự do khai thác.
                </p>
              </motion.div>

              {/* Thẻ 2: Hạ nguồn */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-green-700/40 backdrop-blur-sm border border-green-400/30 rounded-xl p-6 hover:bg-green-700/60 transition-all"
              >
                <h4 className="text-2xl font-bold text-yellow-300 mb-3">⛽ HẠ NGUỒN</h4>
                <p className="text-base text-green-100 font-semibold mb-3">CẠNH TRANH GAY GẮT</p>
                <p className="text-base text-white/90 mb-3 leading-relaxed">
                  Phân phối, bán lẻ xăng dầu hoàn toàn cạnh tranh.
                </p>
                <p className="text-sm text-green-200/80 leading-relaxed">
                  <strong>Vì sao?</strong> PVN (qua PVOil) phải đối đầu với Petrolimex, Saigon Petro, Shell... Giá xăng dao động theo thị trường.
                </p>
              </motion.div>
            </div>

            {/* Kết luận PVN */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-400/30 rounded-xl p-5"
            >
              <h4 className="text-lg font-bold text-purple-200 mb-2">⚖️ KẾT LUẬN: NỬA ĐỘC QUYỀN, NỬA CẠNH TRANH</h4>
              <p className="text-white/90 text-sm">
                Nhà nước chỉ giữ chặt phần <span className="text-orange-300 font-semibold">'quan trọng nhất'</span> (khai thác tài nguyên) 
                để đảm bảo chủ quyền và an ninh. Phần 'ít nhạy cảm' (bán xăng) thì để thị trường tự điều tiết 
                → Người dân được hưởng lợi từ <span className="text-green-300 font-semibold">cạnh tranh</span> về giá.
              </p>
            </motion.div>
          </>
        )}

        {index === 2 && ( // VNPT
          <>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {/* Thẻ 1: Quá khứ */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-red-700/40 backdrop-blur-sm border border-red-400/30 rounded-xl p-5 hover:bg-red-700/60 transition-all"
              >
                <h4 className="text-2xl font-bold text-yellow-300 mb-3">📡 QUÁ KHỨ</h4>
                <p className="text-base text-red-100 font-semibold mb-3">ĐỘC QUYỀN 100%</p>
                <p className="text-base text-white/90 mb-3 leading-relaxed">
                  VNPT là 'bá chủ' duy nhất - độc quyền cả hạ tầng lẫn dịch vụ.
                </p>
                <p className="text-sm text-red-200/80 leading-relaxed">
                  Người dân không có lựa chọn, giá cước cao, chất lượng tùy hứng.
                </p>
              </motion.div>

              {/* Thẻ 2: Cải cách */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-yellow-700/40 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-5 hover:bg-yellow-700/60 transition-all"
              >
                <h4 className="text-2xl font-bold text-yellow-300 mb-3">🔄 CẢI CÁCH</h4>
                <p className="text-base text-yellow-100 font-semibold mb-3">PHÁ VỠ ĐỘC QUYỀN</p>
                <p className="text-base text-white/90 mb-3 leading-relaxed">
                  Nhà nước thực hiện 3 bước quan trọng.
                </p>
                <p className="text-sm text-yellow-200/80 leading-relaxed">
                  (1) Tách Mobifone (2) Cho Viettel vào cuộc (3) Mở cửa FPT/CMC. Mục tiêu: Tạo cạnh tranh!
                </p>
              </motion.div>

              {/* Thẻ 3: Hiện tại */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-green-700/40 backdrop-blur-sm border border-green-400/30 rounded-xl p-5 hover:bg-green-700/60 transition-all"
              >
                <h4 className="text-2xl font-bold text-yellow-300 mb-3">📱 HIỆN TẠI</h4>
                <p className="text-base text-green-100 font-semibold mb-3">CẠNH TRANH CAO</p>
                <p className="text-base text-white/90 mb-3 leading-relaxed">
                  Giá cước di động/internet VN thuộc hàng RẺ NHẤT thế giới.
                </p>
                <p className="text-sm text-green-200/80 leading-relaxed">
                  Chất lượng mạng 4G/5G tốt. Người dân tự do chuyển nhà mạng.
                </p>
              </motion.div>
            </div>

            {/* Kết luận VNPT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-400/30 rounded-xl p-5"
            >
              <h4 className="text-lg font-bold text-purple-200 mb-2">⚖️ KẾT LUẬN: PHÁ ĐỘC QUYỀN THÀNH CÔNG</h4>
              <p className="text-white/90 text-sm">
                Đây là minh chứng: <strong>PHÁ ĐỘC QUYỀN CÓ THỂ THÀNH CÔNG</strong> nếu Nhà nước quyết tâm. 
                Khi có <span className="text-green-300 font-semibold">cạnh tranh thực sự</span> 
                → Thị trường phát triển, giá giảm, chất lượng tăng, người dân hưởng lợi.
              </p>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default TimelineSection;
