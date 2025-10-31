# TDKTNN - Interactive Learning Platform với Quiz System

## 🎯 Tính năng

### 1. **Interactive Learning Sections**
- Flip Cards - Lật thẻ học tập
- Scratch Cards - Cào thẻ khám phá
- Drag & Drop - Kéo thả tương tác
- Connecting Dots - Nối điểm kiến thức
- Mind Map - Sơ đồ tư duy
- Timeline - Dòng thời gian
- Scenarios - Tình huống thực tế

### 2. **Quiz System** 🎮
- Hệ thống quiz realtime với Firebase
- Timer cho mỗi câu hỏi (20s)
- Tính điểm theo độ chính xác và tốc độ
- Bảng xếp hạng realtime
- Session management cho nhiều phòng quiz

### 3. **AI Usage Report** 🤖
- Theo dõi sessions quiz
- Thống kê người chơi và điểm số
- Phân tích chi tiết performance
- Dashboard tổng quan

## 🚀 Cài đặt

### 1. Clone repository
\`\`\`bash
git clone https://github.com/LongLHH/TDKTNN.git
cd TDKTNN
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Cấu hình Firebase

#### Bước 1: Tạo Firebase Project
1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Tạo project mới hoặc chọn project có sẵn
3. Vào **Project Settings** → **General** → **Your apps**
4. Chọn **Web app** (</>) và đăng ký app
5. Copy Firebase configuration

#### Bước 2: Tạo file `.env`
Tạo file `.env` từ `.env.example`:
\`\`\`bash
cp .env.example .env
\`\`\`

Điền thông tin Firebase config vào file `.env`:
\`\`\`env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
\`\`\`

#### Bước 3: Setup Firestore Database
1. Trong Firebase Console, vào **Firestore Database**
2. Chọn **Create database**
3. Chọn **Start in test mode** (cho development)
4. Chọn location gần nhất

#### Bước 4: Tạo Collections và Documents mẫu

Tạo collection `questions` với documents:
\`\`\`javascript
// Document 1
{
  question: "Câu hỏi 1: Nội dung câu hỏi?",
  options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
  correctAnswer: "Đáp án A",
  explanation: "Giải thích chi tiết về đáp án"
}

// Document 2
{
  question: "Câu hỏi 2: Nội dung câu hỏi?",
  options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
  correctAnswer: "Đáp án B",
  explanation: "Giải thích chi tiết về đáp án"
}
\`\`\`

Tạo collection `sessions` với document mẫu:
\`\`\`javascript
// Document ID: session_demo
{
  status: "waiting", // waiting | in-progress | completed
  currentQuestionIndex: 0,
  createdAt: new Date().toISOString(),
  totalQuestions: 10
}
\`\`\`

### 4. Chạy Development Server
\`\`\`bash
npm run dev
\`\`\`

Truy cập: http://localhost:5173

## 📂 Cấu trúc Project

\`\`\`
TDKTNN/
├── src/
│   ├── components/
│   │   ├── Quiz.jsx              # Component quiz chính
│   │   ├── Leaderboard.jsx       # Bảng xếp hạng
│   │   ├── IntroSection.jsx      # Intro section
│   │   ├── FlipCardSection.jsx   # Flip cards
│   │   ├── ScratchCardsSection.jsx
│   │   ├── DragDropSection.jsx
│   │   ├── ConnectingDotsSection.jsx
│   │   ├── MindMapSection.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── HomePage.jsx          # Trang chủ
│   │   ├── QuizPage.jsx          # Trang quiz
│   │   └── AIReportPage.jsx      # Trang AI report
│   ├── utils/
│   │   └── score.js              # Logic tính điểm
│   ├── data/
│   │   └── content.js            # Nội dung học tập
│   ├── firebase.js               # Firebase config
│   ├── App.jsx                   # Main app
│   └── main.jsx                  # Entry point
├── .env.example                  # Template env file
├── package.json
└── README.md
\`\`\`

## 🎮 Hướng dẫn sử dụng Quiz System

### Cho Học sinh/Người chơi:
1. Truy cập trang chủ
2. Click button **"Tham gia Quiz"**
3. Nhập tên và mã session
4. Chờ giáo viên start quiz
5. Trả lời câu hỏi trong 20 giây
6. Xem kết quả và bảng xếp hạng

### Cho Giáo viên/Admin:
1. Tạo session mới trong Firestore:
   - Collection: `sessions`
   - Document ID: tùy chọn (ví dụ: `session_001`)
   - Fields:
     \`\`\`javascript
     {
       status: "waiting",
       currentQuestionIndex: 0,
       createdAt: new Date().toISOString()
     }
     \`\`\`

2. Chia sẻ mã session với học sinh

3. Để start quiz, update status:
   \`\`\`javascript
   {
     status: "in-progress"
   }
   \`\`\`

4. Để next câu hỏi, tăng `currentQuestionIndex`

5. Để kết thúc, update:
   \`\`\`javascript
   {
     status: "completed"
   }
   \`\`\`

## 📊 Xem AI Report

1. Truy cập trang chủ
2. Click button **"AI Report"**
3. Xem các tab:
   - **Tổng quan**: Stats tổng thể
   - **Sessions**: Danh sách sessions
   - **Phân tích**: Analytics chi tiết

## 🔧 Scripts

\`\`\`bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

## 🎨 Tech Stack

- **Frontend**: React 19, Vite
- **Routing**: React Router DOM 7
- **Animation**: Framer Motion 12
- **Styling**: Tailwind CSS 3
- **Database**: Firebase Firestore
- **Visualization**: Vis Network, Leader Line

## 📝 License

MIT

## 👤 Author

LongLHH - [GitHub](https://github.com/LongLHH)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if this project helped you!
