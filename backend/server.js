const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const quizRoutes = require('./routes/quiz');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection (Non-blocking)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/anime-quiz')
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.warn('⚠️ MongoDB unavailable (check MONGODB_URI):', err.message));

// API Routes
app.use('/api', quizRoutes);

// --- Production: Serving Frontend ---
// Check if running in production or if dist folder exists
const distPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(distPath));

// Catch-all route for SPA (React)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      // If index.html doesn't exist (e.g. dev mode), show a simple message
      res.status(200).send('API is running. (Frontend build not found)');
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
