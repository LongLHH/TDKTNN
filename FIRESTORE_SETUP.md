# 🚀 Quick Start - Setup Firestore Database

## Bước 1: Truy cập Firebase Console
Mở: https://console.firebase.google.com/project/tdktnn-cf2c0/firestore

## Bước 2: Tạo Firestore Database
1. Click **"Create database"** (nếu chưa có)
2. Chọn **"Start in test mode"** 
3. Chọn location: **asia-southeast1** (Singapore - gần VN nhất)
4. Click **"Enable"**

## Bước 3: Tạo Collection `questions`

### Cách tạo trong Firebase Console:
1. Click **"Start collection"**
2. Collection ID: `questions`
3. Thêm các documents (câu hỏi):

### Document 1:
```
Document ID: (Auto-generated)

Fields:
- question (string): "Nội dung học tập nào thuộc về kiến thức?"
- options (array):
  - "Sự kiện lịch sử"
  - "Lý thuyết khoa học"
  - "Kỹ năng thực hành"
  - "Tất cả các đáp án trên"
- correctAnswer (string): "Tất cả các đáp án trên"
- explanation (string): "Kiến thức bao gồm cả sự thật, lý thuyết và kỹ năng"
```

### Document 2:
```
Document ID: (Auto-generated)

Fields:
- question (string): "Phương pháp học tập nào hiệu quả nhất?"
- options (array):
  - "Học thuộc lòng"
  - "Thực hành thường xuyên"
  - "Chỉ đọc lướt"
  - "Không cần ôn tập"
- correctAnswer (string): "Thực hành thường xuyên"
- explanation (string): "Thực hành giúp ghi nhớ lâu hơn và hiểu sâu hơn"
```

### Document 3:
```
Document ID: (Auto-generated)

Fields:
- question (string): "Điều gì quan trọng nhất khi học một kỹ năng mới?"
- options (array):
  - "Học nhanh một lần"
  - "Kiên trì và luyện tập"
  - "Chỉ xem video hướng dẫn"
  - "Không cần thầy cô"
- correctAnswer (string): "Kiên trì và luyện tập"
- explanation (string): "Kỹ năng cần thời gian và sự kiên trì để phát triển"
```

### Document 4:
```
Document ID: (Auto-generated)

Fields:
- question (string): "Tại sao cần có mục tiêu học tập?"
- options (array):
  - "Để áp lực bản thân"
  - "Để định hướng và động lực"
  - "Không cần mục tiêu"
  - "Chỉ cần học cho vui"
- correctAnswer (string): "Để định hướng và động lực"
- explanation (string): "Mục tiêu giúp bạn tập trung và có động lực học tập"
```

### Document 5:
```
Document ID: (Auto-generated)

Fields:
- question (string): "Cách tốt nhất để ghi nhớ kiến thức lâu dài?"
- options (array):
  - "Học một lần rồi bỏ"
  - "Ôn tập định kỳ"
  - "Chỉ học trước khi thi"
  - "Không cần ôn tập"
- correctAnswer (string): "Ôn tập định kỳ"
- explanation (string): "Ôn tập định kỳ giúp củng cố trí nhớ dài hạn"
```

## Bước 4: Tạo Collection `sessions`

1. Click **"Start collection"**
2. Collection ID: `sessions`
3. Thêm document test:

### Document ID: `demo_session`
```
Fields:
- status (string): "waiting"
- currentQuestionIndex (number): 0
- createdAt (string): "2025-10-31T00:00:00.000Z"
- totalQuestions (number): 5
```

## Bước 5: Test Quiz System

### Cách test nhanh:
1. Mở app: http://localhost:5174
2. Click **"Tham gia Quiz"**
3. Nhập:
   - Tên: Tên của bạn
   - Mã Session: `demo_session`
4. Click **"Tham gia ngay"**

### Để start quiz (trong Firebase Console):
1. Vào collection `sessions` → document `demo_session`
2. Edit field `status` thành: `"in-progress"`
3. Save

Quiz sẽ tự động bắt đầu trên app!

### Để next câu hỏi:
- Edit `currentQuestionIndex` tăng lên (0 → 1 → 2 → 3 → 4)

### Để kết thúc:
- Edit `status` thành: `"completed"`

## 🎮 Cách tạo Admin Panel đơn giản (Optional)

Để dễ quản lý quiz, bạn có thể:
1. Cài thêm Firebase Admin Panel extension
2. Hoặc tạo một trang admin đơn giản trong app
3. Hoặc chỉ dùng Firebase Console để điều khiển

## 📊 Xem kết quả

1. Sau khi quiz kết thúc
2. Vào collection `sessions` → `demo_session` → subcollection `players`
3. Xem điểm của từng người chơi

Hoặc click button **"AI Report"** trên app để xem dashboard!

## ⚡ Tips:
- Test mode sẽ hết hạn sau 30 ngày - cần setup Firebase Rules sau đó
- Có thể tạo nhiều session khác nhau cho các lớp/nhóm khác nhau
- Mỗi session có leaderboard riêng
- Questions có thể thêm/sửa bất cứ lúc nào trong Firebase Console

## 🔐 Security Rules (Production):
Khi deploy production, thay test mode bằng rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /questions/{question} {
      allow read: if true;
      allow write: if false; // Chỉ admin mới được sửa
    }
    
    match /sessions/{session} {
      allow read: if true;
      allow write: if true; // Có thể giới hạn theo auth sau
      
      match /players/{player} {
        allow read: if true;
        allow create: if true;
        allow update: if request.auth != null; // Chỉ user đã auth
      }
    }
  }
}
```

---

✅ **Xong! Quiz system đã sẵn sàng sử dụng!**
