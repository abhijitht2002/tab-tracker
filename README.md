# Tab Tracker
A full-stack productivity and analytics system that tracks browser tab usage, helps users understand their browsing habits, and enables time-based insights per domain. Built using a Chrome Extension, Node.js backend, and a frontend dashboard.

---

## 🚀 Features

- ⏱️ tab time tracking
- 🌐 Domain-wise usage analytics
- 📊 Daily / historical usage statistics
- 🧠 Intelligent time aggregation (today + history)
- 🔌 Chrome extension integration
- 📈 Clean dashboard for visualization
- ⚡ Auto-sync between extension and backend API

---

## Project Structure
```bash
tab-tracker/
│
├── frontend/ # React / UI dashboard
├── backend/ # Node.js + Express + MongoDB API
├── extension/ # Chrome Extension (Manifest V3)
└── README.md
```

---

## ⚙️ Tech Stack

### Frontend
- React.js
- Tailwind css
- Chart.js / Recharts (for analytics)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- REST API

### Extension
- Chrome Extension (Manifest V3)
- JavaScript (Background + Content Scripts)
- Chrome Storage API

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/abhijitht2002/tab-tracker.git
cd tab-tracker
```

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Chrome Extension Setup

1. Open Google Chrome and go to `chrome://extensions/`
2. Enable **Developer Mode** (top-right corner)
3. Click **Load unpacked**
4. Select the `extension/` directory from the project
