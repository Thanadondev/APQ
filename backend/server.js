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

// Catch-all route for SPA (React) - Using middleware for maximum compatibility
app.use((req, res, next) => {
  // If it's an API request, let it go to the routes (though it should have been handled above)
  if (req.url.startsWith('/api')) {
    return next();
  }
  
  // Otherwise, serve the frontend
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      // Fallback if build not found
      res.status(200).send('API is running. (Frontend build not found)');
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
