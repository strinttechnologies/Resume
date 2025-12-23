const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/resume/:email
// Get the most recent resume for an email
router.get('/:email', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM resumes WHERE user_email = ? ORDER BY updated_at DESC LIMIT 1',
            [req.params.email]
        );

        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Resume not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/resume
// Create or Update resume
router.post('/', async (req, res) => {
    const { email, data } = req.body;

    if (!email || !data) {
        return res.status(400).json({ message: 'Email and Data are required' });
    }

    try {
        // Check if exists
        const [existing] = await pool.query(
            'SELECT id FROM resumes WHERE user_email = ?',
            [email]
        );

        if (existing.length > 0) {
            // Update
            await pool.query(
                'UPDATE resumes SET data = ? WHERE user_email = ?',
                [JSON.stringify(data), email]
            );
            res.json({ message: 'Resume updated' });
        } else {
            // Create
            await pool.query(
                'INSERT INTO resumes (user_email, data) VALUES (?, ?)',
                [email, JSON.stringify(data)]
            );
            res.json({ message: 'Resume created' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
