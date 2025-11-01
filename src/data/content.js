// Data configuration cho website TDKTNN
// Thay đổi nội dung theo yêu cầu

export const introData = {
  mainTitle: "Tập đoàn Kinh tế Nhà nước",
  subTitle: "Độc quyền hay Công cụ Điều tiết Vĩ mô?",
  typewriterQuestion: "Các 'gã khổng lồ' này là cần thiết hay cản trở phát triển?"
};

export const timelineData = [
  {
    id: 1,
    title: "EVN - Điện lực Việt Nam",
    period: "Case Study 1",
    desc: "🔌 TRUYỀN TẢI: Độc quyền Tự nhiên (lưới 500kV không thể trùng lặp)\n\n🏠 BÁN LẺ: Độc quyền Chỉ định (EVN là nhà cung cấp duy nhất cho hộ gia đình)\n\n⚡ PHÁT ĐIỆN: Cạnh tranh (nhiều nhà máy tư nhân BOT)\n\n→ Mô hình 'LAI': Vừa tự nhiên, vừa chỉ định, vừa cạnh tranh",
    imageUrl: "/images/evn-logo.svg"
  },
  {
    id: 2,
    title: "PVN - Dầu khí Việt Nam",
    period: "Case Study 2",
    desc: "🛢️ THƯỢNG NGUỒN: Độc quyền Chỉ định (khai thác tài nguyên chiến lược vì an ninh năng lượng)\n\n⛽ HẠ NGUỒN: Cạnh tranh gay gắt (PVOil vs Petrolimex vs Shell, giá xăng theo thị trường)\n\n→ Nhà nước chỉ giữ chặt phần 'quan trọng', thả lỏng phần còn lại",
    imageUrl: "/images/pvn-logo.svg"
  },
  {
    id: 3,
    title: "VNPT - Câu chuyện Phá độc quyền",
    period: "Case Study 3",
    desc: "📡 QUÁ KHỨ: Độc quyền 100% viễn thông (giá cao, chất lượng kém)\n\n🔄 CẢI CÁCH: Tách Mobifone + Cho Viettel vào + Mở cửa FPT/CMC\n\n📱 HIỆN NAY: Cạnh tranh cao → Giá cước rẻ nhất thế giới\n\n→ THÀNH CÔNG: Phá độc quyền CÓ THỂ làm được!",
    imageUrl: "/images/vnpt-logo.svg"
  }
];

// Cột trái - Độc quyền Tự nhiên
export const conceptAData = {
  title: "Độc quyền Tự nhiên",
  subtitle: "Natural Monopoly - Do đặc thù kinh tế ngành",
  items: [
    {
      id: 1,
      title: "Chi phí cố định khổng lồ",
      desc: "Xây dựng lưới điện quốc gia, đường sắt, hệ thống cấp nước... cần vốn đầu tư ban đầu cực lớn",
      icon: "💰"
    },
    {
      id: 2,
      title: "Hiệu quả kinh tế quy mô",
      desc: "Chi phí TB giảm khi sản lượng tăng. 1 công ty phục vụ toàn bộ thị trường RẺ HƠN nhiều so với 2-3 công ty cạnh tranh",
      icon: "📊"
    },
    {
      id: 3,
      title: "Không thể trùng lặp hạ tầng",
      desc: "Vô lý khi có 2 hệ thống lưới điện song song phủ cùng một khu vực → Lãng phí tài nguyên xã hội",
      icon: "�"
    },
    {
      id: 4,
      title: "Vai trò nhà nước",
      desc: "Nắm giữ để đảm bảo cung cấp dịch vụ liên tục + Điều tiết giá bán (tránh bóc lột người tiêu dùng)",
      icon: "⚖️"
    }
  ]
};

// Cột phải - Độc quyền do Nhà nước Chỉ định
export const conceptBData = {
  title: "Độc quyền do Nhà nước Chỉ định",
  subtitle: "State-Sanctioned Monopoly - Do quyết định chính trị",
  items: [
    {
      id: 1,
      title: "An ninh quốc phòng",
      desc: "Sản xuất vũ khí, trang bị quân sự, công nghệ quốc phòng → Không thể để tư nhân nắm giữ vì lý do an ninh",
      icon: "�️"
    },
    {
      id: 2,
      title: "Tài nguyên chiến lược",
      desc: "Dầu mỏ, khí đốt, khoáng sản quý hiếm → Nhà nước nắm giữ để đảm bảo an ninh năng lượng và lợi ích quốc gia",
      icon: "⚡"
    },
    {
      id: 3,
      title: "Dịch vụ công ích thiết yếu",
      desc: "Y tế, giáo dục, nước sạch, bưu chính → Đảm bảo mọi công dân đều được tiếp cận dù ở vùng sâu vùng xa",
      icon: "🏥"
    },
    {
      id: 4,
      title: "Quyết định chính trị",
      desc: "Nhà nước CHỦ ĐỘNG chọn doanh nghiệp được độc quyền (không phải do tính chất tự nhiên của ngành)",
      icon: "�"
    }
  ]
};

// So sánh Lý thuyết vs Thực tiễn - PHẦN 1
export const exampleData = {
  left: {
    title: "📚 LÝ THUYẾT: Độc quyền 'Thuần khiết'",
    description: "Theo sách giáo khoa kinh tế học, độc quyền nhà nước tồn tại ở 2 dạng RÕ RÀNG, TÁCH BIỆT:\n\n🔹 Độc quyền TỰ NHIÊN: Do chi phí cố định khổng lồ (lưới điện, đường sắt) → Chỉ 1 công ty là hiệu quả nhất\n\n🔹 Độc quyền CHỈ ĐỊNH: Do quyết định chính trị (an ninh quốc phòng, tài nguyên chiến lược)",
    impacts: [
      "✓ Ranh giới rõ ràng: Hoặc là Tự nhiên, hoặc là Chỉ định",
      "✓ Chỉ độc quyền ở khâu THỰC SỰ CẦN THIẾT",
      "✓ Các khâu khác phải MỞ CỬA cạnh tranh ngay"
    ]
  },
  right: {
    title: "🇻🇳 THỰC TẾ VIỆT NAM: Mô hình 'LAI' (Hybrid)",
    description: "Các TĐ kinh tế nhà nước VN KHÔNG THEO sách giáo khoa! Họ là sự pha trộn phức tạp:\n\n⚡ EVN: Độc quyền truyền tải (tự nhiên) + bán lẻ (chỉ định) + cạnh tranh phát điện\n\n🛢️ PVN: Độc quyền thượng nguồn (chỉ định) + cạnh tranh hạ nguồn\n\n📱 VNPT: Từ độc quyền 100% → phá vỡ → cạnh tranh thành công",
    impacts: [
      "✓ Yếu tố 'Chỉ định' rất lớn (không phải tự nhiên thuần túy)",
      "✓ Mục tiêu: Công cụ ĐIỀU TIẾT VĨ MÔ (ổn định giá, trợ giá...)",
      "✓ Có thể phá độc quyền nếu quyết tâm (VNPT là bằng chứng)"
    ]
  }
};

// Mind Map - Phân tích 3 Case Studies
export const mindMapData = {
  mainConcept: {
    title: "Mô hình 'Lai' của TĐ Kinh tế Nhà nước VN",
    description: "Sự kết hợp phức tạp giữa độc quyền tự nhiên, độc quyền chỉ định và cạnh tranh - nhằm mục đích trở thành công cụ điều tiết vĩ mô của Nhà nước",
    icon: "�"
  },
  branches: [
    {
      id: "branch1",
      title: "EVN - Điện lực",
      concept: "Độc quyền TỰ NHIÊN (truyền tải) + CHỈ ĐỊNH (bán lẻ) + Cạnh tranh (phát điện)",
      realExample: "Bạn chỉ có thể mua điện từ EVN (không chọn được), nhưng điện đó có thể đến từ nhà máy tư nhân",
      icon: "⚡"
    },
    {
      id: "branch2",
      title: "PVN - Dầu khí",
      concept: "Độc quyền CHỈ ĐỊNH (khai thác) + Cạnh tranh (bán lẻ xăng dầu)",
      realExample: "PVN quyết định khai thác dầu ở đâu, nhưng cửa hàng xăng PVOil phải cạnh tranh với Petrolimex",
      icon: "🛢️"
    },
    {
      id: "branch3",
      title: "VNPT - Viễn thông",
      concept: "Từ độc quyền 100% → Chủ động PHÁ VỠ → Thị trường cạnh tranh cao",
      realExample: "Trước: Chỉ có VNPT. Nay: VNPT, Viettel, Mobifone, FPT, Vinaphone... cạnh tranh → Giá rẻ, chất lượng tốt",
      icon: "�"
    },
    {
      id: "branch4",
      title: "KẾT LUẬN",
      concept: "Không phải độc quyền tự nhiên thuần túy. Yếu tố 'chỉ định' rất lớn để thực thi vai trò điều tiết",
      realExample: "Các TĐ này là 'công cụ chính sách' của Chính phủ, không chỉ đơn thuần là doanh nghiệp kinh doanh",
      icon: "🎯"
    }
  ]
};

// Scenarios - Case Studies chi tiết
export const scenariosData = {
  scenario1: {
    id: "scenario1",
    name: "EVN - Tập đoàn Điện lực Việt Nam",
    description: "Mô hình phức tạp nhất: Kết hợp cả 3 yếu tố (độc quyền tự nhiên + chỉ định + cạnh tranh) trong cùng một chuỗi giá trị",
    icon: "⚡",
    aspects: {
      aspect1: {
        title: "Khâu TRUYỀN TẢI - Độc quyền Tự nhiên",
        content: "EVN độc quyền 100% hệ thống lưới truyền tải điện cao thế (500kV, 220kV). Đây là độc quyền TỰ NHIÊN đúng nghĩa: Không thể có 2 hệ thống lưới song song vì chi phí khổng lồ và lãng phí tài nguyên. Giống như không thể có 2 hệ thống đường ray tàu hỏa phủ cùng 1 tuyến."
      },
      aspect2: {
        title: "Khâu BÁN LẺ - Độc quyền Chỉ định",
        content: "EVN độc quyền bán điện cho hộ gia đình/doanh nghiệp. Khâu này KHÔNG PHẢI độc quyền tự nhiên - về lý thuyết có thể có nhiều công ty mua điện từ lưới và bán lại. Nhưng Nhà nước CHỈ ĐỊNH EVN làm để thực hiện nhiệm vụ điều tiết giá, trợ giá cho vùng sâu vùng xa."
      },
      aspect3: {
        title: "Khâu PHÁT ĐIỆN - Đã có Cạnh tranh",
        content: "Hiện đã có nhiều nhà máy điện tư nhân (BOT), điện mặt trời, điện gió... cạnh tranh bán điện cho EVN. Đây là khâu thành công trong việc phá độc quyền - giá điện đầu vào giảm, đa dạng nguồn cung."
      }
    }
  },
  scenario2: {
    id: "scenario2",
    name: "PVN - Tập đoàn Dầu khí Việt Nam",
    description: "Mô hình 'nửa độc quyền, nửa cạnh tranh': Nắm chặt thượng nguồn (chiến lược), thả lỏng hạ nguồn (thị trường)",
    icon: "�️",
    aspects: {
      aspect1: {
        title: "Khâu THƯỢNG NGUỒN - Độc quyền Chỉ định",
        content: "PVN nắm độc quyền thăm dò, khai thác dầu khí (tài nguyên thiên nhiên). Đây là độc quyền CHỈ ĐỊNH vì lý do: (1) An ninh năng lượng quốc gia (2) Tài nguyên chiến lược không thể để tư nhân/nước ngoài tự do khai thác (3) Nguồn thu lớn cho ngân sách."
      },
      aspect2: {
        title: "Khâu HẠ NGUỒN - Cạnh tranh gay gắt",
        content: "Phân phối, bán lẻ xăng dầu hoàn toàn cạnh tranh. PVN (qua PVOil) phải đối đầu với Petrolimex (cũng là DNNN), Saigon Petro, Shell, Mobil, Caltex... Giá xăng dao động theo thị trường thế giới, không ai được ưu ái."
      },
      aspect3: {
        title: "Tại sao cấu trúc này?",
        content: "Nhà nước chỉ giữ chặt phần 'quan trọng nhất' (khai thác tài nguyên) để đảm bảo chủ quyền và an ninh. Phần 'ít nhạy cảm' (bán xăng) thì để thị trường tự điều tiết → Người dân được hưởng lợi từ cạnh tranh về giá và chất lượng dịch vụ."
      }
    }
  },
  scenario3: {
    id: "scenario3",
    name: "VNPT - Câu chuyện 'Phá độc quyền' thành công",
    description: "Ví dụ điển hình cho việc Nhà nước CHỦ ĐỘNG phá bỏ độc quyền của chính mình → Thị trường phát triển mạnh → Người dân hưởng lợi",
    icon: "📱",
    aspects: {
      aspect1: {
        title: "QUÁ KHỨ - Độc quyền 100%",
        content: "Trước 2000s: VNPT là 'bá chủ' duy nhất - độc quyền cả hạ tầng viễn thông (cáp quang, trạm phát sóng) lẫn cung cấp dịch vụ (điện thoại cố định, di động, internet). Người dân không có lựa chọn, giá cước cao, chất lượng tùy hứng."
      },
      aspect2: {
        title: "CẢI CÁCH - Phá vỡ thế độc quyền",
        content: "Nhà nước thực hiện 3 bước: (1) Tách Mobifone ra khỏi VNPT (2) Cho Viettel (DNNN khác) vào cuộc (3) Mở cửa cho tư nhân (FPT Telecom, CMC) và ngoại (Vinaphone). Mục tiêu: Tạo cạnh tranh thực sự, buộc VNPT phải cải thiện."
      },
      aspect3: {
        title: "HIỆN TẠI - Thị trường cạnh tranh cao",
        content: "Kết quả: Giá cước di động/internet VN thuộc hàng RẺ NHẤT thế giới. Chất lượng mạng 4G/5G tốt. Người dân tự do chuyển nhà mạng. VNPT không còn 'ngồi mát ăn bát vàng' → Đây là minh chứng: PHÁ ĐỘC QUYỀN CÓ THỂ THÀNH CÔNG nếu Nhà nước quyết tâm."
      }
    }
  }
};

// Summary - Tổng hợp Phần 1
export const summaryData = {
  title: "Tổng hợp: Lý luận vs Thực tiễn",
  description: "Các Tập đoàn Kinh tế Nhà nước Việt Nam KHÔNG PHẢI là 'độc quyền tự nhiên' thuần túy theo sách giáo khoa. Họ là mô hình 'LAI' (hybrid) phức tạp, kết hợp cả độc quyền tự nhiên, độc quyền chỉ định và cạnh tranh - nhằm mục đích trở thành CÔNG CỤ ĐIỀU TIẾT VĨ MÔ của Nhà nước.",
  icon: "📚",
  keyPoints: [
    {
      id: 1,
      title: "Lý thuyết: 2 loại độc quyền rõ ràng",
      description: "Độc quyền TỰ NHIÊN (do chi phí cố định khổng lồ, hiệu quả quy mô) và Độc quyền CHỈ ĐỊNH (do quyết định chính trị vì an ninh/tài nguyên chiến lược)",
      icon: "�"
    },
    {
      id: 2,
      title: "Thực tiễn VN: Mô hình 'Lai'",
      description: "EVN (độc quyền truyền tải + bán lẻ, cạnh tranh phát điện), PVN (độc quyền thượng nguồn, cạnh tranh hạ nguồn), VNPT (từ độc quyền → cạnh tranh thành công)",
      icon: "🏢"
    },
    {
      id: 3,
      title: "Yếu tố 'Chỉ định' chiếm ưu thế",
      description: "Nhiều khâu độc quyền KHÔNG PHẢI do đặc thù kinh tế (tự nhiên) mà do Nhà nước CHỦ ĐỘNG chỉ định - để thực hiện chức năng điều tiết vĩ mô (ổn định giá, trợ giá vùng xa, cân bằng lạm phát...)",
      icon: "⚖️"
    },
    {
      id: 4,
      title: "Bài học: Phá độc quyền CÓ THỂ thành công",
      description: "Case VNPT chứng minh: Khi Nhà nước quyết tâm phá độc quyền và tạo cạnh tranh thực sự → Thị trường phát triển, giá giảm, chất lượng tăng, người dân hưởng lợi. Câu hỏi: Tại sao không làm tương tự với EVN (bán lẻ điện)?",
      icon: "🚀"
    }
  ]
};

// Significance - Ý nghĩa
export const significanceData = {
  title: "Ý nghĩa",
  description: "[TẦM QUAN TRỌNG VÀ ỨNG DỤNG THỰC TIỄN]",
  icon: "🎯",
  applications: [
    {
      id: 1,
      title: "[ỨNG DỤNG 1]",
      description: "[CHI TIẾT VỀ ỨNG DỤNG]",
      icon: "🚀"
    },
    {
      id: 2,
      title: "[ỨNG DỤNG 2]",
      description: "[CHI TIẾT VỀ ỨNG DỤNG]",
      icon: "🌟"
    },
    {
      id: 3,
      title: "[ỨNG DỤNG 3]",
      description: "[CHI TIẾT VỀ ỨNG DỤNG]",
      icon: "💎"
    }
  ]
};

// Final Section - Quote và câu hỏi kết thúc
export const finalSectionData = {
  quote: "[TRÍCH DẪN NỔI TIẾNG LIÊN QUAN]",
  author: "[TÊN TÁC GIẢ]",
  context: "[GIẢI THÍCH VỀ TRÍCH DẪN - TẠI SAO NÓ QUAN TRỌNG]",
  finalQuestion: "[CÂU HỎI MỞ CHO NGƯỜI ĐỌC SUY NGẪMƯỡŽŔ]"
};

// Navigation
export const navigationData = [
  { label: 'Trang chủ', path: '/', icon: '🏠' },
  { label: 'Tổng quan', path: '#intro', icon: '📖' },
  { label: 'Case Study', path: '#timeline', icon: '⏳' },
  { label: 'Phân tích', path: '#analysis', icon: '🔍' },
  { label: 'Giải pháp', path: '#solution', icon: '⚙️' }
];
