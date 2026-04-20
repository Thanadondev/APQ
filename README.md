# 🎌 Anime Personality Quiz (RPG Style)

A full-stack web application that combines an MBTI personality quiz with a game-like "Boss Battle" experience. Match your soul with famous anime characters using Google Gemini AI!

## ✨ Features
- **⚔️ RPG Experience:** Select your class (Swordsman, Archer, Mage, Assassin) and defeat the Demon Lord Azaroth by answering personality questions.
- **🔮 AI-Powered Analysis:** Uses Google Gemini 2.0 Flash to analyze your personality and find your perfect anime counterpart.
- **📊 Detailed Results:** Features Radar Charts (Stats) and Win/Loss axis breakdowns for every MBTI trait.
- **🇹🇭 Bilingual Support:** Fully localized in Thai and English.
- **🃏 Archetypes Gallery:** Explore all 16 MBTI archetypes in a sleek, card-based gallery.
- **🛡️ Robust Falling:** Built-in character database if the AI API is unavailable.

## 🚀 Tech Stack
- **Frontend:** React 19, Vite, TailwindCSS v4, Framer Motion, Recharts, Lucide Icons.
- **Backend:** Node.js, Express, Mongoose, Google Generative AI SDK.
- **Database:** MongoDB (Optional: Cloud Atlas or Local).
- **Testing:** Playwright (E2E Automated Testing).

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd APQ
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
GEMINI_API_KEY=your_google_gemini_key
MONGODB_URI=your_mongodb_atlas_uri
PORT=5000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

### 4. Running Tests
```bash
cd frontend
npm run test
```

## 📜 Deployment
The project is configured to be deployed as a single unit or separately. For single-server deployment, the backend serves the `frontend/dist` folder.

## 🤝 Contributing
Feel free to fork this project and submit pull requests!

---
Built with ❤️ for Anime & Psychology Fans.
