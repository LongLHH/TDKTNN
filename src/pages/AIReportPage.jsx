import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AIReportPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('tools'); // tools, evidence, application, integrity



  const aiTools = [
    {
      name: 'GitHub Copilot',
      purpose: 'Cải thiện giao diện người dùng và hiệu ứng động',
      prompts: [
        'Cải thiện component React hiệu quả với animations mượt mà, tối ưu responsive design và trải nghiệm người dùng tốt hơn cho ứng dụng.',
        'Tạo bố cục thẻ cho dòng thời gian với hiệu ứng chuyển động và hiệu ứng hình ảnh nâng cao.'
      ],
      outputs: [
        'Đề xuất các hiệu ứng nâng cao, bố cục responsive cải tiến, hiệu ứng hình ảnh và tối ưu hóa hiệu suất.',
        'Các thẻ dòng thời gian với hiệu ứng động và thiết kế responsive.'
      ],
      edits: [
        'Áp dụng chọn lọc các đề xuất phù hợp, tùy chỉnh thời gian hiệu ứng, điều chỉnh breakpoints và tối ưu hiệu suất.',
        'Tùy chỉnh bố cục, thêm nền gradient, điều chỉnh khoảng cách.'
      ]
    },
    {
      name: 'Gemini Gem và NotebookLM',
      purpose: 'Tổng hợp, tư vấn nội dung và cấu trúc',
      prompts: [
        'Phân tích và tổng hợp các khái niệm độc quyền từ Marx-Lenin, đưa ra cấu trúc tổng quát để phân tích hai logic và tạo nội dung phân tích phù hợp với sinh viên Việt Nam.',
        'Tạo nội dung về độc quyền tự nhiên và độc quyền chỉ định từ các nguồn học thuật.'
      ],
      outputs: [
        'Nội dung có cấu trúc về các khái niệm độc quyền cơ bản, lý thuyết lịch sử, các khái niệm liên quan kèm hệ thống phân loại được giải thích dễ hiểu và sơ đồ tư duy tổng hợp.',
        'Nội dung chi tiết về độc quyền từ nhiều góc nhìn với kết quả đầu ra có cấu trúc.'
      ],
      edits: [
        'Điều chỉnh nội dung phù hợp với học sinh, bổ sung ví dụ từ thị trường Việt Nam, tối ưu cấu trúc, thêm thông tin cho giao diện web.',
        'Chọn lọc nội dung phù hợp, đơn giản hóa thuật ngữ, thêm bối cảnh Việt Nam.'
      ]
    },
    {
      name: 'Gemini Nano Banana',
      purpose: 'Tạo hình ảnh minh họa',
      prompts: [
        'Tạo hình minh họa phong cách cổ điển cho dòng thời gian lý thuyết kinh tế Marx-Lenin.',
        'Tạo logo công ty cho các Tập đoàn Kinh tế Nhà nước Việt Nam (EVN, PVN, VNPT).'
      ],
      outputs: [
        'Các hình ảnh dòng thời gian theo phong cách cổ điển.',
        'Logo công ty theo phong cách tối giản hiện đại.'
      ],
      edits: [
        'Chỉnh màu sắc, kích thước cho phù hợp với chủ đề web.',
        'Xuất sang định dạng SVG, tối ưu kích thước tệp.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-stone-900 to-neutral-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col items-center text-center mb-8">
            <button
              onClick={() => navigate('/')}
              className="self-end mb-4 px-4 py-2 bg-amber-900/50 hover:bg-amber-800/50 backdrop-blur-sm border border-amber-700/30 rounded-xl text-amber-100 transition-all text-sm"
            >
              ← Quay lại trang chủ
            </button>
            <h1 className="text-5xl md:text-6xl font-bold text-amber-100 mb-3" style={{ fontFamily: "'Noto Serif', Georgia, serif" }}>
              Báo cáo Sử dụng AI
            </h1>
            <p className="text-xl text-amber-300" style={{ fontFamily: "'Noto Serif', Georgia, serif" }}>
              Cam kết Liêm chính Học thuật
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { id: 'tools', label: 'Công cụ AI đã sử dụng', icon: '🤖' },
              { id: 'evidence', label: 'Kiểm chứng nguồn', icon: '🔍' },
              { id: 'application', label: 'Ứng dụng AI sáng tạo', icon: '🎯' },
              { id: 'integrity', label: 'Cam kết liêm chính', icon: '📚' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-700 text-white shadow-xl border border-amber-500'
                    : 'bg-amber-900/30 text-amber-200 hover:text-white hover:bg-amber-900/50 border border-amber-800/30'
                }`}
              >
                <span className="text-lg mr-2">{tab.icon}</span>
                <span className="hidden md:inline">{tab.label}</span>
                <span className="md:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Tools Tab */}
          {activeTab === 'tools' && (
            <motion.div
              key="tools"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <motion.div 
                className="bg-amber-900/20 backdrop-blur-sm border border-amber-700/30 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl font-bold text-amber-100 mb-6" style={{ fontFamily: "'Noto Serif', Georgia, serif" }}>
                  🤖 Công cụ AI đã sử dụng
                </h2>
                
                <div className="space-y-8">
                  {aiTools.map((tool, index) => (
                    <motion.div
                      key={tool.name}
                      className="bg-stone-900/60 border border-amber-800/30 rounded-xl p-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 }}
                      whileHover={{ scale: 1.01, borderColor: 'rgba(217, 119, 6, 0.5)' }}
                    >
                      <h3 className="text-2xl font-bold text-amber-200 mb-3">{tool.name}</h3>
                      <p className="text-amber-400 italic mb-4">Mục đích: {tool.purpose}</p>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-amber-950/40 p-4 rounded-lg">
                          <h4 className="text-amber-300 font-semibold mb-2">Prompt chính:</h4>
                          <ul className="space-y-2">
                            {tool.prompts.map((prompt, i) => (
                              <li key={i} className="text-amber-100/80 text-sm leading-relaxed">
                                {prompt}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-amber-950/40 p-4 rounded-lg">
                          <h4 className="text-amber-300 font-semibold mb-2">Output từ AI:</h4>
                          <ul className="space-y-2">
                            {tool.outputs.map((output, i) => (
                              <li key={i} className="text-amber-100/80 text-sm leading-relaxed">
                                {output}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-amber-950/40 p-4 rounded-lg">
                          <h4 className="text-amber-300 font-semibold mb-2">Chỉnh sửa của nhóm:</h4>
                          <ul className="space-y-2">
                            {tool.edits.map((edit, i) => (
                              <li key={i} className="text-amber-100/80 text-sm leading-relaxed">
                                {edit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Evidence Tab */}
          {activeTab === 'evidence' && (
            <motion.div
              key="evidence"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <motion.div 
                className="bg-amber-900/20 backdrop-blur-sm border border-amber-700/30 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl font-bold text-amber-100 mb-4" style={{ fontFamily: "'Noto Serif', Georgia, serif" }}>
                  🔍 Kiểm chứng nguồn
                </h2>
                <p className="text-amber-200 mb-6">
                  Tất cả thông tin về Tập đoàn Kinh tế Nhà nước đều được cross-reference từ nhiều nguồn học thuật đáng tin cậy
                </p>
                
                <div className="space-y-4">
                  {[
                    {
                      title: 'Lý thuyết Độc quyền',
                      sources: ['Tư bản - Karl Marx', 'Giáo trình Kinh tế Chính trị Mác-Lênin', 'Nghiên cứu về Kinh tế Việt Nam'],
                      verified: true
                    },
                    {
                      title: 'Dữ liệu về EVN, PVN, VNPT',
                      sources: ['Website chính thức các tập đoàn', 'Báo cáo thường niên', 'Nghị quyết Chính phủ'],
                      verified: true
                    },
                    {
                      title: 'Phân tích Độc quyền trong thực tiễn Việt Nam',
                      sources: ['Báo cáo Ngân hàng Thế giới', 'Nghiên cứu VEPR', 'Tạp chí Kinh tế & Phát triển'],
                      verified: true
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-stone-900/60 border border-amber-800/30 rounded-xl p-5"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-amber-200">{item.title}</h3>
                        {item.verified && (
                          <span className="bg-green-600/30 text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                            ✓ Đã xác minh
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-amber-100/70">
                        <span className="font-medium">Nguồn tham khảo: </span>
                        {item.sources.join(' • ')}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Application Tab */}
          {activeTab === 'application' && (
            <motion.div
              key="application"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <motion.div 
                className="bg-amber-900/20 backdrop-blur-sm border border-amber-700/30 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl font-bold text-amber-100 mb-4" style={{ fontFamily: "'Noto Serif', Georgia, serif" }}>
                  🎯 Ứng dụng AI sáng tạo
                </h2>
                <p className="text-amber-200 mb-6">
                  AI được sử dụng như công cụ hỗ trợ, không thay thế tư duy phản biện và sáng tạo của nhóm
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: '💡',
                      title: 'Khơi nguồn ý tưởng & Cấu trúc',
                      desc: 'AI giúp tổ chức ý tưởng ban đầu, đề xuất khung phân tích. Nhóm quyết định góc nhìn, logic trình bày và nội dung chính.'
                    },
                    {
                      icon: '🎨',
                      title: 'Thiết kế giao diện',
                      desc: 'AI đề xuất bố cục và hiệu ứng động. Nhóm tùy chỉnh bảng màu, kiểu chữ, khoảng cách để phù hợp với đề tài.'
                    },
                    {
                      icon: '📝',
                      title: 'Viết nội dung',
                      desc: 'AI cung cấp bản thảo ban đầu. Nhóm kiểm tra sự thật, viết lại hoàn toàn, bổ sung nghiên cứu tình huống Việt Nam và góc nhìn phản biện.'
                    },
                    {
                      icon: '🔍',
                      title: 'Nghiên cứu & Tổng hợp',
                      desc: 'AI tổng hợp thông tin từ nhiều nguồn. Nhóm đối chiếu, xác minh, và tích hợp với kiến thức học thuật.'
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-stone-900/60 border border-amber-800/30 rounded-xl p-6"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03 }}
                    >
                      <div className="text-4xl mb-3">{item.icon}</div>
                      <h3 className="text-xl font-bold text-amber-200 mb-2">{item.title}</h3>
                      <p className="text-amber-100/80 text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Integrity Tab */}
          {activeTab === 'integrity' && (
            <motion.div
              key="integrity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <motion.div 
                className="bg-amber-900/20 backdrop-blur-sm border border-amber-700/30 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl font-bold text-amber-100 mb-4" style={{ fontFamily: "'Noto Serif', Georgia, serif" }}>
                  📚 Cam kết liêm chính
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-stone-900/60 border-l-4 border-amber-500 p-6 rounded-r-xl">
                    <p className="text-amber-100 text-lg leading-relaxed mb-4">
                      Chúng em cam kết rằng tất cả nội dung trong bài báo cáo này đều là sản phẩm của tư duy, phân tích và 
                      sáng tạo của nhóm. AI chỉ được sử dụng như một công cụ hỗ trợ kỹ thuật và tổng hợp thông tin.
                    </p>
                    <p className="text-amber-200/80 italic">
                      Mọi ý tưởng chính, góc nhìn phân tích, và kết luận đều được nhóm nghiên cứu, thảo luận và 
                      quyết định độc lập dựa trên kiến thức học thuật và hiểu biết về thực tiễn Việt Nam.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { icon: '✓', title: 'Minh bạch', desc: 'Công khai mọi công cụ AI sử dụng.' },
                      { icon: '✓', title: 'Tư duy phản biện', desc: 'Không chấp nhận mù quáng kết quả từ AI.' },
                      { icon: '✓', title: 'Công trình gốc', desc: 'Tư duy và sáng tạo của nhóm là chính.' }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-700/30 rounded-xl p-5 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="text-3xl text-green-400 mb-2">{item.icon}</div>
                        <h3 className="text-lg font-bold text-green-200 mb-1">{item.title}</h3>
                        <p className="text-green-100/70 text-sm">{item.desc}</p>
                      </motion.div>
                    ))}
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
