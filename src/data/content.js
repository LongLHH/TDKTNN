// Data configuration cho website TDKTNN
// Thay đổi nội dung theo yêu cầu

export const introData = {
  mainTitle: "[TIÊU ĐỀ CHÍNH]",
  subTitle: "[TIÊU ĐỀ PHỤ]",
  typewriterQuestion: "[CÂU HỎI KÍCH THÍCH TƯ DUY]"
};

export const timelineData = [
  {
    id: 1,
    title: "[TÊN GIAI ĐOẠN 1]",
    period: "[THỜI GIAN]",
    desc: "[MÔ TẢ CHI TIẾT GIAI ĐOẠN]",
    imageUrl: "https://via.placeholder.com/800x600/2a2722/d97706?text=Giai+doan+1"
  },
  {
    id: 2,
    title: "[TÊN GIAI ĐOẠN 2]",
    period: "[THỜI GIAN]",
    desc: "[MÔ TẢ CHI TIẾT GIAI ĐOẠN]",
    imageUrl: "https://via.placeholder.com/800x600/2a2722/d97706?text=Giai+doan+2"
  },
  {
    id: 3,
    title: "[TÊN GIAI ĐOẠN 3]",
    period: "[THỜI GIAN]",
    desc: "[MÔ TẢ CHI TIẾT GIAI ĐOẠN]",
    imageUrl: "https://via.placeholder.com/800x600/2a2722/d97706?text=Giai+doan+3"
  },
  {
    id: 4,
    title: "[TÊN GIAI ĐOẠN 4]",
    period: "[THỜI GIAN]",
    desc: "[MÔ TẢ CHI TIẾT GIAI ĐOẠN]",
    imageUrl: "https://via.placeholder.com/800x600/2a2722/d97706?text=Giai+doan+4"
  },
  {
    id: 5,
    title: "[TÊN GIAI ĐOẠN 5]",
    period: "[THỜI GIAN]",
    desc: "[MÔ TẢ CHI TIẾT GIAI ĐOẠN]",
    imageUrl: "https://via.placeholder.com/800x600/2a2722/d97706?text=Giai+doan+5"
  }
];

// Cột trái - Khái niệm A
export const conceptAData = {
  title: "[TÊN KHÁI NIỆM A]",
  subtitle: "[MÔ TẢ NGẮN GỌN]",
  items: [
    {
      id: 1,
      title: "[ITEM 1]",
      desc: "[MÔ TẢ CHI TIẾT]",
      icon: "🏢"
    },
    {
      id: 2,
      title: "[ITEM 2]",
      desc: "[MÔ TẢ CHI TIẾT]",
      icon: "⚙️"
    },
    {
      id: 3,
      title: "[ITEM 3]",
      desc: "[MÔ TẢ CHI TIẾT]",
      icon: "📊"
    },
    {
      id: 4,
      title: "[ITEM 4]",
      desc: "[MÔ TẢ CHI TIẾT]",
      icon: "🎯"
    }
  ]
};

// Cột phải - Khái niệm B
export const conceptBData = {
  title: "[TÊN KHÁI NIỆM B]",
  subtitle: "[MÔ TẢ NGẮN GỌN]",
  items: [
    {
      id: 1,
      title: "[ITEM 1]",
      desc: "[MÔ TẢ CHI TIẾT]",
      icon: "💼"
    },
    {
      id: 2,
      title: "[ITEM 2]",
      desc: "[MÔ TẢ CHI TIẾT]",
      icon: "🌱"
    },
    {
      id: 3,
      title: "[ITEM 3]",
      desc: "[MÔ TẢ CHI TIẾT]",
      icon: "🔧"
    },
    {
      id: 4,
      title: "[ITEM 4]",
      desc: "[MÔ TẢ CHI TIẾT]",
      icon: "🚀"
    }
  ]
};

// Ví dụ minh họa cụ thể
export const exampleData = {
  left: {
    title: "[VÍ DỤ KHÁI NIỆM A → TÁC ĐỘNG]",
    description: "[MÔ TẢ CƠ SỞ HẠ TẦNG]",
    impacts: [
      "✓ [TÁC ĐỘNG 1]",
      "✓ [TÁC ĐỘNG 2]",
      "✓ [TÁC ĐỘNG 3]"
    ]
  },
  right: {
    title: "[VÍ DỤ KHÁI NIỆM B → TÁC ĐỘNG NGƯỢC]",
    description: "[MÔ TẢ KIẾN TRÚC THƯỢNG TẦNG]",
    impacts: [
      "✓ [TÁC ĐỘNG NGƯỢC 1]",
      "✓ [TÁC ĐỘNG NGƯỢC 2]",
      "✓ [TÁC ĐỘNG NGƯỢC 3]"
    ]
  }
};

// Mind Map / Sơ đồ tư duy
export const mindMapData = {
  mainConcept: {
    title: "[KHÁI NIỆM CHÍNH]",
    description: "[GIẢI THÍCH TỔNG QUAN]",
    icon: "🎯"
  },
  branches: [
    {
      id: "branch1",
      title: "[NHÁNH 1]",
      concept: "[KHÁI NIỆM LÝ THUYẾT]",
      realExample: "[VÍ DỤ THỰC TẾ DỄ HIỂU]",
      icon: "🌳"
    },
    {
      id: "branch2",
      title: "[NHÁNH 2]",
      concept: "[KHÁI NIỆM LÝ THUYẾT]",
      realExample: "[VÍ DỤ THỰC TẾ DỄ HIỂU]",
      icon: "🎨"
    },
    {
      id: "branch3",
      title: "[NHÁNH 3]",
      concept: "[KHÁI NIỆM LÝ THUYẾT]",
      realExample: "[VÍ DỤ THỰC TẾ DỄ HIỂU]",
      icon: "🔬"
    },
    {
      id: "branch4",
      title: "[NHÁNH 4]",
      concept: "[KHÁI NIỆM LÝ THUYẾT]",
      realExample: "[VÍ DỤ THỰC TẾ DỄ HIỂU]",
      icon: "💡"
    }
  ]
};

// Scenarios / Kịch bản
export const scenariosData = {
  scenario1: {
    id: "scenario1",
    name: "[TÊN KỊCH BẢN 1]",
    description: "[MÔ TẢ TÌNH HUỐNG]",
    icon: "🎬",
    aspects: {
      aspect1: {
        title: "[KHÍA CẠNH 1]",
        content: "[CHI TIẾT]"
      },
      aspect2: {
        title: "[KHÍA CẠNH 2]",
        content: "[CHI TIẾT]"
      },
      aspect3: {
        title: "[KHÍA CẠNH 3]",
        content: "[CHI TIẾT]"
      }
    }
  },
  scenario2: {
    id: "scenario2",
    name: "[TÊN KỊCH BẢN 2]",
    description: "[MÔ TẢ TÌNH HUỐNG]",
    icon: "📱",
    aspects: {
      aspect1: {
        title: "[KHÍA CẠNH 1]",
        content: "[CHI TIẾT]"
      },
      aspect2: {
        title: "[KHÍA CẠNH 2]",
        content: "[CHI TIẾT]"
      },
      aspect3: {
        title: "[KHÍA CẠNH 3]",
        content: "[CHI TIẾT]"
      }
    }
  },
  scenario3: {
    id: "scenario3",
    name: "[TÊN KỊCH BẢN 3]",
    description: "[MÔ TẢ TÌNH HUỐNG]",
    icon: "🏭",
    aspects: {
      aspect1: {
        title: "[KHÍA CẠNH 1]",
        content: "[CHI TIẾT]"
      },
      aspect2: {
        title: "[KHÍA CẠNH 2]",
        content: "[CHI TIẾT]"
      },
      aspect3: {
        title: "[KHÍA CẠNH 3]",
        content: "[CHI TIẾT]"
      }
    }
  }
};

// Summary - Tổng hợp
export const summaryData = {
  title: "Tổng hợp",
  description: "[TÓM TẮT TOÀN BỘ NỘI DUNG ĐÃ TRÌNH BÀY]",
  icon: "📚",
  keyPoints: [
    {
      id: 1,
      title: "[ĐIỂM CHÍNH 1]",
      description: "[GIẢI THÍCH CHI TIẾT]",
      icon: "💡"
    },
    {
      id: 2,
      title: "[ĐIỂM CHÍNH 2]",
      description: "[GIẢI THÍCH CHI TIẾT]",
      icon: "🔍"
    },
    {
      id: 3,
      title: "[ĐIỂM CHÍNH 3]",
      description: "[GIẢI THÍCH CHI TIẾT]",
      icon: "⚡"
    },
    {
      id: 4,
      title: "[ĐIỂM CHÍNH 4]",
      description: "[GIẢI THÍCH CHI TIẾT]",
      icon: "🎯"
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
  { label: 'Dòng thời gian', path: '#timeline', icon: '⏳' },
  { label: 'Phân tích', path: '#analysis', icon: '🔍' }
];
