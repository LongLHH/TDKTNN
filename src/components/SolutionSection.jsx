import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle
} from 'react-compare-slider';
import { 
  FaBalanceScale, 
  FaChartLine, 
  FaShieldAlt, 
  FaCog,
  FaLightbulb,
  FaBolt,
  FaCheckCircle,
  FaUsers,
  FaFileContract,
  FaEye,
  FaChartBar,
  FaCrown,
  FaRocket,
  FaGem,
  FaCubes,
  FaNetworkWired,
  FaChartPie,
  FaArrowsAltH
} from 'react-icons/fa';
import { 
  MdBusiness, 
  MdGavel, 
  MdPublic,
  MdSecurity,
  MdTrendingUp,
  MdVerifiedUser,
  MdDashboard,
  MdAccountBalance
} from 'react-icons/md';
import { 
  HiLightningBolt, 
  HiShieldCheck 
} from 'react-icons/hi';
import { 
  RiGovernmentFill 
} from 'react-icons/ri';

const SolutionSection = () => {
  const [activePillar, setActivePillar] = useState(null);
  const [hoveredCircle, setHoveredCircle] = useState(null);
  const [expandedReform, setExpandedReform] = useState(null);

  // Unsplash Images - High Quality, Curated for each section
  const images = {
    // Pillar 1: Government & Governance
    government: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80', // Government building
    competition: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', // Business competition
    regulation: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', // Legal documents
    
    // Pillar 2: Value Chain & Infrastructure
    infrastructure: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80', // Power lines
    factory: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80', // Industrial factory
    energy: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80', // Energy infrastructure
    
    // Pillar 3: Governance & Transparency
    leadership: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80', // Professional leadership
    dashboard: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', // Data dashboard
    transparency: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', // Business analytics
    monitoring: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', // Monitoring systems
    
    // EVN Case Study
    evnBefore: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80', // Tangled wires (chaos)
    evnAfter: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', // Organized system
    electricityMeter: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80', // Electric meter
    powerStation: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80', // Power station
  };

  // Dữ liệu cho 3 trụ cột chính
  const pillars = [
    {
      id: 1,
      icon: <RiGovernmentFill className="text-6xl" />,
      title: "Tách bạch rõ vai trò của Nhà nước",
      color: "purple",
      gradient: "from-purple-600 via-purple-700 to-violet-800",
      lightGradient: "from-purple-400 to-violet-600",
      bgPattern: "🏛️",
      circles: [
        {
          id: 'owner',
          title: 'Owner (Chủ sở hữu)',
          icon: <FaCrown className="text-4xl" />,
          solution: 'Giao SCIC hoặc Ủy ban Quản lý vốn nhà nước quản lý vốn; đặt KPI lợi nhuận và bảo toàn vốn.',
          color: 'purple-500',
          emoji: '👑'
        },
        {
          id: 'regulator',
          title: 'Regulator (Quản lý)',
          icon: <MdGavel className="text-4xl" />,
          solution: 'Bộ ngành chỉ ban hành luật chơi, không can thiệp kinh doanh.',
          color: 'violet-600',
          emoji: '⚖️'
        },
        {
          id: 'executor',
          title: 'Policy Executor (Thực thi)',
          icon: <HiLightningBolt className="text-4xl" />,
          solution: 'Nhà nước đặt hàng và chi trả riêng cho nhiệm vụ xã hội.',
          color: 'indigo-700',
          emoji: '⚡'
        }
      ],
      example: "💡 Ví dụ: EVN giữ giá điện vùng sâu = nhiệm vụ công ích phải được Nhà nước thanh toán."
    },
    {
      id: 2,
      icon: <FaNetworkWired className="text-6xl" />,
      title: "Xây dựng thị trường cạnh tranh",
      color: "emerald",
      gradient: "from-emerald-600 via-teal-700 to-cyan-800",
      lightGradient: "from-emerald-400 to-teal-600",
      bgPattern: "⚙️",
      valueChain: [
        { name: 'Phát điện', competitive: true, icon: <FaBolt />, emoji: '⚡' },
        { name: 'Truyền tải', competitive: false, icon: <HiShieldCheck />, emoji: '🔒' },
        { name: 'Phân phối', competitive: true, icon: <FaNetworkWired />, emoji: '🔗' },
        { name: 'Bán lẻ', competitive: true, icon: <FaUsers />, emoji: '🛒' }
      ],
      examples: [
        {
          company: 'EVN',
          keep: 'Truyền tải điện (NPT)',
          open: 'Phát điện và bán lẻ'
        },
        {
          company: 'VNPT',
          keep: 'Hạ tầng chia sẻ công bằng',
          open: 'Dịch vụ viễn thông cạnh tranh'
        }
      ]
    },
    {
      id: 3,
      icon: <FaGem className="text-6xl" />,
      title: "Cải cách quản trị & minh bạch",
      color: "rose",
      gradient: "from-rose-600 via-pink-700 to-fuchsia-800",
      lightGradient: "from-rose-400 to-pink-600",
      bgPattern: "📊",
      reforms: [
        {
          category: 'Cải cách quản trị',
          icon: <MdDashboard />,
          emoji: '👔',
          items: [
            { text: 'Tuyển CEO chuyên nghiệp qua thi tuyển', icon: <FaUsers />, emoji: '👨‍💼' },
            { text: 'Áp dụng chuẩn OECD, gắn KPI tài chính và xã hội', icon: <FaChartBar />, emoji: '📈' }
          ]
        },
        {
          category: 'Minh bạch & Giám sát',
          icon: <FaEye />,
          emoji: '🔍',
          items: [
            { text: 'Công khai chi phí đầu vào, hoạt động, báo cáo tài chính', icon: <FaFileContract />, emoji: '📄' },
            { text: 'Quốc hội, Kiểm toán và xã hội tham gia giám sát', icon: <MdVerifiedUser />, emoji: '✅' }
          ]
        }
      ]
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-20 overflow-hidden">
      {/* Animated Background Elements with 3D depth */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-[400px] h-[400px] bg-violet-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-[450px] h-[450px] bg-fuchsia-600/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.25, 0.35, 0.25],
            x: [0, -40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Decorative 3D Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [transform:perspective(500px)_rotateX(60deg)] opacity-30"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header with 3D effect */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          {/* 3D Background for title */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-purple-600/10 rounded-full blur-3xl"></div>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent relative z-10"
            style={{
              textShadow: '0 0 80px rgba(168, 85, 247, 0.4)',
            }}
            animate={{
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            💬  Đề xuất Giải pháp
          </motion.h2>
          <p className="text-2xl md:text-3xl text-purple-200 font-semibold relative z-10">
            Cân bằng Hai Vai Trò của Tập đoàn Kinh tế Nhà nước
          </p>
          
      
        </motion.div>

        {/* Architecture Design: 3 Pillars Supporting the Roof (Goal) */}
        <div className="max-w-7xl mx-auto mb-20 relative">
          
          {/* The Roof - Central Goal (Floating on top) */}
          <motion.div
            initial={{ y: -200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
            className="relative z-30 mb-0"
          >
            <Tilt
              tiltMaxAngleX={3}
              tiltMaxAngleY={3}
              glareEnable={true}
              glareMaxOpacity={0.4}
              glareColor="#a855f7"
              scale={1.02}
            >
              <div className="relative mx-auto max-w-6xl mb-6">
                {/* Roof shape with 3D effect - Triangular roof */}
                <div className="relative">
                  {/* Main roof glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-500 blur-3xl opacity-70 animate-pulse"></div>
                  
                  {/* Roof structure - Trapezoid shape */}
                  <div className="relative">
                    {/* Decorative roof peak */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-40">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotateY: [0, 360],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="text-6xl"
                        style={{
                          filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.8))',
                        }}
                      >
                        ⭐
                      </motion.div>
                    </div>
                    
                    <div className="relative bg-gradient-to-br from-purple-600 via-fuchsia-600 to-violet-600 p-[4px] shadow-2xl"
                         style={{
                           clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
                           borderRadius: '0 0 24px 24px',
                         }}>
                      <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 p-8 md:p-12 backdrop-blur-xl relative overflow-hidden"
                           style={{
                             clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
                             borderRadius: '0 0 24px 24px',
                           }}>
                        
                        {/* Decorative roof pattern */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
                        
                        <div className="text-center relative z-10">
                          {/* Crown icon for roof */}
                          <motion.div 
                            className="text-7xl md:text-8xl mb-4 inline-block"
                            animate={{
                              rotateY: [0, 360],
                              scale: [1, 1.15, 1],
                            }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            style={{
                              filter: 'drop-shadow(0 0 40px rgba(168, 85, 247, 0.9))',
                            }}
                          >
                            👑
                          </motion.div>
                          
                          <h3 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-300 mb-4">
                            🎯 MỤC TIÊU CHUNG
                          </h3>
                          
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 blur-3xl rounded-2xl"></div>
                            <p className="relative text-lg md:text-2xl text-purple-100 font-bold leading-relaxed px-4">
                              "Vừa phát huy vai trò <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">chủ đạo</span> – 
                              vừa vận hành theo <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">cơ chế thị trường</span>"
                            </p>
                          </div>
                        </div>
                        
                        {/* Roof bottom edge with columns support points - EXACT POSITIONS */}
                        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600">
                          {/* Support point indicators - Positioned exactly at column centers */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative -mt-6">
   
            
            {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, height: 0, scaleY: 0 }}
              whileInView={{ opacity: 1, height: "auto", scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 1.2, 
                delay: index * 0.3,
                type: "spring",
                stiffness: 50
              }}
              className="relative"
              style={{ 
                perspective: "1500px",
                transformOrigin: "top"
              }}
            >
              {/* Connection cap to roof */}
              <div className="relative z-20 mb-0">
                <div className={`h-6 bg-gradient-to-b ${pillar.gradient} mx-auto w-3/4 rounded-t-lg border-t-4 border-yellow-400 shadow-[0_0_20px_rgba(168,85,247,0.6)]`}></div>
              </div>
              
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                glareEnable={true}
                glareMaxOpacity={0.6}
                glareColor={
                  pillar.id === 1 ? "#a855f7" : 
                  pillar.id === 2 ? "#10b981" : 
                  "#ec4899"
                }
                scale={1.02}
                className="h-full"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative h-full cursor-pointer min-h-[650px] flex flex-col"
                  onClick={() => setActivePillar(activePillar === pillar.id ? null : pillar.id)}
                  style={{ transformOrigin: "top" }}
                >
                  {/* Pillar Column Structure - Classical Greek/Roman style */}
                  <div className="relative h-full flex flex-col"
                       style={{
                         boxShadow: `0 30px 60px -20px ${
                           pillar.id === 1 ? 'rgba(168, 85, 247, 0.5)' : 
                           pillar.id === 2 ? 'rgba(16, 185, 129, 0.5)' : 
                           'rgba(236, 72, 153, 0.5)'
                         }`,
                       }}>
                    
                    {/* Capital (Top of Column) - Ornate Header */}
                    <motion.div
                      className={`relative bg-gradient-to-br ${pillar.gradient} p-[4px] shadow-2xl`}
                      animate={{
                        boxShadow: [
                          `0 0 30px ${pillar.id === 1 ? 'rgba(168, 85, 247, 0.5)' : pillar.id === 2 ? 'rgba(16, 185, 129, 0.5)' : 'rgba(236, 72, 153, 0.5)'}`,
                          `0 0 50px ${pillar.id === 1 ? 'rgba(168, 85, 247, 0.8)' : pillar.id === 2 ? 'rgba(16, 185, 129, 0.8)' : 'rgba(236, 72, 153, 0.8)'}`,
                          `0 0 30px ${pillar.id === 1 ? 'rgba(168, 85, 247, 0.5)' : pillar.id === 2 ? 'rgba(16, 185, 129, 0.5)' : 'rgba(236, 72, 153, 0.5)'}`,
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{
                        clipPath: 'polygon(15% 0%, 85% 0%, 95% 100%, 5% 100%)',
                      }}
                    >
                      <div className="bg-slate-950/95 backdrop-blur-xl p-8 relative overflow-hidden"
                           style={{
                             clipPath: 'polygon(15% 0%, 85% 0%, 95% 100%, 5% 100%)',
                           }}>
                        {/* Decorative capital pattern - Classical style */}
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                        
                        {/* Ornamental corners */}
                        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-yellow-400/50"></div>
                        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-yellow-400/50"></div>
                        
                        {/* Number Badge */}
                        <motion.div 
                          className={`w-14 h-14 rounded-full bg-gradient-to-br ${pillar.lightGradient} flex items-center justify-center mx-auto mb-4`}
                          whileHover={{ scale: 1.3, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          style={{
                            boxShadow: `0 0 30px ${
                              pillar.id === 1 ? 'rgba(168, 85, 247, 0.8)' : 
                              pillar.id === 2 ? 'rgba(16, 185, 129, 0.8)' : 
                              'rgba(236, 72, 153, 0.8)'
                            }`,
                          }}
                        >
                          <span className="text-2xl font-bold text-white">{pillar.id}</span>
                        </motion.div>
                        
                        {/* Illustrative Image - Clear representation */}
                        <motion.div 
                          className="mb-4 flex justify-center relative z-10"
                          whileHover={{ 
                            scale: 1.15,
                            y: -5,
                          }}
                          transition={{ duration: 0.4, type: "spring" }}
                        >
                          <div 
                            className="text-8xl"
                            style={{
                              filter: `drop-shadow(0 0 20px ${
                                pillar.id === 1 ? 'rgba(168, 85, 247, 0.6)' : 
                                pillar.id === 2 ? 'rgba(16, 185, 129, 0.6)' : 
                                'rgba(236, 72, 153, 0.6)'
                              })`,
                            }}
                          >
                            {pillar.id === 1 ? '🏛️' : pillar.id === 2 ? '⚙️' : '📊'}
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    {/* Shaft (Main Column Body) - Strong Pillar */}
                    <div className={`relative flex-grow bg-gradient-to-b ${pillar.gradient} p-[3px]`}>
                      {/* Strong glow effect on sides */}
                      <div className={`absolute -left-2 -right-2 inset-y-0 bg-gradient-to-br ${pillar.gradient} blur-xl opacity-40`}></div>
                      
                      <div className="relative h-full bg-slate-950/95 backdrop-blur-xl px-8 py-10 flex flex-col">
                        {/* Vertical decorative lines (fluting) - Classical columns have grooves */}
                        <div className="absolute left-4 top-0 bottom-0 w-[3px] bg-gradient-to-b from-white/20 via-white/10 to-white/20 rounded-full shadow-inner"></div>
                        <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/10 via-white/5 to-white/10 rounded-full"></div>
                        <div className="absolute right-4 top-0 bottom-0 w-[3px] bg-gradient-to-b from-white/20 via-white/10 to-white/20 rounded-full shadow-inner"></div>
                        <div className="absolute right-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/10 via-white/5 to-white/10 rounded-full"></div>
                        
                        {/* Center vertical line */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
                        
                        {/* Title */}
                        <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-6 relative z-10 leading-tight">
                          {pillar.title}
                        </h3>
                        
                        {/* Visual representation in column body */}
                        <div className="flex-grow flex items-center justify-center relative z-10 my-6">
                          <motion.div
                            animate={{
                              scale: [1, 1.05, 1],
                              opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="text-9xl opacity-40"
                          >
                            {pillar.id === 1 ? '🏛️' : pillar.id === 2 ? '⚙️' : '📊'}
                          </motion.div>
                        </div>
                        
                        {/* CTA Button at bottom */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`relative w-full py-4 bg-gradient-to-r ${pillar.gradient} text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 overflow-hidden group z-10 mt-6`}
                          style={{
                            boxShadow: `0 10px 30px -10px ${
                              pillar.id === 1 ? 'rgba(168, 85, 247, 0.5)' : 
                              pillar.id === 2 ? 'rgba(16, 185, 129, 0.5)' : 
                              'rgba(236, 72, 153, 0.5)'
                            }`,
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/20"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.5 }}
                          />
                          <FaRocket className="relative z-10" />
                          <span className="relative z-10">
                            {activePillar === pillar.id ? 'Đóng lại' : 'Xem chi tiết'}
                          </span>
                        </motion.button>
                        
                        {/* Indicator for active state */}
                        {activePillar === pillar.id && (
                          <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2 h-8 bg-yellow-400 rounded-t-full z-20"
                            style={{
                              boxShadow: '0 -10px 30px rgba(250, 204, 21, 0.8)'
                            }}
                          >
                            <motion.div
                              animate={{ 
                                y: [0, -10, 0],
                                opacity: [1, 0.5, 1]
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-3xl"
                            >
                              👇
                            </motion.div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                    
                    {/* Base (Bottom of Column) - Strong Foundation */}
                    <motion.div
                      className={`relative bg-gradient-to-br ${pillar.gradient} p-[4px] shadow-2xl`}
                      style={{
                        clipPath: 'polygon(5% 0%, 95% 0%, 85% 100%, 15% 100%)',
                      }}
                    >
                      <div className="bg-slate-950/95 backdrop-blur-xl p-6 relative overflow-hidden"
                           style={{
                             clipPath: 'polygon(5% 0%, 95% 0%, 85% 100%, 15% 100%)',
                           }}>
                        {/* Decorative base pattern - Classical pedestal */}
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent"></div>
                        
                        {/* Base decoration with number */}
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex items-center gap-2 w-full">
                            <div className={`h-1 flex-grow bg-gradient-to-r ${pillar.gradient} opacity-70`}></div>
                            <motion.div
                              animate={{ 
                                scale: [1, 1.3, 1],
                                rotate: [0, 180, 360]
                              }}
                              transition={{ duration: 4, repeat: Infinity }}
                              className="text-3xl"
                              style={{
                                filter: `drop-shadow(0 0 10px ${
                                  pillar.id === 1 ? 'rgba(168, 85, 247, 0.8)' : 
                                  pillar.id === 2 ? 'rgba(16, 185, 129, 0.8)' : 
                                  'rgba(236, 72, 153, 0.8)'
                                })`,
                              }}
                            >
                              �
                            </motion.div>
                            <div className={`h-1 flex-grow bg-gradient-to-l ${pillar.gradient} opacity-70`}></div>
                          </div>
                          
                          {/* Foundation text */}
                          <p className="text-xs text-center text-white/60 font-bold tracking-wider">
                            GIẢI PHÁP #{pillar.id}
                          </p>
                        </div>
                        
                        {/* Ornamental bottom corners */}
                        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-yellow-400/50"></div>
                        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-yellow-400/50"></div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </Tilt>
            </motion.div>
          ))}
          </div>
          
          {/* Foundation Platform - Ground Base */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="relative mt-0"
          >
            {/* Stone foundation platform */}
            <div className="relative">
              {/* Platform glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 blur-xl opacity-50"></div>
              
          
              
              {/* Ground shadow */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/30 blur-2xl rounded-full"></div>
            </div>
          </motion.div>
        </div>

        {/* Detailed Content - POPS OUT FROM SELECTED COLUMN */}
        <div className="relative mt-12">
          <AnimatePresence mode="wait">
            {activePillar && (
              <motion.div
                key={activePillar}
                initial={{ 
                  opacity: 0,
                  y: -50,
                  scale: 0.9,
                }}
                animate={{ 
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{ 
                  opacity: 0,
                  y: -50,
                  scale: 0.9,
                }}
                transition={{ 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 120,
                  damping: 15
                }}
                className="relative"
                style={{
                  // Position based on which pillar is active
                  marginLeft: activePillar === 1 ? '0%' : activePillar === 2 ? 'auto' : 'auto',
                  marginRight: activePillar === 3 ? '0%' : activePillar === 2 ? 'auto' : 'auto',
                }}
              >
                {/* Connection line from column to detail panel */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  exit={{ scaleY: 0 }}
                  className={`absolute -top-12 ${
                    activePillar === 1 ? 'left-[16.66%]' :
                    activePillar === 2 ? 'left-1/2' :
                    'left-[83.33%]'
                  } w-1 h-12 bg-gradient-to-b ${
                    activePillar === 1 ? 'from-purple-500' :
                    activePillar === 2 ? 'from-emerald-500' :
                    'from-rose-500'
                  } to-transparent transform -translate-x-1/2`}
                  style={{
                    boxShadow: `0 0 20px ${
                      activePillar === 1 ? 'rgba(168, 85, 247, 0.8)' :
                      activePillar === 2 ? 'rgba(16, 185, 129, 0.8)' :
                      'rgba(236, 72, 153, 0.8)'
                    }`
                  }}
                />
                
                {/* Arrow pointing up to column */}
                <motion.div
                  initial={{ scale: 0, y: -20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className={`absolute -top-8 ${
                    activePillar === 1 ? 'left-[16.66%]' :
                    activePillar === 2 ? 'left-1/2' :
                    'left-[83.33%]'
                  } transform -translate-x-1/2 text-4xl z-30`}
                  style={{
                    filter: `drop-shadow(0 0 10px ${
                      activePillar === 1 ? 'rgba(168, 85, 247, 1)' :
                      activePillar === 2 ? 'rgba(16, 185, 129, 1)' :
                      'rgba(236, 72, 153, 1)'
                    })`
                  }}
                >
                  ⬆️
                </motion.div>
                
                {/* Expanding panel effect - like opening a scroll */}
                <motion.div
                  initial={{ scaleX: 0, scaleY: 0 }}
                  animate={{ scaleX: 1, scaleY: 1 }}
                  exit={{ scaleX: 0, scaleY: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative"
                  style={{ 
                    transformOrigin: activePillar === 1 ? 'left top' : 
                                     activePillar === 2 ? 'center top' : 
                                     'right top'
                  }}
                >
                  {/* Scroll/Blueprint paper effect */}
                  <div className="absolute -inset-4 opacity-20">
                    <div className="absolute top-0 left-0 w-12 h-12">
                      <div className="w-full h-full border-t-4 border-l-4 border-yellow-400 rounded-tl-2xl"></div>
                    </div>
                    <div className="absolute top-0 right-0 w-12 h-12">
                      <div className="w-full h-full border-t-4 border-r-4 border-yellow-400 rounded-tr-2xl"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-12 h-12">
                      <div className="w-full h-full border-b-4 border-l-4 border-yellow-400 rounded-bl-2xl"></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-12 h-12">
                      <div className="w-full h-full border-b-4 border-r-4 border-yellow-400 rounded-br-2xl"></div>
                    </div>
                  </div>
                  
                  {/* Scroll curl effect on sides */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-48 bg-gradient-to-r from-slate-700 to-transparent rounded-l-full shadow-2xl"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="absolute -right-6 top-1/2 -translate-y-1/2 w-6 h-48 bg-gradient-to-l from-slate-700 to-transparent rounded-r-full shadow-2xl"
                  />
                  
                  {/* Pillar 1: Three Circles Diagram */}
              {activePillar === 1 && (
                <motion.div 
                  className="relative bg-gradient-to-br from-slate-900/80 via-purple-900/40 to-slate-900/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 border-2 border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.3)] overflow-hidden"
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Blueprint grid background */}
                  <div className="absolute inset-0 opacity-5"
                       style={{
                         backgroundImage: `
                           linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)
                         `,
                         backgroundSize: '40px 40px'
                       }}>
                  </div>
                  
                  {/* Technical drawing corner marks */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-purple-400/30"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-purple-400/30"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-purple-400/30"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-purple-400/30"></div>
                  
                  {/* Stamp effect */}
                  <motion.div
                    className="absolute top-8 right-8 px-4 py-2 border-4 border-purple-400/40 rounded-lg rotate-12 text-purple-400 font-bold text-sm"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 12 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    GIẢI PHÁP #1
                  </motion.div>
                  
                  <motion.h3 
                    className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400 mb-8 flex items-center gap-4 relative z-10"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <RiGovernmentFill className="text-purple-400" />
                    </motion.div>
                    🏛️ Tách bạch rõ vai trò của Nhà nước
                  </motion.h3>
                  
                  <motion.p 
                    className="text-xl text-purple-200 mb-10 font-medium relative z-10"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Giải pháp cốt lõi để xóa chồng chéo và mâu thuẫn lợi ích.
                  </motion.p>

                  {/* Three Overlapping Circles */}
                  <div className="relative h-96 mb-12">
                    <svg viewBox="0 0 600 400" className="w-full h-full">
                      {/* Circle 1 - Owner */}
                      <motion.circle
                        cx="200"
                        cy="200"
                        r="120"
                        fill="url(#gradient1)"
                        opacity={hoveredCircle === 'owner' || !hoveredCircle ? 0.9 : 0.2}
                        onMouseEnter={() => setHoveredCircle('owner')}
                        onMouseLeave={() => setHoveredCircle(null)}
                        className="cursor-pointer transition-opacity"
                        whileHover={{ scale: 1.1 }}
                        filter="url(#glow)"
                      />
                      {/* Circle 2 - Regulator */}
                      <motion.circle
                        cx="400"
                        cy="200"
                        r="120"
                        fill="url(#gradient2)"
                        opacity={hoveredCircle === 'regulator' || !hoveredCircle ? 0.9 : 0.2}
                        onMouseEnter={() => setHoveredCircle('regulator')}
                        onMouseLeave={() => setHoveredCircle(null)}
                        className="cursor-pointer transition-opacity"
                        whileHover={{ scale: 1.1 }}
                        filter="url(#glow)"
                      />
                      {/* Circle 3 - Executor */}
                      <motion.circle
                        cx="300"
                        cy="320"
                        r="120"
                        fill="url(#gradient3)"
                        opacity={hoveredCircle === 'executor' || !hoveredCircle ? 0.9 : 0.2}
                        onMouseEnter={() => setHoveredCircle('executor')}
                        onMouseLeave={() => setHoveredCircle(null)}
                        className="cursor-pointer transition-opacity"
                        whileHover={{ scale: 1.1 }}
                        filter="url(#glow)"
                      />
                      
                      {/* Gradients */}
                      <defs>
                        <radialGradient id="gradient1">
                          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.95" />
                          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.7" />
                        </radialGradient>
                        <radialGradient id="gradient2">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.95" />
                          <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.7" />
                        </radialGradient>
                        <radialGradient id="gradient3">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.95" />
                          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.7" />
                        </radialGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      
                      {/* Emoji Icons */}
                      <text x="200" y="190" textAnchor="middle" fontSize="40">👑</text>
                      <text x="400" y="190" textAnchor="middle" fontSize="40">⚖️</text>
                      <text x="300" y="310" textAnchor="middle" fontSize="40">⚡</text>
                      
                      {/* Labels */}
                      <text x="200" y="225" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Owner</text>
                      <text x="400" y="225" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Regulator</text>
                      <text x="300" y="345" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Executor</text>
                    </svg>
                  </div>

                  {/* Solutions Grid with 3D Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {pillars[0].circles.map((circle, idx) => (
                      <Tilt
                        key={circle.id}
                        tiltMaxAngleX={15}
                        tiltMaxAngleY={15}
                        glareEnable={true}
                        glareMaxOpacity={0.5}
                        scale={1.05}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.2 }}
                          className="relative"
                        >
                          {/* Glow */}
                          <div className={`absolute inset-0 bg-gradient-to-br from-${circle.color} to-${circle.color} rounded-xl blur-lg opacity-40`}></div>
                          
                          <div className={`relative bg-gradient-to-br from-${circle.color} to-${circle.color} p-[2px] rounded-xl shadow-2xl h-full`}>
                            <div className="bg-slate-950 rounded-xl p-6 h-full">
                              {/* Emoji */}
                              <div className="text-5xl mb-4 flex justify-center">
                                {circle.emoji}
                              </div>
                              
                              {/* Icon */}
                              <div className="text-white mb-4 flex justify-center" style={{
                                filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.6))'
                              }}>
                                {circle.icon}
                              </div>
                              
                              <h4 className="text-lg font-bold text-purple-200 mb-3 text-center">
                                {circle.title}
                              </h4>
                              <p className="text-purple-100 text-sm leading-relaxed">
                                {circle.solution}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </Tilt>
                    ))}
                  </div>

                  {/* CASE STUDY EVN - BEFORE/AFTER SLIDER COMPARISON */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12"
                  >
                    {/* Section Title */}
                    <div className="text-center mb-8">
                      <motion.h4 
                        className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 mb-4"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ⚡ CASE STUDY: EVN - "GỠ RỐI" THẾ KẸP "3 TRONG 1" ⚡
                      </motion.h4>
                      <p className="text-purple-200 text-lg flex items-center justify-center gap-2">
                        <FaArrowsAltH className="text-yellow-400" />
                        <span>Kéo thanh trượt ở giữa để so sánh 2 mô hình</span>
                        <FaArrowsAltH className="text-yellow-400" />
                      </p>
                    </div>

                    {/* SLIDER COMPARISON */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-purple-500/50">
                      <ReactCompareSlider
                        itemOne={
                          <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 p-8 md:p-12 overflow-y-auto isolate">
                            {/* Background Image - Chaos/Problems */}
                            <div className="absolute inset-0 opacity-10 z-0">
                              <img 
                                src={images.evnBefore} 
                                alt="EVN Problems - Before Solution" 
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-red-950/80 to-gray-900/80"></div>
                            </div>

                            {/* LEFT SIDE - TRƯỚC GIẢI PHÁP */}
                            <div className="space-y-8 relative z-10">
                              {/* Header */}
                              <div className="text-center mb-8">
                                <div className="inline-block bg-red-600/30 border-4 border-red-500 rounded-2xl px-8 py-4 -rotate-3">
                                  <h5 className="text-3xl font-bold text-red-300">
                                    ❌ MÔ HÌNH "NHẬP NHẰNG"
                                  </h5>
                                  <p className="text-red-200 text-lg mt-2">(Hiện tại)</p>
                                </div>
                              </div>

                              {/* SƠ ĐỒ RỐI */}
                              <div className="relative bg-gray-800/50 rounded-2xl p-6 border-2 border-red-500/30 z-10">
                         
                                <svg viewBox="0 0 400 300" className="w-full h-64">
                                  {/* EVN Center */}
                                  <circle cx="200" cy="150" r="40" fill="#dc2626" opacity="0.8"/>
                                  <text x="200" y="155" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">EVN</text>
                                  
                                  {/* 3 vai trò chĩa vào hỗn loạn */}
                                  {/* Chủ sở hữu */}
                                  <motion.g
                                    animate={{ rotate: [0, 10, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    style={{ transformOrigin: "200px 150px" }}
                                  >
                                    <line x1="80" y1="50" x2="170" y2="120" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowRed)"/>
                                    <circle cx="80" cy="50" r="30" fill="#7f1d1d"/>
                                    <text x="80" y="40" textAnchor="middle" fill="white" fontSize="20">👑</text>
                                    <text x="80" y="65" textAnchor="middle" fill="#fca5a5" fontSize="12" fontWeight="bold">Chủ SH</text>
                                  </motion.g>
                                  
                                  {/* Quản lý */}
                                  <motion.g
                                    animate={{ rotate: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
                                    style={{ transformOrigin: "200px 150px" }}
                                  >
                                    <line x1="320" y1="50" x2="230" y2="120" stroke="#f87171" strokeWidth="3" markerEnd="url(#arrowRed)"/>
                                    <circle cx="320" cy="50" r="30" fill="#7f1d1d"/>
                                    <text x="320" y="40" textAnchor="middle" fill="white" fontSize="20">⚖️</text>
                                    <text x="320" y="65" textAnchor="middle" fill="#fca5a5" fontSize="12" fontWeight="bold">Quản lý</text>
                                  </motion.g>
                                  
                                  {/* Chính sách */}
                                  <motion.g
                                    animate={{ rotate: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
                                    style={{ transformOrigin: "200px 150px" }}
                                  >
                                    <line x1="200" y1="250" x2="200" y2="190" stroke="#fca5a5" strokeWidth="3" markerEnd="url(#arrowRed)"/>
                                    <circle cx="200" cy="250" r="30" fill="#7f1d1d"/>
                                    <text x="200" y="240" textAnchor="middle" fill="white" fontSize="20">💰</text>
                                    <text x="200" y="265" textAnchor="middle" fill="#fca5a5" fontSize="12" fontWeight="bold">Chính sách</text>
                                  </motion.g>
                                  
                                  {/* Arrow marker */}
                                  <defs>
                                    <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                      <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
                                    </marker>
                                  </defs>
                                  
                                  {/* Confusion marks */}
                                  <text x="200" y="30" textAnchor="middle" fill="#fca5a5" fontSize="30">❓</text>
                                  <text x="60" y="180" textAnchor="middle" fill="#fca5a5" fontSize="25">❌</text>
                                  <text x="340" y="180" textAnchor="middle" fill="#fca5a5" fontSize="25">❌</text>
                                </svg>
                              </div>

                              {/* XUNG ĐỘT 1 */}
                              <div className="relative bg-red-950/50 border-2 border-red-500/50 rounded-2xl p-6 z-10">
                                <div className="flex items-center gap-4 mb-4">
                                  <span className="text-5xl">⚽</span>
                                  <h6 className="text-2xl font-bold text-red-300">XUNG ĐỘT 1</h6>
                                </div>
                                <p className="text-xl font-bold text-yellow-300 mb-3">
                                  "VỪA ĐÁ BÓNG VỪA THỔI CÒI"
                                </p>
                                <div className="bg-gray-900/50 rounded-lg p-4 mb-3">
                                  <div className="text-6xl text-center mb-2">👨‍⚖️⚽</div>
                                  <p className="text-center text-red-200 text-sm italic">
                                    Trọng tài mặc áo đấu EVN
                                  </p>
                                </div>
                                <p className="text-red-100 leading-relaxed">
                                  Bộ Công Thương muốn thị trường cạnh tranh, nhưng cũng muốn EVN phải mạnh.
                                </p>
                                <div className="mt-3 text-red-300 font-bold flex items-center gap-2">
                                  <span>→</span>
                                  <span>Doanh nghiệp tư nhân mất niềm tin</span>
                                </div>
                              </div>

                              {/* XUNG ĐỘT 2 */}
                              <div className="relative bg-red-950/50 border-2 border-red-500/50 rounded-2xl p-6 z-10">
                                <div className="flex items-center gap-4 mb-4">
                                  <span className="text-5xl">⚖️</span>
                                  <h6 className="text-2xl font-bold text-red-300">XUNG ĐỘT 2</h6>
                                </div>
                                <p className="text-xl font-bold text-yellow-300 mb-3">
                                  "MÂU THUẪN MỤC TIÊU"
                                </p>
                                <div className="flex justify-center mb-4">
                                  <svg viewBox="0 0 200 100" className="w-48 h-24">
                                    <g>
                                      {/* Scale tilted */}
                                      <line x1="100" y1="20" x2="100" y2="50" stroke="#fca5a5" strokeWidth="3"/>
                                      <line x1="100" y1="50" x2="40" y2="80" stroke="#fca5a5" strokeWidth="3"/>
                                      <line x1="100" y1="50" x2="160" y2="40" stroke="#fca5a5" strokeWidth="3"/>
                                      <circle cx="40" cy="80" r="15" fill="#ef4444"/>
                                      <text x="40" y="85" textAnchor="middle" fontSize="16">💰</text>
                                      <circle cx="160" cy="40" r="15" fill="#dc2626"/>
                                      <text x="160" y="45" textAnchor="middle" fontSize="16">❤️</text>
                                    </g>
                                  </svg>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                  <div className="bg-gray-900/50 rounded p-3 text-center">
                                    <p className="text-yellow-300 font-bold mb-1">Bên trái (Muốn)</p>
                                    <p className="text-2xl">💰</p>
                                    <p className="text-red-100 text-sm">Lợi nhuận</p>
                                  </div>
                                  <div className="bg-gray-900/50 rounded p-3 text-center">
                                    <p className="text-yellow-300 font-bold mb-1">Bên phải (Ép)</p>
                                    <p className="text-2xl">❤️</p>
                                    <p className="text-red-100 text-sm">An sinh (Giữ giá)</p>
                                  </div>
                                </div>
                     
                              </div>

                              {/* HẬU QUẢ */}
                              <div className="relative bg-gradient-to-br from-red-900 to-red-950 border-4 border-red-500 rounded-2xl p-6 z-10">
                                <div className="flex items-center gap-4 mb-4">
                                  <span className="text-5xl">📉</span>
                                  <h6 className="text-2xl font-bold text-red-200">HẬU QUẢ</h6>
                                </div>
                                <p className="text-2xl font-bold text-yellow-300 mb-4">
                                  "LỖ MẬP MỜ"
                                </p>
                                <div className="bg-red-950/70 rounded-xl p-6 mb-4">
                                  <div className="text-center mb-3">
                                    <div className="text-7xl mb-2">📄</div>
                                    <p className="text-red-300 text-sm">Báo cáo tài chính</p>
                                  </div>
                                  <div className="text-center">
                                    <motion.p 
                                      className="text-5xl font-bold text-red-400"
                                      animate={{ scale: [1, 1.2, 1] }}
                                      transition={{ repeat: Infinity, duration: 2 }}
                                    >
                                      ❓
                                    </motion.p>
                                    <p className="text-red-200 font-bold mt-2">Lỗ hàng chục nghìn tỷ</p>
                                  </div>
                                </div>
                                <div className="bg-red-800/50 rounded-lg p-4">
                                  <p className="text-yellow-200 text-lg font-bold text-center">
                                    ⚠️ Câu hỏi lớn:
                                  </p>
                                  <p className="text-red-100 text-center mt-2">
                                    Lỗ do <strong>quản lý kém</strong> hay do <strong>gánh vác an sinh</strong>?
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                        itemTwo={
                          <div className="relative w-full h-full bg-gradient-to-br from-blue-950 via-green-950 to-blue-950 p-8 md:p-12 overflow-y-auto isolate">
                            {/* Background Image - Solution/Success */}
                            <div className="absolute inset-0 opacity-10 z-0">
                              <img 
                                src={images.evnAfter} 
                                alt="EVN Solutions - After Implementation" 
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-green-950/80 to-blue-950/80"></div>
                            </div>

                            {/* RIGHT SIDE - SAU GIẢI PHÁP */}
                            <div className="space-y-8 relative z-10">
                              {/* Header */}
                              <div className="text-center mb-8">
                                <div className="inline-block bg-green-600/30 border-4 border-green-400 rounded-2xl px-8 py-4 rotate-3">
                                  <h5 className="text-3xl font-bold text-green-300">
                                    ✅ MÔ HÌNH "TÁCH BẠCH"
                                  </h5>
                                  <p className="text-green-200 text-lg mt-2">(Giải pháp)</p>
                                </div>
                              </div>

                              {/* SƠ ĐỒ RÕ RÀNG */}
                              <div className="relative bg-gray-800/50 rounded-2xl p-6 border-2 border-green-500/30 z-10">
                                <h6 className="text-xl font-bold text-green-300 mb-6 text-center">
                                  📊 Sơ đồ Rành mạch
                                </h6>
                                <svg viewBox="0 0 400 400" className="w-full h-80">
                                  {/* Nhà nước top */}
                                  <rect x="150" y="20" width="100" height="40" rx="10" fill="#10b981"/>
                                  <text x="200" y="35" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">NHÀ NƯỚC</text>
                                  <text x="200" y="50" textAnchor="middle" fill="white" fontSize="18">🏛️</text>
                                  
                                  {/* 3 nhánh độc lập */}
                                  {/* Branch 1: CMSC */}
                                  <line x1="200" y1="60" x2="80" y2="140" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreen)"/>
                                  <rect x="30" y="140" width="100" height="60" rx="8" fill="#047857"/>
                                  <text x="80" y="160" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">CMSC</text>
                                  <text x="80" y="175" textAnchor="middle" fill="white" fontSize="10">(Chủ sở hữu)</text>
                                  <text x="80" y="190" textAnchor="middle" fill="white" fontSize="20">👑</text>
                                  
                                  <line x1="80" y1="200" x2="200" y2="300" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowGreen)"/>
                                  <text x="140" y="250" fill="#86efac" fontSize="10">Yêu cầu lợi nhuận</text>
                                  
                                  {/* Branch 2: Bộ Công Thương */}
                                  <line x1="200" y1="60" x2="200" y2="140" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreen)"/>
                                  <rect x="140" y="140" width="120" height="60" rx="8" fill="#047857"/>
                                  <text x="200" y="160" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">BỘ CÔNG THƯƠNG</text>
                                  <text x="200" y="175" textAnchor="middle" fill="white" fontSize="10">(Quản lý)</text>
                                  <text x="200" y="190" textAnchor="middle" fill="white" fontSize="20">⚖️</text>
                                  
                                  <line x1="200" y1="200" x2="200" y2="240" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen)"/>
                                  <rect x="140" y="240" width="120" height="40" rx="8" fill="#065f46" stroke="#22c55e" strokeWidth="2"/>
                                  <text x="200" y="257" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold">THỊ TRƯỜNG</text>
                                  <text x="170" y="272" textAnchor="middle" fill="white" fontSize="9">EVN</text>
                                  <text x="230" y="272" textAnchor="middle" fill="white" fontSize="9">Tư nhân</text>
                                  
                                  {/* Branch 3: Ngân sách */}
                                  <line x1="200" y1="60" x2="320" y2="140" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreen)"/>
                                  <rect x="270" y="140" width="100" height="60" rx="8" fill="#047857"/>
                                  <text x="320" y="160" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">NGÂN SÁCH</text>
                                  <text x="320" y="175" textAnchor="middle" fill="white" fontSize="10">(Chính sách)</text>
                                  <text x="320" y="190" textAnchor="middle" fill="white" fontSize="20">💰</text>
                                  
                                  <line x1="320" y1="200" x2="240" y2="300" stroke="#eab308" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowYellow)"/>
                                  <text x="280" y="250" fill="#fde047" fontSize="10">Đặt hàng PSO</text>
                                  
                                  {/* EVN bottom center */}
                                  <circle cx="200" cy="330" r="45" fill="#10b981"/>
                                  <text x="200" y="330" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">EVN</text>
                                  <text x="200" y="355" textAnchor="middle" fill="white" fontSize="16">⚡</text>
                                  
                                  <defs>
                                    <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                      <path d="M0,0 L0,6 L9,3 z" fill="#22c55e" />
                                    </marker>
                                    <marker id="arrowYellow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                      <path d="M0,0 L0,6 L9,3 z" fill="#eab308" />
                                    </marker>
                                  </defs>
                                </svg>
                              </div>

                              {/* GIẢI PHÁP 1 */}
                              <div className="relative bg-green-950/50 border-2 border-green-500/50 rounded-2xl p-6 z-10">
                                <div className="flex items-center gap-4 mb-4">
                                  <span className="text-5xl">⚖️</span>
                                  <h6 className="text-2xl font-bold text-green-300">GIẢI PHÁP</h6>
                                </div>
                                <p className="text-xl font-bold text-yellow-300 mb-3">
                                  "TRỌNG TÀI CÔNG TÂM"
                                </p>
                                <div className="bg-gray-900/50 rounded-lg p-4 mb-3">
                                  <div className="flex items-center justify-center gap-6 text-6xl mb-2">
                                    <span>⚡</span>
                                    <span>👨‍⚖️</span>
                                    <span>🏢</span>
                                  </div>
                                  <p className="text-center text-green-200 text-sm italic">
                                    Trọng tài độc lập giữa EVN và Tư nhân
                                  </p>
                                </div>
                                <p className="text-green-100 leading-relaxed">
                                  Bộ Công Thương chỉ ra luật. EVN và Tư nhân bình đẳng cạnh tranh.
                                </p>
                                <div className="mt-3 text-green-300 font-bold flex items-center gap-2">
                                  <span>✅</span>
                                  <span>Thị trường công bằng, minh bạch</span>
                                </div>
                              </div>

                              {/* GIẢI PHÁP 2 */}
                              <div className="relative bg-green-950/50 border-2 border-green-500/50 rounded-2xl p-6 z-10">
                                <div className="flex items-center gap-4 mb-4">
                                  <span className="text-5xl">📋</span>
                                  <h6 className="text-2xl font-bold text-green-300">GIẢI PHÁP</h6>
                                </div>
                                <p className="text-xl font-bold text-yellow-300 mb-3">
                                  "SÒNG PHẲNG HÓA MỤC TIÊU"
                                </p>
                                <div className="grid grid-cols-2 gap-4 mb-3">
                                  <div className="bg-blue-900/50 border-2 border-blue-400 rounded-lg p-4">
                                    <div className="text-4xl text-center mb-2">📄1</div>
                                    <p className="text-blue-200 font-bold text-sm text-center mb-2">HỢP ĐỒNG 1</p>
                                    <p className="text-white text-xs text-center">với CMSC</p>
                                    <p className="text-green-300 text-sm text-center mt-2">
                                      💰 Kinh doanh có lãi
                                    </p>
                                  </div>
                                  <div className="bg-orange-900/50 border-2 border-orange-400 rounded-lg p-4">
                                    <div className="text-4xl text-center mb-2">📄2</div>
                                    <p className="text-orange-200 font-bold text-sm text-center mb-2">HỢP ĐỒNG 2</p>
                                    <p className="text-white text-xs text-center">với Chính phủ</p>
                                    <p className="text-green-300 text-sm text-center mt-2">
                                      ❤️ Nhận tiền ngân sách
                                    </p>
                                  </div>
                                </div>
                                <p className="text-green-100 text-center italic">
                                  Mỗi mục tiêu có hợp đồng và thanh toán riêng
                                </p>
                              </div>

                              {/* KẾT QUẢ */}
                              <div className="relative bg-gradient-to-br from-green-900 to-emerald-950 border-4 border-green-400 rounded-2xl p-6 z-10">
                                <div className="flex items-center gap-4 mb-4">
                                  <span className="text-5xl">📈</span>
                                  <h6 className="text-2xl font-bold text-green-200">KẾT QUẢ</h6>
                                </div>
                                <p className="text-2xl font-bold text-yellow-300 mb-4">
                                  "MINH BẠCH HÓA"
                                </p>
                                <div className="bg-green-950/70 rounded-xl p-6 mb-4">
                                  <div className="text-center mb-3">
                                    <div className="text-7xl mb-2">📊</div>
                                    <p className="text-green-300 text-sm">Báo cáo tài chính rõ ràng</p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-blue-800/50 rounded p-3">
                                      <p className="text-blue-200 text-xs mb-1">Kết quả kinh doanh</p>
                                      <p className="text-white font-bold text-lg">✅ Rõ ràng</p>
                                    </div>
                                    <div className="bg-orange-800/50 rounded p-3">
                                      <p className="text-orange-200 text-xs mb-1">Chi phí an sinh</p>
                                      <p className="text-white font-bold text-lg">✅ Riêng biệt</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-green-700/50 rounded-lg p-4">
                                  <p className="text-yellow-200 text-lg font-bold text-center mb-2">
                                    ✅ Lợi ích:
                                  </p>
                                  <ul className="text-green-100 space-y-1 text-sm">
                                    <li className="flex items-center gap-2">
                                      <span>📊</span>
                                      <span>Kết quả EVN phản ánh đúng năng lực quản lý</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <span>💰</span>
                                      <span>Chi phí PSO được báo cáo riêng trong NSNN</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <span>⚖️</span>
                                      <span>Giám sát chặt chẽ, trách nhiệm rõ ràng</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                        handle={
                          <ReactCompareSliderHandle
                            buttonStyle={{
                              backdropFilter: undefined,
                              background: 'linear-gradient(to bottom, #eab308, #f59e0b)',
                              border: '4px solid white',
                              boxShadow: '0 0 20px rgba(234, 179, 8, 0.8)',
                              width: '60px',
                              height: '60px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            linesStyle={{
                              background: 'rgba(234, 179, 8, 0.5)',
                              width: '4px'
                            }}
                          >
                            <FaArrowsAltH color="white" size={24} />
                          </ReactCompareSliderHandle>
                        }
                        style={{
                          height: '800px',
                          width: '100%'
                        }}
                        position={50}
                      />
                    </div>

                    {/* Hint */}
                    <motion.p
                      className="text-center text-purple-300 mt-6 text-lg"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      👈 Kéo thanh vàng để xem sự khác biệt 👉
                    </motion.p>
                  </motion.div>

       
                </motion.div>
              )}

              {/* Pillar 2: Value Chain */}
              {activePillar === 2 && (
                <motion.div 
                  className="relative bg-gradient-to-br from-slate-900/80 via-emerald-900/40 to-slate-900/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 border-2 border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.3)] overflow-hidden"
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Blueprint grid background */}
                  <div className="absolute inset-0 opacity-5"
                       style={{
                         backgroundImage: `
                           linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
                         `,
                         backgroundSize: '40px 40px'
                       }}>
                  </div>
                  
                  {/* Stamp effect */}
                  <motion.div
                    className="absolute top-8 right-8 px-4 py-2 border-4 border-emerald-400/40 rounded-lg rotate-12 text-emerald-400 font-bold text-sm"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 12 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    GIẢI PHÁP #2
                  </motion.div>
                  
                  {/* Title */}
                  <motion.h3 
                    className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-4 flex items-center gap-4 relative z-10"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      🔓
                    </motion.div>
Xây dựng thị trường cạnh tranh ở những khâu có thể                  </motion.h3>
                  
                  <motion.p 
                    className="text-xl text-emerald-200 mb-10 font-medium relative z-10"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                  </motion.p>

                  {/* BEFORE - AFTER COMPARISON */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    
                    {/* ========== BEFORE: MÔ HÌNH "GỘP" ========== */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="relative"
                    >
                      <div className="text-center mb-6">
                        <h4 className="text-2xl font-bold text-red-400 mb-2">
                          ❌ TRƯỚC: MÔ HÌNH "GỘP"
                        </h4>
                        <p className="text-gray-300 text-sm">
                          (Hiện tại - Rào cản cao)
                        </p>
                      </div>

                      {/* Single Block - Merged Model */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl blur-xl opacity-50"></div>
                        
                        <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black border-4 border-red-500/50 rounded-2xl p-8 shadow-2xl">
                          {/* Lock Icon */}
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute top-4 right-4 text-5xl"
                          >
                            🔒
                          </motion.div>

                          {/* Company Name */}
                          <div className="text-center mb-6">
                            <h5 className="text-3xl font-bold text-white mb-2">
                              VNPT / VIETTEL
                            </h5>
                            <p className="text-red-300 text-sm font-bold">
                              Mô hình Tích hợp Dọc (Vertical Integration)
                            </p>
                          </div>

                          {/* Infrastructure Layer */}
                          <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 mb-4 border-2 border-gray-600">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-4xl">📡</span>
                              <span className="text-4xl">🌐</span>
                              <div className="flex-1">
                                <h6 className="text-white font-bold text-lg">LỚP HẠ TẦNG</h6>
                                <p className="text-gray-300 text-sm">Cột sóng + Cáp quang</p>
                              </div>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-3">
                              <p className="text-gray-200 text-sm">
                                ✓ Doanh nghiệp SỞ HỮU hạ tầng
                              </p>
                            </div>
                          </div>

                          {/* Service Layer */}
                          <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 border-2 border-gray-600">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-4xl">📱</span>
                              <span className="text-4xl">📶</span>
                              <div className="flex-1">
                                <h6 className="text-white font-bold text-lg">LỚP DỊCH VỤ</h6>
                                <p className="text-gray-300 text-sm">SIM + Data</p>
                              </div>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-3">
                              <p className="text-gray-200 text-sm">
                                ✓ Tự cung cấp dịch vụ cho khách hàng
                              </p>
                            </div>
                          </div>

                          {/* Problem Statement */}
                          <div className="mt-6 bg-red-900/30 border-2 border-red-500/50 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                              <span className="text-3xl">⚠️</span>
                              <div>
                                <p className="text-red-200 font-bold mb-2">VẤN ĐỀ:</p>
                                <ul className="text-red-100 text-sm space-y-1">
                                  <li>→ Rào cản GIA NHẬP cực lớn</li>
                                  <li>→ Đối thủ mới cần vốn khổng lồ</li>
                                  <li>→ Độc quyền = Giá cao, ít đổi mới</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* ========== AFTER: MÔ HÌNH "TÁCH LỚP" ========== */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="relative"
                    >
                      <div className="text-center mb-6">
                        <h4 className="text-2xl font-bold text-green-400 mb-2">
                          ✅ SAU: MÔ HÌNH "TÁCH LỚP"
                        </h4>
                        <p className="text-gray-300 text-sm">
                          (Giải pháp - Mở cửa cạnh tranh)
                        </p>
                      </div>

                      {/* Two-Tier Model */}
                      <div className="space-y-6">
                        {/* TIER 1: INFRASTRUCTURE (SHARED) */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl blur-lg opacity-40"></div>
                          
                          <div className="relative bg-gradient-to-br from-blue-900 to-cyan-900 border-4 border-blue-400/50 rounded-2xl p-6 shadow-2xl">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <span className="text-4xl">📡</span>
                                <span className="text-4xl">🌐</span>
                              </div>
                              <motion.div
                                animate={{ rotate: [0, 15, -15, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-4xl"
                              >
                                🔓
                              </motion.div>
                            </div>

                            <h5 className="text-2xl font-bold text-cyan-200 mb-2">
                              TẦNG NỀN: HẠ TẦNG (MỞ)
                            </h5>
                            <p className="text-cyan-100 text-sm mb-4">
                              Cột sóng + Cáp quang + Trung tâm dữ liệu
                            </p>

                            <div className="bg-blue-950/50 rounded-lg p-4 border border-cyan-500/30">
                              <p className="text-white font-bold mb-2">
                                🏢 Chủ sở hữu: VNPT, Viettel, FPT...
                              </p>
                              <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                  <span className="text-yellow-300">→</span>
                                  <p className="text-cyan-50 text-sm">
                                    <strong>CHO THUÊ</strong> hạ tầng với giá công bằng, minh bạch
                                  </p>
                                </div>
                                <div className="flex items-start gap-2">
                                  <span className="text-yellow-300">→</span>
                                  <p className="text-cyan-50 text-sm">
                                    <strong>THU PHÍ</strong> từ nhiều nhà cung cấp dịch vụ
                                  </p>
                                </div>
                                <div className="flex items-start gap-2">
                                  <span className="text-yellow-300">→</span>
                                  <p className="text-cyan-50 text-sm">
                                    Giống như "cho thuê mặt bằng" trong khu chợ
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ARROW DOWN */}
                        <motion.div
                          className="text-center"
                          animate={{ y: [0, 10, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <div className="text-6xl text-green-400">⬇️</div>
                          <p className="text-green-300 font-bold text-sm mt-2">DÙNG CHUNG</p>
                        </motion.div>

                        {/* TIER 2: SERVICES (COMPETITIVE) */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl blur-lg opacity-40"></div>
                          
                          <div className="relative bg-gradient-to-br from-green-900 to-emerald-900 border-4 border-green-400/50 rounded-2xl p-6 shadow-2xl">
                            <h5 className="text-2xl font-bold text-green-200 mb-2">
                              TẦNG TRÊN: DỊCH VỤ (CẠNH TRANH)
                            </h5>
                            <p className="text-green-100 text-sm mb-4">
                              Nhiều công ty cùng cạnh tranh cung cấp dịch vụ
                            </p>

                            {/* Multiple Service Providers */}
                            <div className="grid grid-cols-3 gap-3 mb-4">
                              {[
                                { name: 'VNPT', icon: '📱', color: 'from-red-600 to-red-700' },
                                { name: 'Viettel', icon: '📶', color: 'from-green-600 to-green-700' },
                                { name: 'MVNO', icon: '💻', color: 'from-purple-600 to-purple-700' }
                              ].map((provider, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 1 + idx * 0.2 }}
                                  whileHover={{ scale: 1.1, y: -5 }}
                                  className={`bg-gradient-to-br ${provider.color} rounded-lg p-3 text-center border-2 border-white/20`}
                                >
                                  <div className="text-3xl mb-1">{provider.icon}</div>
                                  <p className="text-white text-xs font-bold">{provider.name}</p>
                                </motion.div>
                              ))}
                            </div>

                            <div className="bg-green-950/50 rounded-lg p-4 border border-green-500/30">
                              <p className="text-white font-bold mb-2">
                                ✨ Kết quả:
                              </p>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <FaCheckCircle className="text-green-400" />
                                  <p className="text-green-50 text-sm">
                                    Cạnh tranh gay gắt → Giá rẻ hơn
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FaCheckCircle className="text-green-400" />
                                  <p className="text-green-50 text-sm">
                                    Nhiều lựa chọn → Dịch vụ đa dạng
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FaCheckCircle className="text-green-400" />
                                  <p className="text-green-50 text-sm">
                                    Đổi mới sáng tạo → Trải nghiệm tốt hơn
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* KEY INSIGHT BOX */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="relative mb-8"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl blur-xl opacity-40"></div>
                    
                    <div className="relative bg-gradient-to-r from-yellow-900/90 to-orange-900/90 border-4 border-yellow-500/50 rounded-2xl p-8">
                      <div className="flex items-start gap-6">
                        <motion.div
                          animate={{ 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="text-7xl"
                        >
                          💡
                        </motion.div>
                        <div className="flex-1">
                          <h5 className="text-3xl font-bold text-yellow-200 mb-4">
                            KẾT LUẬN CỐT LÕI
                          </h5>
                          <div className="space-y-3">
                            <p className="text-white text-lg leading-relaxed">
                              <span className="text-yellow-300 font-bold">Việc "chẻ nhỏ"</span> không phải là{' '}
                              <strong className="text-red-300">"đập bỏ"</strong> VNPT/Viettel, mà là{' '}
                              <strong className="text-cyan-300">tách bạch vai trò</strong>:
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                              <div className="bg-blue-950/50 border-2 border-blue-400/50 rounded-xl p-4">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-3xl">🏗️</span>
                                  <h6 className="text-blue-200 font-bold text-lg">Chủ Hạ tầng</h6>
                                </div>
                                <p className="text-blue-100 text-sm">
                                  Cho thuê cột sóng, cáp quang → Thu phí ổn định
                                </p>
                              </div>

                              <div className="bg-green-950/50 border-2 border-green-400/50 rounded-xl p-4">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-3xl">🚀</span>
                                  <h6 className="text-green-200 font-bold text-lg">Nhà Dịch vụ</h6>
                                </div>
                                <p className="text-green-100 text-sm">
                                  Cạnh tranh sòng phẳng → Đổi mới & Khách hàng thắng
                                </p>
                              </div>
                            </div>

                            <div className="bg-yellow-950/30 border-2 border-yellow-500/50 rounded-xl p-4 mt-4">
                              <p className="text-yellow-100 text-center font-bold">
                                🎯 Mục tiêu: Phá rào cản gia nhập → Thị trường cạnh tranh lành mạnh!
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* REAL-WORLD EXAMPLE */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                  >
                    <h4 className="text-2xl font-bold text-center text-emerald-300 mb-6">
                      📚 VÍ DỤ THỰC TẾ: ANH QUỐC
                    </h4>
                    
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-emerald-500/30 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <span className="text-5xl">🇬🇧</span>
                        <div className="flex-1">
                          <p className="text-white text-lg mb-4 leading-relaxed">
                            <strong className="text-emerald-300">British Telecom (BT)</strong> bị bắt buộc{' '}
                            <strong className="text-cyan-300">mở mạng cáp quang</strong> cho đối thủ thuê.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-950/50 rounded-lg p-4 border border-cyan-500/30">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl">📉</span>
                                <p className="text-cyan-300 font-bold">Trước:</p>
                              </div>
                              <p className="text-gray-200 text-sm">
                                BT độc quyền → Giá Internet đắt, chậm đổi mới
                              </p>
                            </div>
                            <div className="bg-slate-950/50 rounded-lg p-4 border border-green-500/30">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl">📈</span>
                                <p className="text-green-300 font-bold">Sau:</p>
                              </div>
                              <p className="text-gray-200 text-sm">
                                Hàng chục ISP cạnh tranh → Giá rẻ, chất lượng cao
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                </motion.div>
              )}

              {/* Pillar 3: Governance Reforms */}
              {activePillar === 3 && (
                <motion.div 
                  className="relative bg-gradient-to-br from-slate-900/80 via-rose-900/40 to-slate-900/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 border-2 border-rose-500/30 shadow-[0_0_50px_rgba(236,72,153,0.3)] overflow-hidden"
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Main Background Image */}
                  <div className="absolute inset-0 opacity-5 z-0">
                    <img 
                      src={images.monitoring} 
                      alt="Governance & Monitoring" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-rose-900/60 to-slate-900/70"></div>
                  </div>

                  {/* Blueprint grid background */}
                  <div className="absolute inset-0 opacity-5"
                       style={{
                         backgroundImage: `
                           linear-gradient(rgba(236, 72, 153, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(236, 72, 153, 0.3) 1px, transparent 1px)
                         `,
                         backgroundSize: '40px 40px'
                       }}>
                  </div>
                  
                  {/* Technical drawing corner marks */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-rose-400/30"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-rose-400/30"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-rose-400/30"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-rose-400/30"></div>
                  
                  {/* Stamp effect */}
                  <motion.div
                    className="absolute top-8 right-8 px-4 py-2 border-4 border-rose-400/40 rounded-lg rotate-12 text-rose-400 font-bold text-sm"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 12 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    GIẢI PHÁP #3
                  </motion.div>
                  
                  <motion.h3 
                    className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400 mb-8 flex items-center gap-4 relative z-10"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <FaGem className="text-rose-400" />
                    </motion.div>
                    🏗️ NÂNG TẦM QUẢN TRỊ, KIẾN TẠO NIỀM TIN
                  </motion.h3>
                  
                  <motion.p 
                    className="text-xl text-rose-200 mb-10 font-medium relative z-10"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Hướng tới quản trị hiện đại và minh bạch tuyệt đối
                  </motion.p>

                  {/* Hero Metaphor Section - Engine & Dashboard Icons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative mb-12 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 rounded-3xl p-8 border-4 border-rose-500/40 shadow-2xl overflow-hidden"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 opacity-10 z-0">
                      <img 
                        src={images.transparency} 
                        alt="Governance & Transparency" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-gray-900/80 to-slate-950/80"></div>
                    </div>

                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10"
                         style={{
                           backgroundImage: `radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.3) 1px, transparent 1px)`,
                           backgroundSize: '30px 30px'
                         }}>
                    </div>

                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* LEFT: Engine Icon */}
                      <div className="flex items-center justify-center">
                        <motion.div
                          animate={{ 
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="text-center"
                        >
                          <div className="text-9xl mb-4">⚙️</div>
                          <h4 className="text-3xl font-bold text-rose-300 mb-2">NÂNG CẤP ĐỘNG CƠ</h4>
                          <p className="text-rose-200 text-sm">(Quản trị Hiện đại)</p>
                        </motion.div>
                      </div>

                      {/* RIGHT: Dashboard Icon */}
                      <div className="flex items-center justify-center">
                        <motion.div
                          animate={{ 
                            y: [0, -10, 0]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="text-center"
                        >
                          <div className="text-9xl mb-4">📊</div>
                          <h4 className="text-3xl font-bold text-cyan-300 mb-2">MỞ BẢNG ĐIỀU KHIỂN</h4>
                          <p className="text-cyan-200 text-sm">(Minh bạch & Giám sát)</p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Main Content: 2 Columns Clear Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    
                    {/* ========== CỘT 1: NÂNG CẤP ĐỘNG CƠ (Quản trị Hiện đại) ========== */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                      className="relative bg-gradient-to-br from-rose-950/80 via-red-900/60 to-slate-950 border-4 border-rose-500/50 rounded-3xl p-8 shadow-2xl overflow-hidden"
                    >
                      {/* Background Image with Overlay */}
                      <div className="absolute inset-0 opacity-20 z-0">
                        <img 
                          src={images.leadership} 
                          alt="Professional Leadership" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-950/90 via-red-900/80 to-slate-950/90"></div>
                      </div>

                      {/* Column Header */}
                      <div className="text-center mb-8 relative z-10">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                          className="text-6xl mb-4 inline-block"
                        >
                          ⚙️
                        </motion.div>
                        <h4 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-pink-300 mb-2">
                          NÂNG CẤP ĐỘNG CƠ
                        </h4>
                        <p className="text-rose-200 font-semibold">(Quản trị Hiện đại)</p>
                      </div>

                      {/* Section 1.1: LÃNH ĐẠO TINH HOA */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="relative mb-8 bg-gradient-to-br from-rose-900/50 to-red-900/40 border-2 border-rose-400/40 rounded-2xl p-6 overflow-hidden"
                      >
                        {/* Mini background image */}
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                          <img 
                            src={images.leadership} 
                            alt="Leadership" 
                            className="w-full h-full object-cover rounded-tl-full"
                          />
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-5xl">👨‍💼</span>
                          <h5 className="text-2xl font-bold text-rose-200">1. LÃNH ĐẠO TINH HOA</h5>
                        </div>
                        <p className="text-rose-300 text-sm mb-4 italic">(Driver - "Tài xế" vận hành)</p>
                        
                        <div className="space-y-4">
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2 }}
                            className="flex items-start gap-3 bg-rose-950/50 rounded-lg p-4"
                          >
                            <span className="text-2xl">🎯</span>
                            <div>
                              <p className="text-rose-100 font-bold mb-1">Tuyển dụng cạnh tranh:</p>
                              <p className="text-rose-200/90 text-sm">
                                Thu hút CEO chuyên nghiệp từ thị trường, không phải qua bổ nhiệm.
                              </p>
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.4 }}
                            className="flex items-start gap-3 bg-rose-950/50 rounded-lg p-4"
                          >
                            <span className="text-2xl">📊</span>
                            <div>
                              <p className="text-rose-100 font-bold mb-1">Cam kết bằng KPI:</p>
                              <p className="text-rose-200/90 text-sm">
                                Trao quyền tự chủ và đo lường hiệu quả bằng hợp đồng, bằng kết quả kinh doanh.
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Section 1.2: QUY TRÌNH CHUẨN QUỐC TẾ */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6 }}
                        className="bg-gradient-to-br from-pink-900/50 to-rose-900/40 border-2 border-pink-400/40 rounded-2xl p-6"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-5xl">🌍</span>
                          <h5 className="text-2xl font-bold text-pink-200">2. QUY TRÌNH CHUẨN QUỐC TẾ</h5>
                        </div>
                        <p className="text-pink-300 text-sm mb-4 italic">(Operating System - "Hệ điều hành")</p>
                        
                        <div className="space-y-4">
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.8 }}
                            className="flex items-start gap-3 bg-pink-950/50 rounded-lg p-4"
                          >
                            <span className="text-2xl">📋</span>
                            <div>
                              <p className="text-pink-100 font-bold mb-1">Áp dụng chuẩn mực (ví dụ: OECD):</p>
                              <p className="text-pink-200/90 text-sm">
                                Vận hành doanh nghiệp theo các quy tắc quản trị toàn cầu.
                              </p>
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 2 }}
                            className="flex items-start gap-3 bg-pink-950/50 rounded-lg p-4"
                          >
                            <span className="text-2xl">⚡</span>
                            <div>
                              <p className="text-pink-100 font-bold mb-1">Tối ưu hiệu suất:</p>
                              <p className="text-pink-200/90 text-sm">
                                Đảm bảo mọi quyết định đều dựa trên hiệu quả, liêm chính và quản trị rủi ro.
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* ========== CỘT 2: MỞ BẢNG ĐIỀU KHIỂN (Minh bạch & Giám sát) ========== */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                      className="relative bg-gradient-to-br from-cyan-950/80 via-blue-900/60 to-slate-950 border-4 border-cyan-500/50 rounded-3xl p-8 shadow-2xl overflow-hidden"
                    >
                      {/* Background Image with Overlay */}
                      <div className="absolute inset-0 opacity-20 z-0">
                        <img 
                          src={images.dashboard} 
                          alt="Data Dashboard & Analytics" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/90 via-blue-900/80 to-slate-950/90"></div>
                      </div>

                      {/* Column Header */}
                      <div className="text-center mb-8 relative z-10">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-6xl mb-4 inline-block"
                        >
                          📊
                        </motion.div>
                        <h4 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 mb-2">
                          MỞ BẢNG ĐIỀU KHIỂN
                        </h4>
                        <p className="text-cyan-200 font-semibold">(Minh bạch & Giám sát)</p>
                      </div>

                      {/* Section 2.1: DỮ LIỆU CÔNG KHAI */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="relative mb-8 bg-gradient-to-br from-cyan-900/50 to-blue-900/40 border-2 border-cyan-400/40 rounded-2xl p-6 overflow-hidden"
                      >
                        {/* Mini background image */}
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                          <img 
                            src={images.transparency} 
                            alt="Data Transparency" 
                            className="w-full h-full object-cover rounded-tl-full"
                          />
                        </div>

                        <div className="flex items-center gap-4 mb-4 relative z-10">
                          <span className="text-5xl">📈</span>
                          <h5 className="text-2xl font-bold text-cyan-200">1. DỮ LIỆU CÔNG KHAI</h5>
                        </div>
                        <p className="text-cyan-300 text-sm mb-4 italic">(Real-time Data - "Dữ liệu thời gian thực")</p>
                        
                        <div className="space-y-4">
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2 }}
                            className="flex items-start gap-3 bg-cyan-950/50 rounded-lg p-4"
                          >
                            <span className="text-2xl">🔓</span>
                            <div>
                              <p className="text-cyan-100 font-bold mb-1">Bắt buộc công khai:</p>
                              <p className="text-cyan-200/90 text-sm">
                                Chi phí đầu vào (giá mua than, khí...), chi phí vận hành, lương thưởng...
                              </p>
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.4 }}
                            className="flex items-start gap-3 bg-cyan-950/50 rounded-lg p-4"
                          >
                            <span className="text-2xl">💡</span>
                            <div>
                              <p className="text-cyan-100 font-bold mb-1">Ví dụ:</p>
                              <p className="text-cyan-200/90 text-sm">
                                Người dân có thể biết EVN đang mua điện từ nhà máy tư nhân với giá bao nhiêu.
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Section 2.2: GIÁM SÁT ĐA CHIỀU */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6 }}
                        className="bg-gradient-to-br from-blue-900/50 to-cyan-900/40 border-2 border-blue-400/40 rounded-2xl p-6"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-5xl">👁️</span>
                          <h5 className="text-2xl font-bold text-blue-200">2. GIÁM SÁT ĐA CHIỀU</h5>
                        </div>
                        <p className="text-blue-300 text-sm mb-4 italic">(Multiple Monitors - "Nhiều màn hình giám sát")</p>
                        
                        <div className="space-y-4">
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.8 }}
                            className="flex items-start gap-3 bg-blue-950/50 rounded-lg p-4"
                          >
                            <span className="text-2xl">🏛️</span>
                            <div>
                              <p className="text-blue-100 font-bold mb-1">Nhà nước:</p>
                              <p className="text-blue-200/90 text-sm">
                                Quốc hội, Kiểm toán Nhà nước (Giám sát hiệu quả vốn).
                              </p>
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 2 }}
                            className="flex items-start gap-3 bg-blue-950/50 rounded-lg p-4"
                          >
                            <span className="text-2xl">📰</span>
                            <div>
                              <p className="text-blue-100 font-bold mb-1">Xã hội:</p>
                              <p className="text-blue-200/90 text-sm">
                                Báo chí (Điều tra, phản biện).
                              </p>
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 2.2 }}
                            className="flex items-start gap-3 bg-blue-950/50 rounded-lg p-4"
                          >
                            <span className="text-2xl">👥</span>
                            <div>
                              <p className="text-blue-100 font-bold mb-1">Người dân:</p>
                              <p className="text-blue-200/90 text-sm">
                                Trực tiếp giám sát giá cả và chất lượng dịch vụ.
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>

                  </div>

                  {/* Final Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.4 }}
                    className="bg-gradient-to-r from-rose-900/50 to-purple-900/50 border-4 border-rose-500/50 rounded-2xl p-8 shadow-2xl"
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="text-7xl mb-4 inline-block"
                      >
                        💎
                      </motion.div>
                      <h5 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-pink-300 mb-4">
                        KẾT LUẬN: QUẢN TRỊ HIỆN ĐẠI - NIỀM TIN BỀN VỮNG
                      </h5>
                      <p className="text-rose-100 text-lg leading-relaxed max-w-4xl mx-auto">
                        Khi TĐKTNN được <strong className="text-yellow-300">quản trị chuyên nghiệp</strong>,{' '}
                        <strong className="text-cyan-300">minh bạch tuyệt đối</strong>, và{' '}
                        <strong className="text-green-300">giám sát đa chiều</strong>,{' '}
                        chúng ta không chỉ nâng cao hiệu quả kinh doanh mà còn{' '}
                        <strong className="text-pink-300">xây dựng niềm tin bền vững</strong> từ thị trường và xã hội.
                      </p>
                    </div>
                  </motion.div>

                </motion.div>
              )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Call to Action with 3D */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Tilt
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareEnable={true}
            glareMaxOpacity={0.5}
            glareColor="#a855f7"
            scale={1.05}
          >
            <div className="relative inline-block">
              {/* Animated glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 rounded-3xl blur-2xl"
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="relative bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 p-[3px] rounded-3xl shadow-2xl">
                <div className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 rounded-3xl px-12 py-10 backdrop-blur-xl">
                  {/* Decorative elements */}
                  <div className="flex justify-center gap-6 mb-6">
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-5xl"
                    >
                      🎯
                    </motion.div>
                    <motion.div
                      animate={{ 
                        rotate: [0, -360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-5xl"
                    >
                      ⚡
                    </motion.div>
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-5xl"
                    >
                      💎
                    </motion.div>
                  </div>
                  
                  <p className="text-2xl md:text-3xl text-purple-100 font-bold leading-relaxed max-w-3xl">
                    Ba giải pháp trên cần được triển khai{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 animate-pulse">
                      đồng bộ
                    </span>{' '}
                    và{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 animate-pulse">
                      kiên trì
                    </span>
                  </p>
                  
                  <motion.p 
                    className="text-xl md:text-2xl text-purple-300 mt-6 font-medium"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    để đạt được sự cân bằng bền vững giữa vai trò chủ đạo và hiệu quả thị trường
                  </motion.p>
                  
                  {/* Decorative shine effect */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut"
                    }}
                    style={{
                      borderRadius: 'inherit',
                    }}
                  />
                </div>
              </div>
              
              {/* Corner decorations */}
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-purple-400 rounded-tl-2xl animate-pulse"></div>
              <div className="absolute -top-3 -right-3 w-12 h-12 border-t-4 border-r-4 border-fuchsia-400 rounded-tr-2xl animate-pulse"></div>
              <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-4 border-l-4 border-violet-400 rounded-bl-2xl animate-pulse"></div>
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 border-purple-400 rounded-br-2xl animate-pulse"></div>
            </div>
          </Tilt>
        </motion.div>
      </div>

      {/* Gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-emerald-900 pointer-events-none z-10" />
    </div>
  );
};

export default SolutionSection;
