# Website Thuyết Trình - Tập đoàn Kinh tế Nhà nước tại Việt Nam

Website thuyết trình giáo dục về "Tập đoàn Kinh tế Nhà nước tại Việt Nam" với thiết kế vintage và animations mượt mà.

## 🚀 Cài đặt và Chạy

### Bước 1: Cài đặt dependencies
```bash
npm install
```

### Bước 2: Chạy development server
```bash
npm run dev
```

Website sẽ chạy tại: http://localhost:5173

### Bước 3: Build cho production
```bash
npm run build
```

### Bước 4: Preview build
```bash
npm run preview
```

## 📁 Cấu trúc Project

```
TDKTNN/
├── src/
│   ├── components/           # Các component React
│   │   ├── IntroSection.jsx          # Trang intro với typewriter effect
│   │   ├── TimelineSection.jsx       # Dòng thời gian phát triển
│   │   ├── TwoWayRelationSection.jsx # Quan hệ tương tác 2 chiều
│   │   ├── MindMapSection.jsx        # Sơ đồ tư duy
│   │   ├── ScenariosSection.jsx      # Kịch bản thực tế
│   │   ├── SummarySection.jsx        # Tổng hợp & Ý nghĩa
│   │   └── Footer.jsx                # Footer navigation
│   ├── data/
│   │   └── content.js        # ⭐ FILE NỘI DUNG - CHỈNH SỬA TẠI ĐÂY
│   ├── pages/
│   │   └── HomePage.jsx      # Trang chủ tổng hợp
│   ├── App.jsx               # Root component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 📝 Cách Thay Đổi Nội Dung

### ⭐ TẤT CẢ NỘI DUNG NẰM TRONG FILE: `src/data/content.js`

Mở file này và thay thế các placeholder `[...]` bằng nội dung thực tế của bạn:

### 1. INTRO (Trang chủ)
```javascript
export const introData = {
  mainTitle: "Tập đoàn Kinh tế Nhà nước",
  subTitle: "Vai trò và Tầm quan trọng tại Việt Nam",
  typewriterQuestion: "Tập đoàn kinh tế nhà nước góp phần gì cho sự phát triển?"
};
```

### 2. TIMELINE (Dòng thời gian)
```javascript
export const timelineData = [
  {
    id: 1,
    title: "Giai đoạn hình thành",
    period: "1990-2000",
    desc: "Mô tả chi tiết về giai đoạn này...",
    imageUrl: "URL_ẢNH_CỦA_BẠN"
  },
  // Thêm 4-5 giai đoạn nữa
];
```

### 3. QUAN HỆ HAI CHIỀU
```javascript
// Cột trái
export const conceptAData = {
  title: "Cơ sở hạ tầng kinh tế",
  subtitle: "Nền tảng vật chất",
  items: [
    { id: 1, title: "Tập đoàn Dầu khí", desc: "...", icon: "⚡" },
    // Thêm các item khác
  ]
};

// Cột phải
export const conceptBData = {
  title: "Kiến trúc thượng tầng",
  subtitle: "Chính sách và pháp luật",
  items: [
    { id: 1, title: "Chính sách nhà nước", desc: "...", icon: "📜" },
    // Thêm các item khác
  ]
};
```

### 4. SƠ ĐỒ TƯ DUY
```javascript
export const mindMapData = {
  mainConcept: {
    title: "Tập đoàn Kinh tế Nhà nước",
    description: "Giải thích tổng quan...",
    icon: "🏢"
  },
  branches: [
    {
      id: "branch1",
      title: "Vai trò kinh tế",
      concept: "Lý thuyết về vai trò...",
      realExample: "Ví dụ: Như cột trụ của ngôi nhà...",
      icon: "💼"
    },
    // Thêm 3-4 nhánh nữa
  ]
};
```

### 5. KỊCH BẢN
```javascript
export const scenariosData = {
  scenario1: {
    id: "scenario1",
    name: "Tập đoàn Điện lực",
    description: "Cung cấp điện toàn quốc...",
    icon: "⚡",
    aspects: {
      aspect1: { title: "Sở hữu", content: "Nhà nước sở hữu..." },
      aspect2: { title: "Quản lý", content: "Bộ Công Thương..." },
      aspect3: { title: "Lợi ích", content: "Phục vụ nhân dân..." }
    }
  },
  // Thêm scenario2, scenario3
};
```

### 6. TỔNG HỢP & Ý NGHĨA
```javascript
export const summaryData = {
  title: "Tổng hợp",
  description: "Tóm tắt toàn bộ nội dung...",
  keyPoints: [
    { id: 1, title: "Điểm chính 1", description: "...", icon: "💡" },
    // Thêm 3-4 điểm
  ]
};

export const significanceData = {
  title: "Ý nghĩa",
  description: "Tầm quan trọng...",
  applications: [
    { id: 1, title: "Ứng dụng 1", description: "...", icon: "🚀" },
    // Thêm 2-3 ứng dụng
  ]
};

export const finalSectionData = {
  quote: "Trích dẫn nổi tiếng...",
  author: "Tên tác giả",
  context: "Giải thích về trích dẫn...",
  finalQuestion: "Câu hỏi mở cho người đọc?"
};
```

## 🎨 Tùy Chỉnh Màu Sắc

Mở `tailwind.config.js` để thay đổi color scheme:

```javascript
colors: {
  vintage: {
    darker: '#23170f',    // Màu nền tối nhất
    dark: '#2a2722',      // Màu nền tối
    medium: '#3d352f',    // Màu nền trung bình
    light: '#fef3c7',     // Màu chữ sáng
    accent: '#d97706',    // Màu nhấn chính
    'accent-light': '#f59e0b',
    'accent-dark': '#ea580c',
  }
}
```

## 🖼️ Thay Đổi Ảnh

Có 3 cách để thêm ảnh:

1. **URL trực tiếp** (Khuyến nghị cho prototype):
   ```javascript
   imageUrl: "https://via.placeholder.com/800x600"
   ```

2. **Local images**: 
   - Đặt ảnh vào thư mục `public/images/`
   - Sử dụng: `imageUrl: "/images/ten-anh.jpg"`

3. **Import trong component**:
   ```javascript
   import myImage from '../assets/image.jpg';
   ```

## 📱 Responsive Design

Website đã được tối ưu cho:
- 📱 Mobile (< 768px)
- 💻 Tablet (768px - 1024px)
- 🖥️ Desktop (> 1024px)

## ⚡ Animations

Sử dụng **Framer Motion** cho các hiệu ứng:
- Typewriter effect ở trang intro
- Scroll-triggered animations
- Hover effects
- Smooth transitions

## 🔧 Tech Stack

- ⚛️ **React 19** - UI Framework
- 🎨 **Tailwind CSS** - Styling
- ✨ **Framer Motion** - Animations
- ⚡ **Vite** - Build Tool
- 🚀 **React Router** - Navigation (sẵn sàng mở rộng)

## 📦 Deploy

### Vercel (Khuyến nghị):
```bash
npm install -g vercel
vercel --prod
```

### Netlify:
```bash
npm run build
# Kéo thả thư mục 'dist' vào Netlify
```

### Firebase Hosting:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy --only hosting
```

## 📖 Hướng Dẫn Chi Tiết

### Bước 1: Clone/Setup
Đã hoàn thành - Project đã được tạo

### Bước 2: Điền nội dung
Mở `src/data/content.js` và thay thế tất cả `[...]` bằng nội dung của bạn

### Bước 3: Test local
```bash
npm run dev
```

### Bước 4: Kiểm tra từng section
- Scroll xuống từ từ
- Kiểm tra animations
- Test trên mobile

### Bước 5: Deploy
```bash
npm run build
vercel --prod
```

## 🐛 Troubleshooting

### Lỗi "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Animations không chạy
- Kiểm tra `framer-motion` đã cài đặt chưa
- Clear cache trình duyệt (Ctrl + Shift + R)

### Ảnh không hiển thị
- Kiểm tra URL ảnh có hợp lệ
- Nếu dùng local: đặt trong thư mục `public/`

## 📞 Hỗ Trợ

Nếu gặp vấn đề, kiểm tra:
1. Console browser (F12) xem có lỗi không
2. Terminal xem có warning không
3. File `src/data/content.js` có syntax đúng không

## 📝 Checklist Hoàn Thành

- [x] Setup project structure
- [x] Tạo tất cả components
- [x] Tạo file data template
- [x] Thêm animations
- [x] Responsive design
- [ ] Điền nội dung thực tế (Công việc của bạn)
- [ ] Test trên mobile
- [ ] Deploy production

---

**Lưu ý**: Hiện tại tất cả nội dung đều là placeholder. Hãy mở file `src/data/content.js` và thay thế bằng nội dung thực tế về "Tập đoàn Kinh tế Nhà nước tại Việt Nam".

**Good luck! 🚀**
