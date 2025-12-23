const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/resume', require('./routes/resumeRoutes'));

const path = require('path');

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, '../dist')));

    // Any other route loads the index.html
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
    });
} else {
    // Routes will go here (Original root handler)
    app.get('/', (req, res) => {
        res.send('Resume Builder API is running. Set NODE_ENV=production to serve UI.');
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
